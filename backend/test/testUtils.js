/**
 * Defines functions that are commonly used in our tests.
 */

/**
 * Returns the authorization header value used for signing up and logging in.
 * @param {*} token 
 * @returns the authorization header value used for signing up and logging in
 */
function getAuthorizationHeaderValue(token) {
    return `Bearer: ${token}`;
}

module.exports = { getAuthorizationHeaderValue }