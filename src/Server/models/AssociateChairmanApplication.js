const mongoose = require('mongoose');

const AssociateChairmanApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  applicationType: { type: String, required: true }, // Ensure this field exists

  sendTo: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  additionalFields: { type: mongoose.Schema.Types.Mixed }, // Use mongoose.Schema.Types.Mixed for flexibility
  remark: { type: String }, // Add the remark field here
  

  status: {
    type: String,
    enum: ['pending', 'completed', 'rejected'],
    default: 'pending'
  }
});

module.exports = mongoose.model('AssociateChairmanApplication', AssociateChairmanApplicationSchema);
