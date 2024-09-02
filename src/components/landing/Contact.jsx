import React from "react";
import img1 from '../../assets/auth.png'

const Contact = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-50 p-6">
      {/* Left Image Section */}
      <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
        <img
          src={img1}
          alt="Envelope Illustration"
          className="w-[97%] max-w-[400px] mx-auto"
        />
      </div>

      {/* Right Form Section */}
      <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in touch</h2>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <textarea
              placeholder="Message"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white px-4 py-3 rounded-md hover:bg-purple-600 transition duration-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
