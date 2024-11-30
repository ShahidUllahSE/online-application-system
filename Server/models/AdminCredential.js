const mongoose = require('mongoose');

const AdminCredentialSchema = new mongoose.Schema({
  No: {
    type: Number,
    required: true
  },
  Username: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('AdminCredential', AdminCredentialSchema);
