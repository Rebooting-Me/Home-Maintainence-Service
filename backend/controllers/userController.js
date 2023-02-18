
require('dotenv').config();
const { signup } = require('../models/helper');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

//login user
const loginUser = async (req, res) => {
    const user = req.body;
    //res.json({message : 'Login user'});

    //use login from helper
    //create and send token
}

// signup user
const signupUser = async (req, res) => { 
    const user = req.body;
    try {
        userInfo = await signup(user);

        // create and send a token to the browser
        const token = createToken(userInfo._id);
        res.status(200).json(token);
    }
    catch(error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { loginUser, signupUser };