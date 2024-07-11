import React from 'react';
import FacultySidebar from './FacultySidebar';

const ForwardApplication = () => {
  return (
    <div className="flex h-screen bg-[#1F4887]">
      <FacultySidebar />
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-white font-[sans-serif] -mt-52 text-3xl font-bold">
          Application Forwarded successfully
        </h1>
      </div>
    </div>
  );
};

export default ForwardApplication;
