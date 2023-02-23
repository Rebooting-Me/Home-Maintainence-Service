/**
 * Code that should be run before running the Jest test suite.
 */

// These 3 lines of code avoid the following error described here:
// https://github.com/inrupt/solid-client-authn-js/issues/1676
require('@testing-library/jest-dom');
const { TextEncoder } = require('util');

global.TextEncoder = TextEncoder;