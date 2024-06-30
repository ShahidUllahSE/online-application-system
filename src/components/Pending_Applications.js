import React, { useEffect, useState } from 'react';
import SideBar from './SideBar.js';

const Pending_Applications = () => {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store token in localStorage after login

      const res = await fetch('http://localhost:5000/api/applications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.status === 200) {
        setApplications(data);
      } else {
        console.error(data.msg); // Handle error response from backend
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // Replace this with your actual login implementation
    const username = 'your_username'; // Replace with actual username input or state
    const password = 'your_password'; // Replace with actual password input or state

    const login = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        if (res.status === 200) {
          setUser(data.user);
          localStorage.setItem('token', data.token);
        } else {
          console.error(data.msg); // Handle error response from backend
        }
      } catch (e) {
        console.error(e);
      }
    };

    login();
  }, []);

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user]);

  return (
    <div className="h-screen flex bg-[#1F4887]">
      <SideBar />
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
                  <td className="px-6 py-4 whitespace-nowrap">{application.status || 'Pending'}</td>
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
