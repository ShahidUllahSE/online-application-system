import React from "react";
import FacultySidebar from "./FacultySidebar";

function FacultyStudentDetails() {
  return (
    <div className="h-screen bg-[#1F4887] flex">
      <FacultySidebar />

      <div className="flex-grow flex items-center justify-center mt-28">
        <div className="w-full max-w-4xl mt-5 mb-36 rounded-lg bg-gray-100 p-6">
          <div className="flex mt-4">
            <form className="bg-white shadow-md rounded-lg p-6 w-full">
              <div className="grid grid-cols-2 gap-6">
                {/* Left Side */}
                <div className="col-span-1">
                  <div className="mb-4">
                    <label
                      htmlFor="studentName"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Full Name:
                    </label>
                    <div className="mt-1 bg-white focus:border-indigo-500 block w-full sm:text-sm border-gray-200 border-2 rounded-md p-4">
                      {/* {generatedStudentName} */}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="projectType"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Registration No:
                    </label>
                    <div className="mt-1 bg-white focus:border-indigo-500 block w-full sm:text-sm border-gray-200 border-2 rounded-md p-4">
                      {/* {generatedRegistrationNo} */}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="projectTitle"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Application Title:
                    </label>
                    <div className="mt-1 bg-white focus:border-indigo-500 block w-full sm:text-sm border-gray-200 border-2 rounded-md p-4">
                      {/* {generatedApplicationTitle} */}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="projectProposal"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Attached Files:
                    </label>
                    <div className="mt-1 bg-white focus:border-indigo-500 block w-full sm:text-sm border-gray-200 border-2 rounded-md p-4">
                      {/* {generatedAttachedFiles} */}
                    </div>
                  </div>

                  <div className="mb-4">
  <label
    htmlFor="remarks"
    className="block text-sm font-semibold text-gray-700"
  >
    Forward to:
  </label>
  <input
    type="text"
    id="remarks"
    name="remarks"
    className="mt-1 bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md p-4"
  />
</div>

                </div>

                {/* Right Side */}
                <div className="col-span-1">
                  <div className="mb-4">
                    <label
                      htmlFor="studentProfiles"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Application Submission date:
                    </label>
                    <div className="mt-1 bg-white focus:border-indigo-500 block w-full sm:text-sm border-gray-200 border-2 rounded-md p-4">
                      {/* {generatedDate} */}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="projectDescription"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Batch:
                    </label>
                    <div className="mt-1 bg-white focus:border-indigo-500 block w-full sm:text-sm border-gray-200 border-2 rounded-md p-4">
                      {/* {generated batch} */}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="projectDescription"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Applucation Type:
                    </label>
                    <div className="mt-1 bg-white focus:border-indigo-500 block w-full sm:text-sm border-gray-200 border-2 rounded-md p-4">
                      {/* {generatedType} */}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="projectDescription"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Other:
                    </label>
                    <div className="mt-1 bg-white focus:border-indigo-500 block w-full sm:text-sm border-gray-200 border-2 rounded-md p-4">
                      {/* {generated batch} */}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="remarks"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Remarks:
                    </label>
                    <textarea
                      id="remarks"
                      name="remarks"
                      className="mt-1 bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md p-4"
                      rows="4"
                    />
                  </div>

                  <div className="flex space-x-4 mt-4">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                      Submit
                    </button>
                    {/* <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                      Reject
                    </button> */}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyStudentDetails;