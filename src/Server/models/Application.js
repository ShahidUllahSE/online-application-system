const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  applicationType: {
    type: String,
    required: true,
  },
  sendTo: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending',
  },
});

module.exports = mongoose.model('Application', ApplicationSchema);
