import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from './SideBar';

const API_PENDING = "http://localhost:5000/api/pending-applications";

const Pending_Applications = () => {
  const [pendingApplications, setPendingApplications] = useState([]);

  const fetchPendingApplications = async () => {
    try {
      const res = await axios.get(API_PENDING, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Send JWT token in headers
        }
      });
      const data = res.data;
      setPendingApplications(data);
    } catch (error) {
      console.error('Error fetching pending applications:', error);
    }
  };

  useEffect(() => {
    fetchPendingApplications();
  }, []);

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-grow flex justify-center items-start bg-gradient-to-r from-[#1F4887] to-[#329987] p-4 ml-64">
        <div
          className="bg-white p-6 md:p-10 rounded-lg shadow-lg text-center w-full max-w-4xl mt-10"
          style={{ marginLeft: 'calc(12rem - 4cm)' }}
        >
          <h2 className="text-[#1F4887] text-2xl md:text-3xl font-bold mb-4">Pending Applications</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border-collapse border border-gray-400 rounded-lg shadow-sm">
              <thead className="bg-[#1F4887] text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Full Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Registration Number</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Application Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Send To</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Submitted At</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Forward To</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {pendingApplications.map(application => (
                  <tr key={application._id}>
                    <td className="px-4 py-2 text-sm text-gray-800">{application.fullName}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{application.registrationNumber}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{application.applicationType}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{application.sendTo}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{application.status}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{new Date(application.submittedAt).toLocaleString()}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{application.forwardTo}</td>
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

export default Pending_Applications;
