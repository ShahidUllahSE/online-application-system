import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import AdminSideBar from './AdminSideBar';

function AdminPie() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Applications',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/application-counts');
        const counts = res.data;

        setData({
          labels: [
            'Chairman',
            'Teacher',
            'Batch Advisor',
            'Semester Coordinator',
            'Other',
            'FYP Supervisor',
            'Associate Chairman',
            'Convener Disciplinary Committee',
            'Convener Scholarship Committee',
            'Coordinator',
            'Mid Exam Rearrangement Committee',
            'All Faculty Members',
            'CMS Operator',
            'Office Assistant',
          ],
          datasets: [
            {
              label: 'Number of Applications',
              data: [
                counts.chairman,
                counts.teacher,
                counts.batchAdvisor,
                counts.semesterCoordinator,
                counts.other,
                counts.fypSupervisor,
                counts.associateChairman,
                counts.convenerDisciplinaryCommittee,
                counts.convenerScholarshipCommittee,
                counts.coordinator,
                counts.midExamRearrangementCommittee,
                counts.allFacultyMembers,
                counts.cmsOperator,
                counts.officeAssistant,
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        console.error('Error fetching application counts:', err);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Applications by Role',
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },
    },
    maintainAspectRatio: false,
    aspectRatio: 2,
    width: 800,
    height: 700,
  };

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="flex-1 max-w-screen-lg mx-auto p-4 md:p-6">
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center mb-1 relative">
              <h5 className="text-xl font-bold leading-none text-gray-900 me-1">
                Applications by Role
              </h5>
              <svg
                className="w-3.5 h-3.5 text-gray-500 hover:text-gray-900 cursor-pointer ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
              </svg>
            </div>
            {/* <button
              id="dateRangeButton"
              data-dropdown-toggle="dateRangeDropdown"
              data-dropdown-ignore-click-outside-className="datepicker"
              type="button"
              className="inline-flex items-center text-blue-700 font-medium hover:underline"
            >
              31 Nov - 31 Dec{' '}
              <svg
                className="w-3 h-3 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button> */}
            <div
              id="dateRangeDropdown"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-80 lg:w-96"
            >
              <div className="p-3" aria-labelledby="dateRangeButton">
                <div
                  date-rangepicker
                  datepicker-autohide
                  className="flex items-center"
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                    <input
                      name="start"
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring
focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                      placeholder="Select date start"
                    />
                  </div>
                  <span className="mx-4 text-gray-500">to</span>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                    <input
                      name="end"
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                      placeholder="Select date end"
                    />
                  </div>
                </div>
                <div className="flex items-center pt-3 space-x-2 border-t border-gray-200">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
                  >
                    Apply
                  </button>
                  <button
                    type="button"
                    className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2 text-center"
                    data-dropdown-toggle="dateRangeDropdown"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="relative aspect-w-16 aspect-h-9 h-96">
            <Pie data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPie;
