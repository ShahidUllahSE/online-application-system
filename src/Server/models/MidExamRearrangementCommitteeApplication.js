const mongoose = require('mongoose');

const MidExamRearrangementCommitteeApplicationSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    applicationType: { type: String, required: true }, // Ensure this field exists

    sendTo: { type: String, required: true },
    message: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
    remark: { type: String }, // Add the remark field here
    semester: { type: String }, // Use mongoose.Schema.Types.Mixed for flexibility
    paperNumber:{type:String},
    fypChangeReason:{type : String},
    paperName:{type : String},
    forwardTo: {
      type: String,
      default: 'In Progress',
    },
    status:{
      type:String,
      enum:['pending','completed','rejected'],
      default:'pending'
    }
  });
  
  module.exports = mongoose.model('MidExamRearrangementCommitteeApplication', MidExamRearrangementCommitteeApplicationSchema);
  