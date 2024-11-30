import React from 'react';
import FacultySidebar from './FacultySidebar';

const ApplicationAccepted = () => {
  return (
    <div className="flex min-h-screen">
      <FacultySidebar />
      <div className="flex-grow flex justify-center items-center bg-gradient-to-r from-[#1F4887] to-[#329987] p-4 ml-64">
        <div
          className="bg-white p-6 md:p-10 rounded-lg shadow-lg text-center w-full max-w-lg mt-12"
          style={{ marginLeft: 'calc(12rem - 4cm)', marginTop: 'calc(3rem + 3cm)' }}
        >
          <h1 className="text-[#1F4887] text-3xl md:text-4xl font-bold mb-4">
            Application Accepted Successfully
          </h1>
          <p className="text-gray-700">
            Your application has been accepted and moved to the completed section.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationAccepted;