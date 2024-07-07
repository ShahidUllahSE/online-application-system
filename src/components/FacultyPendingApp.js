import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from './FacultySidebar';
import { Link } from "react-router-dom";

const FacultyPendingApp = () => {
  const [users, setUsers] = useState([]);
  const [acceptedUsers, setAcceptedUsers] = useState(new Set());
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

  // Function to fetch accepted applications IDs from localStorage on component mount
  useEffect(() => {
    const acceptedUsersStorage = localStorage.getItem('acceptedUsers');
    if (acceptedUsersStorage) {
      setAcceptedUsers(new Set(JSON.parse(acceptedUsersStorage)));
    }
  }, []);

  // Function to save accepted applications IDs to localStorage
  useEffect(() => {
    localStorage.setItem('acceptedUsers', JSON.stringify([...acceptedUsers]));
  }, [acceptedUsers]);

  // Fetch pending applications on component mount and whenever users or username changes
  useEffect(() => {
    fetchPendingApplications();
  }, [username, users]); // Trigger on changes to username or users state

  // Function to handle accepting an application
  const handleAccept = async (user) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('username');

    try {
      // Make the request to accept the application
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

      // Update local state to remove the accepted application
      setUsers(users => users.filter(u => u._id !== user._id));
      setAcceptedUsers(new Set([...acceptedUsers, user._id]));

      // Show a success message to the user
      alert('Application accepted and moved to completed');
    } catch (error) {
      console.error('Error accepting application:', error);
      alert('Error accepting application');
    }
  };

  // Function to handle role change (if needed)
  const handleRoleChange = (newRole) => {
    // Handle role change logic here if needed
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

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(user.submittedAt).toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {!acceptedUsers.has(user._id) && (
                  <>
                    <button className="mr-2 px-3 py-1 bg-green-500 text-white rounded-md focus:outline-none" onClick={() => handleAccept(user)}>Accept</button>
                    <Link to={`/StudentAppDetail?fullName=${user.fullName}&registrationNumber=${user.registrationNumber}&applicationTitle=${user.applicationTitle}&applicationType=${user.applicationType}&attachedFile=${user.attachedFile}&_id=${user._id}`}>
                      <button className="px-3 py-1 bg-red-500 text-white rounded-md focus:outline-none">Edit</button>
                    </Link>
                  </>
                )}
                {acceptedUsers.has(user._id) && (
                  <span className="text-sm text-gray-500">Accepted</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyPendingApp;
