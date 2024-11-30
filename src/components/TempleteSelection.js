import React from 'react';
import SideBar from "./SideBar";

function TemplateSelection() {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-grow flex justify-center items-start bg-gradient-to-r from-[#1F4887] to-[#329987] p-4 ml-64">
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg text-center w-full max-w-md" style={{ marginTop: 'calc(8rem + 2cm)' }}> {/* Adjusted the margin top here */}
          <h1 className="text-[#1F4887] text-3xl md:text-4xl font-bold mb-4">Select Template from Below Link</h1>
          <p className="text-gray-700 text-md md:text-lg mb-8">
            Click the link below to access the templates:
          </p>
          <a 
            href="https://drive.google.com/drive/folders/1oYOtT5bYfVtVL8nxwGDuqMBjUSnQ786w?usp=drive_link" 
            className="text-[#1F4887] underline hover:text-[#329987] transition duration-300 text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Templates Google Drive Link
          </a>
        </div>
      </div>
    </div>
  );
}

export default TemplateSelection;
