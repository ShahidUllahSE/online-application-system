const mongoose = require('mongoose');

const FYPSupervisorApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  applicationType: { type: String, required: true }, // Ensure this field exists

  sendTo: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  remark: { type: String }, // Add the remark field here
  additionalFields: { type: mongoose.Schema.Types.Mixed }, // Use mongoose.Schema.Types.Mixed for flexibility

  status:{
    type:String,
    enum:['pending','completed','rejected'],
    default:'pending'
  }
});

module.exports = mongoose.model('FYPSupervisorApplication', FYPSupervisorApplicationSchema);
