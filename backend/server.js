require('dotenv').config();
const { urlencoded } = require('body-parser');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const otherRoutes = require('./routes/otherRoutes');
const newListing = require('./routes/newListing.js');
const getListings  = require('./routes/getListing');

//Middleware
const app = express();
app.use(
  urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//Routes
app.use('/api/user', userRoutes);
app.use('/api/otherRoutes', otherRoutes);
app.use('/api/homeowner', newListing);
app.use('/api/homeowner', getListings);
app.use('/api/user', getListings); //fetches stand-alone listing irrespective of userType

//Database
const db = process.env.MONGO_URI;
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB is connected");
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server is listening on port ${port} !`))
  })
  .catch(error => console.log(error));