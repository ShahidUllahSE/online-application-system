import React, { useEffect, useState } from 'react';
import SideBar from './SideBar.js';

import UserData from './UsersData.js';


const API = "https://jsonplaceholder.typicode.com/users";

const AdminAppForms = () => {
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
    <div className="h-screen -mt-4 bg-[#1F4887] flex">
<SideBar/>
<div>
        

        
        <div className="flex-grow p-4  flex items-center justify-center sm:ml-64">
        
        <table className="w-full max-w-4xl mt-16  border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-300">
            <tr >
              <th className="px-6  py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
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
      </div>
    </div>
  );
};

export default AdminAppForms;
