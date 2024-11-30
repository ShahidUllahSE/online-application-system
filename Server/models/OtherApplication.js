const mongoose = require('mongoose');

const OtherApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  applicationType: { type: String, required: true }, // Ensure this field exists

  sendTo: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  remark: { type: String }, // Add the remark field here

  studentRemark: { type: String }, // Add this line
  remarkHistory: [{ type: Object }], // Array of objects for remark history



  status:{
    type:String,
    enum:['pending','completed','rejected','forwarded'],
    default:'pending'
  }
});

module.exports = mongoose.model('OtherApplication', OtherApplicationSchema);
