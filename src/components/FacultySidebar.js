import React from 'react';
import { Link } from 'react-router-dom';

const FacultySidebar = () => {
  return (
    <div className="min-h-screen fixed top-16 bg-[#1F4887] w-64">
      <div className="h-full p-4 text-white">
        <ul className="space-y-4 mt-16">
          <li>
            <Link
              to="/FacultyDashboard"
              className="flex items-center p-2 text-white rounded-lg hover:bg-[#329987] transition-all duration-300"
            >
              <svg
                className="w-6 h-6 text-white mr-2"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/FacultyCompletedApp"
              className="flex items-center p-2 text-white rounded-lg hover:bg-[#329987] transition-all duration-300"
            >
              <svg
                className="w-6 h-6 text-white mr-2"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Completed Applications</span>
            </Link>
          </li>
          <li>
            <Link
              to="/FacultyPendingApp"
              className="flex items-center p-2 text-white rounded-lg hover:bg-[#329987] transition-all duration-300"
            >
              <svg
                className="w-6 h-6 text-white mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.418 3.623l-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Pending Applications</span>
            </Link>
          </li>
          <li>
            <Link
              to="/Login"
              className="flex items-center p-2 text-white rounded-lg hover:bg-[#329987] transition-all duration-300"
            >
              <svg
                className="w-6 h-6 text-white mr-2"
                fill="none"
                viewBox="0 0 18 16"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                />
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FacultySidebar;
