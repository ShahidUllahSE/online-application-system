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
      alert('Role added successfully:', res.data);
      setName('');
      setEmail('');
      setRole('');
    } catch (err) {
      console.error('Error adding role:', err.response.data);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <div className="flex-grow flex justify-center items-center bg-gradient-to-r from-[#1F4887] to-[#329987] p-4 ml-64"> {/* Added ml-64 to account for the sidebar width */}
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg w-full max-w-2xl">
          <h1 className="text-[#1F4887] text-3xl md:text-4xl font-bold mb-6 text-center">Add Role</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border rounded-lg bg-gray-100 p-2"
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
                className="w-full border rounded-lg bg-gray-100 p-2"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
                Role
              </label>
              <select
                id="role"
                className="w-full border bg-gray-100 rounded-lg p-2"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="Chairman">Chairman</option>
                <option value="Semester Coordinator">Semester Coordinator</option>
                <option value="Batch Advisor">Batch Advisor</option>
                <option value="Teacher">Teacher</option>
                <option value="Other">Other</option>
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

export default AddRoles;
