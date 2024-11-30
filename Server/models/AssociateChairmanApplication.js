const mongoose = require('mongoose');

const AssociateChairmanApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  applicationType: { type: String, required: true }, // Ensure this field exists

  sendTo: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  semester: { type: String }, // Use mongoose.Schema.Types.Mixed for flexibility
  remark: { type: String }, // Add the remark field here
  forwardTo: {
    type: String,
    default: 'In Progress',
  },
  paperNumber:{type:String},
  paperName:{type : String},
  fypChangeReason:{type : String},

  remarkHistory: [{ type: Object }], // Array of objects for remark history


  status: {
    type: String,
    enum: ['pending', 'completed', 'rejected'],
    default: 'pending'
  }
});

module.exports = mongoose.model('AssociateChairmanApplication', AssociateChairmanApplicationSchema);
