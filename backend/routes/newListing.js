/**
 * Routes for a homeowner to create a new Listing.
 */
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const { authorizeHomeowner } = require('../middleware/requireAuthorization');
const { createListing } = require('../controllers/newListingController');

// require authentication
router.use(requireAuth);
// require authorization
router.use(authorizeHomeowner);

// Create a new listing
router.post('/newListing', createListing);

module.exports = router;