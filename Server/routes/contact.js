// routes/contact.js

const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// @route   POST /api/contact
// @desc    Create a contact form submission
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    res.json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
