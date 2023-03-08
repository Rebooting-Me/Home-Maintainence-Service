/**
 * Constants that are used across multiple files
 */
const HOMEOWNER_USER_TYPE = 'Homeowner';
const CONTRACTOR_USER_TYPE = "Contractor";
const SIGNUP_ROUTE = '/api/user/signup';
const LOGIN_ROUTE = '/api/user/login';

const NEW_PROJECT_LISTING_ROUTE = '/api/homeowner/newListing';
const HOMEOWNER_SPECIFIC_LISTINGS_ROUTE = '/api/homeowner/listings';
const ALL_CONTRACTOR_PROFILES_ROUTE = '/api/homeowner/contractors';

const CONTRACTOR_DASHBOARD_ROUTE = '/api/contractor/dashboard';
const CONTRACTOR_PROFILE_ROUTE = '/api/contractor/profile';
const CONTRACTOR_HOMEOWNER_LISTINGS_ROUTE = '/api/contractor/listings';


// This value is only used locally to prevent a .env file from
// being needed to be committed to the repo.
// In production, use process.env.
const JWT_SECRET = 'secret_string'

module.exports = {
    HOMEOWNER_USER_TYPE, CONTRACTOR_USER_TYPE,
    SIGNUP_ROUTE, LOGIN_ROUTE,
    NEW_PROJECT_LISTING_ROUTE,
    HOMEOWNER_SPECIFIC_LISTINGS_ROUTE,
    CONTRACTOR_PROFILE_ROUTE,
    CONTRACTOR_DASHBOARD_ROUTE,
    ALL_CONTRACTOR_PROFILES_ROUTE,
    CONTRACTOR_HOMEOWNER_LISTINGS_ROUTE,
    JWT_SECRET
}
