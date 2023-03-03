/**
 * Tests for signing in.
 */

// Show stack trace for failures
var chai = require('chai');
chai.config.includeStack = true;

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app');
const Homeowner = require('../models/homeownerModel');
const Contractor = require('../models/contractorModel');
const { HOMEOWNER_USER_TYPE, CONTRACTOR_USER_TYPE, SIGNUP_ROUTE } = require('../constants')

// Test objects
const homeownerJson = {
    name: 'Test Homeowner Name',
    email: 'testhomeowner@email.com',
    password: 'UCSD_23_Tritons_CSE',
    userType: HOMEOWNER_USER_TYPE
}

const contractorJson = {
    name: 'Test Contractor Name',
    email: 'testcontractor@email.com',
    password: 'UCSD_23_Tritons_CSE_!',
    userType: CONTRACTOR_USER_TYPE
}

/**
 * Tests successful sign-up for a homeowner.
 */
describe('Account signup', () => {
    it('should create an account for the homeowner.', async () => {
        // Verify the response code
        const res = await request(app).post(SIGNUP_ROUTE).send(homeownerJson);
        expect(res.statusCode).to.equal(200);

        // Verify homeowner fields were set.
        const email = homeownerJson.email;
        const data = await Homeowner.findOne({ email }).lean();
        expect(data.name).to.equal(homeownerJson.name);
        expect(data.email).to.equal(homeownerJson.email);
    });
    it('should create an account for the contractor.', async () => {
        // Verify the response code
        const res = await request(app).post(SIGNUP_ROUTE).send(contractorJson);
        expect(res.statusCode).to.equal(200);

        // Verify contractor fields were set.
        const email = contractorJson.email;
        const data = await Contractor.findOne({ email }).lean();
        expect(data.name).to.equal(contractorJson.name);
        expect(data.email).to.equal(contractorJson.email);
    });
});
