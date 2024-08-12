import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OTPInput from './OTP';
import FormLayer from '../components/FormLayer';

const OtpForm = () => {
  const [otp, setOtp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract the phone number from the query parameters
    const searchParams = new URLSearchParams(location.search);
    const phone = searchParams.get('phone');
    setPhoneNumber(phone);
  }, [location]);

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if OTP is empty
    if (otp.length !== 4) {
      alert('Please fill all the digits');
      return;
    }

    navigate(`/filldetails?phone=${phoneNumber}&otp=${otp}`);
  };

  return (
    <FormLayer>
      <div className="flex items-center justify-center min-h-screen w-full">
        <form onSubmit={handleSubmit} className="p-6 rounded-lg">
          <div className="font-bold text-2xl md:text-[40px]">Enter OTP</div>
          <p className="text-[#71717A] pt-3 md:text-[20px] mb-[20px]">
            Sent OTP on <span className="text-[#8098F9] font-semibold">{phoneNumber}</span>
          </p>
          <OTPInput length={4} onChange={handleOtpChange} phoneNumber={phoneNumber} />
          <button
            type="submit"
            className="w-full bg-[#8098F9] text-white py-2 rounded mt-4 hover:bg-[#8098F9] transition-colors"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </FormLayer>
  );
};

export default OtpForm;
