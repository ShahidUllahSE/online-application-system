import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FacultySidebar from './FacultySidebar';
import { Link } from 'react-router-dom';

const ApplicationDetails2 = () => {
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
    remark: '',
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
      remark: queryParams.get('remark') || '',
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
          fypChangeReason: user.fypChangeReason,
          remark:user.remark
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

      setUsers(users => users.filter(u => u._id !== user._id));
      setAcceptedUsers(new Set([...acceptedUsers, user._id]));

      alert('Application accepted and moved to completed');
    } catch (error) {
      console.error('Error accepting application:', error);
      alert('Error accepting application');
    }
  };

  return (
    <div className="flex flex-row min-h-screen bg-blue-900">
      <div className="w-1/4">
        <FacultySidebar />
      </div>
      <div className="w-3/4 p-10 flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-lg h-auto max-w-5xl w-full">
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
              <label className="block text-gray-700">Remark:</label>
              <p className="w-full mt-1 p-2 border rounded">{user.remark}</p>
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700">{additionalFieldLabel}:</label>
              <p className="w-full mt-1 p-2 border rounded">
                {user.applicationType === 'Freezing Semester' ? user.semester :
                 user.applicationType === 'Paper Rechecking' ? user.paperName : user.paperNumber}
              </p>
            </div>
           
          
          
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails2;
