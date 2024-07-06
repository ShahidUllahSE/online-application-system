import React from 'react';
import Image from '../assest/image.jpeg';
import { FaArrowRight } from 'react-icons/fa';
import SvgImg from '../assest/svg-image.svg';
import SvgImge from '../assest/svg-image2.svg';
import SvgImg3 from '../assest/svg-images.svg';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className='h-screen bg-[#1F4887] '>
      <div className='flex items-center ml-10'>
        <div className='md:w-full md:mb-32 lg:w-full lg:-mt-20'>
          <span className='text-white font-[sans-serif] text-3xl font-bold'>Student Online Application</span>
          <span className='text-white font-[sans-serif] text-3xl font-bold block mt-1'>Record System</span>
        </div>
        <div className='flex items-center ml-7 md:mt-10'>
          <img
            src={Image}
            alt="img"
            style={{ width: "50%", backgroundColor: "white" }}
            className="rounded-3xl md:ml-40"
          />
        </div>
      </div>
      <div className='flex flex-col md:ml-10 md:-mt-40 lg:-mt-56'>
        <span className='text-white font-[sans-serif] text-sm font-bold'>Here you can select type of application and also you can create</span>
        <span className='text-white font-[sans-serif] text-sm font-bold'>new application and also you can upload your pdf documents</span>
        <span className='text-white font-[sans-serif] text-sm font-bold'>which are required for the application it depends on type of</span>
        <span className='text-white font-[sans-serif] text-sm font-bold'>application.</span>
      </div>
      <div className='flex ml-16 mt-16'>
        <Link to='/Login'>
        <button style={{ fontSize: '19px' }} className='flex items-center justify-between bg-[#329987] p-4 rounded-lg w-[350px] h-[44px] gap-0 text-white font-semibold'>
          File an Application
          <FaArrowRight className='w-10' size={20} />
        </button>
        </Link>
      </div>
      {/* <div className='flex mt-16 lg:ml-auto mr-24  items-center flex-col bg-white rounded-lg lg:w-[65%] h-[200px]  '>
        <span className='mt-2 mr-30 justify-center'>Online Application Process</span>
        <div className='flex  mt-3 mr-auto ml-5 space-x-20 w-16'>
          <img className='ml-1 ' src={SvgImg} alt='' />
          <div className='flex flex-col  -mb-2 items-center'>
            <h3 className='-ml-40 mt-8'>Step1</h3>
            <span className='-ml-16  text-xs w-32'>create an Account
              <br />
              login
            </span>
          </div>

          <img src={SvgImge} alt='' />
          <div className='flex flex-col  -mb-2 px-4'>
            <h3 className='-ml-24  mt-8'>Step2</h3>
            <span className='-ml-24 w-36  text-xs '>create an Application Form
              <br />
              Complete Application
            </span>
          </div>

          <img src={SvgImg3} alt='' />
          <div className='flex flex-col  -mb-2 '>
            <h3 className='-ml-24 mt-3'>Step3</h3>
            <span className='-ml-16   text-xs '>Submit Your Application
              check application status            </span>
              <br />
          </div>


        </div>
      </div> */}
    </div>
  );
};

export default Home;
