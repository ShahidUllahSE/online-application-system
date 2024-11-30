import React, { useEffect, useState } from 'react';
import AdminSideBar from './AdminSideBar'; // Adjust path as needed

const AdminAppForms = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplications = async () => {
    try {
      const completedResponse = await fetch('http://localhost:5000/api/completed-applications');
      const pendingResponse = await fetch('http://localhost:5000/api/pending-applications');

      if (!completedResponse.ok || !pendingResponse.ok) {
        throw new Error('Failed to fetch application data');
      }

      const completedData = await completedResponse.json();
      const pendingData = await pendingResponse.json();

      const allApplications = [...completedData, ...pendingData];
      setApplications(allApplications);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError('Failed to fetch application data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <div className="flex-grow flex justify-center items-start bg-gradient-to-r from-[#1F4887] to-[#329987] p-4 ml-64"> {/* Added ml-64 to account for the sidebar width */}
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg text-center w-full max-w-4xl mt-10">
          <h1 className="text-[#1F4887] text-3xl md:text-4xl font-bold mb-4">Application Forms</h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#1F4887]">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider relative">
                  <span className="relative left-[0.5cm]">Student Name</span>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider relative">
                  <span className="relative left-[3cm]">Sent To</span>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider relative">
                  <span className="relative left-[0.5cm]">Application Type</span>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider relative">
                  <span className="relative left-[0.5cm]">Status</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{application.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.sendTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.applicationType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.status}</td>
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
