/**
 * Routes for authenticated users to view a detailed page for a listing and 
 * for a homeowner to get their specific listings.
 */
const express = require('express');
const { homeownerViewListing, getContractorProfiles } = require('../controllers/homeownerController');
const { authorizeHomeowner } = require('../middleware/requireAuthorization');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');

// require authentication
router.use(requireAuth);

// require authorization
router.use(authorizeHomeowner)

// View a specific homeowner's listings
router.post('/listings', homeownerViewListing);

// View all contractor profiles
router.post('/contractors', getContractorProfiles);

module.exports = router;