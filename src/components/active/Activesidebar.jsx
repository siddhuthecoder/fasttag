import React from 'react';
import { Link } from 'react-router-dom';

const ActiveSidebar = ({ activeTab, onTabClick }) => {
  const tabs = [
    { label: 'Create', href: '/create' },
    { label: 'Active', href: '/active' },
    { label: 'Open', href: '/open' },
    { label: 'Completed', href: '/complete' },
    { label: 'Cancelled', href: '/cancel' },
  ];

  const openTabClick = (label) => {
    if (onTabClick) {
      onTabClick(label);
    }
  };

  return (
    <div className="flex mb-6 mt-10 border-b border-gray-200">
      {tabs.map(({ label, href }) => (
        <Link
          key={label}
          to={href}
          onClick={() => openTabClick(label)}
          className={`relative px-6 py-3 m-2 font-semibold transition-colors duration-300 rounded-t-md focus:outline-none ${
            activeTab === label
              ? 'text-white bg-blue-600 border-blue-600 after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-1'
              : 'text-blue-600 bg-white hover:bg-blue-100 hover:text-blue-700'
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default ActiveSidebar;


