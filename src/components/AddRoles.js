import React, { useState } from 'react';
import AdminSideBar from './AdminSideBar';
import axios from 'axios';

const AddRoles = () => {
  const [fullname, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullname || !email || !role) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/roles', {
        fullname,
        email,
        role,
      });
      console.log('Role added successfully:', res.data);
      // Optionally, clear the form or show a success message
    } catch (err) {
      console.error('Error adding role:', err.response.data);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div className="h-screen bg-[#1F4887] flex justify-center items-center">
      <div className='-ml-52'>
        <AdminSideBar />
      </div>
      <div className="h-auto ml-40">
        <form className="bg-white h-[500px] w-[650px] p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold font-serif pb-4 ml-16">Add Role</h1>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border rounded-lg bg-gray-300 p-2"
              placeholder="Enter your name"
              value={fullname}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border rounded-lg bg-gray-300 p-2"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4 mt-12">
            <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
              Role
            </label>
            <select
              id="role"
              className="w-full border bg-gray-300 rounded-lg p-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="Chairman">Chairman</option>
              <option value="Semester Coordinator">Semester Coordinator</option>
              <option value="Batch Advisor">Batch Advisor</option>
              <option value="Teacher">Teacher</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-72 mt-16 ml-28 bg-[#329987] text-white p-2 rounded-md font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoles;
