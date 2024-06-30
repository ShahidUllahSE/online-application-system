// Import necessary modules and models
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User');
const Credential = require('./models/Credential');
const AdminCredential = require('./models/AdminCredential');
const FacultyCredential = require('./models/FacultyCredential');
const ChairmanApplication = require('./models/ChairmanApplication');
const TeacherApplication = require('./models/TeacherApplication');
const BatchAdvisorApplication = require('./models/BatchAdvisorApplication');
const SemesterCoordinatorApplication = require('./models/SemesterCoordinatorApplication');
const OtherApplication = require('./models/OtherApplication');
const Role = require('./models/Role');

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

      const token = jwt.sign({ id: user.id, role: 'student', username: user.Username }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      return res.json({ token, user, role: 'student' });
    }

    let admin = await AdminCredential.findOne({ Username: username });

    if (admin) {
      if (admin.Password !== password) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: admin.id, role: 'admin', username: admin.Username }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      return res.json({ token, user: admin, role: 'admin' });
    }

    let faculty = await FacultyCredential.findOne({ Username: username });

    if (faculty) {
      if (faculty.Password !== password) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      let role = '';
      switch (username) {
        case 'chairman':
          role = 'chairman';
          break;
        case 'batch_advisor':
          role = 'batch_advisor';
          break;
        case 'teacher':
          role = 'teacher';
          break;
        case 'semester_coordinator':
          role = 'semester_coordinator';
          break;
        case 'other':
          role = 'other';
          break;
        default:
          return res.status(400).json({ msg: 'Invalid role' });
      }

      const token = jwt.sign({ id: faculty.id, role, username: faculty.Username }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      return res.json({ token, user: faculty, role });
    }

    return res.status(400).json({ msg: 'Invalid credentials' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Routes to get applications based on role
app.get('/api/chairman-applications', async (req, res) => {
  try {
    const applications = await ChairmanApplication.find({}, 'fullName applicationType registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching chairman applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/teacher-applications', async (req, res) => {
  try {
    const applications = await TeacherApplication.find({}, 'fullName applicationType registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching teacher applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/batch-advisor-applications', async (req, res) => {
  try {
    const applications = await BatchAdvisorApplication.find({}, 'fullName applicationType registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching batch advisor applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/semester-coordinator-applications', async (req, res) => {
  try {
    const applications = await SemesterCoordinatorApplication.find({}, 'fullName applicationType registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching semester coordinator applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/other-applications', async (req, res) => {
  try {
    const applications = await OtherApplication.find({}, 'fullName applicationType registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching other applications:', error);
    res.status(500).send('Server error');
  }
});

// Route to handle different types of applications
app.post('/api/applications', async (req, res) => {
  const { fullName, registrationNumber, applicationType, sendTo, message, username } = req.body;

  try {
    let ApplicationModel;
    switch (sendTo.toLowerCase()) {
      case 'chairman':
        ApplicationModel = ChairmanApplication;
        break;
      case 'semester coordinator':
        ApplicationModel = SemesterCoordinatorApplication;
        break;
      case 'teacher':
        ApplicationModel = TeacherApplication;
        break;
      case 'batch advisor':
        ApplicationModel = BatchAdvisorApplication;
        break;
      case 'other':
        ApplicationModel = OtherApplication;
        break;
      default:
        return res.status(400).send('Invalid recipient');
    }

    await ApplicationModel.create({ fullName, registrationNumber, applicationType, sendTo, message, username });

    res.status(201).send(`${sendTo} application submitted successfully`);
  } catch (error) {
    console.error('Error submitting application:', error);
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
