import React, { useEffect, useState } from 'react';
import AdminSideBar from './AdminSideBar';
import axios from 'axios';

const API = 'http://localhost:5000/api/roles'; // Update with your actual backend URL

const Pending_Applications = () => {
  const [roles, setRoles] = useState([]);
  const [editRoleId, setEditRoleId] = useState(null);
  const [newRole, setNewRole] = useState('');

  const fetchRoles = async () => {
    try {
      const res = await axios.get(API);
      setRoles(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRoleUpdate = async (id) => {
    try {
      const res = await axios.put(`${API}/${id}`, { role: newRole });
      setRoles(roles.map(role => (role._id === id ? res.data : role)));
      setEditRoleId(null);
      setNewRole('');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div className="h-screen bg-[#1F4887] flex flex-col items-center justify-center">
      <div className='mt-0 -ml-[1010px]'>
        <AdminSideBar />
      </div>
      <div className="flex-grow p-4 -mt-[870px] ml-60 flex items-center justify-center w-full">
        <table className="w-full max-w-4xl mt-16 border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map(role => (
              <tr key={role._id}>
                <td className="px-6 py-4 whitespace-nowrap">{role.fullname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{role.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editRoleId === role._id ? (
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="w-full border rounded-lg bg-gray-300 p-2"
                    >
                      <option value="">Select Role</option>
                      <option value="Chairman">Chairman</option>
                      <option value="Semester Coordinator">Semester Coordinator</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Batch Advisor">Batch Advisor</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    role.role
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editRoleId === role._id ? (
                    <button
                      onClick={() => handleRoleUpdate(role._id)}
                      className="bg-green-500 text-white py-1 px-2 rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditRoleId(role._id);
                        setNewRole(role.role);
                      }}
                      className="bg-yellow-500 text-white py-1 px-2 rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pending_Applications;
