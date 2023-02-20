//Follow this template for all route files

//page for other routes
const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { dummyMethod } = require('../controllers/dummyController');

const router = express.Router();

//require authentication
router.use(requireAuth);

router.get('/dummy', dummyMethod);

module.exports = router;