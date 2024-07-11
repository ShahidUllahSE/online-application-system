const mongoose = require('mongoose');

const AllFacultyMembersApplicationSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    applicationType: { type: String, required: true }, // Ensure this field exists
    fypChangeReason:{type : String},
    paperName:{type : String},
    forwardTo: {
      type: String,
      default: 'In Progress',
    },
    sendTo: { type: String, required: true },
    message: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('AllFacultyMembersApplication', AllFacultyMembersApplicationSchema);
  