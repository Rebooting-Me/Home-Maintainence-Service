const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const { authenticateHomeowner } = require('../middleware/homeOwnerAuth');
const { createListing } = require('../controllers/newListingController');

//require authentication
router.use(requireAuth);

// Create a new listing
router.post('/newListing', authenticateHomeowner, createListing);

module.exports = router;