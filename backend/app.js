/**
 * Express App definition.
 */
const { urlencoded } = require('body-parser');
const bodyParser = require('body-parser');
const express = require('express');
const userRoutes = require('./routes/user');
const contractorRoutes = require('./routes/contractor');
const newListing = require('./routes/newListing.js');
const getListings = require('./routes/getListing');
const otherRoutes = require('./routes/otherRoutes');

// Middleware
const app = express();
app.use(
    urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/homeowner', newListing);
app.use("/api/contractor", contractorRoutes);
app.use('/api/otherRoutes', otherRoutes);
app.use('/api/homeowner', getListings);
app.use('/api/user', getListings); //fetches stand-alone listing irrespective of userType

module.exports = app;