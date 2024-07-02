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
const Role = require('./models/Role');

// Import all new application schemas
const ChairmanApplication = require('./models/ChairmanApplication');
const TeacherApplication = require('./models/TeacherApplication');
const BatchAdvisorApplication = require('./models/BatchAdvisorApplication');
const SemesterCoordinatorApplication = require('./models/SemesterCoordinatorApplication');
const OtherApplication = require('./models/OtherApplication');
const FYPSupervisorApplication = require('./models/FYPSupervisorApplication');
const AssociateChairmanApplication = require('./models/AssociateChairmanApplication');
const ConvenerDisciplinaryCommitteeApplication = require('./models/ConvenerDisciplinaryCommitteeApplication');
const ConvenerScholarshipCommitteeApplication = require('./models/ConvenerScholarshipCommitteeApplication');
const CoordinatorApplication = require('./models/CoordinatorApplication');
const MidExamRearrangementCommitteeApplication = require('./models/MidExamRearrangementCommitteeApplication');
const AllFacultyMembersApplication = require('./models/AllFacultyMembersApplication');
const CMSOperatorApplication = require('./models/CMSOperatorApplication');
const OfficeAssistantApplication = require('./models/OfficeAssistantApplication');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Update with your frontend URL
    allowedHeaders: ['Content-Type', 'Authorization', 'userRole'], // Add 'userRole' header
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow relevant methods
    credentials: true, // Enable credentials (if needed)
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

// Define login route (unchanged from your provided code)
app.post('/api/auth/login', async (req, res) => {
  // Your existing login route code here
});

// Routes to get applications based on role (updated to include new schemas)
app.get('/api/chairman-applications', async (req, res) => {
  try {
    const applications = await ChairmanApplication.find({}, 'fullName registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching chairman applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/teacher-applications', async (req, res) => {
  try {
    const applications = await TeacherApplication.find({}, 'fullName registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching teacher applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/batch-advisor-applications', async (req, res) => {
  try {
    const applications = await BatchAdvisorApplication.find({}, 'fullName registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching batch advisor applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/semester-coordinator-applications', async (req, res) => {
  try {
    const applications = await SemesterCoordinatorApplication.find({}, 'fullName registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching semester coordinator applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/other-applications', async (req, res) => {
  try {
    const applications = await OtherApplication.find({}, 'fullName registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching other applications:', error);
    res.status(500).send('Server error');
  }
});

// Route to handle new application schemas
app.get('/api/fyp-supervisor-applications', async (req, res) => {
  try {
    const applications = await FYPSupervisorApplication.find({}, 'fullName registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching FYP supervisor applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/associate-chairman-applications', async (req, res) => {
  try {
    const applications = await AssociateChairmanApplication.find({}, 'fullName registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching associate chairman applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/convener-disciplinary-committee-applications', async (req, res) => {
  try {
    const applications = await ConvenerDisciplinaryCommitteeApplication.find({}, 'fullName registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching convener disciplinary committee applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/convener-scholarship-committee-applications', async (req, res) => {
  try {
    const applications = await ConvenerScholarshipCommitteeApplication.find({}, 'fullName registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching convener scholarship committee applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/coordinator-applications', async (req, res) => {
  try {
    const applications = await CoordinatorApplication.find({}, 'fullName registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching coordinator applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/mid-exam-rearrangement-committee-applications', async (req, res) => {
  try {
    const applications = await MidExamRearrangementCommitteeApplication.find({}, 'fullName registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching mid exam rearrangement committee applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/all-faculty-members-applications', async (req, res) => {
  try {
    const applications = await AllFacultyMembersApplication.find({}, 'fullName registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching all faculty members applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/cms-operator-applications', async (req, res) => {
  try {
    const applications = await CMSOperatorApplication.find({}, 'fullName registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching CMS operator applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/office-assistant-applications', async (req, res) => {
  try {
    const applications = await OfficeAssistantApplication.find({}, 'fullName registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching office assistant applications:', error);
    res.status(500).send('Server error');
  }
});

// Route to handle different types of applications (update to handle new schemas)
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
      case 'fyp supervisor':
        ApplicationModel = FYPSupervisorApplication;
        break;
      case 'associate chairman':
        ApplicationModel = AssociateChairmanApplication;
        break;
      case 'convener disciplinary committee':
        ApplicationModel = ConvenerDisciplinaryCommitteeApplication;
        break;
      case 'convener scholarship committee':
        ApplicationModel = ConvenerScholarshipCommitteeApplication;
        break;
      case 'coordinator':
        ApplicationModel = CoordinatorApplication;
        break;
      case 'mid exam rearrangement committee':
        ApplicationModel = MidExamRearrangementCommitteeApplication;
        break;
      case 'all faculty members':
        ApplicationModel = AllFacultyMembersApplication;
        break;
      case 'cms operator':
        ApplicationModel = CMSOperatorApplication;
        break;
      case 'office assistant':
        ApplicationModel = OfficeAssistantApplication;
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
app.post('/accept-application/:id', async (req, res) => {
    const applicationId = req.params.id;
    const userRole = req.headers.userrole; // Ensure the header name matches 'userRole' case
  
  
    try {
      let applicationModel;
  
      // Select the appropriate model based on userRole
      switch (userRole) {
        case 'chairman':
          applicationModel = ChairmanApplication;
          break;
        case 'teacher':
          applicationModel = TeacherApplication;
          break;
        case 'batch_advisor':
          applicationModel = BatchAdvisorApplication;
          break;
        case 'semester_coordinator':
          applicationModel = SemesterCoordinatorApplication;
          break;
        case 'other':
          applicationModel = OtherApplication;
          break;
        // Add cases for other roles as needed
        default:
          return res.status(404).json({ message: 'Application type not supported' });
      }
  
      // Find the application by ID in the selected model
      const application = await applicationModel.findById(applicationId);
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
  
      // Move application to completed status
      application.status = 'completed';
      await application.save();
  
      res.status(200).json({ message: 'Application accepted and moved to completed' });
    } catch (error) {
      console.error('Error accepting application:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.get('/completed-applications', async (req, res) => {
    try {
      // Fetch applications from all models where status is 'completed'
      const chairmanApplications = await ChairmanApplication.find({ status: 'completed' });
      const teacherApplications = await TeacherApplication.find({ status: 'completed' });
      const batchAdvisorApplications = await BatchAdvisorApplication.find({ status: 'completed' });
      const semesterCoordinatorApplications = await SemesterCoordinatorApplication.find({ status: 'completed' });
      const otherApplications = await OtherApplication.find({ status: 'completed' });
      const fypSupervisorApplications = await FYPSupervisorApplication.find({ status: 'completed' });
      const associateChairmanApplications = await AssociateChairmanApplication.find({ status: 'completed' });
      const convenerDisciplinaryCommitteeApplications = await ConvenerDisciplinaryCommitteeApplication.find({ status: 'completed' });
      const convenerScholarshipCommitteeApplications = await ConvenerScholarshipCommitteeApplication.find({ status: 'completed' });
      const coordinatorApplications = await CoordinatorApplication.find({ status: 'completed' });
      const midExamRearrangementCommitteeApplications = await MidExamRearrangementCommitteeApplication.find({ status: 'completed' });
      const allFacultyMembersApplications = await AllFacultyMembersApplication.find({ status: 'completed' });
      const cmsOperatorApplications = await CMSOperatorApplication.find({ status: 'completed' });
      const officeAssistantApplications = await OfficeAssistantApplication.find({ status: 'completed' });
  
      // Combine all results into a single array
      const completedApplications = [
        ...chairmanApplications,
        ...teacherApplications,
        ...batchAdvisorApplications,
        ...semesterCoordinatorApplications,
        ...otherApplications,
        ...fypSupervisorApplications,
        ...associateChairmanApplications,
        ...convenerDisciplinaryCommitteeApplications,
        ...convenerScholarshipCommitteeApplications,
        ...coordinatorApplications,
        ...midExamRearrangementCommitteeApplications,
        ...allFacultyMembersApplications,
        ...cmsOperatorApplications,
        ...officeAssistantApplications,
      ];
  
      res.json(completedApplications);
      console.log('Completed Applications:', completedApplications);
    } catch (error) {
      console.error('Error fetching completed applications:', error);
      res.status(500).json({ message: 'Server error' });
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



