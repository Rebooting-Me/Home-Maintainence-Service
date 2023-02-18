const bcrypt = require('bcrypt');
const Homeowner = require('../models/homeownerModel');
const Contractor = require('../models/contractorModel');
const validator = require('validator');

/*
async function login(user) {
    const { email, password } = user;
    if (!email || !password) {
        throw Error('All fields must be filled');
    }

    //Check if user exists - logic to che
    //Compare pwds using bcrypt
}
*/

async function signup(user) {
    const { email, password, name, userType } = user;
    //validate
    if (!name || !email || !password) {
        throw Error('All fields must be filled');
    }

    if (!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    const existsInHomeowner = await exists({ email }, Homeowner);
    const existsInContractor = await exists({ email }, Contractor);

    if (existsInHomeowner || existsInContractor){
        throw Error("Email is already in use");
    }
    
    return (userType === "Homeowner")
        ? storeUser(email, password, name, Homeowner)
        : storeUser(email, password, name, Contractor);

}

async function exists(data, model) {
    return (await model.findOne(data)) ? true : false;   
}

async function storeUser(email, password, name, model) {
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    //store in DB
    const user = await model.create({ email, password: hash, name });

    return user;
}
module.exports = { signup }