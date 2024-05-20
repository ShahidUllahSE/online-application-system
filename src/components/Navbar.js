import React from "react";
import Logo from "../assest/logouetpes.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div style={{ backgroundColor: "#1F4887", borderBottom:'2px solid white'  }} className="flex justify-between items-center">
      <div  className="flex w-1/3 md:w-1/3 lg:w-2/6 bg-white rounded-br-[19px] " >
        <div style={{ padding: "5px", borderRadius: "50%" }}>
          <img
            src={Logo}
            alt="logo"
            style={{ width: "70px", backgroundColor: "white" }}
          />
        </div>
        <div className="ml-5">
          <span className="font-bold text-3xl font-serif">S O A R S</span>
          <div>
            <span className="block text-xs font-bold">University of Engineering & </span>
            <span className="block text-xs font-bold">Technology Peshawar</span>
          </div>
        </div>
      </div>
      <div className="w-2/3 ml-auto flex justify-center">
        <ul className="flex space-x-4 md:space-x-20 lg:space-x-32  mr-4 md:mr-0">
          <Link to='/Home' className="text-white font-medium hover:border-b-2 hover:border-[#329987] "> Home</Link>
          {/* <Link to='/About' className="text-white font-medium hover:border-b-2 hover:border-[#329987]"> About Us</Link>
          <Link to='/Contact' className="text-white font-medium hover:border-b-2  hover:border-[#329987]"> Contact Us</Link> */}

          <Link to='/Welcome' className="text-white font-medium hover:border-b-2  hover:border-[#329987]"> Welcome</Link>
          <Link to='/Application' className="text-white font-medium hover:border-b-2  hover:border-[#329987]"> Application</Link>

          <Link to='/AdminAppForms' className="text-white font-medium hover:border-b-2  hover:border-[#329987]"> admin</Link>

<Link to='/Application2' className="text-white font-medium hover:border-b-2  hover:border-[#329987]"> Application2</Link> 




        </ul>
      </div>
      <div>
      <Link to="/Login">
  <button className="text-white w-28 ml-10 mr-8 text-lg bg-[#329987] p-2 rounded-xl font-semibold">Log In</button>
</Link>    
  </div>
    </div>
  );
};

export default Navbar;
