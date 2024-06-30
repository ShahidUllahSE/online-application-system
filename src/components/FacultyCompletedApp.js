import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import UserData from './UsersData.js';
import FacultySidebar from './FacultySidebar.js';

const API = "https://jsonplaceholder.typicode.com/users";

const FacultyCompletedApp = () => {
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
    <div className="h-screen bg-[#1F4887] flex">
      <div className="flex-none">
        <FacultySidebar />
      </div>
      <div className="flex-grow flex items-center justify-center">
        <table className="w-full max-w-4xl border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch No</th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Type</th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attached Files</th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Concerned Department</th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">{user.batchNo}</td>
                <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">{user.applicationType}</td>
                <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">{user.attachedFiles}</td>
                <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">{user.concernedDepartment}</td>
                <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">{user.status}</td>
                <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-500 hover:text-blue-700 mx-1">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-red-500 hover:text-red-700 mx-1">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacultyCompletedApp;