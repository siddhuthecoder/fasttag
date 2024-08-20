import React from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/com.png'
import img2 from '../assets/agent.png'

const SelectType = () => {
  const navigate = useNavigate();

  const handleSelection = (role) => {
    localStorage.setItem('role', role);
    if (role === 'company') {
      navigate('/dashboard');
    } else if (role === 'agent') {
      navigate('/layout');
    }
  };

  return (
    <div className="flex justify-center absolute left-0 top-0 items-center w-full h-screen z-[1000000] fiex top-0 bg-white">
      <div className="flex space-x-8">
        <div
          onClick={() => handleSelection('company')}
          className="w-64 h-80 bg-white rounded-lg shadow-lg cursor-pointer flex flex-col justify-center items-center hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src={img1}
            alt="Company"
            className="w-32 h-32 mb-4"
          />
          <h2 className="text-xl font-semibold">Company</h2>
        </div>

        <div
          onClick={() => handleSelection('agent')}
          className="w-64 h-80 bg-white rounded-lg shadow-lg cursor-pointer flex flex-col justify-center items-center hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src={img2}
            alt="Agent"
            className="w-32 h-32 mb-4"
          />
          <h2 className="text-xl font-semibold">Agent</h2>
        </div>
      </div>
    </div>
  );
};

export default SelectType;
