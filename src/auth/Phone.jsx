import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormLayer from '../components/FormLayer';
import { MdOutlinePhone } from 'react-icons/md';
import axios from 'axios';

const Phone = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneNumber.length === 10 && !isNaN(phoneNumber)) {
      try {
        // Step 1: Make the API call to get the user's role
        const response = await axios.post('https://fastagtracking.com/customulip/getUserRole', {
          phone: phoneNumber,
        });

        if (response.status === 200) {
          const { role } = response.data;
          
          // Step 2: Save the role in localStorage
          localStorage.setItem('role', role);

          // Step 3: Navigate to the login page with the phone number as a query parameter
          navigate(`/login?phone=${phoneNumber}`);
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

  return (
    <><FormLayer>
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
              placeholder="Phone Number" />
          </div>
          <button
            type="submit"
            className="w-full text-center rounded-md text-white md:text-2xl font-bold bg-[#8098F9] py-3"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </FormLayer></>
  );
};

export default Phone;