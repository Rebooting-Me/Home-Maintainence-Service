/**
 * Jest configuration for backend.
 */
const jestConfig = {
    displayName: "backend_jest_tests",
    setupFilesAfterEnv: ["./setupTests.js"]
};

module.exports = jestConfig;