const { getServices } = require('../models/services');

const sendServices = (req, res) => {
  try {
    res.status(201).json({ 
      services: getServices() 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { sendServices };