// Import necessary modules and models
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User');
const Application = require('./models/Application');
const Credential = require('./models/Credential');
const AdminCredential = require('./models/AdminCredential');
const Role = require('./models/Role'); // Import the Role model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
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
  process.exit(1);
});

// Define login route
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await Credential.findOne({ Username: username });

    if (user) {
      if (user.Password !== password) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id, role: 'student' }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      return res.json({ token, user, role: 'student' });
    }

    let admin = await AdminCredential.findOne({ Username: username });

    if (admin) {
      if (admin.Password !== password) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: admin.id, role: 'admin' }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      return res.json({ token, user: admin, role: 'admin' });
    }

    return res.status(400).json({ msg: 'Invalid credentials' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to handle different types of applications
app.post('/api/applications', async (req, res) => {
  const { fullName, registrationNumber, applicationType, sendTo, message } = req.body;
  console.log('Request body:', req.body);

  try {
    let ApplicationModel;
    switch (sendTo) {
      case 'Chairman':
        ApplicationModel = mongoose.model('ChairmanApplication', Application.schema);
        break;
      case 'Semester Coordinator':
        ApplicationModel = mongoose.model('SemesterCoordinatorApplication', Application.schema);
        break;
      case 'Teacher':
        ApplicationModel = mongoose.model('TeacherApplication', Application.schema);
        break;
      case 'Batch Advisor':
        ApplicationModel = mongoose.model('BatchAdvisorApplication', Application.schema);
        break;
      case 'Other':
        ApplicationModel = mongoose.model('OtherApplication', Application.schema);
        break;
      default:
        return res.status(400).send('Invalid recipient');
    }

    await ApplicationModel.create({ fullName, registrationNumber, applicationType, sendTo, message });

    res.status(201).send(`${sendTo} application submitted successfully`);
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).send('Server error');
  }
});

// Route to get all applications from all tables
app.get('/api/applications', async (req, res) => {
  try {
    const chairmanApplications = await mongoose.model('ChairmanApplication', Application.schema).find();
    const semesterCoordinatorApplications = await mongoose.model('SemesterCoordinatorApplication', Application.schema).find();
    const teacherApplications = await mongoose.model('TeacherApplication', Application.schema).find();
    const batchAdvisorApplications = await mongoose.model('BatchAdvisorApplication', Application.schema).find();
    const otherApplications = await mongoose.model('OtherApplication', Application.schema).find();

    const allApplications = [
      ...chairmanApplications,
      ...semesterCoordinatorApplications,
      ...teacherApplications,
      ...batchAdvisorApplications,
      ...otherApplications,
    ];

    res.json(allApplications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).send('Server error');
  }
});

// Route to add a new role
app.post('/api/roles', async (req, res) => {
  const { fullname, email, role } = req.body;

  try {
    const newRole = new Role({ fullname, email, role });
    await newRole.save();
    res.status(201).json(newRole);
  } catch (error) {
    console.error('Error adding role:', error);
    res.status(500).send('Server error');
  }
});

// Route to get all roles
app.get('/api/roles', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).send('Server error');
  }
});

// Route to update a role
app.put('/api/roles/:id', async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const updatedRole = await Role.findByIdAndUpdate(id, { role }, { new: true });
    res.json(updatedRole);
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).send('Server error');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
