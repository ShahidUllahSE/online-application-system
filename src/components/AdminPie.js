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
          'rgba(75, 192, 192, 0.2)', // Teal
          'rgba(255, 99, 132, 0.2)', // Light Pink
          'rgba(54, 162, 235, 0.2)', // Light Blue
          'rgba(255, 206, 86, 0.2)', // Light Yellow
          'rgba(153, 102, 255, 0.2)', // Light Purple
          'rgba(255, 159, 64, 0.2)', // Light Orange
          'rgba(199, 199, 199, 0.2)', // Light Gray
          'rgba(100, 181, 246, 0.2)', // Light Cyan
          'rgba(255, 138, 101, 0.2)', // Light Coral
          'rgba(174, 213, 129, 0.2)', // Light Green
          'rgba(186, 104, 200, 0.2)', // Light Magenta
          'rgba(121, 85, 72, 0.2)', // Light Brown
          'rgba(144, 164, 174, 0.2)', // Light Slate Gray
          'rgba(0, 150, 136, 0.2)', // Light Teal
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)', // Teal
          'rgba(255, 99, 132, 1)', // Pink
          'rgba(54, 162, 235, 1)', // Blue
          'rgba(255, 206, 86, 1)', // Yellow
          'rgba(153, 102, 255, 1)', // Purple
          'rgba(255, 159, 64, 1)', // Orange
          'rgba(199, 199, 199, 1)', // Gray
          'rgba(100, 181, 246, 1)', // Cyan
          'rgba(255, 138, 101, 1)', // Coral
          'rgba(174, 213, 129, 1)', // Green
          'rgba(186, 104, 200, 1)', // Magenta
          'rgba(121, 85, 72, 1)', // Brown
          'rgba(144, 164, 174, 1)', // Slate Gray
          'rgba(0, 150, 136, 1)', // Teal
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
                'rgba(75, 192, 192, 0.2)', // Teal
                'rgba(255, 99, 132, 0.2)', // Light Pink
                'rgba(54, 162, 235, 0.2)', // Light Blue
                'rgba(255, 206, 86, 0.2)', // Light Yellow
                'rgba(153, 102, 255, 0.2)', // Light Purple
                'rgba(255, 159, 64, 0.2)', // Light Orange
                'rgba(199, 199, 199, 0.2)', // Light Gray
                'rgba(100, 181, 246, 0.2)', // Light Cyan
                'rgba(255, 138, 101, 0.2)', // Light Coral
                'rgba(174, 213, 129, 0.2)', // Light Green
                'rgba(186, 104, 200, 0.2)', // Light Magenta
                'rgba(121, 85, 72, 0.2)', // Light Brown
                'rgba(144, 164, 174, 0.2)', // Light Slate Gray
                'rgba(0, 150, 136, 0.2)', // Light Teal
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)', // Teal
                'rgba(255, 99, 132, 1)', // Pink
                'rgba(54, 162, 235, 1)', // Blue
                'rgba(255, 206, 86, 1)', // Yellow
                'rgba(153, 102, 255, 1)', // Purple
                'rgba(255, 159, 64, 1)', // Orange
                'rgba(199, 199, 199, 1)', // Gray
                'rgba(100, 181, 246, 1)', // Cyan
                'rgba(255, 138, 101, 1)', // Coral
                'rgba(174, 213, 129, 1)', // Green
                'rgba(186, 104, 200, 1)', // Magenta
                'rgba(121, 85, 72, 1)', // Brown
                'rgba(144, 164, 174, 1)', // Slate Gray
                'rgba(0, 150, 136, 1)', // Teal
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
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const total = tooltipItem.dataset.data.reduce((acc, currentValue) => acc + currentValue, 0);
            const currentValue = tooltipItem.raw;
            const percentage = ((currentValue / total) * 100).toFixed(2);
            return `${currentValue} (${percentage}%)`;
          },
        },
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
    <div className="flex min-h-screen">
      <AdminSideBar />
      <div className="flex-grow flex justify-center items-center bg-gradient-to-r from-[#1F4887] to-[#329987] p-4 ml-64">
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg w-full max-w-4xl mt-10">
          <h1 className="text-[#1F4887] text-3xl md:text-4xl font-bold mb-4 text-center">Applications by Role</h1>
          <div className="relative aspect-w-16 aspect-h-9 h-96">
            <Pie data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPie;
