import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assest/logo.png';
import loginImage from '../assest/login2.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Check if the entered username and password match hardcoded credentials first
      const hardcodedCredentials = {
        admin: { username: 'admin', password: 'admin123' },
        chairman: { username: 'chairman', password: 'chairman123' },
        batch_advisor: { username: 'batch_advisor', password: 'batch_advisor123' },
        teacher: { username: 'teacher', password: 'teacher123' },
        semester_coordinator: { username: 'semester_coordinator', password: 'semester_coordinator123' },
        other: { username: 'other', password: 'other123' },
        fyp_supervisor: { username: 'fyp_supervisor', password: 'fyp_supervisor123' },
        associate_chairman: { username: 'associate_chairman', password: 'associate_chairman123' },
        convener_disciplinary_committee: { username: 'convener_disciplinary_committee', password: 'convener_disciplinary_committee123' },
        convener_scholarship_committee: { username: 'convener_scholarship_committee', password: 'convener_scholarship_committee123' },
        coordinator: { username: 'coordinator', password: 'coordinator123' },
        mid_exam_rearrangement_committee: { username: 'mid_exam_rearrangement_committee', password: 'mid_exam_rearrangement_committee123' },
        all_faculty_members: { username: 'all_faculty_members', password: 'all_faculty_members123' },
        cms_operator: { username: 'cms_operator', password: 'cms_operator123' },
        office_assistant: { username: 'office_assistant', password: 'office_assistant123' },
        student: { username: 'shahid321', password: 'shahid321' }
      };

      const user = hardcodedCredentials[username];
      if (user && user.password === password) {
        localStorage.setItem('username', username);
        if( username ==='admin' && user.password === password)
          {

            navigate('/AdminAppForms');
          }
          else
        navigate('/FacultyDashboard'); // Navigate based on role
        return;
      }

      // If not matched in hardcoded, then try with MongoDB credentials
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });

      if (res.data.token) {
        const { token, username } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        navigate('/Welcome'); // Navigate to Welcome page or appropriate dashboard
      } else {
        alert('Incorrect username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed');
    }
  };

  return (
    <div className='w-full min-h-full bg-[#1F4887] flex'>
      {/* Left side content */}
      <div className='left bg-[#FCF7F7] p-8 flex flex-col justify-center items-center md:items-start md:h-full md:mr-2 md:w-[359px] mt-1'>
        <img className='h-16 w-auto -mt-6 -ml-3' src={logo} alt='' />
        <span className="font-bold bg-[#FCF7F7] w-52 -mt-8 shadow-slate-600 text-2xl font-serif">S O A R S</span>
        <div className='flex mt-2 md:mt-0'>
          <span className="block text-xs -mr-4 font-bold">University of Engineering & Technology Peshawar</span>
        </div>
      </div>

      {/* Right side image */}
      <div className='w-[376px] bg-[#F1F1F1] h-full mt-[100px] -ml-96'>
        <img className='' src={loginImage} alt='' />
      </div>

      {/* Login form */}
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
