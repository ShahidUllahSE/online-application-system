import React from "react";
import abtimg from "../assest/abtimg.png";
import icontick from "../assest/iconstick.png";

const About = () => {
  return (
    <div className="bg-gradient-to-r from-[#1F4887] to-[#329987] min-h-screen flex flex-col items-center py-16 px-6">
      <div className="text-white flex flex-col lg:flex-row items-start w-full max-w-5xl">
        <div className="lg:w-2/3 mb-12 lg:mb-0 lg:pr-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">About Us</h1>
          <p className="text-base lg:text-lg leading-relaxed mb-6">
            Welcome to Student Online Application Record System (SOARS)! We are
            dedicated to providing a seamless and efficient platform for
            students to submit their applications online to the department. Our
            mission is to provide a user-friendly platform that promotes
            accessibility, transparency, and efficiency in application
            management. Our dedicated team works tirelessly to ensure the
            success of our system and the satisfaction of our users. We've
            reduced processing times, received positive feedback, and earned
            recognition for our commitment to excellence. We're committed to
            enhancing our system's functionality, expanding our services, and
            fostering partnerships to better serve our users.
          </p>
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-left">
            <h1 className="text-[#1F4887] font-bold text-xl mb-4">What We Do</h1>
            <div className="flex items-start text-sm mb-2 text-[#1F4887]">
              <img src={icontick} alt="tick" className="mr-2 w-5 h-5" />
              <span>Transforming Application System</span>
            </div>
            <div className="flex items-start text-sm mb-2 text-[#1F4887]">
              <img src={icontick} alt="tick" className="mr-2 w-5 h-5" />
              <span>Providing Time Efficiency</span>
            </div>
            <div className="flex items-start text-sm text-[#1F4887]">
              <img src={icontick} alt="tick" className="mr-2 w-5 h-5" />
              <span>And Many More...</span>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 flex justify-center lg:justify-end mt-8 lg:mt-0">
          <img src={abtimg} alt="About Us" className="rounded-lg shadow-lg max-w-full" />
        </div>
      </div>
    </div>
  );
};

export default About;
