/**
 * Defines the schema for a contractor.
 */
const { getServices } = require('../models/services')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  },
  description: {
    type: String,
    required: false,
    default: ''
  },
  phone_number: {
    type: String,
    required: false,
    default: ''
  },
  city: {
    type: String,
    required: false,
    default: ''
  },
  state: {
    type: String,
    required: false,
    default: ''
  },
  zip_code: {
    type: String,
    required: false,
    default: ''
  },
  profile_name: {
    type: String,
    required: false,
    default: ''
  },
  website_url: {
    type: String,
    required: false,
    default: ''
  },
  // The services that this contractor provides
  services: {
    type: [
      {
        type: String,
        enum: getServices()
      }
    ],
    required: false,
  },
  // Can't exceed 16 MB!
  profile_image: {
    type: mongoose.Schema.Types.Buffer,
    required: false
  },
});

module.exports = mongoose.model('Contractor', contractorSchema);