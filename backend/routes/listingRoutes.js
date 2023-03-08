/**
 * Routes for homeowner project listings.
 */
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const { authorizeHomeowner } = require('../middleware/requireAuthorization');
const { updateListing, deleteListing } = require('../controllers/listingController');

// require authentication
router.use(requireAuth);
// require authorization
router.use(authorizeHomeowner);

// Edit an existing new listing
router.patch('/listings/:listing_id', updateListing);

// Delete an existing listing
router.delete('/listings/:listing_id', deleteListing)

module.exports = router;