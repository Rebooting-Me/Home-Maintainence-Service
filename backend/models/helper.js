const bcrypt = require('bcrypt');
const Homeowner = require('../models/homeownerModel');
const Contractor = require('../models/contractorModel');
const { getServices } = require('../models/services');
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

    const existsInHomeowner = await exists({ email }, Homeowner);
    const existsInContractor = await exists({ email }, Contractor);

    if (existsInHomeowner || existsInContractor) {
        throw Error("Email is already in use");
    }

    return (userType === "Homeowner")
        ? storeUser(email, password, name, Homeowner)
        : storeUser(email, password, name, Contractor);

}

async function exists(queryObj, model) {
    const data = await model.findOne(queryObj).lean();
    return data;
}

async function storeUser(email, password, name, model) {
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    //store in DB
    const user = await model.create({ email, password: hash, name });

    return user;
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

// Function to create new listing
async function createProjectListing(listing, ownerId) {
    const { title, description, city, state, zip_code, serviceId } = listing;
    if (!title || !description || !city || !state || !zip_code || !serviceId) {
        throw Error("All fields must be filled");
    }
    //service enum validation
    if (Array.isArray(serviceId)) {
        for (const service of serviceId) {
            if (!getServices().includes(service)) {
                throw Error(`Invalid service type: ${service}`);
            }
        }
    } else {
        if (!getServices().includes(serviceId)) {
            throw Error(`Invalid service type: ${serviceId}`);
        }
    }

    const createdListing = new Listing({ title, description, city, state, zip_code, serviceId, homeowner_id: ownerId });
    await createdListing.save();

    const owner = await Homeowner.findById(ownerId);
    owner.listings.push(createdListing._id);
    await owner.save();
    
    return {
        title: createdListing.title,
        description: createdListing.description,
        city: createdListing.city,
        state: createdListing.state,
        zip_code: createdListing.zip_code,
        serviceId: (Array.isArray(serviceId) ? serviceId : [serviceId]), //serviceId being populated with [String] in response
        homeowner_id: createdListing.homeowner_id,
    };
}


module.exports = { login, signup, exists, storeUser, getUserData, createProjectListing }