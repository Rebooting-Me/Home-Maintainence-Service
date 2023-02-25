/**
 * Server and database connection via Mongoose.
 */
const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

// Database
const databaseUri = process.env.MONGODB_URI;
mongoose.connect(databaseUri, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB is connected");
    // Use 6000 as the default port
    const port = process.env.PORT || 6000;
    app.listen(port, () => console.log(`Server is listening on port ${port} !`))
  })
  .catch(error => console.log(error));