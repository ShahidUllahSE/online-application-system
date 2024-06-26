const mongoose = require('mongoose');

const SemesterCoordinatorApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  sendTo: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SemesterCoordinatorApplication', SemesterCoordinatorApplicationSchema);
