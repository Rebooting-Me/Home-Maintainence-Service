/**
 * Provides user authentication.
 */
const { getUserData } = require('../models/helper');
const jwt = require('jsonwebtoken');

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }
    // authorization looks like: Bearer info.info.info
    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);
        const userInfo = await getUserData({ _id });
        req.user = {
            _id: userInfo._id,
            userType: userInfo.userType
        }
        //console.log(req.user);
        next();
    } catch (error) {
        res.status(401).json({ error: 'Request is not authorized' });
    }
}
module.exports = requireAuth;