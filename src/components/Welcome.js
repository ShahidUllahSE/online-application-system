import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

const Welcome = () => {
  const navigate = useNavigate();

  const handleCreateApplication = () => {
    navigate('/Application2');
  };

  return (
    <div className="Flex Flex-col justify-center items-center bg-[#1F4887]">
      <SideBar/>
    
     
    <div className=" ">
      

      
      <div className="-mt-96 text-center ml-12">
        <h1 className="text-white text-3xl font-bold font-serif">Welcome to SOARS</h1>
        <p className="text-white font-sans text-xl mt-4">
          Start new application by clicking
          <br />
          <span>CREATE NEW APPLICATION</span>
        </p>
        <div className="mt-8">
          <button onClick={handleCreateApplication} className="text-white w-80 text-lg bg-[#329987] p-2 rounded-xl font-semibold">
            Create New Application
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Welcome;
