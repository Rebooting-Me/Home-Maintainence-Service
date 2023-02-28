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
const { CONTRACTOR_USER_TYPE, SIGNUP_ROUTE } = require('../constants')
const { services } = require('../models/services')
const { getAuthorizationHeaderValue } = require('./testUtils');


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
 * Tests successful get of a contractor dashboard.
 */
describe('GET /api/contractor/dashboard/', () => {
    it('should return the dashboard information for the contractor', async () => {
        let res;
        // Sign in.
        res = await request(app).post(SIGNUP_ROUTE).send(contractorJson);
        expect(res.statusCode).to.equal(200);

        // Get the contractor's id.
        const token = res.body.token;
        const authorization = getAuthorizationHeaderValue(token);

        res = await request(app).get('/api/contractor/dashboard/')
            .set({ Authorization: authorization });

        expect(res.statusCode).to.equal(200);

        // Verify that the contractor name was returned in the response.
        expect(res.body.name).to.equal(contractorName);


    });
});

/**
 * Tests successful get of a contractor profile.
 */
describe('GET /api/contractor/profile/', () => {
    it('should return the profile information for the contractor', async () => {
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
        res = await request(app).patch('/api/contractor/profile/')
            .set({ Authorization: authorization })
            .send({
                description: description,
                services: contractorServices
            });
        expect(res.statusCode).to.equal(200);

        // Get the contractor profile information
        res = await request(app).get('/api/contractor/profile/')
            .set({ Authorization: authorization });

        expect(res.statusCode).to.equal(200);

        // Verify that the correct fields were returned in the response.
        expect(res.body.name).to.equal(contractorName);
        expect(res.body.email).to.equal(contractorEmail);
        expect(res.body.description).to.equal(description);
        expect(res.body.services).to.eql(contractorServices);
    });
});

/**
 * Tests successful updating of a contractor profile.
 */
describe('PATCH /api/contractor/profile/', () => {
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
        res = await request(app).patch('/api/contractor/profile/')
            .set({ Authorization: authorization })
            .send({
                description: description,
                services: contractorServices
            });
        expect(res.statusCode).to.equal(200);


        // Verify that the contractor was updated.
        const { _id } = jwt.verify(token, process.env.SECRET);
        const contractor = await Contractor.findById(_id).lean();
        expect(contractor.services).to.eql(contractorServices);

    });
});