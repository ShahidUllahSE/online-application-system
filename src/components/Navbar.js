import React from "react";
import Logo from "../assest/logouetpes.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div style={{ backgroundColor: "#1F4887", borderBottom: '2px solid white' }} className="flex flex-wrap justify-between items-center p-2 md:px-6">
      <div className="flex items-center bg-white -mt-3  -ml-6  rounded-br-[19px] p-2 w-full md:w-1/3 lg:w-2/6">
        <div style={{ padding: "5px" ,borderRadius: "50%"  }}>
          <img
            src={Logo}
            alt="logo"
            style={{ width: "70px", backgroundColor: "white" }}
            className="rounded-full"
          />
        </div>
        <div className="ml-5">
          <span className="font-bold text-2xl md:text-3xl font-serif">S O A R S</span>
          <div>
            <span className="block text-xs font-bold">University of Engineering &</span>
            <span className="block text-xs font-bold">Technology Peshawar</span>
          </div>
        </div>
      </div>
      <div className="flex flex-grow justify-center  mt-4 md:mt-0 md:w-2/3 lg:w-auto">
        <ul className="flex space-x-4 md:space-x-6 lg:space-x-20">
        <Link to='/' className="text-white font-medium hover:border-b-2 hover:border-[#329987] "> Home</Link>
          <Link to='/About' className="text-white font-medium hover:border-b-2 hover:border-[#329987]"> About Us</Link>
          <Link to='/Contact' className="text-white font-medium hover:border-b-2  hover:border-[#329987]"> Contact Us</Link>

          {/* <Link to='/Welcome' className="text-white font-medium hover:border-b-2  hover:border-[#329987]"> Welcome</Link> */}
          {/* <Link to='/Application' className="text-white font-medium hover:border-b-2  hover:border-[#329987]"> Application</Link> */}

          {/* <Link to='/AdminAppForms' className="text-white font-medium hover:border-b-2  hover:border-[#329987]"> admin</Link> */}

          {/* <Link to='/SideBar' className="text-white font-medium hover:border-b-2  hover:border-[#329987]"> SideBar</Link> */}

{/* <Link to='/Application2' className="text-white font-medium hover:border-b-2  hover:border-[#329987]"> Application2</Link>  */}
        </ul>
      </div>
      <div className="mt-4 md:mt-0">
        <Link to="/Login">
          <button className="text-white w-24 md:w-28 text-base md:text-lg bg-[#329987] p-2 rounded-xl font-semibold">Log In</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
