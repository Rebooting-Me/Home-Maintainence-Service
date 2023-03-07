const express = require('express');
const { sendServices } = require('../controllers/servicesController')
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');

//require authentication
router.use(requireAuth);

router.get('/getServices', sendServices);

module.exports = router;