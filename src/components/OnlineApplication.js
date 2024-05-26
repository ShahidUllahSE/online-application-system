import React from 'react';

const OnlineApplication = () => {
  return (
    <div className="h-screen bg-[#1F4887] flex justify-center items-center">
      <div className="h-auto">
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
          <div className="mb-4 mt-12">
            <label htmlFor="options" className="block text-gray-700 text-sm font-bold mb-2">
              Application Type
            </label>
            <select
              id="options"
              placeholder="Choose Application Type"
              className="w-full border bg-gray-300 rounded-lg p-2"
            >
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

export default OnlineApplication;
