/**
 * Express App definition.
 */
const { urlencoded } = require('body-parser');
const bodyParser = require('body-parser');
const express = require('express');
const userRoutes = require('./routes/user');
const contractorRoutes = require('./routes/contractorRoutes');
const homeownerRoutes = require('./routes/homeownerRoutes');
const listingRoutes = require('./routes/listingRoutes');
const sendServices = require('./routes/getServices');
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
app.use('/api/user', listingRoutes); // fetches stand-alone listing irrespective of userType

app.use('/api/contractor', contractorRoutes);
app.use('/api/contractor', listingRoutes); // needed to fetch stand-alone listing 

app.use('/api/homeowner', homeownerRoutes);
app.use('/api/homeowner', listingRoutes);

app.use('/api/services', sendServices);

app.use('/api/otherRoutes', otherRoutes);


module.exports = app;