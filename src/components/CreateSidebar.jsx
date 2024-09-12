import React from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { FaUsers, FaCogs, FaTag, FaPercent } from 'react-icons/fa';

const CreateSidebar = () => {
  return (
    <div className="w-16 bg-gray-50 h-screen flex flex-col items-center py-4 space-y-6 shadow-lg">
      <AiOutlineReload className="text-blue-500 text-2xl cursor-pointer hover:text-blue-600" />
      <FaUsers className="text-gray-500 text-2xl cursor-pointer hover:text-blue-600" />
      <FaCogs className="text-gray-500 text-2xl cursor-pointer hover:text-blue-600" />
      <FaTag className="text-gray-500 text-2xl cursor-pointer hover:text-blue-600" />
      <FaPercent className="text-blue-500 text-2xl p-1 bg-blue-100 rounded-md cursor-pointer hover:text-blue-600" />
    </div>
  );
};

export default CreateSidebar;
