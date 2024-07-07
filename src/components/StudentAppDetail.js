import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import SideBar from './SideBar';
import FacultySidebar from './FacultySidebar';

const StudentAppDetail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const user = {
    fullName: queryParams.get('fullName'),
    registrationNumber: queryParams.get('registrationNumber'),
    applicationTitle: queryParams.get('applicationTitle'),
    applicationType: queryParams.get('applicationType'),
    attachedFile: queryParams.get('attachedFile'),
    _id: queryParams.get('_id')
  };
  const [forwardTo, setForwardTo] = useState('');
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('username');

  const handleSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/update-application/${user._id}`,
        { forwardTo },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'userrole': userRole // Send the userRole in headers
          }
        }
      );

      alert('Application updated successfully');
    } catch (error) {
      console.error('Error updating application:', error);
      alert('Error updating application');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <div className='-ml-[560px] -mt-[2px]'>
        {/* Sidebar or other components */}
        <FacultySidebar/>
      </div>
      <div className="bg-white p-10 rounded-lg shadow-lg ml-12 h-auto max-w-5xl w-auto">
        <h1 className="text-center text-2xl font-bold mb-6">Application Detail</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-gray-700">Name:</label>
            <p className="w-full mt-1 p-2 border rounded">{user.fullName}</p>
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700">Registration Number:</label>
            <p className="w-full mt-1 p-2 border rounded">{user.registrationNumber}</p>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">Application Title:</label>
            <p className="w-full mt-1 p-2 border rounded">{user.applicationTitle}</p>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">Application Type:</label>
            <p className="w-full mt-1 p-2 border rounded">{user.applicationType}</p>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">Attached File:</label>
            <p className="w-full mt-1 p-2 border rounded">{user.attachedFile}</p>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">Forward To:</label>
            <select 
              className="w-full mt-1 p-2 border rounded" 
              value={forwardTo} 
              onChange={(e) => setForwardTo(e.target.value)}
            >
              <option>Select Concerned Person</option>
              <option value="Chairman">Chairman</option>
              <option value="Semester Coordinator">Semester Coordinator</option>
              <option value="Batch Advisor">Batch Advisor</option>
              <option value="Teacher">Teacher</option>
              <option value="FYP Supervisor">FYP Supervisor</option>
              <option value="Associate Chairman">Associate Chairman</option>
              <option value="Convener Disciplinary Committee">Convener Disciplinary Committee</option>
              <option value="Convener Scholarship Committee">Convener Scholarship Committee</option>
              <option value="Coordinator">Coordinator</option>
              <option value="Mid Exam Rearrangement Committee">Mid Exam Rearrangement Committee</option>
              <option value="All Faculty Members">All Faculty Members</option>
              <option value="CMS Operator">CMS Operator</option>
              <option value="Office Assistant">Office Assistant</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="col-span-2 text-center mt-4">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded" 
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentAppDetail;