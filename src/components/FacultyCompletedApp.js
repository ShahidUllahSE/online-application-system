import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import FacultySidebar from './FacultySidebar';
import axios from 'axios';

const FacultyCompletedApp = () => {
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem('token');

  const fetchCompletedApplications = async () => {
    try {
      const res = await axios.get('http://localhost:5000/completed-applications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.data.length > 0) {
        setApplications(res.data);
      }
    } catch (error) {
      console.error('Error fetching completed applications:', error);
    }
  };

  useEffect(() => {
    fetchCompletedApplications();
  }, []);

  // Function to handle application deletion
  const deleteApplication = async (applicationId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/completed-applications/${applicationId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.status === 200) {
        // Filter out the deleted application from state
        const updatedApplications = applications.filter(app => app._id !== applicationId);
        setApplications(updatedApplications);
      }
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  return (
    <div className="h-screen bg-[#1F4887] flex">
      <div className="flex-none">
        <FacultySidebar />
      </div>
      <div className="flex-grow flex items-center justify-center">
        <table className="w-full max-w-4xl border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Number</th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Type</th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted At</th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map(application => (
              <tr key={application._id}>
                <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">{application._id}</td>
                <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">{application.fullName}</td>
                <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">{application.registrationNumber}</td>
                <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">{application.applicationType}</td>
                <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">{new Date(application.submittedAt).toLocaleString()}</td>
                <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">{application.status}</td>
                <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-500 hover:text-blue-700 mx-1">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-red-500 hover:text-red-700 mx-1" onClick={() => deleteApplication(application._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacultyCompletedApp;
