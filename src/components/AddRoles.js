import React from 'react';
import AdminSideBar from './AdminSideBar'
const AddRoles = () => {
  return (

    <div className="h-screen bg-[#1F4887] flex justify-center items-center">
        
    <div className='-ml-52'>
        <AdminSideBar/>
    </div>
      <div className="h-auto ml-40">
        <form className="bg-white h-[500px] w-[650px] p-8 rounded-lg shadow-md">
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
            />
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="text"
              id="Email"
              className="w-full border rounded-lg bg-gray-300 p-2"
              placeholder="Enter your Email"
            />
          </div>



          <div className="mb-4 mt-12">
            <label htmlFor="options" className="block text-gray-700 text-sm font-bold mb-2">
              Application Type
            </label>
            <select
              id="options"
              placeholder="Select Role"
              className="w-full border bg-gray-300 rounded-lg p-2"
            >
              <option value="option1">Select Role</option>
              <option value="option2">Chairman</option>
              <option value="option3">Semester Coordinator</option>
              <option value="option4">Batch Advisor</option>
              <option value="option5">Teacher</option>
              <option value="option6">Other</option>
             
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
