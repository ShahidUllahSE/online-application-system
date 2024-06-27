import React, { useState } from 'react';
import axios from 'axios';

const OnlineApplication = () => {
  const [fullName, setFullName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [applicationType, setApplicationType] = useState('');
  const [sendTo, setSendTo] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/applications', {
        fullName,
        registrationNumber,
        applicationType,
        sendTo,
        message
      });

      console.log('Form submitted successfully:', res.data);
      alert('Form submitted successfully');
    } catch (err) {
      console.error('Form submission error:', err);
      alert('Form submission error');
    }
  };

  return (
    <div className="h-screen bg-[#1F4887] flex justify-center items-center">
      <div className="h-auto">
        <form className="bg-white h-[500px] w-[650px] p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold font-serif pb-4 ml-16">Online Application Form</h1>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border rounded-lg bg-gray-300 p-2"
              placeholder="Enter your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="registrationNumber" className="block text-gray-700 text-sm font-bold mb-2">
              Registration Number
            </label>
            <input
              type="text"
              id="registrationNumber"
              className="w-full border rounded-lg bg-gray-300 p-2"
              placeholder="Enter registration number"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="options" className="block text-gray-700 text-sm font-bold mb-2">
              Select Application Type
            </label>
            <select
              id="options"
              className="w-full border bg-gray-300 rounded-lg p-2"
              value={applicationType}
              onChange={(e) => setApplicationType(e.target.value)}
            >
              <option value="">Choose Application Type</option>
              <option value="Chairman">Chairman</option>
              <option value="Semester Coordinator">Semester Coordinator</option>
              <option value="Teacher">Teacher</option>
              <option value="Batch Advisor">Batch Advisor</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="sendTo" className="block text-gray-700 text-sm font-bold mb-2">
              Send To
            </label>
            <input
              type="text"
              id="sendTo"
              className="w-full border rounded-lg bg-gray-300 p-2"
              placeholder="Enter recipient"
              value={sendTo}
              onChange={(e) => setSendTo(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
              Message
            </label>
            <textarea
              id="message"
              className="w-full border rounded-lg bg-gray-300 p-2"
              rows="4"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnlineApplication;
