const mongoose = require('mongoose');

const FacultyCredentialSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

const FacultyCredential = mongoose.model('FacultyCredential', FacultyCredentialSchema);

module.exports = FacultyCredential;
