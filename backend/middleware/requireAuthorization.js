/**
 * Provides user authorization; that is, verifying that the right type of user, regardless of their authentication status,
 * can access a given route.
 */
const { HOMEOWNER_USER_TYPE, CONTRACTOR_USER_TYPE } = require('../constants')

const authorizeHomeowner = async (req, res, next) => {
    const userType = req.user.userType;
    if (userType === HOMEOWNER_USER_TYPE) {
        next();
    } else {
        res.status(401).json({ error: 'Request is not authorized' });
    }
}


const authorizeContractor = async (req, res, next) => {
    const userType = req.user.userType;
    if (userType === CONTRACTOR_USER_TYPE) {
        next();
    } else {
        res.status(401).json({ error: 'Request is not authorized' });
    }
}

module.exports = { authorizeHomeowner, authorizeContractor };