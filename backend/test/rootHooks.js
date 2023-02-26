/**
 * Defines root hooks for Mocha that are registered using --requires.
 */
const mongoose = require('mongoose');

// Server connection
let server;

exports.mochaHooks = {
    beforeAll: async function () {
        // Load .env file contents into process.env
        require('dotenv').config();
        // Get the MongoDB URI from either the .env file or a default local value
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
        server = await mongoose.connect(MONGODB_URI);
        console.log(`Server running at ${MONGODB_URI}`);
    },

    beforeEach: async function () {
        // Delete all documents in each collection.
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
            await collection.deleteMany({});
        }
    },
    afterEach: async function () {
        // Delete all documents in each collection.
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
            await collection.deleteMany({});
        }
    },
    afterAll: async function () {
        await server.connection.close()
        console.log('Server stopped!');
    }
};