const bcrypt = require('bcrypt');
const Homeowner = require('../models/homeownerModel');
const Contractor = require('../models/contractorModel');
const Listing = require('../models/listingModel');
const validator = require('validator');

async function login(user) {
    const { email, password } = user;
    if (!email || !password) {
        throw Error('All fields must be filled');
    }

    const userInfo = await getUserData({ email });

    if (!userInfo) {
        throw Error('Account does not exist. Please signup first.');
    }

    return userInfo;
}

async function signup(user) {
    const { email, password, name, userType } = user;
    //validate
    if (!name || !email || !password) {
        throw Error('All fields must be filled');
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    const userInfo = await getUserData({ email });
    if (userInfo) {
        throw Error("Email is already in use");
    }

    return (userType === "Homeowner")
        ? storeUser(email, password, name, userType, Homeowner)
        : storeUser(email, password, name, userType, Contractor);

}

async function exists(queryObj, model) {
    const data = await model.findOne(queryObj).lean();
    return data;
}

async function storeUser(email, password, name, userType, model) {
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    //store in DB
    const userInfo = await model.create({ email, password: hash, name })
        .then(result => {
            return result;
        })
    if (userInfo) {
        userInfo.userType = userType;
    }
    return userInfo;
}

async function getUserData(queryObj) {
    const existsInHomeowner = await exists(queryObj, Homeowner);
    const existsInContractor = await exists(queryObj, Contractor);

    const userType = existsInHomeowner ? "Homeowner" : "Contractor";
    const userInfo = existsInHomeowner || existsInContractor;
    if (userInfo) {
        userInfo.userType = userType;
    }
    return userInfo;
}

/**
 * Returns the contractor JSON with the given id. Excludes the password.
 * @param {*} contractorId 
 * @returns the contractor JSON with the given id
 */
async function getContractorData(contractorId) {
    const contractor = await Contractor.findById(contractorId).lean().select('-password');
    return contractor;
}

/**
 * Updates and returns the contractor with the given id
 * @param {*} contractor_id 
 * @param {*} updateQuery a JSON object indicating which fields to update
 * @returns the updated contractor JSON
 */
async function updateContractorData(contractor_id, updateQuery) {
    // Choose to return the document after to facilitate testing
    const options = {
        new: true,
        lean: true,
    }
    const contractor = await Contractor.findByIdAndUpdate(contractor_id,
        updateQuery, options).select('-password');

    return contractor;
}

// Function to create new listing
async function createProjectListing(listing, ownerId) {
    const { title, description, city, state, zip_code, services } = listing;
    if (!title || !description || !city || !state || !zip_code || !services) {
        throw Error("All fields must be filled");
    }

    // Insert the listing into the Listing database
    const createdListing = await Listing.create({ title, description, city, state, zip_code, services, homeowner_id: ownerId })

    // Update the homeowner's listings
    await Homeowner.findByIdAndUpdate(ownerId,
        { $push: { listings: createdListing._id } }
    );

    return {
        listing_id: createdListing._id,
        title: createdListing.title,
        description: createdListing.description,
        city: createdListing.city,
        state: createdListing.state,
        zip_code: createdListing.zip_code,
        services: (Array.isArray(services) ? services : [services]), //serviceId being populated with [String] in response
    };
}

/**
 * Updates and returns the listing with the given listingId
 * @param {*} listingId the id of the listing to update 
 * @param {*} updateQuery a JSON object indicating which fields to update
 * @returns the updated listing JSON
 */
async function updateProjectListing(listingId, updateQuery) {
    const options = {
        new: true,
        lean: true,
    }
    const listing = await Listing.findByIdAndUpdate(listingId,
        updateQuery, options);
    return listing;
}

/**
 * Deletes the listing with the given listingId from the Listing database, and also
 * deletes the listing id reference from the Homeowner who owns the listing.
 * @param {*} listingId the id of the listing to update 
 * @param {*} homeownerId the id of the homeowner who owns the listing
 * @returns the deleted listing JSON
 */
async function deleteProjectListing(listingId, homeownerId) {
    // Delete the listing
    const listing = await Listing.findByIdAndDelete(listingId).lean();

    // Remove the reference the homeowner has to the listing
    const homeowner = await Homeowner.findById(homeownerId);
    const listingsWithDeletion = homeowner.listings.filter(listId => listId !== listingId);
    // Update the homeowner object
    await Homeowner.findByIdAndUpdate(homeownerId, { listings: listingsWithDeletion });

    // Return the deleted listing
    return listing;
}

module.exports = {
    login, signup, exists, storeUser, getUserData, getContractorData, updateContractorData,
    createProjectListing, updateProjectListing, deleteProjectListing
}
