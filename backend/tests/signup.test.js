/**
 * Tests for signing in and logging in. These don't involve the controllers defined in the "controllers" directory,
 * as these are considered to be part of the frontend flow.
 */
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Homeowner = require('../models/homeownerModel');
const Contractor = require('../models/contractorModel');
const { HOMEOWNER_USER_TYPE, CONTRACTOR_USER_TYPE, SIGNUP_ROUTE, LOGIN_ROUTE } = require('../constants')
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"

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

const homeownerLogin = {
    email: homeownerEmail,
    password: homeownerPassword
}

const contractorName = 'Test Contractor Name';
const contractorEmail = 'testcontractor@email.com'
const contractorPassword = 'UCSD_23_Tritons_CSE_!';

const contractorJson = {
    name: contractorName,
    email: contractorEmail,
    password: contractorPassword,
    userType: CONTRACTOR_USER_TYPE
}

const contractorLogin = {
    email: contractorEmail,
    password: contractorPassword
}


// Connecting to the database before each test.
beforeEach(async () => {
    jest.setTimeout(JEST_TIMEOUT);
    await mongoose.connect(MONGODB_URI);
    // Delete all existing collections before each test in case there was
    // some leftover data from a previous test.
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
        await collection.deleteMany({});
    }
});

// Closing database connection after each test. 
afterEach(async () => {
    jest.setTimeout(JEST_TIMEOUT);
    // Delete all existing collections after each test so that
    // tests don't persist stored data.
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
        await collection.deleteMany({});
    }
    await mongoose.connection.close();
});

/**
 * Tests successful sign-up for a homeowner.
 */
describe('POST /api/user/signup (homeowner)', () => {
    it('should create an account in the database for the homeowner.', async () => {
        // Verify the response code
        const res = await request(app).post(SIGNUP_ROUTE).send(homeownerJson);
        expect(res.statusCode).toBe(200);

        // Verify homeowner fields were set.
        const data = await Homeowner.findOne({ homeownerEmail }).lean();
        expect(data.name).toEqual(homeownerName);
        expect(data.email).toEqual(homeownerEmail);
    });
});

/**
 * Tests successful sign-up for a contractor.
 */
describe('POST /api/user/signup (contractor)', () => {
    it('should create an account in the database for the contractor.', async () => {
        // Verify the response code
        const res = await request(app).post(SIGNUP_ROUTE).send(contractorJson);
        expect(res.statusCode).toBe(200);

        // Verify contractor fields were set.
        const data = await Contractor.findOne({ contractorEmail }).lean();
        expect(data.name).toEqual(contractorName);
        expect(data.email).toEqual(contractorEmail);
    });
});

/**
 * Tests successful login for a homeowner.
 */
describe('POST /api/user/login (homeowner)', () => {
    it('should login a signed-up homeowner.', async () => {
        // First, sign up so the user exists in the DB.
        await request(app).post(SIGNUP_ROUTE).send(homeownerJson);

        // Now, login.
        const res = await request(app).post(LOGIN_ROUTE).send(homeownerLogin);
        expect(res.statusCode).toBe(200);
    });
});

/**
 * Tests successful login for a contractor.
 */
describe('POST /api/user/login (contractor)', () => {
    it('should login a signed-up contractor.', async () => {
        // First, sign up so the user exists in the DB.
        await request(app).post(SIGNUP_ROUTE).send(contractorJson);

        // Now, login.
        const res = await request(app).post(LOGIN_ROUTE).send(contractorLogin);
        expect(res.statusCode).toBe(200);
    });
});