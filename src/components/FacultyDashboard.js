import React from 'react';
import { Link } from 'react-router-dom';
import FacultySidebar from './FacultySidebar';


function FacultyDashboard() {
  return (
    <div className="Flex Flex-col justify-center items-center bg-[#1F4887]">
      <FacultySidebar/>
     
    <div className=" ">
      

      
      <div className="-mt-96 text-center ml-12">
        <h1 className="text-white text-3xl font-bold font-serif">Welcome to SOARS</h1>
        {/* <p className="text-white font-sans text-xl mt-4">
          Start new application by clicking
          <br />
          <span>CREATE NEW APPLICATION</span>
        </p> */}
        <div className="mt-8">
         
        </div>
      </div>
    </div>
    </div>
  )
}

export default FacultyDashboard;