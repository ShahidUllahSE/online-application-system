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
    <div className="bg-[#1F4887] min-h-screen">
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

        {/* Contact form */}
        <div className="form bg-white rounded-xl shadow-lg m-4 p-8 md:mr-20 md:mt-16 md:w-96">
          <form onSubmit={onSubmit} className="flex flex-col space-y-4">
            <div>
              <label htmlFor="name" className="text-sm">Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Type Your name here..."
                value={name}
                onChange={onChange}
                className="ring-1 ring-gray-300 w-full rounded-md px-2 py-1 mt-1 mb-2 outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm">Email:</label>
              <input
                type="text"
                name="email"
                placeholder="Your Email Address..."
                value={email}
                onChange={onChange}
                className="ring-1 ring-gray-300 w-full rounded-md px-2 py-1 mt-1 mb-2 outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div>
              <label htmlFor="subject" className="text-sm">Subject:</label>
              <input
                type="text"
                name="subject"
                placeholder="Specify Your Subject..."
                value={subject}
                onChange={onChange}
                className="ring-1 ring-gray-300 w-full rounded-md px-2 py-1 mt-1 mb-2 outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm">Message:</label>
              <textarea
                name="message"
                placeholder="Write Your Message Here..."
                value={message}
                onChange={onChange}
                className="ring-1 ring-gray-300 w-full rounded-md px-2 mt-1 mb-2 h-16 row-span-4 outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <button type="submit" className="inline-block self-end bg-[#329987] text-white font-bold rounded-lg px-5 py-1 uppercase text-sm">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
