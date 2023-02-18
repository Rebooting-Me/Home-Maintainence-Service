const mongoose = require('mongoose');
const { signup } = require('./helper');

const Schema = mongoose.Schema;

const homeownerSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
});

module.exports = mongoose.model('Homeowner', homeownerSchema);