const mongoose = require('mongoose');

const ChairmanApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  applicationType: { type: String, required: true },
  sendTo: { type: String, required: true },
  message: { type: String, required: true },
  remark: { type: String },
  semester: { type: String },
  paperNumber: { type: String },
  fypChangeReason: { type: String },
  paperName: { type: String },
  forwardTo: { type: String, default: 'In Progress' },
  history: [
    {
      role: String,
      remark: String,
      forwardTo: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  remarkHistory: [{ type: Object }], // Array of objects for remark history
  submittedAt: { type: Date, default: Date.now },
  studentRemark: { type: String },
  status: {
    type: String,
    enum: ['pending', 'completed', 'rejected', 'forwarded'],
    default: 'pending',
  },
});

module.exports = mongoose.model('ChairmanApplication', ChairmanApplicationSchema);
