const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  fullName: String,
  registrationNumber: String,
  applicationType: String,
  sendTo: String,
  message: String,
  username: String, // Add this field
  additionalFields: { type: Schema.Types.Mixed }, // Flexible field to store additional data

  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Application', applicationSchema);
