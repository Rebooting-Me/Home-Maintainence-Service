/**
 * Routes for authenticated users to view a detailed page for a listing and 
 * for a homeowner to get their specific listings.
 */
const express = require('express');
const { getListing, homeownerViewListing, getContractorProfiles } = require('../controllers/getListingController');
const { authorizeHomeowner } = require('../middleware/requireAuthorization');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');

//require authentication
router.use(requireAuth);

router.get('/listings/:listing_id', getListing);

// router.use( authenticateHomeowner ); //is used because below req is HO specific
router.get('/listings', authorizeHomeowner, homeownerViewListing);

router.get('/contractors', authorizeHomeowner, getContractorProfiles);

module.exports = router;