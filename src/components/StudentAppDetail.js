import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FacultySidebar from './FacultySidebar';

const StudentAppDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [user, setUser] = useState({
    fullName: '',
    registrationNumber: '',
    message: '',
    applicationType: '',
    paperNumber: '',
    paperName: '',
    semester: '',
    _id: ''
  });

  const [forwardTo, setForwardTo] = useState('');
  const [remark, setRemark] = useState('');
  const [additionalFieldLabel, setAdditionalFieldLabel] = useState('');
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('username');

  useEffect(() => {
    setUser({
      fullName: queryParams.get('fullName') || '',
      registrationNumber: queryParams.get('registrationNumber') || '',
      message: queryParams.get('message') || '',
      applicationType: queryParams.get('applicationType') || '',
      paperNumber: queryParams.get('paperNumber') || '',
      paperName: queryParams.get('paperName') || '',
      semester: queryParams.get('semester') || '',
      _id: queryParams.get('_id') || ''
    });

    switch (queryParams.get('applicationType')) {
      case 'Freezing Semester':
        setAdditionalFieldLabel('Semester');
        break;  
      case 'Paper Cancellation':
        setAdditionalFieldLabel('Paper Number');
        break;
      case 'Paper Rechecking':
        setAdditionalFieldLabel('Paper Name');
        break;
      case 'Change FYP':
        setAdditionalFieldLabel('Reason for Change');
        break;
      default:
        setAdditionalFieldLabel('Additional Info');
    }
  }, [location.search]);

  const handleSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/update-application/${user._id}`,
        { 
          forwardTo,
          remark,
          applicationType: user.applicationType,
          paperName: user.paperName,
          paperNumber: user.paperNumber,
          semester: user.semester,
          fypChangeReason: user.fypChangeReason
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'userrole': userRole
          }
        }
      );

      alert('Application updated successfully');
      navigate('/ForwardApplication');
    } catch (error) {
      console.error('Error updating application:', error);
      alert('Error updating application');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <div className="-ml-[560px] -mt-[2px]">
        <FacultySidebar />
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
            <label className="block text-gray-700">Application:</label>
            <p className="w-full mt-1 p-2 border rounded">{user.message}</p>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">Application Type:</label>
            <p className="w-full mt-1 p-2 border rounded">{user.applicationType}</p>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">{additionalFieldLabel}:</label>
            <p className="w-full mt-1 p-2 border rounded">
              {user.applicationType === 'Freezing Semester' ? user.semester :
               user.applicationType === 'Paper Rechecking' ? user.paperName : user.paperNumber}
            </p>
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
          <div className="col-span-2">
            <label className="block text-gray-700">Remarks:</label>
            <textarea
              className="w-full mt-1 p-2 border rounded"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="col-span-2 text-center mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Forward
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentAppDetail;
