import React, { useEffect, useState } from 'react';
import AdminSideBar from './AdminSideBar.js';
import UserData from './UsersData.js';

const AdminAppForms = () => {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/applications');
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="h-screen flex bg-[#1F4887]">
      <AdminSideBar />
      <div className="flex-grow p-4 overflow-auto">
        <div className="w-full max-w-4xl mx-auto mt-16">
          <table className="w-full border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{application.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{application.sendTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{application.applicationType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{application.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAppForms;
