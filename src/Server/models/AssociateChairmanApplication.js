const mongoose = require('mongoose');

const AssociateChairmanApplicationSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    sendTo: { type: String, required: true },
    message: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
    status:{
      type:String,
      enum:['pending','completed','rejected'],
      default:'pending'
    }
  });
  
  module.exports = mongoose.model('AssociateChairmanApplication', AssociateChairmanApplicationSchema);
  