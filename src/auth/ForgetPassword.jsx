import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormLayer from '../components/FormLayer';
import { BsEnvelope } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { MdOutlinePhone } from 'react-icons/md';

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length === 10 && !isNaN(phoneNumber)) {
      navigate(`/otp?phone=${phoneNumber}`);
    } else {
      alert('Please enter a valid 10-digit phone number.');
    }
  };

  return (
    <FormLayer>
      <div className="flex w-[90%] max-w-[400px] mx-auto flex-col">
        <div className="font-bold text-2xl md:text-[40px]">Register Now</div>
        <p className="text-[#71717A] pt-3 md:text-[20px]">Enter your Phone and get OTP to verification.</p>
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
            GET OTP
          </button>
          <div className="text-center">
              Already have an account?{' '}
              <span className="text-[#8098F9] font-semibold cursor-pointer" onClick={() => navigate('/')}>
                login 
              </span>
            </div>
        </form>
      </div>
    </FormLayer>
  );
};

export default Register;
