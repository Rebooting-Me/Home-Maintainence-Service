const HOMEOWNER_USER_TYPE = "Homeowner";

// This function authenticates only homeowners
async function authenticateHomeowner(req, res, next) {
    const userType = req.user.userType;
    if (userType === HOMEOWNER_USER_TYPE) {
        next();
    } else {
        res.status(401).json({ error: 'Request is not authorized' });
    }
  }

module.exports = { authenticateHomeowner };