/**
 * Tests for creating a new listing.
 */

// Show stack trace for failures
var chai = require('chai');
chai.config.includeStack = true;

const expect = require('chai').expect;
const request = require('supertest');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants')

const app = require('../app');
const Homeowner = require('../models/homeownerModel');
const Listing = require('../models/listingModel');

const { HOMEOWNER_USER_TYPE, SIGNUP_ROUTE, JWT_SECRET } = require('../constants')
const { services } = require('../models/services')
const { getAuthorizationHeaderValue } = require('./testUtils');

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

/**
 * Tests successful homeowner listing creation.
 */
describe('POST /api/homeowner/newListing', () => {
    it('should create a new listing and update the homeowner.', async () => {
        let res;

        // Sign in.
        res = await request(app).post(SIGNUP_ROUTE).send(homeownerJson);
        expect(res.statusCode).to.equal(200);

        // Get the homeowner's id.
        const token = res.body.token;
        const authorization = getAuthorizationHeaderValue(token);
        const { _id } = jwt.verify(token, process.env.SECRET || JWT_SECRET);

        // Create a new listing.
        let listingJson = {
            title: listingTitle,
            description: listingDescription,
            city: listingCity,
            state: listingState,
            zip_code: listingZipCode,
            services: listingValidServices
        };
        res = await request(app).post('/api/homeowner/newListing')
            .set({ Authorization: authorization })
            .send(listingJson);
        expect(res.statusCode).to.equal(201);

        // Manually set the homeowner id field on the listing so we can check it against the database copy.
        listingJson.homeowner_id = _id;
        expect(res.body).to.eql(listingJson);

        // Get the listing we just created from the database so we can access its id.
        // NOTE: We assume that there were no existing listings, so the only listing
        // is the one we just created.
        const listings = await Listing.find().lean();
        expect(listings).to.exist;
        const listing = listings[0];

        // Check that the homeowner's listings were updated.
        const homeowner = await Homeowner.findById(_id).lean();
        expect(homeowner).to.exist;
        expect(homeowner.listings).to.exist;
        expect(homeowner.listings[0]).to.eql(listing._id);
    });

    it('should fail if invalid service types are specified.', async () => {
        let res;

        // Sign in.
        res = await request(app).post(SIGNUP_ROUTE).send(homeownerJson);
        expect(res.statusCode).to.equal(200);

        // Get the token.
        const token = res.body.token;
        const authorization = getAuthorizationHeaderValue(token);

        // Create a new listing.
        let listingJson = {
            title: listingTitle,
            description: listingDescription,
            city: listingCity,
            state: listingState,
            zip_code: listingZipCode,
            services: listingInvalidServices
        };
        res = await request(app).post('/api/homeowner/newListing')
            .set({ Authorization: authorization })
            .send(listingJson);

        // Check for error
        expect(res.statusCode).to.equal(400);
    });
});