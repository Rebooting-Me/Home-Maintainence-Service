/**
 * Defines the schema for a contractor.
 */
const mongoose = require('mongoose');
const services = require('./services');

const Schema = mongoose.Schema;
const binData = mongoose.Types.binData;

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
  // Can't exceed 16 MB!
  profile_image: {
    type: binData,
    required: false
  },
  // The services that this contractor provides
  services: {
    type: [String],
    required: false,
    validate: {
      validator: services.validateServices,
      message: () => "Invalid service type specified!"
    }
  }
});

module.exports = mongoose.model('Contractor', contractorSchema);