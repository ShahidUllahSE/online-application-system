import React, { useEffect, useState } from 'react';
import UserData from './UsersData.js';
import SideBar from './SideBar.js';

const API = "https://jsonplaceholder.typicode.com/users";

const Completed_Applications = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.length > 0) {
        setUsers(data);
      }
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers(API);
  }, []);

  return (
    <div className="h-screen bg-[#1F4887]  flex items-center justify-center">
        
        <div className='-ml-28'>


        <SideBar/>
        </div>

      <table className="w-full max-w-4xl -mt-24 ml-8 border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-300">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <UserData users={users} />
        </tbody>
      </table>
    </div>
  );
};

export default Completed_Applications;
