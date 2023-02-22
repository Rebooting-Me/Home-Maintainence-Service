/**
 * Defines the schema for a homeowner.
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
  },

  /* The projects field is defined as an array of ObjectId references to the Listing model.
  This allows you to easily query the database for a Homeowner's projects using the
  populate() method in Mongoose.*/
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],

  // Can't exceed 16 MB!
  profile_image: {
    type: mongoose.Schema.Types.Buffer,
    required: false
  }
});

module.exports = mongoose.model('Homeowner', homeownerSchema);