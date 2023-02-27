const express = require('express');
const { getListing, homeownerViewListing } = require('../controllers/getListingController');
const { authorizeHomeowner } = require('../middleware/requireAuthorization');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');

//require authentication
router.use(requireAuth);

router.get('/listings/:listing_id', getListing);

// router.use( authenticateHomeowner ); //is used because below req is HO specific
router.get('/:homeowner_id/listings', authorizeHomeowner, homeownerViewListing);

module.exports = router;