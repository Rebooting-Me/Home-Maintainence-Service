const { createProjectListing } = require('../models/helper');

const createListing = async (req, res) => {
  try {
    const { title, description, city, state, zip_code, services } = req.body;
    const ownerId = req.user._id;
    const createdListing = await createProjectListing({ title, description, city, state, zip_code, services }, ownerId);
    res.status(201).json(createdListing);
  } catch (error) {
    // Uncomment this line to see the error message
    // console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createListing };