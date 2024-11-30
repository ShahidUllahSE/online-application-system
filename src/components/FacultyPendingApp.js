import React, { useEffect, useState } from 'react';
import FacultySidebar from './FacultySidebar';
import axios from 'axios';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

const FacultyPendingApp = () => {
  const [users, setUsers] = useState([]);
  const [acceptedUsers, setAcceptedUsers] = useState(new Set());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRemark, setSelectedRemark] = useState('');
  const username = localStorage.getItem('username');

  const fetchPendingApplications = async () => {
    const token = localStorage.getItem('token');
    if (token && username) {
      let apiEndpoint = '';
      switch (username) {
        case 'chairman':
          apiEndpoint = 'http://localhost:5000/api/chairman-applications';
          break;
        case 'batch_advisor':
          apiEndpoint = 'http://localhost:5000/api/batch-advisor-applications';
          break;
        case 'teacher':
          apiEndpoint = 'http://localhost:5000/api/teacher-applications';
          break;
        case 'semester_coordinator':
          apiEndpoint = 'http://localhost:5000/api/semester-coordinator-applications';
          break;
        case 'other':
          apiEndpoint = 'http://localhost:5000/api/other-applications';
          break;
        case 'fyp_supervisor':
          apiEndpoint = 'http://localhost:5000/api/fyp-supervisor-applications';
          break;
        case 'associate_chairman':
          apiEndpoint = 'http://localhost:5000/api/associate-chairman-applications';
          break;
        case 'convener_disciplinary_committee':
          apiEndpoint = 'http://localhost:5000/api/convener-disciplinary-committee-applications';
          break;
        case 'convener_scholarship_committee':
          apiEndpoint = 'http://localhost:5000/api/convener-scholarship-committee-applications';
          break;
        case 'coordinator':
          apiEndpoint = 'http://localhost:5000/api/coordinator-applications';
          break;
        case 'mid_exam_rearrangement_committee':
          apiEndpoint = 'http://localhost:5000/api/mid-exam-rearrangement-committee-applications';
          break;
        case 'all_faculty_members':
          apiEndpoint = 'http://localhost:5000/api/all-faculty-members-applications';
          break;
        case 'cms_operator':
          apiEndpoint = 'http://localhost:5000/api/cms-operator-applications';
          break;
        case 'office_assistant':
          apiEndpoint = 'http://localhost:5000/api/office-assistant-applications';
          break;
        default:
          console.error('Invalid role');
          return;
      }

      try {
        const response = await axios.get(apiEndpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    }
  };

  useEffect(() => {
    const acceptedUsersStorage = localStorage.getItem('acceptedUsers');
    if (acceptedUsersStorage) {
      setAcceptedUsers(new Set(JSON.parse(acceptedUsersStorage)));
    }
    fetchPendingApplications();
  }, []);

  useEffect(() => {
    localStorage.setItem('acceptedUsers', JSON.stringify([...acceptedUsers]));
  }, [acceptedUsers]);

  const handleAccept = async (user) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('username');

    try {
      await axios.put(
        `http://localhost:5000/accept-application/${user._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            userRole: userRole,
          },
        }
      );

      setUsers((users) => users.filter((u) => u._id !== user._id));
      setAcceptedUsers(new Set([...acceptedUsers, user._id]));

      alert('Application accepted and moved to completed');
    } catch (error) {
      console.error('Error accepting application:', error);
      alert('Error accepting application');
    }
  };

  const openModal = (remark) => {
    setSelectedRemark(remark || 'No remarks');
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex min-h-screen">
      <FacultySidebar />
      <div className="flex-grow flex justify-center items-start bg-gradient-to-r from-[#1F4887] to-[#329987] p-4 ml-64">
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg w-full mt-10 overflow-x-auto">
          <h1 className="text-[#1F4887] text-3xl md:text-4xl font-bold mb-4 text-center">Pending Applications</h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#1F4887] text-white">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Full Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Application Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Reg. Number</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Send To</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Submitted At</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Remarks</th>

                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.applicationType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.registrationNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.sendTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.status}</td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.submittedAt).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" style={{ maxWidth: '100px', wordWrap: 'break-word' }}>
                    <span onClick={() => openModal(user.remark)} className="cursor-pointer">
                      {user.remark && user.remark.length > 20 ? `${user.remark.slice(0, 20)}...` : (user.remark || 'No remarks')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {!acceptedUsers.has(user._id) && (
                      <Link to={`/StudentAppDetail?fullName=${user.fullName}&registrationNumber=${user.registrationNumber}&applicationTitle=${user.applicationTitle}&applicationType=${user.applicationType}&message=${user.message}&semester=${user.semester}&_id=${user._id}&paperNumber=${user.paperNumber}&fypChangeReason=${user.fypChangeReason}&paperName=${user.paperName}`}>
                        <button className="px-2 py-1 bg-red-500 text-white rounded-md focus:outline-none">Process</button>
                      </Link>
                    )}
                    {acceptedUsers.has(user._id) && (
                      <span className="text-sm text-green-500">Accepted</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Remark Details"
        className="modal bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto my-20 responsive-modal"
        overlayClassName="modal-overlay bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center"
      >
        <h2 className="text-2xl font-semibold mb-4">Remark</h2>
        <p className="text-gray-700 break-words">{selectedRemark}</p>
        <button onClick={closeModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">Close</button>
      </Modal>
    </div>
  );
};

export default FacultyPendingApp;
