/**
 * Constants that are used across multiple files
 */
const HOMEOWNER_USER_TYPE = 'Homeowner';
const CONTRACTOR_USER_TYPE = "Contractor";
const SIGNUP_ROUTE = '/api/user/signup';
const LOGIN_ROUTE = '/api/user/login';

// This value is only used locally to prevent a .env file from
// being needed to be committed to the repo.
// In production, use process.env.
const JWT_SECRET = 'secret_string'

module.exports = { HOMEOWNER_USER_TYPE, CONTRACTOR_USER_TYPE, SIGNUP_ROUTE, LOGIN_ROUTE, JWT_SECRET }
