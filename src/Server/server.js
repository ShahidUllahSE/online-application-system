
// Import necessary modules and models
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const auth = require('./middleware/auth');

const contactRoutes = require('./routes/contact');

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
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
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

app.use('/api/contact', contactRoutes);


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



app.get('/api/fyp-supervisor-applications', async (req, res) => {
  try {
    const applications = await FYPSupervisorApplication.find({}, 'fullName applicationType registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching FYP Supervisor applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/associate-chairman-applications', async (req, res) => {
  try {
    const applications = await AssociateChairmanApplication.find({}, 'fullName applicationType registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching Associate Chairman applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/convener-disciplinary-committee-applications', async (req, res) => {
  try {
    const applications = await ConvenerDisciplinaryCommitteeApplication.find({}, 'fullName applicationType registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching Convener Disciplinary Committee applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/convener-scholarship-committee-applications', async (req, res) => {
  try {
    const applications = await ConvenerScholarshipCommitteeApplication.find({}, 'fullName applicationType registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching Convener Scholarship Committee applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/coordinator-applications', async (req, res) => {
  try {
    const applications = await CoordinatorApplication.find({}, 'fullName applicationType registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching Coordinator applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/mid-exam-rearrangement-committee-applications', async (req, res) => {
  try {
    const applications = await MidExamRearrangementCommitteeApplication.find({}, 'fullName applicationType registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching Mid Exam Rearrangement Committee applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/all-faculty-members-applications', async (req, res) => {
  try {
    const applications = await AllFacultyMembersApplication.find({}, 'fullName applicationType registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching All Faculty Members applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/cms-operator-applications', async (req, res) => {
  try {
    const applications = await CMSOperatorApplication.find({}, 'fullName applicationType registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching CMS Operator applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/office-assistant-applications', async (req, res) => {
  try {
    const applications = await OfficeAssistantApplication.find({}, 'fullName applicationType registrationNumber submittedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching Office Assistant applications:', error);
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
app.put('/accept-application/:id', async (req, res) => {
  const applicationId = req.params.id;
  const userRole = req.headers.userrole;

  console.log('User Role:', userRole);
  console.log('Application ID:', applicationId);

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
      case 'fyp_supervisor':
        applicationModel = FYPSupervisorApplication;
        break;
      case 'associate_chairman':
        applicationModel = AssociateChairmanApplication;
        break;
      case 'convener_disciplinary_committee':
        applicationModel = ConvenerDisciplinaryCommitteeApplication;
        break;
      case 'convener_scholarship_committee':
        applicationModel = ConvenerScholarshipCommitteeApplication;
        break;
      case 'coordinator':
        applicationModel = CoordinatorApplication;
        break;
      case 'mid_exam_rearrangement_committee':
        applicationModel = MidExamRearrangementCommitteeApplication;
        break;
      case 'all_faculty_members':
        applicationModel = AllFacultyMembersApplication;
        break;
      case 'cms_operator':
        applicationModel = CMSOperatorApplication;
        break;
      case 'office_assistant':
        applicationModel = OfficeAssistantApplication;
        break;  // Add cases for other roles as needed
      default:
        console.log('Unsupported user role:', userRole);
        return res.status(404).json({ message: 'Application type not supported' });
    }

    // Find the application by ID in the selected model
    const application = await applicationModel.findById(applicationId);
    if (!application) {
      console.log('Application not found with ID:', applicationId);
      return res.status(404).json({ message: 'Application not found' });
    }

    // Move application to completed status
    application.status = 'completed';
    await application.save();

    console.log('Application accepted and moved to completed:', applicationId);
    res.status(200).json({ message: 'Application accepted and moved to completed' });
  } catch (error) {
    console.error('Error accepting application:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
app.get('/api/completed-applications', async (req, res) => {
  try {
    const applicationModels = [
      ChairmanApplication,
      TeacherApplication,
      BatchAdvisorApplication,
      SemesterCoordinatorApplication,
      OtherApplication,
      FYPSupervisorApplication,
      AssociateChairmanApplication,
      ConvenerDisciplinaryCommitteeApplication,
      ConvenerScholarshipCommitteeApplication,
      CoordinatorApplication,
      MidExamRearrangementCommitteeApplication,
      AllFacultyMembersApplication,
      CMSOperatorApplication,
      OfficeAssistantApplication
      // Add more as needed
    ];

    const fetchApplications = applicationModels.map(async (Model) => {
      return await Model.find({ status: 'completed' });
    });

    const results = await Promise.all(fetchApplications);
    const completedApplications = results.flat();

    res.json(completedApplications);
    console.log('Completed Applications:', completedApplications);
  } catch (error) {
    console.error('Error fetching completed applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/api/pending-applications', async (req, res) => {
  try {
    const pendingApplications = await Promise.all([
      ChairmanApplication.find({ status: 'pending' }),
      TeacherApplication.find({ status: 'pending' }),
      BatchAdvisorApplication.find({ status: 'pending' }),
      SemesterCoordinatorApplication.find({ status: 'pending' }),
      OtherApplication.find({ status: 'pending' }),
      FYPSupervisorApplication.find({ status: 'pending' }),
      AssociateChairmanApplication.find({ status: 'pending' }),
      ConvenerDisciplinaryCommitteeApplication.find({ status: 'pending' }),
      ConvenerScholarshipCommitteeApplication.find({ status: 'pending' }),
      CoordinatorApplication.find({ status: 'pending' }),
      MidExamRearrangementCommitteeApplication.find({ status: 'pending' }),
      AllFacultyMembersApplication.find({ status: 'pending' }),
      CMSOperatorApplication.find({ status: 'pending' }),
      OfficeAssistantApplication.find({ status: 'pending' }),
      // Add more as needed
    ]);

    const transformedApplications = pendingApplications.flat().map(application => ({
      _id: application._id,
      fullName: application.fullName,
      registrationNumber: application.registrationNumber,
      applicationType: application.applicationType,
      sendTo: application.sendTo,
      status: application.status,
      submittedAt: application.submittedAt
    }));

    res.json(transformedApplications);
  } catch (error) {
    console.error('Error fetching pending applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



app.delete('/api/completed-applications/:id', async (req, res) => {
  try {
    const applicationId = req.params.id;
    let deletedApplication = null;

    const models = [
      ChairmanApplication,
      TeacherApplication,
      BatchAdvisorApplication,
      SemesterCoordinatorApplication,
      OtherApplication
      // Add more as needed
    ];

    for (const Model of models) {
      deletedApplication = await Model.findByIdAndDelete(applicationId);
      if (deletedApplication) {
        break; // Exit loop if application is found and deleted
      }
    }

    if (!deletedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Handle PUT request to update application based on user role
app.put('/api/update-application/:id', async (req, res) => {
  const { id } = req.params;
  const { forwardTo } = req.body;
  const userRole = req.headers.userrole;

  console.log('User Role:', userRole);
  console.log('Application ID:', id);
  console.log('Forward To:', forwardTo);

  try {
    let applicationModel;

    // Map user roles to respective application models
    const roleToModelMap = {
      chairman: ChairmanApplication,
      teacher: TeacherApplication,
      batch_advisor: BatchAdvisorApplication,
      semester_coordinator: SemesterCoordinatorApplication,
      other: OtherApplication,
      fyp_supervisor: FYPSupervisorApplication,
      associate_chairman: AssociateChairmanApplication,
      convener_disciplinary_committee: ConvenerDisciplinaryCommitteeApplication,
      convener_scholarship_committee: ConvenerScholarshipCommitteeApplication,
      coordinator: CoordinatorApplication,
      mid_exam_rearrangement_committee: MidExamRearrangementCommitteeApplication,
      all_faculty_members: AllFacultyMembersApplication,
      cms_operator: CMSOperatorApplication,
      office_assistant: OfficeAssistantApplication
      // Add more mappings for other roles as needed
    };

    // Check if the userRole is mapped to a valid application model
    if (roleToModelMap.hasOwnProperty(userRole)) {
      applicationModel = roleToModelMap[userRole];
    } else {
      console.log('Unsupported user role:', userRole);
      return res.status(404).json({ message: 'Application type not supported' });
    }

    // Find the application by ID and update its details
    const updatedApplication = await applicationModel.findByIdAndUpdate(
      id,
      { sendTo: forwardTo },
      { new: true } // Return the updated document
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ message: 'Application updated successfully', updatedApplication });
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



app.get('/api/application-counts', async (req, res) => {
  try {
    const counts = await Promise.all([
      ChairmanApplication.countDocuments(),
      TeacherApplication.countDocuments(),
      BatchAdvisorApplication.countDocuments(),
      SemesterCoordinatorApplication.countDocuments(),
      OtherApplication.countDocuments(),
      FYPSupervisorApplication.countDocuments(),
      AssociateChairmanApplication.countDocuments(),
      ConvenerDisciplinaryCommitteeApplication.countDocuments(),
      ConvenerScholarshipCommitteeApplication.countDocuments(),
      CoordinatorApplication.countDocuments(),
      MidExamRearrangementCommitteeApplication.countDocuments(),
      AllFacultyMembersApplication.countDocuments(),
      CMSOperatorApplication.countDocuments(),
      OfficeAssistantApplication.countDocuments(),
    ]);

    // Prepare response
    const countsObject = {
      chairman: counts[0],
      teacher: counts[1],
      chairman: counts[0],
      teacher: counts[1],
      batchAdvisor: counts[2],
      semesterCoordinator: counts[3],
      other: counts[4],
      fypSupervisor: counts[5],
      associateChairman: counts[6],
      convenerDisciplinaryCommittee: counts[7],
      convenerScholarshipCommittee: counts[8],
      coordinator: counts[9],
      midExamRearrangementCommittee: counts[10],
      allFacultyMembers: counts[11],
      cmsOperator: counts[12],
      officeAssistant: counts[13],
      // Add other counts similarly
    };

    res.json(countsObject);
  } catch (err) {
    console.error('Error fetching application counts:', err);
    res.status(500).json({ message: 'Server error' });
  }
});










// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


