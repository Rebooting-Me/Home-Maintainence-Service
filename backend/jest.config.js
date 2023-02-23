/**
 * Jest configuration for backend.
 */
const jestConfig = {
    displayName: "backend_jest_tests",
    testEnvironment: 'node',
    setupFilesAfterEnv: ["./setupTests.js"]
};

module.exports = jestConfig;