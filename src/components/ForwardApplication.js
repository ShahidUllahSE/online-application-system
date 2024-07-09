import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const ForwardApplication = () => {
    const navigate=useNavigate();
    return (
    <div className='h-screen bg-[#1F4887] '>
      
      <div className='flex justify-center text-center '>
      <h1 className='text-white font-[sans-serif] text-3xl font-bold mt-52 '>Application Forwarded successfully</h1>
      </div>
     
    </div>
  );
};

export default ForwardApplication;
