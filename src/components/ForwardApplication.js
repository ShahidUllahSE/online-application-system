import React from 'react';
import FacultySidebar from './FacultySidebar';

const ForwardApplication = () => {
  return (
    <div className="flex min-h-screen">
      <FacultySidebar />
      <div className="flex-grow flex items-center justify-center bg-gradient-to-r from-[#1F4887] to-[#329987] p-4 ml-64">
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg text-center w-full max-w-4xl mt-10">
          <h1 className="text-[#1F4887] text-3xl md:text-4xl font-bold">
            Application Forwarded Successfully
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ForwardApplication;
