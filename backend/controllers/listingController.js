/**
 * Functions for updating homeowner project listing information.
 */
const { updateProjectListing, deleteProjectListing } = require('../models/helper');

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
        const { homeowner_id } = req.body;
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

module.exports = { updateListing, deleteListing };