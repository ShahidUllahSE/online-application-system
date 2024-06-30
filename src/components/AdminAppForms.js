import React, { useEffect, useState } from 'react';
import AdminSideBar from './AdminSideBar.js';

const AdminAppForms = () => {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      // Fetch applications from all relevant endpoints
      const chairmanRes = await fetch('http://localhost:5000/api/chairman-applications');
      const batchAdvisorRes = await fetch('http://localhost:5000/api/batch-advisor-applications');
      const teacherRes = await fetch('http://localhost:5000/api/teacher-applications');
      const semesterCoordinatorRes = await fetch('http://localhost:5000/api/semester-coordinator-applications');
      const otherRes = await fetch('http://localhost:5000/api/other-applications');

      // Check if any fetch request fails
      if (!chairmanRes.ok || !batchAdvisorRes.ok || !teacherRes.ok || !semesterCoordinatorRes.ok || !otherRes.ok) {
        throw new Error('Failed to fetch application data');
      }

      // Parse response data and add 'Sent To' and 'Status' properties
      const chairmanData = await chairmanRes.json();
      const batchAdvisorData = await batchAdvisorRes.json();
      const teacherData = await teacherRes.json();
      const semesterCoordinatorData = await semesterCoordinatorRes.json();
      const otherData = await otherRes.json();

      const allApplications = [
        ...chairmanData.map(app => ({ ...app, sendTo: 'Chairman', status: 'Pending' })),
        ...batchAdvisorData.map(app => ({ ...app, sendTo: 'Batch Advisor', status: 'Pending' })),
        ...teacherData.map(app => ({ ...app, sendTo: 'Teacher', status: 'Pending' })),
        ...semesterCoordinatorData.map(app => ({ ...app, sendTo: 'Semester Coordinator', status: 'Pending' })),
        ...otherData.map(app => ({ ...app, sendTo: 'Other', status: 'Pending' })),
      ];

      // Set the combined data to state
      setApplications(allApplications);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="h-screen flex bg-[#1F4887]">
      <AdminSideBar />
      <div className="flex-grow p-4 overflow-auto">
        <div className="w-full max-w-4xl mx-auto mt-16">
          <table className="w-full border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{application.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{application.sendTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{application.applicationType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{application.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAppForms;
