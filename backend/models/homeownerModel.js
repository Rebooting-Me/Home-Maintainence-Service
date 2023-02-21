/**
 * Defines the schema for a homeowner.
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const binData = mongoose.Types.binData;

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
  // Can't exceed 16 MB!
  profile_image: {
    type: binData,
    required: false
  }
});

module.exports = mongoose.model('Homeowner', homeownerSchema);