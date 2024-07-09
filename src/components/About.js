import React from "react";
import abtimg from "../assest/abtimg.png";
import icontick from "../assest/iconstick.png";

const About = () => {
  return (
    <div className="bg-[#1F4887] min-h-screen  ">
      <div className="text-white flex  ">
        <div>
          <h1 className="mt-16 mx-60 text-3xl font-bold">About Us</h1>

          <p className="w-[640px] h-[250px]  mt-3 mx-28 ">
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
        </div>

        <div className="image w-[514px] h-[500px]  mt-16 mr-16 ">
          <img src={abtimg} alt="" />
        </div>
      </div>



      <div className="flex flex-col w-[380px] h-[100px]  rounded-xl bg-white -mt-36 ">
        <h1 className="text-black items-center mx-32  font-bold font-[Gudea] ">What We Do</h1>
        <div className=" inline-flex mx-2 text-sm space-x-2">
        <img src={icontick} alt="" />
        <span> Transforming Application System</span>
        </div>
        <div className=" inline-flex mx-2 text-sm space-x-2">
        <img src={icontick} alt="" />
        <span> Providing Time Efficiency</span>
        </div>
        <div className=" inline-flex mx-2 text-sm space-x-2">
        <img src={icontick} alt="" />
        <span> And Many More...</span>
        </div>
        

        </div>
    </div>
  );
};

export default About;
