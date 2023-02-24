/**
 * Tests for signing in and logging in. These don't involve the controllers defined in the "controllers" directory,
 * as these are considered to be part of the frontend flow.
 */
const mongoose = require("mongoose");
const request = require("supertest");
const jwt = require('jsonwebtoken');

const app = require("../app");
const { CONTRACTOR_USER_TYPE, SIGNUP_ROUTE } = require('../constants')
const { SERVICE_ROOFING, SERVICE_REMODELING, SERVICE_PLUMBING } = require('../models/services')

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"

// Timeout used to prevent test suite from failing when running GitHub actions
const JEST_TIMEOUT = 10000;

const contractorName = "Test Contractor Name";
const contractorEmail = 'testcontractor@email.com'
const contractorPassword = "UCSD_23_Tritons_CSE_!";
const contractorJson = {
    name: contractorName,
    email: contractorEmail,
    password: contractorPassword,
    userType: CONTRACTOR_USER_TYPE
}

require("dotenv").config();

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
 * Tests successful updating of a contractor profile.
 */
describe('PATCH /api/contractor/profile/:id', () => {
    it('should update the profile information for the contractor with the given id.', async () => {
        // Sign in. Then get the id.
        const signinRes = await request(app).post(SIGNUP_ROUTE).send(contractorJson);
        const token = signinRes.body.token;
        const authorization = `Bearer ${token}`
        const { _id } = jwt.verify(token, process.env.SECRET);

        // Next, update some contractor profile fields
        const services = [SERVICE_ROOFING, SERVICE_REMODELING, SERVICE_PLUMBING]
        const res = await request(app).patch(`/api/contractor/profile/${_id}`).set({ Authorization: authorization }).send({ services: services });
        expect(res.statusCode).toBe(200);
        expect(res.body.services).toEqual(services);

    });
});
