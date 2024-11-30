import React from 'react';
import Image from '../assest/image.jpeg';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className='min-h-screen bg-gradient-to-r from-[#1F4887] to-[#329987] flex flex-col items-center'>
      <div className='container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center'>
        <div className='lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left'>
          <h1 className='text-white font-sans text-3xl lg:text-4xl font-bold mb-4'>
            Student Online Application
          </h1>
          <h2 className='text-white font-sans text-3xl lg:text-4xl font-bold'>
            Record System
          </h2>
          <p className='text-white font-sans text-sm lg:text-lg mt-6'>
            Here you can select the type of application and create new applications. You can also upload your PDF documents required for the application, depending on the type of application.
          </p>
          <div className='mt-8'>
            <Link to='/Login'>
              <button className='flex items-center bg-[#329987] hover:bg-[#287a6e] transition duration-300 text-white font-semibold py-2 px-4 rounded-lg text-lg'>
                File an Application - Login
                <FaArrowRight className='ml-2' size={20} />
              </button>
            </Link>
          </div>
        </div>
        <div className='lg:w-1/3 flex justify-center'>
          <img
            src={Image}
            alt="Student Online Application"
            className="rounded-3xl shadow-lg w-full max-w-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
