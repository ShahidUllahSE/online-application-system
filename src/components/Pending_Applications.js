import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from './SideBar';

const API_PENDING = "http://localhost:5000/api/pending-applications";

const Pending_Applications = () => {
  const [pendingApplications, setPendingApplications] = useState([]);

  const fetchPendingApplications = async () => {
    try {
      const res = await axios.get(API_PENDING);
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
    <div>
      <div className=' '>
        <SideBar />
      </div>
      <div className="bg-[#1F4887] flex flex-col items-center justify-center">
        <div className="flex-grow p-4 flex items-center justify-center w-full">
          <table className="w-full max-w-2xl mr-8 -mt-[640px] ml-72 border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Send To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Forward To</th> {/* New Column */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingApplications.map(application => (
                <tr key={application._id}>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{application.fullName}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{application.registrationNumber}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{application.applicationType}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{application.sendTo}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{application.status}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{new Date(application.submittedAt).toLocaleString()}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{application.forwardTo}</td> {/* Display forwardTo */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pending_Applications;
