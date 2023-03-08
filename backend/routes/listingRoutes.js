/**
 * Routes for homeowner project listings.
 */
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const { authorizeHomeowner } = require('../middleware/requireAuthorization');
const { createListing, getListing, updateListing, deleteListing } = require('../controllers/listingController');

// require authentication
router.use(requireAuth);

// Get an existing listing (does not require authorization)
router.get('/listings/:listing_id', getListing);

// require authorization
router.use(authorizeHomeowner);

// Create a new listing
router.post('/newListing', createListing);

// Edit an existing new listing
router.patch('/listings/:listing_id', updateListing);

// Delete an existing listing
router.delete('/listings/:listing_id', deleteListing)

module.exports = router;