const express = require('express');
const { getListing, homeownerViewListing } = require('../controllers/getListingController');
const { authenticateHomeowner } = require('../middleware/homeOwnerAuth');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');

//require authentication
router.use(requireAuth);

router.get('/listings/:listing_id', getListing);

router.use( authenticateHomeowner );
router.get('/:homeowner_id/listings', homeownerViewListing);

module.exports = router;