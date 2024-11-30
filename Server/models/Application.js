const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  fullName: String,
  registrationNumber: String,
  applicationType: String,
  sendTo: String,
  message: String,
  remark:String,
  username: String, // Add this field
  additionalField: string, // Flexible field to store additional data
  paperNumber:{type:String},
  paperName:{type : String},
  forwardTo: {
    type: String,
    default: 'In Progress',
  },
  studentRemark: { type: String }, // Add this line

  history: [
    {
      role: String,
      remark: String,
      forwardTo: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],



  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Application', applicationSchema);
