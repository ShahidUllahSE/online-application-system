import React, { useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import icup from '../assest/icup.png';
import { AuthContext } from '../Contexts/AuthContext';

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve username from localStorage, default to 'Student' if not available
  const username = localStorage.getItem('username') || 'Student';

  // Debug statement to log username retrieval
  useEffect(() => {
    console.log("Stored username:", localStorage.getItem('username'));
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('username');
    navigate('/Login');
  };

  const isLoginPage = location.pathname === '/Login';

  return (
    <div
      style={{ backgroundColor: "#1F4887", borderBottom: '2px solid white', position: 'sticky', top: '0', zIndex: '1000' }}
      className="flex flex-wrap justify-between items-center p-2 md:px-6"
    >
      <div className="flex items-center bg-[1F4887] text-white rounded-br-[19px] p-2 w-full md:w-1/3 lg:w-2/6" style={{ opacity: 0.8 }}>
        <div style={{ padding: "5px", borderRadius: "50%" }}>
          <img
            src={icup}
            alt="logo"
            style={{ width: "70px", backgroundColor: "white" }}
            className="rounded-full"
          />
        </div>
        <div className="ml-5">
          <span className="font-bold text-2xl md:text-3xl font-serif">S O A R S</span>
          <div>
            <span className="block text-xs font-bold">Islamia College University</span>
            <span className="block text-xs font-bold"> Peshawar</span>
          </div>
        </div>
      </div>
      <div className="flex flex-grow justify-center md:w-2/3 lg:w-auto">
        <ul className="flex space-x-4 mt-8 md:space-x-6 lg:space-x-20">
          <Link to="/" className="text-white font-medium hover:border-b-2 hover:border-[#329987]"> Home</Link>
          <Link to="/About" className="text-white font-medium hover:border-b-2 hover:border-[#329987]"> About Us</Link>
          <Link to="/Contact" className="text-white font-medium hover:border-b-2 hover:border-[#329987]"> Contact Us</Link>
        </ul>
      </div>
      <div className="mt-4 md:mt-0">
        {!isLoginPage && (
          <span className="text-white text-sm md:text-base"></span>
        )}
        {isLoggedIn ? (
          <button onClick={handleLogout} className="text-white w-24 md:w-28 text-base md:text-lg bg-[#329987] p-2 rounded-xl font-semibold">
            Log Out
          </button>
        ) : (
          <Link to="/Login">
            {/* Uncomment the button if you want to display the login button */}
            {/* <button className="text-white w-24 md:w-28 text-base md:text-lg bg-[#329987] p-2 rounded-xl font-semibold">Log In</button> */}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
