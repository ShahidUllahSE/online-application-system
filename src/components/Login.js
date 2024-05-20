import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assest/logo.png';
import login2 from '../assest/login2.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'student' && password === 'student') {
      navigate('/Welcome');
    } else {
      alert('Incorrect username or password');
    }
  };

  return (
    <div className='w-full min-h-full bg-[#1F4887] flex'>
      <div className='left bg-[#FCF7F7] p-8 flex flex-col justify-center items-center md:items-start md:h-full md:mr-2 md:w-[359px] mt-1'>
        <img className='h-16 w-auto -mt-6 -ml-3' src={logo} alt='' />
        <span className="font-bold bg-[#FCF7F7] w-52 -mt-8 shadow-slate-600 text-2xl font-serif">S O A R S</span>
        <div className='flex mt-2 md:mt-0'>
          <span className="block text-xs -mr-4 font-bold">University of Engineering & Technology Peshawar</span>
        </div>
      </div>

      <div className='w-[376px] bg-[#F1F1F1] h-full mt-[100px] -ml-96'>
        <img className='' src={login2} alt='' />
      </div>

      <div className="form bg-white rounded-xl shadow-lg m-4 ml-52 p-8 md:mr-20 md:mt-12 md:w-96">
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <h2 className='text-3xl font-bold font-sans mb-2'>Welcome to SOARS</h2>
          <p className='font-bold font-sans text-sm ml-[75px]'>Login your account</p>
          <div className="mt-10">
            <label htmlFor="username" className="text-sm">UserName:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Type Your UserName here..."
              className="ring-1 ring-gray-300 w-full rounded-md px-2 py-1 mt-1 mb-2 outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password..."
              className="ring-1 ring-gray-300 w-full rounded-md px-2 py-1 mt-1 mb-2 outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <button
            type="submit"
            className="bg-[#329987] text-white p-2 rounded-md font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
