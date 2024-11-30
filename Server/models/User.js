// src/server/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'admin'], // Add more roles as needed
    default: 'student' // Default role
  }
});

module.exports = mongoose.model('User', UserSchema);
