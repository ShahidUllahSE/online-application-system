import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from './FacultySidebar';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Add this line for accessibility

const FacultyPendingApp = () => {
  const [users, setUsers] = useState([]);
  const [acceptedUsers, setAcceptedUsers] = useState(new Set());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRemark, setSelectedRemark] = useState('');
  const username = localStorage.getItem('username');
  console.log('Logged in as:', username);
  useEffect(() => {
    console.log('Logged in as:', username);
    alert(`Logged in as: ${username}`);
  }, [username]); // Run this effect when the component mounts and username is available


  // Function to fetch pending applications
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
            'Authorization': `Bearer ${token}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    }
  };

  // Function to fetch accepted applications IDs from localStorage on component mount
  useEffect(() => {
    const acceptedUsersStorage = localStorage.getItem('acceptedUsers');
    if (acceptedUsersStorage) {
      setAcceptedUsers(new Set(JSON.parse(acceptedUsersStorage)));
    }
    fetchPendingApplications(); // Fetch applications on component mount
  }, []); // Empty dependency array to run only on mount

  // Function to save accepted applications IDs to localStorage
  useEffect(() => {
    localStorage.setItem('acceptedUsers', JSON.stringify([...acceptedUsers]));
  }, [acceptedUsers]);

  // Function to handle accepting an application
  const handleAccept = async (user) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('username');

    try {
      // Make the request to accept the application
      await axios.put(
        `http://localhost:5000/accept-application/${user._id}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'userRole': userRole
          }
        }
      );

      // Update local state to remove the accepted application
      setUsers(users => users.filter(u => u._id !== user._id));
      setAcceptedUsers(new Set([...acceptedUsers, user._id]));

      // Show a success message to the user
      alert('Application accepted and moved to completed');
    } catch (error) {
      console.error('Error accepting application:', error);
      alert('Error accepting application');
    }
  };

  // Function to handle role change (if needed)
  const handleRoleChange = (newRole) => {
    // Handle role change logic here if needed
  };

  // Function to open the modal and set the selected remark
  const openModal = (remark) => {
    setSelectedRemark(remark || 'No remarks');
    setModalIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="h-screen bg-[#1F4887] flex items-center justify-center p-4">
      <div className="-ml-8">
        <SideBar onRoleChange={handleRoleChange} />
      </div>

      <div className="absolute top-2 right-2 text-sm text-gray-600">
        Logged in as: {username}
      </div>
      <div className="w-full max-w-7xl mx-auto -mt-24 bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white table-fixed">
          <thead className="bg-gray-300">
            <tr>
              <th className="w-1/12 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th className="w-1/12 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Type</th>
              <th className="w-1/12 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reg. Number</th>
              <th className="w-1/12 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Send To</th>
              <th className="w-1/12 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted At</th>
              <th className="w-2/12 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
              <th className="w-2/12 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={index}>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">{user.fullName}</td>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">{user.applicationType}</td>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">{user.registrationNumber}</td>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">{user.sendTo}</td>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">{new Date(user.submittedAt).toLocaleString()}</td>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900" style={{ maxWidth: '100px', wordWrap: 'break-word' }}>
                  <span onClick={() => openModal(user.remark)} className="cursor-pointer">
                    {user.remark && user.remark.length > 20 ? `${user.remark.slice(0, 20)}...` : (user.remark || 'No remarks')}
                  </span>
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                  {!acceptedUsers.has(user._id) && (
                    <>
                      <button className="mr-2 px-2 py-1 bg-green-500 text-white rounded-md focus:outline-none" onClick={() => handleAccept(user)}>Accept</button>
                      <Link to={`/StudentAppDetail?fullName=${user.fullName}&registrationNumber=${user.registrationNumber}&applicationTitle=${user.applicationTitle}&applicationType=${user.applicationType}&message=${user.message}&semester=${user.semester}&_id=${user._id}&paperNumber=${user.paperNumber}&fypChangeReason=${user.fypChangeReason}&paperName=${user.paperName}`}>
                        <button className="px-2 py-1 bg-red-500 text-white rounded-md focus:outline-none">Process</button>
                      </Link>
                    </>
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

      {/* Modal for displaying the full remark */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Remark Details"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-xl font-bold mb-4">Remark Details</h2>
        <p>{selectedRemark}</p>
        <button onClick={closeModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none">Close</button>
      </Modal>
    </div>
  );
};

export default FacultyPendingApp;
