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
const homeownerName = 'Test Homeowner Name';
const homeownerEmail = 'testhomeowner@email.com'
const homeownerPassword = 'UCSD_23_Tritons_CSE';
const homeownerJson = {
    name: homeownerName,
    email: homeownerEmail,
    password: homeownerPassword,
    userType: HOMEOWNER_USER_TYPE
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

/**
 * Tests successful sign-up for a homeowner.
 */
describe(`Homeowner does POST ${SIGNUP_ROUTE}`, () => {
    it('should create an account for the homeowner.', async () => {
        // Verify the response code
        const res = await request(app).post(SIGNUP_ROUTE).send(homeownerJson);
        expect(res.statusCode).to.equal(200);

        // Verify homeowner fields were set.
        const data = await Homeowner.findOne({ homeownerEmail }).lean();
        expect(data.name).to.equal(homeownerName);
        expect(data.email).to.equal(homeownerEmail);
    });
});

/**
 * Tests successful sign-up for a contractor.
 */
describe(`Contractor does POST ${SIGNUP_ROUTE}`, () => {
    it('should create an account for the contractor.', async () => {
        // Verify the response code
        const res = await request(app).post(SIGNUP_ROUTE).send(contractorJson);
        expect(res.statusCode).to.equal(200);

        // Verify contractor fields were set.
        const data = await Contractor.findOne({ contractorEmail }).lean();
        expect(data.name).to.equal(contractorName);
        expect(data.email).to.equal(contractorEmail);
    });
});