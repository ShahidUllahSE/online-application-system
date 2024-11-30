import React from 'react';
import SideBar from './SideBar';

const ApplicationSubmitted = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-grow flex justify-center items-center bg-gradient-to-r from-[#1F4887] to-[#329987] p-4 ml-64">
        <div
          className="bg-white p-6 md:p-10 rounded-lg shadow-lg text-center w-full max-w-lg mt-12"
          style={{ marginLeft: 'calc(12rem - 4cm)', marginTop: 'calc(3rem + 3cm)' }}
        >
          <h1 className="text-[#1F4887] text-3xl md:text-4xl font-bold mb-4">
            Application Submitted Successfully
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSubmitted;
