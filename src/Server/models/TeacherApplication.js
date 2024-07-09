const mongoose = require('mongoose');

const TeacherApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  applicationType: { type: String, required: true },

  sendTo: { type: String }, // Adjust based on your application logic
  message: { type: String, required: true },
  remark: { type: String }, // Ensure this field is used correctly

  submittedAt: { type: Date, default: Date.now },
  additionalFields: { type: mongoose.Schema.Types.Mixed }, // Adjust as needed for flexible data types

  status: {
    type: String,
    enum: ['pending', 'completed', 'rejected'],
    default: 'pending'
  }
});

module.exports = mongoose.model('TeacherApplication', TeacherApplicationSchema);
