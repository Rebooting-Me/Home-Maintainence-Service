require('dotenv').config();
const { login, signup } = require('../models/helper');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET || JWT_SECRET, { expiresIn: '3d' });
}

//login user
const loginUser = async (req, res) => {
    const user = req.body;
    try {
        const { _id, userType, name } = await login(user);
        // create and send a token to the browser
        const token = createToken(_id);
        res.status(200).json({ name, userType, token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// signup user
const signupUser = async (req, res) => {
    const user = req.body;
    try {
        const { _id, userType, name } = await signup(user);

        // create and send a token to the browser
        const token = createToken(_id);
        res.status(200).json({ name, userType, token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { loginUser, signupUser };