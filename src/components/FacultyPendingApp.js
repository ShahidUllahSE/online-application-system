import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from './FacultySidebar';

const FacultyPendingApp = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token) {
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
        default:
          console.error('Invalid role');
          return;
      }

      axios.get(apiEndpoint, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching applications:', error);
      });
    }
  }, []);

  const handleAccept = (user) => {
    // Implement your accept logic here
    alert(`Application accepted for ${user.fullName}`);
  };

  const handleReject = (user) => {
    // Implement your reject logic here
    alert(`Application rejected for ${user.fullName}`);
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  return (
    <div className="h-screen bg-[#1F4887] flex items-center justify-center">
      <div className='-ml-28'>
        <SideBar onRoleChange={handleRoleChange} />
      </div>

      <table className="w-full max-w-4xl -mt-24 ml-8 border border-gray-200 rounded-lg shadow-sm">
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
