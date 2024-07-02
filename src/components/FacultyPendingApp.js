import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from './FacultySidebar';

const FacultyPendingApp = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState('');
  const username = localStorage.getItem('username');
  console.log('Logged in as:', username);

  // Function to fetch pending applications
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

  // Fetch pending applications on component mount
  useEffect(() => {
    fetchPendingApplications();
  }, [username]);

  // Function to handle accepting an application
  const handleAccept = async (user) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('username');

    try {
      await axios.put(
        `http://localhost:5000/accept-application/${user._id}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'userRole': userRole
          }
        }
      );

      alert('Application accepted and moved to completed');
      // Remove accepted application from users state
      setUsers(users.filter(u => u._id !== user._id));
    } catch (error) {
      console.error('Error accepting application:', error);
      alert('Error accepting application');
    }
  };

  // Function to handle rejecting an application
  const handleReject = async (user) => {
    try {
      // Implement reject logic here if needed
      alert(`Application rejected for ${user.fullName}`);
      // Remove rejected application from users state
      setUsers(users.filter(u => u._id !== user._id));
    } catch (error) {
      console.error('Error rejecting application:', error);
      alert('Error rejecting application');
    }
  };

  // Function to handle role change
  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  return (
    <div className="h-screen bg-[#1F4887] flex items-center justify-center">
      <div className='-ml-28'>
        <SideBar onRoleChange={handleRoleChange} />
      </div>

      <table className="w-full max-w-4xl mt-24 ml-8 border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-300">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Send To</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted At</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.fullName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.applicationType}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.registrationNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.sentTo}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(user.submittedAt).toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button className="mr-2 px-3 py-1 bg-green-500 text-white rounded-md focus:outline-none" onClick={() => handleAccept(user)}>Accept</button>
                <button className="px-3 py-1 bg-red-500 text-white rounded-md focus:outline-none" onClick={() => handleReject(user)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyPendingApp;
