import React from 'react';
import SideBar from './SideBar';

const ApplicationSubmitted = () => {
  return (
    <div className="flex h-screen bg-[#1F4887]">
      <SideBar />
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-white font-[sans-serif] text-3xl -mt-52 font-bold">
          Application Submitted successfully
        </h1>
      </div>
    </div>
  );
};

export default ApplicationSubmitted;
