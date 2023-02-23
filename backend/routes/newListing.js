const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const { authenticateHomeowner } = require('../middleware/homeOwnerAuth');
const { createListing } = require('../controllers/newListingController');

//require authentication
router.use(requireAuth);
router.use(authenticateHomeowner);

// Create a new listing
router.post('/newListing', createListing);

module.exports = router;