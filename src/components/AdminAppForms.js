// AdminAppForms.js

import React, { useEffect, useState } from 'react';
import AdminSideBar from './AdminSideBar'; // Adjust path as needed

const AdminAppForms = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplications = async () => {
    try {
      const completedResponse = await fetch('http://localhost:5000/api/completed-applications');
      const pendingResponse = await fetch('http://localhost:5000/api/pending-applications');

      if (!completedResponse.ok || !pendingResponse.ok) {
        throw new Error('Failed to fetch application data');
      }

      const completedData = await completedResponse.json();
      const pendingData = await pendingResponse.json();

      const allApplications = [...completedData, ...pendingData];
      setApplications(allApplications);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError('Failed to fetch application data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
