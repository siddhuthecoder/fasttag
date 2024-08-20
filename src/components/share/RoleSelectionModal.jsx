import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelectionModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    localStorage.setItem('role', role);
    onClose();
    if (role === 'Company') {
      navigate('/dashboard');
    } else if (role === 'Agent') {
      navigate('/layout');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-semibold mb-4">Select Your Role</h2>
        <p className="mb-4">Please select either Company or Agent to proceed.</p>
        <div className="flex justify-between">
          <button
            onClick={() => handleSelectRole('Company')}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Company
          </button>
          <button
            onClick={() => handleSelectRole('Agent')}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Agent
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RoleSelectionModal;
