import React from 'react';
import Sidebar from './SideBar';

const Application2 = () => {
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

        <div className="fixed left-0  z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 -mt-2">
          <Sidebar />
        </div>
        
        <div className="flex justify-center -mt-4 pt-16 items-center h-auto bg-[#1F4887]">
          <form className="bg-white ml-52 h-[500px] w-[650px] p-8 rounded-lg -mt-8 shadow-md">
            <h1 className="text-3xl font-bold font-serif pb-4 ml-16">Online Application Form</h1>
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-60 border rounded-lg bg-gray-300 p-2"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="reg" className="block text-gray-700 text-sm font-bold mb-2">
                Registration No.
              </label>
              <input
                type="text"
                id="reg"
                className="w-60 border rounded-lg bg-gray-300 p-2"
                placeholder="Enter your Registration Number"
              />
            </div>
            
            <div className="mb-4 mt-4">
              <label htmlFor="options" className="block text-gray-700 text-sm font-bold mb-2">
                Application Type
              </label>
              <select id="options" className="w-60 border bg-gray-300 rounded-lg p-2">
                <option value="option1">Choose Application Type</option>
                <option value="option2">Freezing Semester</option>
                <option value="option3">Admission Cancellation</option>
                <option value="option4">Rearrangement Of Mid Exam</option>
                <option value="option5">Active Enrollment</option>
                <option value="option6">Course Completion Certificate</option>
                <option value="option7">Change Subject</option>
                <option value="option8">Arrange Paper</option>
                <option value="option9">Change FYP Project</option>
                <option value="option10">Course Withdrawal</option>
                <option value="option11">Change Supervisor</option>
                <option value="option12">Educational Documents</option>
                <option value="option13">Other</option>
              </select>
            </div>

            <div className="mb-4 mt-4">
              <label htmlFor="sendTo" className="block text-gray-700 text-sm font-bold mb-2">
                Send To
              </label>
              <select id="sendTo" className="w-60 border bg-gray-300 rounded-lg p-2">
                <option value="option1">To Chairman</option>
                <option value="option2">To Semester Coordinator</option>
                <option value="option3">To Batch Advisor</option>
                <option value="option4">To Teacher</option>
                <option value="option5">Other</option>
              </select>
            </div>

            <div className="w-full ml-[320px] -mt-80 mb-4">
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                Message
              </label>
              <textarea
                id="message"
                className="w-60 h-72 border bg-gray-300 rounded-lg p-2"
                placeholder="Enter your message here"
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
