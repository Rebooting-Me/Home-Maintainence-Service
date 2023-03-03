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
<<<<<<< HEAD
        required: true
=======
        required: false,
        default: ''
>>>>>>> 27a7edb65b4c18c0ad07b8857514b46a113c1441
    },
    zip_code: {
        type: String,
        required: true
    },
    // The categories of services under which this listing falls
    services: {
        type: [
            {
                type: String,
                enum: getServices()
            }
        ],
        required: false,
    },
    homeowner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Homeowner',
        required: true
    }

});

module.exports = mongoose.model('Listing', listingSchema);
