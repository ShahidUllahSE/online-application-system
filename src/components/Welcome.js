import React from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

const Welcome = () => {
  const navigate = useNavigate();

  const handleCreateApplication = () => {
    navigate('/Application2');
  };

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-grow flex justify-center items-start bg-gradient-to-r from-[#1F4887] to-[#329987] p-4 ml-64">
        <div
          className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center w-11/12 max-w-lg mt-12"
          style={{ marginLeft: 'calc(12rem - 4cm)', marginTop: 'calc(3rem + 3cm)' }}
        >
          <h1 className="text-[#1F4887] text-3xl md:text-4xl font-bold mb-4">Initiate Your Application Process</h1>
          <p className="text-gray-700 text-md md:text-lg mb-8">
            Start a new application by clicking the button below.
          </p>
          <button 
            onClick={handleCreateApplication} 
            className="text-white w-full py-3 text-lg bg-[#1F4887] hover:bg-[#329987] transition-all duration-300 rounded-lg font-semibold shadow-md"
          >
            Create New Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
