
import React from 'react';
import { Link } from 'react-router-dom';

const OpenTab = ({ activeTab, onTabClick }) => {
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
    <div className="flex mb-6 border-b border-gray-200 mt-10">
      {tabs.map(({ label, href }) => (
        <Link
          key={label}
          to={href}
          onClick={() => openTabClick(label)}
          className={`px-6 py-3 m-2 font-semibold ${
            activeTab === label ? 'text-white bg-blue-500' : 'text-blue-500 bg-white'
          } border-blue-500 rounded-t-md focus:outline-none transition-colors duration-300`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default OpenTab;
