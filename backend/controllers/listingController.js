/**
 * Functions for modifying homeowner project listings.
 */
const { createProjectListing, updateProjectListing, deleteProjectListing } = require('../models/helper');
const Listing = require('../models/listingModel');

/**
 * Creates a new listing. The request body must contain a "user._id" field corresponding to the id of
 * the homeowner for whom the project listing is being created. The request body must also contain
 * the fields with which to initialize the project listing.
 * @param {*} req 
 * @param {*} res 
 */
const createListing = async (req, res) => {
    try {
        const { title, description, city, state, zip_code, services } = req.body;
        const ownerId = req.user._id;
        const createdListing = await createProjectListing({ title, description, city, state, zip_code, services }, ownerId);
        res.status(201).json(createdListing);
    } catch (error) {
        // Uncomment this line to see the error message
        // console.error(error);
        res.status(400).json({ error: error.message });
    }
};

/**
 * Returns the details of a specific, stand-alone listing. The request parameters must contain the "listing_id" of 
 * the listing.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getListing = async (req, res) => {
    try {
        // Find the listing by ID
        const listing = await Listing.findById(req.params.listing_id).select('-homeowner_id');
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        // Return the listing details excluding `homeowner_id` as a JSON object
        return res.json(listing);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server error' });
    }
}

/**
 * Updates an existing project listing. The request parameters must contain a "listing_id".
 * All of the update fields must be provided, even if they haven't changed.
 * @param {*} req 
 * @param {*} res 
 */
const updateListing = async (req, res) => {
    try {
        // Extract data to update from the request body
        const { title, description, city, state, zip_code, services } = req.body;
        // Get the listing id from the request parameters
        const listingId = req.params.listing_id;
        // Prepare an update object
        const updateQuery = {
            title: title, description: description,
            city: city, state: state, zip_code: zip_code, services: services
        };
        // Update the object in the database
        const updatedListing = await updateProjectListing(listingId, updateQuery);
        // Return the updated listing in the response
        res.status(201).json(updatedListing);
    } catch (error) {
        // Uncomment this line to see the error message
        // console.error(error);
        res.status(400).json({ error: error.message });
    }
};

/**
 * Deletes an existing project listing. The request parameters must contain a "listing_id".
 * The request body must contain a "homeowner_id".
 * @param {*} req 
 * @param {*} res 
 */
const deleteListing = async (req, res) => {
    try {
        // Extract homeowner ID from the request body
        const homeowner_id = req.user._id;
        // Get the listing id from the request parameters
        const listingId = req.params.listing_id;
        // Delete the listing and all references to it in the database
        const deletedListing = await deleteProjectListing(listingId, homeowner_id);
        // Return the deleted listing in the response
        res.status(200).json(deletedListing);
    } catch (error) {
        // Uncomment this line to see the error message
        // console.error(error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createListing, getListing, updateListing, deleteListing };