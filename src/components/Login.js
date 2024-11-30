import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
        const storedUsername = username || 'Student'; // Default to 'Student' if username is undefined
        localStorage.setItem('username', storedUsername);
        if (username === 'admin' && user.password === password) {
          navigate('/AdminAppForms');
        } else {
          navigate('/FacultyDashboard'); // Navigate based on role
        }
        return;
      }

      // If not matched in hardcoded, then try with MongoDB credentials
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });

      if (res.data.token) {
        const { token, username } = res.data;
        const storedUsername = username || 'Student'; // Default to 'Student' if username is undefined
        localStorage.setItem('token', token);
        localStorage.setItem('username', storedUsername);
        navigate('/Welcome'); // Navigate to Welcome page or appropriate dashboard
      } else {
        alert('Incorrect username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Incorrect username or password');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#1F4887] to-[#329987] items-center justify-center p-4">
      <div className="hidden md:flex md:w-1/2 lg:w-2/5">
        <img src={loginImage} alt="Login Illustration" className="object-cover w-full h-full rounded-l-lg" />
      </div>
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 lg:w-2/5 bg-white p-8 md:p-16 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-[#1F4887] mb-2">Welcome to SOARS</h2>
        <p className="text-sm text-gray-600 mb-8">Login to your account</p>
        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Type your username here..."
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#329987] focus:border-[#329987]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type your password here..."
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#329987] focus:border-[#329987]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#329987] text-white rounded-md font-semibold hover:bg-[#287a6e] transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
