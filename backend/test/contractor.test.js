/**
 * Tests for routes involving a contractor.
 */

// Show stack trace for failures
var chai = require('chai');
chai.config.includeStack = true;

const expect = require('chai').expect;
const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../app');
const Contractor = require('../models/contractorModel');
const { HOMEOWNER_USER_TYPE, CONTRACTOR_USER_TYPE, SIGNUP_ROUTE,
    CONTRACTOR_DASHBOARD_ROUTE, CONTRACTOR_PROFILE_ROUTE,
    ALL_CONTRACTOR_PROFILES_ROUTE, JWT_SECRET } = require('../constants')
const { services } = require('../models/services')
const { getAuthorizationHeaderValue } = require('./testUtils');

const contractorJson = {
    name: 'Test Contractor Name',
    email: 'testcontractor@email.com',
    password: 'UCSD_23_Tritons_CSE_!',
    userType: CONTRACTOR_USER_TYPE
}

const secondContractorJson = {
    name: 'Second Contractor Name',
    email: 'secondcontractor@email.com',
    password: 'Second_UCSD_23_Tritons_CSE_!',
    userType: CONTRACTOR_USER_TYPE
}

const homeownerJson = {
    name: 'Test Homeowner Name',
    email: 'testhomeowner@email.com',
    password: 'UCSD_23_Tritons_CSE',
    userType: HOMEOWNER_USER_TYPE
}

/**
 * Tests successful get of a contractor dashboard.
 */
describe(`GET ${CONTRACTOR_DASHBOARD_ROUTE}`, () => {
    it('should return the dashboard information for the contractor', async () => {
        let res;
        // Sign in.
        res = await request(app).post(SIGNUP_ROUTE).send(contractorJson);
        expect(res.statusCode).to.equal(200);

        // Get the contractor's id.
        const token = res.body.token;
        const authorization = getAuthorizationHeaderValue(token);

        res = await request(app).get(CONTRACTOR_DASHBOARD_ROUTE)
            .set({ Authorization: authorization });

        expect(res.statusCode).to.equal(200);

        // Verify that the contractor name was returned in the response.
        expect(res.body.name).to.equal(contractorJson.name);
    });
});

/**
 * Tests successful get of a contractor profile.
 */
describe(`GET ${CONTRACTOR_PROFILE_ROUTE}`, () => {
    it('should return the profile information for the contractor', async () => {
        let res;
        // Sign in.
        res = await request(app).post(SIGNUP_ROUTE).send(contractorJson);
        expect(res.statusCode).to.equal(200);
        const token = res.body.token;
        const authorization = getAuthorizationHeaderValue(token);

        // Next, update contractor profile fields.
        const description = 'This is a contractor description';
        const phoneNumber = '(123) 456-7890'
        const city = 'La Jolla';
        const state = 'California';
        const zipCode = '92093';
        const websiteUrl = 'Some website URL';
        const contractorServices = [services.PLUMBING, services.REMODELING, services.PEST_CONTROL]

        // Patch to endpoint
        res = await request(app).patch(CONTRACTOR_PROFILE_ROUTE)
            .set({ Authorization: authorization })
            .send({
                description: description,
                phone_number: phoneNumber,
                city: city,
                state: state,
                zip_code: zipCode,
                website_url: websiteUrl,
                services: contractorServices
            });
        expect(res.statusCode).to.equal(200);

        // Get the contractor profile information
        res = await request(app).get(CONTRACTOR_PROFILE_ROUTE)
            .set({ Authorization: authorization });

        expect(res.statusCode).to.equal(200);

        // Verify that the correct fields were returned in the response.
        const returnJson = res.body;
        expect(returnJson.name).to.equal(contractorJson.name);
        expect(returnJson.email).to.equal(contractorJson.email);
        expect(returnJson.description).to.equal(description);
        expect(returnJson.phone_number).to.equal(phoneNumber);
        expect(returnJson.city).to.equal(city);
        expect(returnJson.state).to.equal(state);
        expect(returnJson.zip_code).to.equal(zipCode);
        expect(returnJson.website_url).to.equal(websiteUrl);
        expect(returnJson.services).to.eql(contractorServices);
    });
});

/**
 * Tests successful updating of a contractor profile.
 */
describe(`PATCH ${CONTRACTOR_PROFILE_ROUTE}`, () => {
    it('should update the profile for the contractor', async () => {
        let res;
        // Sign in.
        res = await request(app).post(SIGNUP_ROUTE).send(contractorJson);
        expect(res.statusCode).to.equal(200);

        // Get the contractor's id.
        const token = res.body.token;
        const authorization = getAuthorizationHeaderValue(token);

        // Next, update contractor profile fields.
        const contractorServices = [services.PLUMBING, services.REMODELING, services.PEST_CONTROL]
        const description = 'This is a contractor description';

        // The response should contain the updated contractor.
        res = await request(app).patch(CONTRACTOR_PROFILE_ROUTE)
            .set({ Authorization: authorization })
            .send({
                description: description,
                services: contractorServices
            });
        expect(res.statusCode).to.equal(200);


        // Verify that the contractor was updated.
        const { _id } = jwt.verify(token, process.env.SECRET || JWT_SECRET);
        const contractor = await Contractor.findById(_id).lean();
        expect(contractor.services).to.eql(contractorServices);

    });
});

/**
 * Tests a homeowner being able to view contractor listings.
 */
describe(`POST ${ALL_CONTRACTOR_PROFILES_ROUTE}`, () => {
    it('should return all contractors for the homeowner to inspect.', async () => {
        let res;

        // Create some contractors:
        // First contractor
        res = await request(app).post(SIGNUP_ROUTE).send(contractorJson);
        expect(res.statusCode).to.equal(200);
        // Second contractor
        res = await request(app).post(SIGNUP_ROUTE).send(secondContractorJson);
        expect(res.statusCode).to.equal(200);

        // Create homeowner. 
        res = await request(app).post(SIGNUP_ROUTE).send(homeownerJson);
        expect(res.statusCode).to.equal(200);
        const token = res.body.token;
        const authorization = getAuthorizationHeaderValue(token);

        // Homeowner attempts to view contractors
        res = await request(app).post(ALL_CONTRACTOR_PROFILES_ROUTE)
            .set({ Authorization: authorization });
        expect(res.statusCode).to.equal(200);
        const contractors = res.body;
        expect(contractors.length).to.equal(2);
    });
});