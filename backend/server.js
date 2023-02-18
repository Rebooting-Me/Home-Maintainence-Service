require('dotenv').config();
const { urlencoded } = require('body-parser');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

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

//Database
const db = process.env.MONGO_URI;
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB is connected");
    const port = process.env.PORT;
    app.listen(port, () => console.log(`Server is listening on port ${port} !`))
  })
  .catch(error => console.log(error));