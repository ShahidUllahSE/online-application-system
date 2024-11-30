import React, { useState } from 'react';
import axios from 'axios'; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const { name, email, subject, message } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/contact', formData);
      console.log(res.data);
      alert('Contact form submitted successfully');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      console.error('Error submitting contact form:', err);
      alert('Failed to submit contact form');
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#1F4887] to-[#329987] min-h-screen flex items-center justify-center py-16 px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg max-w-5xl w-full my-16 border-8 border-white">
        <div className="md:w-3/5 lg:w-2/3 text-[#1F4887] p-8">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
          <ul className="list-disc pl-4 text-lg leading-relaxed">
            <li className="mb-4">
              Our main goal is to digitalize the traditional application
              submission system, bringing in ease in submitting application
              online.
            </li>
            <li className="mb-4">
              If you have any problem, or need support Get In Touch with us by
              filling the form.
            </li>
            <li className="mb-4">Or can directly email us at: engr.shahidullah02@gmail.com </li>
            <li className="mb-4">You can also Get in Touch with us via Facebook and Twitter</li>
            <li>Contact No : 03189350109</li>
          </ul>
        </div>

        {/* Contact form */}
        <div className="md:w-2/5 lg:w-1/3 bg-[#329987] text-white rounded-xl shadow-lg p-6 flex items-center justify-center">
          <form onSubmit={onSubmit} className="flex flex-col space-y-4 w-full">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold">Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Type Your name here..."
                value={name}
                onChange={onChange}
                className="ring-1 ring-gray-300 w-full rounded-md px-2 py-1 mt-1 mb-2 outline-none focus:ring-2 focus:ring-[#1F4887] text-black"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email Address..."
                value={email}
                onChange={onChange}
                className="ring-1 ring-gray-300 w-full rounded-md px-2 py-1 mt-1 mb-2 outline-none focus:ring-2 focus:ring-[#1F4887] text-black"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold">Subject:</label>
              <input
                type="text"
                name="subject"
                placeholder="Specify Your Subject..."
                value={subject}
                onChange={onChange}
                className="ring-1 ring-gray-300 w-full rounded-md px-2 py-1 mt-1 mb-2 outline-none focus:ring-2 focus:ring-[#1F4887] text-black"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold">Message:</label>
              <textarea
                name="message"
                placeholder="Write Your Message Here..."
                value={message}
                onChange={onChange}
                className="ring-1 ring-gray-300 w-full rounded-md px-2 py-1 mt-1 mb-2 h-32 outline-none focus:ring-2 focus:ring-[#1F4887] text-black"
              />
            </div>
            <button type="submit" className="inline-block self-end bg-[#1F4887] text-white font-bold rounded-lg px-5 py-2 uppercase text-sm hover:bg-[#287a6e] transition duration-300">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
