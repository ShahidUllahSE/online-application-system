import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import FacultySidebar from './FacultySidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FacultyCompletedApp = () => {
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem('token');

  const fetchCompletedApplications = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/completed-applications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.length > 0) {
        setApplications(res.data);
      }
    } catch (error) {
      console.error('Error fetching completed applications:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/completed-applications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setApplications(applications.filter((app) => app._id !== id));
        alert('Application deleted successfully');
      } else {
        alert('Failed to delete application');
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('Failed to delete application');
    }
  };

  useEffect(() => {
    fetchCompletedApplications();
  }, []);

  return (
    <div className="flex min-h-screen">
      <FacultySidebar />
      <div className="flex-grow flex justify-center items-start bg-gradient-to-r from-[#1F4887] to-[#329987] p-4 ml-64">
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg text-center w-full mt-10">
          <h1 className="text-[#1F4887] text-3xl md:text-4xl font-bold mb-4">Completed Applications</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#1F4887]">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Full Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Registration Number</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Application Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">remark</th>

                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Submitted At</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr key={application._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.registrationNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.applicationType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.remark}</td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(application.submittedAt).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Link
                        to={`/ApplicationDetails2?fullName=${application.fullName}&registrationNumber=${application.registrationNumber}&remark=${application.remark}&message=${application.message}&applicationType=${application.applicationType}&status=${application.status}&submittedAt=${application.submittedAt}&_id=${application._id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        {application.status}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-500 hover:text-blue-700 mx-1">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 mx-1"
                        onClick={() => handleDelete(application._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyCompletedApp;
