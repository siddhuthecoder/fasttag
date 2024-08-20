import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormLayer from '../components/FormLayer';
import { MdOutlinePhone } from 'react-icons/md';
import axios from 'axios';
import Footer from './../components/Footer';
import { useSelector } from 'react-redux';
import Company from '../assets/company.png';
import Agent from '../assets/agent.png'

const Phone = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.user);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);

    if (isAuthenticated) {
      if (storedRole == 'Company') {
        navigate('/dashboard');
      } else if (storedRole == 'Agent') {
        navigate('/layout');
      } else {
        // alert('There is something error 1');
        alert(storedRole)
      }
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneNumber.length === 10 && !isNaN(phoneNumber)) {
      try {
        const response = await axios.post('https://fastagtracking.com/customulip/getUserRole', {
          phone: phoneNumber,
        });

        if (response.status === 200) {
          const { role } = response.data;
          localStorage.setItem('role', role);

          if (role === 'Both') {
            setShowModal(true);
          } else {
            navigate(`/login?phone=${phoneNumber}`);
          }
        } else {
          alert('Failed to fetch the user role.');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        alert('An error occurred while fetching the user role.');
      }
    } else {
      alert('Please enter a valid 10-digit phone number.');
    }
  };

  const handleRoleSelection = (selectedRole) => {
    localStorage.setItem('role', selectedRole);
    setShowModal(false);
    navigate(`/login?phone=${phoneNumber}`);
  };

  return (
    <>
      <FormLayer>
        <div className="flex w-[90%] max-w-[400px] mx-auto flex-col">
          <div className="font-bold text-2xl md:text-[40px]">Enter Phone</div>
          <p className="text-[#71717A] pt-3 md:text-[20px]">Enter phone number to get started</p>
          <hr className="mx-[100px] my-[15px]" />
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex items-center">
              <MdOutlinePhone className="text-2xl me-[-36px] z-[1] text-[#71717A]" />
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-[100%] mx-auto bg-[#EAEFFF] rounded-md border ps-[36px] border-[#B5C3FB] h-[50px]"
                placeholder="Phone Number"
              />
            </div>
            <button
              type="submit"
              className="w-full text-center rounded-md text-white md:text-2xl font-bold bg-[#8098F9] py-3"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </FormLayer>

      {/* Modal */}
      {showModal && (
        <div className="fixed w-full inset-0 bg-black bg-opacity-50 flex items-center z-[100] justify-center">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[400px] z-[100000] mx-auto">
            <h2 className="text-xl font-bold mb-4 text-center">Select Your Role</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleRoleSelection('Company')}
                className="flex flex-col items-center justify-center max-w-[150px] h-[150px] bg-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <img
                  src={Company}
                  alt="Company Icon"
                  className="w-12 h-12 mb-2"
                />
                <span className="font-semibold text-lg">Company</span>
              </button>
              <button
                onClick={() => handleRoleSelection('Agent')}
                className="flex flex-col items-center justify-center max-w-[150px] h-[150px]  bg-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <img
                  src={Agent}
                  alt="Agent Icon"
                  className="w-12 h-12 mb-2"
                />
                <span className="font-semibold text-lg">Agent</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Phone;
