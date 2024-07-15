import React from 'react';
import FacultySidebar from './FacultySidebar';

const ApplicationAccepted = () => {
  return (
    <div className="flex h-screen bg-[#1F4887]">
      <FacultySidebar />
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-white font-[sans-serif] text-3xl -mt-52 font-bold">
          Application Accepted Successfully
        </h1>
      </div>
    </div>
  );
};

export default ApplicationAccepted;
