/**
 * Tests for signing in.
 */
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

// Connecting to the database before each test.
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    // Delete all existing collections before each test so that
    // tests don't persist stored data.
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
        await collection.deleteMany({});
    }
});

// Closing database connection after each test. 
afterEach(async () => {
    await mongoose.connection.close();
});

describe('POST /api/user/signup (homeowner)', () => {
    it('should create an account for the homeowner.', async () => {
        const res = await request(app).post('/api/user/signup').send({
            name: "Test Homeowner Name",
            email: "testhomeowner@email.com",
            password: "UCSD_23_Tritons_CSE",
            userType: "Homeowner"
        });
        expect(res.statusCode).toBe(200);
    });
});