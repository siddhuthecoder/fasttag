import React from "react";
import img1 from '../../assets/auth.png';

const Hero = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row-reverse h-auto md:h-[80vh] mt-[60px] items-center justify-center md:gap-5 px-6 md:px-12 py-8 bg-white">
      {/* Left Content */}
      <div className="flex flex-col max-w-[500px] text-center md:me-[60px] md:text-left mt-8 md:mt-0">
        <h1 className="text-3xl md:text-5xl font-semibold mb-4 text-gray-900">
          Connect with your loved ones in Real-time.
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Shujaa is a mobile platform that enables you to connect with your family and friends anywhere at any time.
        </p>
        <button className="bg-indigo-600 max-w-[340px] text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition duration-300">
          Get Started
        </button>
      </div>

      {/* Right Content */}
      <div className="flex justify-center md:justify-end">
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <div className="absolute inset-0 bg-purple-200 rounded-full w-full h-full m-auto"></div>
          <img 
            src={img1}
            alt="Mobile App"
            className="relative z-10 w-48 md:w-64 mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
