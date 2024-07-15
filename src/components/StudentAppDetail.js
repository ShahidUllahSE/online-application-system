import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FacultySidebar from './FacultySidebar';
import { Link } from 'react-router-dom';

const StudentAppDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = localStorage.getItem('username');

  const [user, setUser] = useState({
    fullName: '',
    registrationNumber: '',
    message: '',
    applicationType: '',
    paperNumber: '',
    paperName: '',
    semester: '',
    _id: ''
  });

  const [forwardTo, setForwardTo] = useState('');
  const [remark, setRemark] = useState('');
  const [additionalFieldLabel, setAdditionalFieldLabel] = useState('');
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('username');
  const [users, setUsers] = useState([]);
  const [acceptedUsers, setAcceptedUsers] = useState(new Set());

  useEffect(() => {
    setUser({
      fullName: queryParams.get('fullName') || '',
      registrationNumber: queryParams.get('registrationNumber') || '',
      message: queryParams.get('message') || '',
      applicationType: queryParams.get('applicationType') || '',
      paperNumber: queryParams.get('paperNumber') || '',
      paperName: queryParams.get('paperName') || '',
      semester: queryParams.get('semester') || '',
      _id: queryParams.get('_id') || ''
    });

    switch (queryParams.get('applicationType')) {
      case 'Freezing Semester':
        setAdditionalFieldLabel('Semester');
        break;
      case 'Paper Cancellation':
        setAdditionalFieldLabel('Paper Number');
        break;
      case 'Paper Rechecking':
        setAdditionalFieldLabel('Paper Name');
        break;
      case 'Change FYP':
        setAdditionalFieldLabel('Reason for Change');
        break;
      default:
        setAdditionalFieldLabel('Additional Info');
    }
  }, [location.search]);

  const handleSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/update-application/${user._id}`,
        { 
          forwardTo,
          remark,
          applicationType: user.applicationType,
          paperName: user.paperName,
          paperNumber: user.paperNumber,
          semester: user.semester,
          fypChangeReason: user.fypChangeReason
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'userrole': userRole
          }
        }
      );

      alert('Application updated successfully');
      navigate('/ForwardApplication');
    } catch (error) {
      console.error('Error updating application:', error);
      alert('Error updating application');
    }
  };

  const fetchPendingApplications = async () => {
    const token = localStorage.getItem('token');
    if (token && username) {
      let apiEndpoint = '';
      switch (username) {
        case 'chairman':
          apiEndpoint = 'http://localhost:5000/api/chairman-applications';
          break;
        case 'batch_advisor':
          apiEndpoint = 'http://localhost:5000/api/batch-advisor-applications';
          break;
        case 'teacher':
          apiEndpoint = 'http://localhost:5000/api/teacher-applications';
          break;
        case 'semester_coordinator':
          apiEndpoint = 'http://localhost:5000/api/semester-coordinator-applications';
          break;
        case 'other':
          apiEndpoint = 'http://localhost:5000/api/other-applications';
          break;
        case 'fyp_supervisor':
          apiEndpoint = 'http://localhost:5000/api/fyp-supervisor-applications';
          break;
        case 'associate_chairman':
          apiEndpoint = 'http://localhost:5000/api/associate-chairman-applications';
          break;
        case 'convener_disciplinary_committee':
          apiEndpoint = 'http://localhost:5000/api/convener-disciplinary-committee-applications';
          break;
        case 'convener_scholarship_committee':
          apiEndpoint = 'http://localhost:5000/api/convener-scholarship-committee-applications';
          break;
        case 'coordinator':
          apiEndpoint = 'http://localhost:5000/api/coordinator-applications';
          break;
        case 'mid_exam_rearrangement_committee':
          apiEndpoint = 'http://localhost:5000/api/mid-exam-rearrangement-committee-applications';
          break;
        case 'all_faculty_members':
          apiEndpoint = 'http://localhost:5000/api/all-faculty-members-applications';
          break;
        case 'cms_operator':
          apiEndpoint = 'http://localhost:5000/api/cms-operator-applications';
          break;
        case 'office_assistant':
          apiEndpoint = 'http://localhost:5000/api/office-assistant-applications';
          break;
        default:
          console.error('Invalid role');
          return;
      }

      try {
        const response = await axios.get(apiEndpoint, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    }
  };

  useEffect(() => {
    const acceptedUsersStorage = localStorage.getItem('acceptedUsers');
    if (acceptedUsersStorage) {
      setAcceptedUsers(new Set(JSON.parse(acceptedUsersStorage)));
    }
    fetchPendingApplications();
  }, []);

  useEffect(() => {
    localStorage.setItem('acceptedUsers', JSON.stringify([...acceptedUsers]));
  }, [acceptedUsers]);

  const handleAccept = async (user) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('username');
  
    try {
      await axios.put(
        `http://localhost:5000/accept-application/${user._id}`,
        { remark },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'userRole': userRole
          }
        }
      );
  
      // Update state to reflect accepted application
      setUsers(users => users.filter(u => u._id !== user._id));
      setAcceptedUsers(new Set([...acceptedUsers, user._id]));
      
    } catch (error) {
      console.error('Error accepting application:', error);
      alert('Error accepting application');
      return;
    }
  };
  
  // Use useEffect to navigate after acceptedUsers state has been updated
  useEffect(() => {
    if (acceptedUsers.has(user._id)) {
      navigate('/ApplicationAccepted');
    }
  }, [acceptedUsers, navigate, user._id]);
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <div className="-ml-[560px] -mt-[2px]">
        <FacultySidebar />
      </div>
      <div className="bg-white p-10 rounded-lg shadow-lg ml-12 h-auto max-w-5xl w-auto">
        <h1 className="text-center text-2xl font-bold mb-6">Application Detail</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-gray-700">Name:</label>
            <p className="w-full mt-1 p-2 border rounded">{user.fullName}</p>
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700">Registration Number:</label>
            <p className="w-full mt-1 p-2 border rounded">{user.registrationNumber}</p>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">Application:</label>
            <p className="w-full mt-1 p-2 border rounded">{user.message}</p>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">Application Type:</label>
            <p className="w-full mt-1 p-2 border rounded">{user.applicationType}</p>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">{additionalFieldLabel}:</label>
            <p className="w-full mt-1 p-2 border rounded">
              {user.applicationType === 'Freezing Semester' ? user.semester :
               user.applicationType === 'Paper Rechecking' ? user.paperName : user.paperNumber}
            </p>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">Forward To:</label>
            <select
              className="w-full mt-1 p-2 border rounded"
              value={forwardTo}
              onChange={(e) => setForwardTo(e.target.value)}
            >
              <option>Select Concerned Person</option>
              <option value="Chairman">Chairman</option>
              <option value="Semester Coordinator">Semester Coordinator</option>
              <option value="Batch Advisor">Batch Advisor</option>
              <option value="Teacher">Teacher</option>
              <option value="FYP Supervisor">FYP Supervisor</option>
              <option value="Associate Chairman">Associate Chairman</option>
              <option value="Convener Disciplinary Committee">Convener Disciplinary Committee</option>
              <option value="Convener Scholarship Committee">Convener Scholarship Committee</option>
              <option value="Coordinator">Coordinator</option>
              <option value="Mid Exam Rearrangement Committee">Mid Exam Rearrangement Committee</option>
              <option value="All Faculty Members">All Faculty Members</option>
              <option value="CMS Operator">CMS Operator</option>
              <option value="Office Assistant">Office Assistant</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">Remarks:</label>
            <textarea
              className="w-full mt-1 p-2 border rounded"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="col-span-2 text-center mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Forward
          </button>
          {!acceptedUsers.has(user._id) && (
            <>
              <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2" onClick={() => handleAccept(user)}>Accept</button>
            </>
          )}
          {acceptedUsers.has(user._id) && (
            <span className="text-sm text-green-500">Accepted</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAppDetail;


