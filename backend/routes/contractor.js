/**
 * Routes for contractors.
 */
const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { authorizeContractor } = require('../middleware/requireAuthorization');
const { getContractorDashboard, getContractorProfile, updateContractorProfile, viewMultipleListings } = require('../controllers/contractorController');

const router = express.Router();

// require authentication on all routes declared below this line
router.use(requireAuth);

// The contractor profile does not require authorization to view.
// That is, either a homeowner or contractor can view the profile.
// We might want to restrict a contractor from viewing other contractor's
// profiles, but for now, we allow viewing for simplicity.
router.get('/profile/', getContractorProfile);

// require authorization on all routes declared below this line.
router.use(authorizeContractor);

// routes

// Allows CO to view all listings in database (Filter feature included)
router.post("/listings", viewMultipleListings );
// Allows updating the contractor's information 
router.patch('/profile/:contractor_id', updateContractorProfile);
// Get dashboard info
router.get('/dashboard/:contractor_id', getContractorDashboard);

module.exports = router;