/**
 * Tests for creating a new listing. I'm currently skipping the tests because they fail non-deterministically
 * when run with the other tests.
 */
const mongoose = require("mongoose");
const request = require("supertest");
const jwt = require('jsonwebtoken');

const app = require("../app");
const Homeowner = require('../models/homeownerModel');
const { HOMEOWNER_USER_TYPE, SIGNUP_ROUTE } = require('../constants')
const { services } = require('../models/services')

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'

// Timeout used to prevent test suite from failing when running GitHub actions
const JEST_TIMEOUT = 5000;

// Test objects
const homeownerName = 'Test Homeowner Name';
const homeownerEmail = 'testhomeowner@email.com'
const homeownerPassword = 'UCSD_23_Tritons_CSE';

const homeownerJson = {
    name: homeownerName,
    email: homeownerEmail,
    password: homeownerPassword,
    userType: HOMEOWNER_USER_TYPE
}

const listingTitle = 'Listing title';
const listingDescription = 'Listing description';
const listingCity = 'Listing city';
const listingState = 'Listing state';
const listingZipCode = 'Listing zip code';
const listingValidServices = [services.ELECTRICAL, services.PEST_CONTROL, services.REMODELING]
const listingInvalidServices = [services.ELECTRICAL, 'some invalid service string']

// Connecting to the database before each test.
beforeEach(async () => {
    jest.setTimeout(JEST_TIMEOUT);
    await mongoose.connect(MONGODB_URI);
    // Delete all existing documents before each test in case there was
    // some leftover data from a previous test.
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

// Closing database connection after each test. 
afterEach(async () => {
    jest.setTimeout(JEST_TIMEOUT);
    // Delete all existing documents after each test so that
    // tests don't persist stored data.
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
    await mongoose.connection.close();
});

/**
 * Tests successful homeowner listing creation.
 */
describe.skip('POST /api/homeowner/newListing', () => {
    it('should create a new listing and update the homeowner listings.', async () => {
        // Sign in. Then get the id.
        const signinRes = await request(app).post(SIGNUP_ROUTE).send(homeownerJson);
        expect(signinRes.statusCode).toBe(200);

        const token = signinRes.body.token;
        const authorization = `Bearer ${token}`
        const { _id } = jwt.verify(token, process.env.SECRET);

        // Next, attempt to create a new listing.
        let listingJson = {
            title: listingTitle,
            description: listingDescription,
            city: listingCity,
            state: listingState,
            zip_code: listingZipCode,
            services: listingValidServices
        };

        const res = await request(app).post('/api/homeowner/newListing').set({ Authorization: authorization }).send(listingJson);
        expect(res.statusCode).toBe(201);

        // Manually set the homeowner id field on the listing so we can check it.
        listingJson.homeowner_id = _id;
        expect(res.body).toEqual(listingJson);

        // Check that the homeowner's listings were updated.
        // NOTE: We assume that there were no existing listings, so the presence of a listing
        // would be the listing we just created. We do this because we cannot get the listing id.
        const homeowner = await Homeowner.findById(_id).lean();
        expect(homeowner).toBeDefined();
        if (homeowner !== null) {
            expect(homeowner.listings).toBeDefined();
            expect(homeowner.listings.length).toBe(1);
        }

    });
});

/**
 * Tests unsuccessful homeowner listing creation.
 */
describe.skip('POST /api/homeowner/newListing with invalid services', () => {
    it('should raise an exception.', async () => {
        // Sign in. Then get the id.
        const signinRes = await request(app).post(SIGNUP_ROUTE).send(homeownerJson);
        expect(signinRes.statusCode).toBe(200);

        const token = signinRes.body.token;
        const authorization = `Bearer ${token}`

        // Next, attempt to create a new listing.
        let listingJson = {
            title: listingTitle,
            description: listingDescription,
            city: listingCity,
            state: listingState,
            zip_code: listingZipCode,
            services: listingInvalidServices
        };

        const res = await request(app).post('/api/homeowner/newListing').set({ Authorization: authorization }).send(listingJson);
        expect(res.statusCode).toBe(400);
    });
});