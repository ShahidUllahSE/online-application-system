import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import UserData from './UsersData'; // Assuming this component correctly displays user data

const API = "http://localhost:5000/completed-applications";

const Completed_Applications = () => {
  const [applications, setApplications] = useState([]);

  const fetchCompletedApplications = async () => {
    try {
      const res = await axios.get(API,
        
      );
      const data = res.data;
      if (data.length > 0) {
        setApplications(data);
      }
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCompletedApplications();
  }, []);

  return (
    <div>
      <div>
        <SideBar />
      </div>
      <div className="bg-[#1F4887] flex flex-col -mt-[550px] items-center justify-center">
        <div className="flex-grow p-4 flex items-center justify-center w-full">
          <table className="w-full max-w-4xl  ml-44 border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map(application => (
                <tr key={application._id}>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{application.fullName}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{application.registrationNumber}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{application.applicationType}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{application.status}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{new Date(application.submittedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Completed_Applications;
