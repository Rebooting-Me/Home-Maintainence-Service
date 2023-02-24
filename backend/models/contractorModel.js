/**
 * Defines the schema for a contractor.
 */
const mongoose = require('mongoose');
const services = require('./services');

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
  // Can't exceed 16 MB!
  profile_image: {
    type: mongoose.Schema.Types.Buffer,
    required: false
  },
  // The services that this contractor provides
  // TODO: figure out how services will be checked on backend
  services: {
    type: [String],
    required: false,
    validate: {
      validator: services.validateServices,
      message: () => 'Invalid service type specified!'
    }
  }
});

module.exports = mongoose.model('Contractor', contractorSchema);