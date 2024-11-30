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

  const handleRoleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setRoles(roles.filter(role => role._id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#1F4887]">
      <AdminSideBar />
      <div className="flex-grow flex justify-center items-start bg-gradient-to-r from-[#1F4887] to-[#329987] p-4 ml-64"> {/* Added ml-64 to account for the sidebar width */}
        <div className="w-full max-w-6xl bg-white p-6 md:p-10 rounded-lg shadow-lg mt-4">
          <h1 className="text-3xl font-bold font-serif text-center mb-6 text-[#1F4887]">Roles Management</h1>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-[#1F4887] text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Full Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
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
                          <option value="Batch Advisor">Batch Advisor</option>
                          <option value="Teacher">Teacher</option>
                          <option value="Other">Other</option>
                          <option value="FYP Supervisor">FYP Supervisor</option>
                          <option value="Associate Chairman">Associate Chairman</option>
                          <option value="Convener Disciplinary Committee">Convener Disciplinary Committee</option>
                          <option value="Convener Scholarship Committee">Convener Scholarship Committee</option>
                          <option value="Coordinator">Coordinator</option>
                          <option value="Mid Exam Rearrangement Committee">Mid Exam Rearrangement Committee</option>
                          <option value="All Faculty Members">All Faculty Members</option>
                          <option value="CMS Operator">CMS Operator</option>
                          <option value="Office Assistant">Office Assistant</option>
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
                        <>
                          <button
                            onClick={() => {
                              setEditRoleId(role._id);
                              setNewRole(role.role);
                            }}
                            className="bg-yellow-500 text-white py-1 px-2 rounded-lg hover:bg-yellow-600 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleRoleDelete(role._id)}
                            className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pending_Applications;
