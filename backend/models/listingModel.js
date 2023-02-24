/**
 * Defines the schema for a homeowner listing.
 */
const { getServices } = require('./services.js');
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
        required: true
    },
    // The services applicable to this listing
    serviceId: {
        name: { type: [String], required: false },
        type: { type: [String], enum: getServices(), required: false },
      },
    // ObjectId of the homeowner who created this listing
    homeowner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Homeowner',
        required: true
    }

});

module.exports = mongoose.model('Listing', listingSchema);


// Token= eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Y2ZGIzODdmZDBiYzg4MDgwNWRlYjMiLCJpYXQiOjE2NzcxMjY4NjgsImV4cCI6MTY3NzM4NjA2OH0.e3Zp8aFnc0DLFManAYkVNnkvLbcVRuCOMYkb6Yi5j6A