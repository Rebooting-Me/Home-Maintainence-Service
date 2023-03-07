const Listing = require('../models/listingModel');
const Contractor = require('../models/contractorModel');

// function to view stand-alone listing [common to HO and CO]
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

//allows only HO to view their created listings
const homeownerViewListing = async (req, res) => {
  // 
  try {
    const { state, city, zip_code, services } = req.body;
    const filter = {};

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

module.exports = { getListing, homeownerViewListing, getContractorProfiles };