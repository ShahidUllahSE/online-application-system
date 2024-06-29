const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const CredentialSchema = new mongoose.Schema({
  No: {
    type: Number,
    required: true,
    unique: true
  },
  Username: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  }
});

// Pre-save middleware to hash the password before saving
CredentialSchema.pre('save', async function (next) {
  if (!this.isModified('Password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare password for login
CredentialSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.Password);
};

const Credential = mongoose.model('Credential', CredentialSchema);

module.exports = Credential;
