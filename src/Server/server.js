const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Adjust path as needed
const cors = require('cors'); // Add CORS middleware

require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit process with failure
});

// Define login route
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = new User({
        username,
        password: hashedPassword,
        role: 'student' // Assuming default role is 'student'
      });

      await user.save();
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Importing the models for different application types
const ChairmanApplication = require('./models/ChairmanApplication');
const SemesterCoordinatorApplication = require('./models/SemesterCoordinatorApplication');
const TeacherApplication = require('./models/TeacherApplication');
const BatchAdvisorApplication = require('./models/BatchAdvisorApplication');
const OtherApplication = require('./models/OtherApplication');

// Route to handle different types of applications
app.post('/api/applications', async (req, res) => {
  const { fullName, registrationNumber, applicationType, sendTo, message } = req.body;

  try {
    let ApplicationModel;
    switch (applicationType) {
      case 'Chairman':
        ApplicationModel = ChairmanApplication;
        break;
      case 'Semester Coordinator':
        ApplicationModel = SemesterCoordinatorApplication;
        break;
      case 'Teacher':
        ApplicationModel = TeacherApplication;
        break;
      case 'Batch Advisor':
        ApplicationModel = BatchAdvisorApplication;
        break;
      case 'Other':
        ApplicationModel = OtherApplication;
        break;
      default:
        return res.status(400).send('Invalid application type');
    }

    await ApplicationModel.create({ fullName, registrationNumber, sendTo, message });

    res.status(201).send(`${applicationType} application submitted successfully`);
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).send('Server error');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
