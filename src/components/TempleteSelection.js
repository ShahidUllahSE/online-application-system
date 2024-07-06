import React from 'react';
// import { Link, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

function TemplateSelection() {
  return (
    <div className="Flex Flex-col justify-center items-center bg-[#1F4887]">
    <SideBar/>
   
  <div className=" ">
    

    
  <div className="-mt-96 text-center ml-12">
  <h1 className="text-white text-3xl font-bold font-serif">Select Template from below Link</h1>
  <p className="text-white font-sans text-xl mt-4">
    <a 
      href="https://drive.google.com/drive/folders/1oYOtT5bYfVtVL8nxwGDuqMBjUSnQ786w?usp=drive_link" 
      className="text-white underline" target='_blank'
    >
Templets Google Drive Link    </a>
  </p>
</div>

  </div>
  </div>
  )
}

export default TemplateSelection