/**
 * Tests for signing in.
 */

// Show stack trace for failures
var chai = require('chai');
chai.config.includeStack = true;

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app');
const { HOMEOWNER_USER_TYPE, CONTRACTOR_USER_TYPE, SIGNUP_ROUTE, LOGIN_ROUTE } = require('../constants')

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

/**
 * Tests successful login for a homeowner.
 */
describe(`Existing homeowner does POST ${LOGIN_ROUTE}`, () => {
    it('should login the homeowner.', async () => {
        let res;

        // First, sign up so the user exists.
        res = await request(app).post(SIGNUP_ROUTE).send(homeownerJson);
        expect(res.statusCode).to.equal(200);

        // Now, login.
        res = await request(app).post(LOGIN_ROUTE).send(homeownerLogin);
        expect(res.statusCode).to.equal(200);
    });
});

/**
 * Tests successful login for a contractor.
 */
describe(`Existing contractor does POST ${LOGIN_ROUTE}`, () => {
    it('should login a signed-up contractor.', async () => {
        let res;

        // First, sign up so the user exists.
        res = await request(app).post(SIGNUP_ROUTE).send(contractorJson);
        expect(res.statusCode).to.equal(200);

        // Now, login.
        res = await request(app).post(LOGIN_ROUTE).send(contractorLogin);
        expect(res.statusCode).to.equal(200);
    });
});