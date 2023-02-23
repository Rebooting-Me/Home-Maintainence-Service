/**
 * Tests for signing in.
 */
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Homeowner = require('../models/homeownerModel');

const JEST_TIMEOUT = 5000;

require("dotenv").config();

// Connecting to the database before each test.
beforeEach(async () => {
    jest.setTimeout(JEST_TIMEOUT);
    await mongoose.connect(process.env.MONGODB_URI);
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

describe('POST /api/user/signup (homeowner)', () => {
    it('should create an account in the database for the homeowner.', async () => {
        const email = 'testhomeowner@email.com'
        const homeownerJson = {
            name: "Test Homeowner Name",
            email: email,
            password: "UCSD_23_Tritons_CSE",
            userType: "Homeowner"
        }
        // Verify the response code
        const res = await request(app).post('/api/user/signup').send(homeownerJson);
        expect(res.statusCode).toBe(200);

        // Verify homeowner fields were set.
        const data = await Homeowner.findOne({ email }).lean();
        expect(data.name).toEqual(homeownerJson.name);
        expect(data.email).toEqual(homeownerJson.email);
    });
});