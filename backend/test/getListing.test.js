/**
 * Tests for getting a homeowner's existing listings.
 */

// Show stack trace for failures
var chai = require('chai');
chai.config.includeStack = true;

const expect = require('chai').expect;
const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../app');

const { HOMEOWNER_USER_TYPE, SIGNUP_ROUTE, CONTRACTOR_USER_TYPE } = require('../constants')
const { services } = require('../models/services')
const { getAuthorizationHeaderValue } = require('./testUtils');

// Test objects
const homeownerJson = {
    name: 'Test Homeowner Name',
    email: 'testhomeowner@email.com',
    password: 'UCSD_23_Tritons_CSE',
    userType: HOMEOWNER_USER_TYPE
}

const homeownerListingJson = {
    title: 'Listing title',
    description: 'Listing description',
    city: 'Listing city',
    state: 'Listing state',
    zip_code: 'Listing zip code',
    services: [services.ELECTRICAL, services.PEST_CONTROL, services.REMODELING]
}

const homeownerListingJson2 = {
    title: 'Listing title 2',
    description: 'Listing description 2',
    city: 'Listing city 2',
    state: 'Listing state 2',
    zip_code: 'Listing zip code 2',
    services: [services.PLUMBING]
}


const secondHomeownerJson = {
    name: 'Name 2',
    email: 'email2@gmail.com',
    password: 'UCSD_24_Tritons_CSE',
    userType: HOMEOWNER_USER_TYPE
}

let secondHomeownerListingJson = {
    title: 'Title',
    description: 'Description',
    city: 'City',
    state: 'State',
    zip_code: 'Zip Code',
    services: [services.ROOFING, services.LANDSCAPING]
};

const contractorJson = {
    name: 'Test Contractor Name',
    email: 'testcontractor@email.com',
    password: 'UCSD_23_Tritons_CSE_!!',
    userType: CONTRACTOR_USER_TYPE
}

/**
 * Tests successful homeowner viewing of their listings.
 * Tests a contractor being able to view all homeowner listings.
 */
describe('Homeowners create and query for listings; then contractor queries for listings.', function () {
    // This test requires more time to finish
    this.timeout(3000);
    it('should return homeowner-specific listings to a homeowner and all listings to a contractor.', async () => {
        let res;

        // Create the first homeowner's data.
        // Sign in.
        res = await request(app).post(SIGNUP_ROUTE).send(homeownerJson);
        expect(res.statusCode).to.equal(200);

        // Create some listings.
        const token1 = res.body.token;
        const authorization1 = getAuthorizationHeaderValue(token1);
        const id1 = jwt.verify(token1, process.env.SECRET)._id;

        res = await request(app).post('/api/homeowner/newListing')
            .set({ Authorization: authorization1 })
            .send(homeownerListingJson);
        expect(res.statusCode).to.equal(201);
        const expectedListingJson = { ...homeownerListingJson, homeowner_id: id1 };
        expect(res.body).to.eql(expectedListingJson);

        res = await request(app).post('/api/homeowner/newListing')
            .set({ Authorization: authorization1 })
            .send(homeownerListingJson2);
        expect(res.statusCode).to.equal(201);
        const expectedListingJson2 = { ...homeownerListingJson2, homeowner_id: id1 };
        expect(res.body).to.eql(expectedListingJson2);

        // Create the second homeowner's data.
        // Sign in.
        res = await request(app).post(SIGNUP_ROUTE).send(secondHomeownerJson);
        expect(res.statusCode).to.equal(200);

        // Create a listing.
        const token2 = res.body.token;
        const authorization2 = getAuthorizationHeaderValue(token2);
        const id2 = jwt.verify(token2, process.env.SECRET)._id;

        res = await request(app).post('/api/homeowner/newListing')
            .set({ Authorization: authorization2 })
            .send(secondHomeownerListingJson);
        expect(res.statusCode).to.equal(201);
        const expectedSecondHomeownerListingJson = { ...secondHomeownerListingJson, homeowner_id: id2 };
        expect(res.body).to.eql(expectedSecondHomeownerListingJson);

        // Check that only a homeowner's listings are returned for that homeowner
        res = await request(app).get('/api/homeowner/listings').set({ Authorization: authorization1 });
        const firstHomeownerListings = res.body;

        // The returned object contains some book-keeping fields added by the database that
        // are not relevant to the logic of the listing viewing.
        // We delete these properties so we aren't checking for them.
        for (const listingObject of firstHomeownerListings) {
            delete listingObject['__v'];
            delete listingObject['_id'];
        }
        expect(firstHomeownerListings).eql([expectedListingJson, expectedListingJson2]);

        res = await request(app).get('/api/homeowner/listings').set({ Authorization: authorization2 });
        const secondHomeownerListings = res.body;
        for (const listingObject of secondHomeownerListings) {
            delete listingObject['__v'];
            delete listingObject['_id'];
        }
        expect(secondHomeownerListings).eql([expectedSecondHomeownerListingJson]);

        // Create a contractor.
        res = await request(app).post(SIGNUP_ROUTE).send(contractorJson);
        expect(res.statusCode).to.equal(200);
        const token = res.body.token;
        const authorization = getAuthorizationHeaderValue(token);
        // Query for listings.
        const filters = {}
        res = await request(app).post('/api/contractor/listings').set({ Authorization: authorization }).send(filters);
        expect(res.statusCode).to.equal(200);
        const listings = res.body;
        expect(listings.length).to.equal(3);
    });
});

/**
 * Tests unsuccessful contractor viewing of a specific homeowner's listings.
 */
describe('Contractor does GET /api/homeowner/listings', () => {
    it('should fail if a contractor tries to view the listings of a specific homeowner.', async () => {
        let res;

        // Create the first homeowner's data.
        // Sign in.
        res = await request(app).post(SIGNUP_ROUTE).send(contractorJson);
        expect(res.statusCode).to.equal(200);

        const token = res.body.token;
        const authorization = getAuthorizationHeaderValue(token);

        // Attempt to view a specific homeowner's listings
        res = await request(app).get('/api/homeowner/listings').set({ Authorization: authorization });
        expect(res.statusCode).to.equal(401);
    });
});
