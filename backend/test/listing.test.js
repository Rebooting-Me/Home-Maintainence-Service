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

const { HOMEOWNER_USER_TYPE, SIGNUP_ROUTE, NEW_PROJECT_LISTING_ROUTE, JWT_SECRET } = require('../constants')
const { services } = require('../models/services')
const { getAuthorizationHeaderValue } = require('./testUtils');

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

const listingTitle = 'Listing title';
const listingDescription = 'Listing description';
const listingCity = 'Listing city';
const listingState = 'Listing state';
const listingZipCode = 'Listing zip code';
const listingValidServices = [services.ELECTRICAL, services.PEST_CONTROL, services.REMODELING]

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