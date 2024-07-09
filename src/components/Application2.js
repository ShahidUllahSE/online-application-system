import React, { useState } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate


const Application2 = () => {
  const [fullName, setFullName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [applicationType, setApplicationType] = useState('');
  const [sendTo, setSendTo] = useState('');
  const [message, setMessage] = useState('');
  const [semester, setSemester] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

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
      });
      alert('Form submitted successfully:', res.data);
      navigate('/ApplicationSubmitted'); // Navigate to /ApplicationSubmitted page
      // Reset form fields
      setFullName('');
      setRegistrationNumber('');
      setApplicationType('');
      setSendTo('');
      setMessage('');
      setSemester('');
    } catch (err) {
      console.error('Form submission error:', err.response.data);
      // Handle error, show error message, etc.
    }
  };

  // Function to dynamically render additional field based on applicationType
  const renderAdditionalField = () => {
    if (applicationType === 'Freezing Semester') {
      return (
        <div className="mb-4 mt-4">
          <label htmlFor="semester" className="block text-gray-700 text-sm font-bold mb-2">
            Semester Number
          </label>
          <input
            id="semester"
            className="w-60 border bg-gray-300 rounded-lg p-2"
            placeholder="Enter semester number"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-screen mt-3 bg-[#1F4887]">
      <div className="h-auto">
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <div className='-ml-4 -mt-3'>
          <SideBar />
        </div>

        <div className="flex justify-center -mt-[590px] pt-16 items-center h-auto bg-[#1F4887]">
          <form className="bg-white ml-52 h-[500px] w-[650px] p-8 rounded-lg -mt-8 shadow-md" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold font-serif pb-4 ml-16">Online Application Form</h1>
            <div>
              <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="w-60 border rounded-lg bg-gray-300 p-2"
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
                className="w-60 border rounded-lg bg-gray-300 p-2"
                placeholder="Enter your Registration Number"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
            </div>

            <div className="mb-4 mt-4">
              <label htmlFor="applicationType" className="block text-gray-700 text-sm font-bold mb-2">
                Application Type
              </label>
              <select
                id="applicationType"
                className="w-60 border bg-gray-300 rounded-lg p-2"
                value={applicationType}
                onChange={(e) => {
                  setApplicationType(e.target.value);
                  // Reset additionalField when application type changes
                  setSemester('');
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
              </select>
            </div>

            {renderAdditionalField()}

            <div className="mb-4 mt-4">
              <label htmlFor="sendTo" className="block text-gray-700 text-sm font-bold mb-2">
                Send To
              </label>
              <select
                id="sendTo"
                className="w-60 border bg-gray-300 rounded-lg p-2"
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

            <div className="w-full ml-[320px] -mt-80 mb-4">
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                Application
              </label>
              <textarea
                id="message"
                className="w-60 h-72 border bg-gray-300 rounded-lg p-2"
                placeholder="Write your Application  here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-60 mt-6 ml-80 bg-[#329987] text-white p-2 rounded-md font-semibold"
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
