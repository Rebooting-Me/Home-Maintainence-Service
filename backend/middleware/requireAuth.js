const { exists } = require('../models/helper');
const jwt = require('jsonwebtoken');

const requireAuth = async (req, res, next) => {
    const { authorization } =req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required'});
    }

    // authorization looks like: Bearer info.info.info
    const token = authorization.split(' ')[1];

    try {
        const {_id} = jwt.verify(token, process.env.SECRET);
        //req.user = fetch id and attach it to the req so it can be used in other pages
        //to check if user in logged in
        //next()
    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Request is not authorized'});
    }
}
module.exports = requireAuth;