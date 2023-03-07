/**
 * Functions for retrieving contractor information.
 */
const { getContractorData, updateContractorData } = require('../models/helper');
const Listing = require('../models/listingModel');

/**
 * Retrieves the dashboard information for the contractor whose ID is provided in
 * the request body. 
 * @param {*} req 
 * @param {*} res 
 */
const getContractorDashboard = async (req, res) => {
    try {
        const contractorId = req.user._id;
        const contractor = await getContractorData(contractorId);
        // Currently only returning the contractor's name to the frontend
        // An extension is to also return the contractor's profile image
        res.status(200).json({ name: contractor.name });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}


/**
 * Retrieves the profile information for the contractor whose ID is provided in
 * the request body. 
 * 
 * The profile information consists of the followng:
 * - Name
 * - Email
 * - Description
 * - Phone number
 * - City
 * - State
 * - Zip code
 * - Website URL
 * - Services offered
 * 
 * WARNING: We are assuming that because the profile that is retrieved is based an ID in the
 * user body, a contractor would not be able to view other contractors' profiles
 * unless they knew the other contractors' IDs.
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getContractorProfile = async (req, res) => {
    try {
        const contractorId = req.user._id;
        const contractor = await getContractorData(contractorId);

        res.status(200).json({
            name: contractor.name,
            email: contractor.email,
            profile_name: contractor.profile_name,
            description: contractor.description,
            phone_number: contractor.phone_number,
            city: contractor.city,
            state: contractor.state,
            zip_code: contractor.zip_code,
            website_url: contractor.website_url,
            services: contractor.services
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Updates the profile information for the contractor whose ID is provided in
 * the request body. 
 * The following fields can be currently edited:
 * - Description
 * - Phone number
 * - City
 * - State
 * - Zip code
 * - Website URL
 * - Services offered
 * @param {*} req 
 * @param {*} res 
 */
const updateContractorProfile = async (req, res) => {
    try {
        const contractorId = req.user._id;
        // Get the fields we want to update
        const { description, phone_number, city, state, zip_code, website_url, services, profile_name } = req.body;
        const updateQuery = {
            profile_name: profile_name,
            description: description,
            phone_number: phone_number,
            city: city,
            state: state,
            zip_code: zip_code,
            website_url: website_url,
            services: services
        }
        // Send back the contractor profile data, excluding password.
        const updatedContractor = await updateContractorData(contractorId, updateQuery);
        res.status(200).json(updatedContractor);
    }
    catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message });
    }
}

/**
 * Returns all of the listings in the Listing database that satisfy the filter criteria specified
 * in the request. The homeowner ID is excluded from each listing.
 * @param {*} req 
 * @param {*} res 
 * @returns all of the listings in the Listing database that satisfy the filter criteria specified
 * in the request.
 */
const viewMultipleListings = async (req, res) => {
    try {
        const { state, city, zip_code, services } = req.body;
        const filter = {};

        //filter feature for contractor to filter out 4 properties
        if (state) {
            filter.state = state;
        }
        if (city) {
            filter.city = city;
        }
        if (zip_code) {
            filter.zip_code = zip_code;
        }
        if (services) {
            filter.services = { $in: services };
        }

        // Find all filtered listings in the database
        const listings = await Listing.find(filter).select('-homeowner_id');

        // Return the array of listings as a JSON response (except HO id)
        return res.json(listings);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { getContractorDashboard, getContractorProfile, updateContractorProfile, viewMultipleListings };