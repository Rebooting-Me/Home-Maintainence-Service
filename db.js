const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

//for parsing data in JSON
var bodyParser = require('body-parser');
app.use(bodyParser.json());
//listening to port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

//connecting to our mongodb database
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

//instantiated a schema
const Schema = mongoose.Schema;

//Created a homeowner schema
const homeownerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

//Created a homeowner model
const Homeowner = mongoose.model('Homeowner', homeownerSchema);
module.exports = Homeowner;

//Created a contractor schema
const contractorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

//Created a contractor model
const Contractor = mongoose.model('Contractor', contractorSchema);
module.exports = Contractor;