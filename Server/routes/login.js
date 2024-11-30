const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if there is at least one user in the database
    const existingUser = await User.findOne();
    if (!existingUser) {
      // Insert a default user with random data
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password', salt); // Replace 'password' with your desired default password

      const newUser = new User({
        username: 'admin',
        password: hashedPassword,
        role: 'admin'
      });

      await newUser.save();
    }

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
