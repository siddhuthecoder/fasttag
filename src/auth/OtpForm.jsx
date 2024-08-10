import React, { useState } from 'react';
import OTPInput from './OTP';
import FormLayer from '../components/FormLayer';
import { useNavigate } from 'react-router-dom';

const OtpForm = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate()

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Entered OTP is: ${otp}`);
  };

  return (
   <FormLayer>
     <div className="flex items-center justify-center min-h-screen w-full ">
      <form onSubmit={handleSubmit} className=" p-6 rounded-lg">
      <div className=" font-bold text-2xl md:text-[40px]">Enter OTP</div>
      <p className=" text-[#71717A] pt-3 md:text-[20px] mb-[20px]">Sent OTP on <span className="text-[#8098F9] font-semibold">{otp}</span></p>
        <OTPInput length={4} onChange={handleOtpChange} />
        <button
          type="submit"
          className="w-full bg-[#8098F9] text-white py-2 rounded mt-4 hover:bg-[#8098F9]transition-colors" onClick={() => navigate('/newPassword')}
        >
          SUBMIT
        </button>
        <button
          type="button"
          className="mt-4 w-full text-center font-semibold text-[#8098F9] hover:underline" 
        >
          Resent OTP
        </button>
      </form>
    </div>
   </FormLayer>
  );
};

export default OtpForm;
