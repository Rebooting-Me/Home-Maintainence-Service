/**
 * Defines the schema for a homeowner listing.
 */
const services = require('./services.js');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: false
    },
    zip_code: {
        type: String,
        required: false
    },
    // The services applicable to this listing
    service: {
        type: [String],
        enum: services.getServices(),
        required: true
    },
    // ObjectId of the homeowner who created this listing
    homeowner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Homeowner',
        required: true
    }

});

module.exports = mongoose.model('Listing', listingSchema);
