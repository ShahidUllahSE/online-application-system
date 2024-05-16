import React from "react";

const Contact = () => {
  return (
    <div className="bg-[#1F4887] min-h-screen  ">
      <div className="flex flex-col md:flex-row">
      <div className="paragraph md:w-3/5 lg:w-auto text-white pt-14 px-8 md:px-28">
  <h1 className="text-3xl font-bold">Contact Us</h1>
  <ul className="list-disc pl-4"> 
    <li className="pt-7">
      Our main goal is to digitalize the traditional application
      submission system, bringing in ease in submitting application
      online.
    </li>
    <li className="py-1">
      If you have any problem, or need support Get In Touch with us by
      filling the form.
    </li>
    <li className="py-1">Or can directly email us at: acb@gmail.com</li>
    <li className="py-1">
      You can also Get in Touch with us via Facebook and Twitter
    </li>
    <li className="py-1">Contact No : 0123456789</li>
  </ul>
</div>


          {/* contact us form */}
            <div className="form bg-white rounded-xl shadow-lg m-4 p-8 md:mr-20 md:mt-16 md:w-96">
          <form action="" className="flex flex-col space-y-4 "/>
            <div className="">
              <label htmlFor="" className="text-sm">Name:</label>
              <input type="text" placeholder="Type Your name here..." className="ring-1 ring-gray-300 w-full rounded-md px-2 py-1 mt-1 mb-2 outline-none focus:ring-2 focus:ring-green-300"/>
            </div>
            <div>
            <label htmlFor="" className="text-sm">Email:</label>
              <input type="text" placeholder="Your Email Address..." className="ring-1 ring-gray-300 w-full rounded-md px-2 py-1 mt-1 mb-2 outline-none focus:ring-2 focus:ring-green-300"/>
            </div>
            <div>
            <label htmlFor="" className="text-sm">Subject</label>
              <input type="text" placeholder="Specify Your Subject..." className="ring-1 ring-gray-300 w-full rounded-md px-2 py-1 mt-1 mb-2 outline-none focus:ring-2 focus:ring-green-300"/>
            </div>
            <div>
            <label htmlFor="" className="text-sm">Message</label>
            
              <textarea type="text" placeholder="Write Your Message Here..."  className="ring-1 ring-gray-300 w-full rounded-md px-2 mt-1 mb-2  h-16  row-span-4 outline-none focus:ring-2 focus:ring-green-300"/>
            </div>
            
            <button className="inline-block self-end bg-[#329987] text-white font-bold rounded-lg px-5 py-1 uppercase text-sm">Send</button>
            </div>
            
      </div>
    </div>
  );
};

export default Contact;
