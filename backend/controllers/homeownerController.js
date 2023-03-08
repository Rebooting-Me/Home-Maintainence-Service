const Listing = require('../models/listingModel');
const Contractor = require('../models/contractorModel');
const Homeowner = require('../models/homeownerModel');

/**
 * Returns all of the project listings for a specific homeowner. The request body must contain
 * a "req.user._id" corresponding to the homeowner's id.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const homeownerViewListing = async (req, res) => {
  // 
  try {
    const { state, city, zip_code, services } = req.body;
    const filter = {};

    // Find the homeowner by ID
    const homeownerId = req.user._id;
    const homeowner = await Homeowner.findById(homeownerId);
    if (!homeowner) {
      return res.status(404).json({ message: 'Homeowner not found' });
    }

    //filter feature for HO to filter out 4 properties
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
    filter.homeowner_id = homeownerId;

    // Find all filtered listings in the database
    const listings = await Listing.find(filter).select("-homeowner_id");

    // Return the array of listings as a JSON response (except HO id)
    return res.json(listings);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
}

/**
 * Returns all of the contractor profiles in the Contractor database.
 * @param {*} req 
 * @param {*} res 
 */
const getContractorProfiles = async (req, res) => {
  try {
    const contractors = await Contractor.find().lean();
    return res.status(200).json(contractors);
  } catch (err) {
    // Uncomment this line to see the error message. DO NOT leave uncommented in production!
    // console.error(err.message);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { homeownerViewListing, getContractorProfiles };