import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';

const Application2 = () => {
  const [fullName, setFullName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [applicationType, setApplicationType] = useState('');
  const [sendTo, setSendTo] = useState('');
  const [message, setMessage] = useState('');
  const [semester, setSemester] = useState('');
  const [paperNumber, setPaperNumber] = useState('');
  const [paperName, setPaperName] = useState('');
  const [fypChangeReason, setFypChangeReason] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !registrationNumber || !applicationType || !sendTo || !message) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/applications', {
        fullName,
        registrationNumber,
        applicationType,
        sendTo,
        message,
        semester,
        paperNumber,
        paperName,
        fypChangeReason,
      });
      alert('Form submitted successfully:', res.data);
      navigate('/ApplicationSubmitted');
      setFullName('');
      setRegistrationNumber('');
      setApplicationType('');
      setSendTo('');
      setMessage('');
      setSemester('');
      setPaperNumber('');
      setPaperName('');
      setFypChangeReason('');
    } catch (err) {
      console.error('Form submission error:', err.response.data);
    }
  };

  const renderAdditionalField = () => {
    if (applicationType === 'Freezing Semester') {
      return (
        <div className="mb-4 mt-4">
          <label htmlFor="semester" className="block text-gray-700 text-sm font-bold mb-2">
            Semester
          </label>
          <input
            id="semester"
            type="text"
            className="w-full border bg-gray-100 rounded-lg p-2"
            placeholder="Spring-24"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />
        </div>
      );
    } else if (applicationType === 'Paper Cancellation') {
      return (
        <div className="mb-4 mt-4">
          <label htmlFor="paperNumber" className="block text-gray-700 text-sm font-bold mb-2">
            Paper Number
          </label>
          <input
            id="paperNumber"
            type="text"
            className="w-full border bg-gray-100 rounded-lg p-2"
            placeholder="Enter paper number"
            value={paperNumber}
            onChange={(e) => setPaperNumber(e.target.value)}
          />
        </div>
      );
    } else if (applicationType === 'Paper Rechecking') {
      return (
        <div className="mb-4 mt-4">
          <label htmlFor="paperName" className="block text-gray-700 text-sm font-bold mb-2">
            Paper Name
          </label>
          <input
            id="paperName"
            type="text"
            className="w-full border bg-gray-100 rounded-lg p-2"
            placeholder="Enter paper name"
            value={paperName}
            onChange={(e) => setPaperName(e.target.value)}
          />
        </div>
      );
    } else if (applicationType === 'Change FYP') {
      return (
        <div className="mb-4 mt-4">
          <label htmlFor="fypChangeReason" className="block text-gray-700 text-sm font-bold mb-2">
            Reason for Change
          </label>
          <input
            id="fypChangeReason"
            type="text"
            className="w-full border bg-gray-100 rounded-lg p-2"
            placeholder="Enter reason for changing FYP"
            value={fypChangeReason}
            onChange={(e) => setFypChangeReason(e.target.value)}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-grow flex justify-center items-start bg-gradient-to-r from-[#1F4887] to-[#329987] p-4 ml-64">
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg w-full max-w-2xl mt-12" style={{ marginLeft: 'calc(12rem - 4cm)', marginTop: 'calc(3rem + 2cm)' }}>
          <h1 className="text-[#1F4887] text-3xl md:text-4xl font-bold mb-4 text-center">Online Application Form</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="w-full border bg-gray-100 rounded-lg p-2"
                placeholder="Enter your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="registrationNumber" className="block text-gray-700 text-sm font-bold mb-2">
                Registration No.
              </label>
              <input
                type="text"
                id="registrationNumber"
                className="w-full border bg-gray-100 rounded-lg p-2"
                placeholder="Enter your Registration Number"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="applicationType" className="block text-gray-700 text-sm font-bold mb-2">
                Application Type
              </label>
              <select
                id="applicationType"
                className="w-full border bg-gray-100 rounded-lg p-2"
                value={applicationType}
                onChange={(e) => {
                  setApplicationType(e.target.value);
                  setSemester('');
                  setPaperNumber('');
                  setPaperName('');
                  setFypChangeReason('');
                }}
              >
                <option value="">Choose Application Type</option>
                <option value="Freezing Semester">Freezing Semester</option>
                <option value="Paper Cancellation">Paper Cancellation</option>
                <option value="Paper Rechecking">Paper Rechecking</option>
                <option value="Change FYP">Change FYP</option>
                <option value="Admission Cancellation">Admission Cancellation</option>
                <option value="Rearrangement of Mid Exam">Rearrangement of Mid Exam</option>
                <option value="Active Enrollment">Active Enrollment</option>
                <option value="Course Completion Certificate">Course Completion Certificate</option>
                <option value="Change Subject">Change Subject</option>
                <option value="Arrange Paper">Arrange Paper</option>
                <option value="Course Withdrawal">Course Withdrawal</option>
                <option value="Change Supervisor">Change Supervisor</option>
                <option value="Educational Documents">Educational Documents</option>
                <option value="other">Other</option>
              </select>
            </div>

            {renderAdditionalField()}

            <div>
              <label htmlFor="sendTo" className="block text-gray-700 text-sm font-bold mb-2">
                Send To
              </label>
              <select
                id="sendTo"
                className="w-full border bg-gray-100 rounded-lg p-2"
                value={sendTo}
                onChange={(e) => setSendTo(e.target.value)}
              >
                <option value="">Choose Recipient</option>
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
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                Application
              </label>
              <textarea
                id="message"
                className="w-full h-32 border bg-gray-100 rounded-lg p-2"
                placeholder="Write your Application here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1F4887] text-white p-2 rounded-md font-semibold hover:bg-[#329987] transition-all duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Application2;
