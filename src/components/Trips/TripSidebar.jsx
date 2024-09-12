
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-100 p-4 shadow-md mt-5">
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/create" className="block p-2 text-blue-700 hover:bg-blue-100 rounded">
            Create Trip
          </Link>
          <Link to="/active" className="block p-2 hover:text-blue-700 hover:bg-blue-100 rounded">
            Active Trip
          </Link>
          <Link to="/open" className="block p-2 hover:text-blue-700 hover:bg-blue-100 rounded">
            Open Trip
          </Link>
          <Link to="/complete" className="block p-2 hover:text-blue-700 hover:bg-blue-100 rounded">
            Completed Trip
          </Link>
          <Link to="/cancel" className="block p-2 hover:text-blue-700 hover:bg-blue-100 rounded">
            Canceled Trip
          </Link>
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
