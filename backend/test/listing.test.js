/**
 * Tests for updating and deleting an existing listing.
 */

// Show stack trace for failures
var chai = require('chai');
chai.config.includeStack = true;

const expect = require('chai').expect;
const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../app');
const Homeowner = require('../models/homeownerModel');
const Listing = require('../models/listingModel');

const { CONTRACTOR_USER_TYPE, HOMEOWNER_USER_TYPE, SIGNUP_ROUTE,
    NEW_PROJECT_LISTING_ROUTE, HOMEOWNER_SPECIFIC_LISTINGS_ROUTE,
    CONTRACTOR_HOMEOWNER_LISTINGS_ROUTE, JWT_SECRET } = require('../constants')
const { services } = require('../models/services')
const { getAuthorizationHeaderValue } = require('./testUtils');

// Test objects
const listingTitle = 'Listing title';
const listingDescription = 'Listing description';
const listingCity = 'Listing city';
const listingState = 'Listing state';
const listingZipCode = 'Listing zip code';
const listingValidServices = [services.ELECTRICAL, services.PEST_CONTROL, services.REMODELING];
const listingInvalidServices = [services.ELECTRICAL, 'some invalid service string'];

const contractorJson = {
    name: 'Test Contractor Name',
    email: 'testcontractor@email.com',
    password: 'UCSD_23_Tritons_CSE_!!',
    userType: CONTRACTOR_USER_TYPE
}

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
        res = await request(app).post(NEW_PROJECT_LISTING_ROUTE)
            .set({ Authorization: authorization })
            .send(listingJson);
        expect(res.statusCode).to.equal(201);

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

        // We should be able to query for the listing we just created using the listing id from the homeowner.
        const listingId = (homeowner.listings[0]);
        const queriedListing = await Listing.findById(listingId).lean();
        expect(listing).to.eql(queriedListing);
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
        res = await request(app).post(NEW_PROJECT_LISTING_ROUTE)
            .set({ Authorization: authorization })
            .send(listingJson);

        // Check for error
        expect(res.statusCode).to.equal(400);
    });
});

/**
 * Tests successful homeowner listing edit.
 */
describe('PATCH /api/homeowner/listing/:listing_id', () => {
    it('should update the existing listing.', async () => {
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

        // Post to the endpoint
        res = await request(app).post(NEW_PROJECT_LISTING_ROUTE)
            .set({ Authorization: authorization })
            .send(listingJson);
        expect(res.statusCode).to.equal(201);

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

        // We should be able to query for the listing we just created using the listing id from the homeowner.
        const listingId = (homeowner.listings[0]);
        const queriedListing = await Listing.findById(listingId).lean();
        expect(listing).to.eql(queriedListing);

        // Patch to the endpoint
        const updatedTitle = 'Updated title!';
        let updatedJson = { ...listingJson };
        updatedJson.title = updatedTitle;

        res = await request(app).patch(`/api/homeowner/listings/${listingId}`)
            .set({ Authorization: authorization })
            .send({ title: updatedTitle });

        // Check the response
        expect(res.statusCode).to.equal(201);
        const updatedListing = res.body;
        expect(updatedListing.title).to.equal(updatedTitle);
        expect(updatedListing.description).to.equal(listingJson.description);
        expect(updatedListing.city).to.equal(listingJson.city);
        expect(updatedListing.state).to.equal(listingJson.state);
        expect(updatedListing.zip_code).to.equal(listingJson.zip_code);
        expect(updatedListing.services).to.eql(listingJson.services);
    });
});

/**
 * Tests successful homeowner listing deletion.
 */
describe('DELETE /api/homeowner/listing/:listing_id', () => {
    it('should delete the existing listing and the reference the homeowner has to it.', async () => {
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

        // Post to the endpoint
        res = await request(app).post(NEW_PROJECT_LISTING_ROUTE)
            .set({ Authorization: authorization })
            .send(listingJson);
        expect(res.statusCode).to.equal(201);

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

        // We should be able to query for the listing we just created using the listing id from the homeowner.
        const listingId = (homeowner.listings[0]);
        const queriedListing = await Listing.findById(listingId).lean();
        expect(listing).to.eql(queriedListing);

        // Delete the listing 
        res = await request(app).delete(`/api/homeowner/listings/${listingId}`)
            .set({ Authorization: authorization })
            .send({ homeowner_id: _id });

        // Check the response
        expect(res.statusCode).to.equal(200);

        // Verify that the listing and any references to it no longer exist
        res = await Listing.findById(listingId);
        expect(res).to.be.null;

        const updatedHomeowner = await Homeowner.findById(_id).lean();
        expect(updatedHomeowner.listings.includes(listingId)).to.be.false;

    });
});

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

        res = await request(app).post(NEW_PROJECT_LISTING_ROUTE)
            .set({ Authorization: authorization1 })
            .send(homeownerListingJson);
        expect(res.statusCode).to.equal(201);

        // We don't have the listing id, so delete it from the response JSON.
        const expectedListingJson = { ...homeownerListingJson };
        const receivedListingJson = res.body;
        delete receivedListingJson['listing_id'];
        expect(receivedListingJson).to.eql(expectedListingJson);

        res = await request(app).post(NEW_PROJECT_LISTING_ROUTE)
            .set({ Authorization: authorization1 })
            .send(homeownerListingJson2);
        expect(res.statusCode).to.equal(201);

        // We don't have the listing id, so delete it from the response JSON.
        const receivedListingJson2 = res.body;
        delete receivedListingJson2['listing_id'];
        const expectedListingJson2 = { ...homeownerListingJson2 };
        expect(receivedListingJson2).to.eql(expectedListingJson2);

        // Create the second homeowner's data.
        // Sign in.
        res = await request(app).post(SIGNUP_ROUTE).send(secondHomeownerJson);
        expect(res.statusCode).to.equal(200);

        // Create a listing.
        const token2 = res.body.token;
        const authorization2 = getAuthorizationHeaderValue(token2);

        res = await request(app).post(NEW_PROJECT_LISTING_ROUTE)
            .set({ Authorization: authorization2 })
            .send(secondHomeownerListingJson);
        expect(res.statusCode).to.equal(201);

        // We don't have the listing id, so delete it from the response JSON.
        const expectedSecondHomeownerListingJson = { ...secondHomeownerListingJson };
        const secondHomeownerReceivedListingJson = res.body;
        delete secondHomeownerReceivedListingJson['listing_id'];
        expect(secondHomeownerReceivedListingJson).to.eql(expectedSecondHomeownerListingJson);

        // Check that only a homeowner's listings are returned for that homeowner
        res = await request(app).post(HOMEOWNER_SPECIFIC_LISTINGS_ROUTE).set({ Authorization: authorization1 });
        expect(res.statusCode).to.equal(200);

        const firstHomeownerListings = res.body;

        // The returned object contains some book-keeping fields added by the database that
        // are not relevant to the logic of the listing viewing.
        // We delete these properties so we aren't checking for them.
        for (const listingObject of firstHomeownerListings) {
            delete listingObject['__v'];
            delete listingObject['_id'];
            delete listingObject['listing_id'];
        }
        expect(firstHomeownerListings).eql([expectedListingJson, expectedListingJson2]);

        res = await request(app).post(HOMEOWNER_SPECIFIC_LISTINGS_ROUTE).set({ Authorization: authorization2 });
        const secondHomeownerListings = res.body;
        for (const listingObject of secondHomeownerListings) {
            delete listingObject['__v'];
            delete listingObject['_id'];
            delete listingObject['listing_id'];
        }
        expect(secondHomeownerListings).eql([expectedSecondHomeownerListingJson]);

        // Create a contractor.
        res = await request(app).post(SIGNUP_ROUTE).send(contractorJson);
        expect(res.statusCode).to.equal(200);
        const token = res.body.token;
        const authorization = getAuthorizationHeaderValue(token);
        // Query for listings.
        const filters = {}
        res = await request(app).post(CONTRACTOR_HOMEOWNER_LISTINGS_ROUTE)
            .set({ Authorization: authorization })
            .send(filters);
        expect(res.statusCode).to.equal(200);
        const listings = res.body;
        expect(listings.length).to.equal(3);
    });
});

/**
 * Tests unsuccessful contractor viewing of a specific homeowner's listings.
 */
describe('Contractor viewing homeowner listings', () => {
    it('should fail if a contractor tries to view the listings of a specific homeowner.', async () => {
        let res;

        // Create the first homeowner's data.
        // Sign in.
        res = await request(app).post(SIGNUP_ROUTE).send(contractorJson);
        expect(res.statusCode).to.equal(200);

        const token = res.body.token;
        const authorization = getAuthorizationHeaderValue(token);

        // Attempt to view a specific homeowner's listings
        res = await request(app).get(HOMEOWNER_SPECIFIC_LISTINGS_ROUTE).set({ Authorization: authorization });
        expect(res.statusCode).to.equal(401);
    });
});