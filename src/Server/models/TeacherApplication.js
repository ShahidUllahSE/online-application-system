const mongoose = require('mongoose');

const TeacherApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  applicationType: { type: String, required: true },

  sendTo: { type: String }, // Adjust based on your application logic
  message: { type: String, required: true },
  remark: { type: String }, // Ensure this field is used correctly
  
    submittedAt: { type: Date, default: Date.now },
  semester: { type: String }, // Use mongoose.Schema.Types.Mixed for flexibility
  paperNumber:{type:String},
  fypChangeReason:{type : String},
  paperName:{type : String},
  forwardTo: {
    type: String,
    default: 'In Progress',
  },

  status: {
    type: String,
    enum: ['pending', 'completed', 'rejected'],
    default: 'pending'
  }
});

module.exports = mongoose.model('TeacherApplication', TeacherApplicationSchema);
