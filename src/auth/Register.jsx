import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BsEnvelope } from 'react-icons/bs';
import { FiShieldOff } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa6';
import FormLayer from '../components/FormLayer';
import { MdOutlinePhone } from 'react-icons/md';

const FillDetails = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false); // State for terms and conditions
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract the phone number and OTP from the query parameters
    const searchParams = new URLSearchParams(location.search);
    const phone = searchParams.get('phone');
    const otpFromParams = searchParams.get('otp');
    setPhoneNumber(phone);
    setOtp(otpFromParams);
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert('Please accept the terms and conditions.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 15);

    const payload = {
      name,
      phone: phoneNumber,
      password,
      otp,
      vehicleNumbers: [],
      plan: '66b596f6e999e25b6217b388',
      expiryDate: expireDate.toISOString(),
      maxApiHit: 50,
      apiHit: 0,
    };

    try {
      const response = await fetch('https://fastagtracking.com/customulip/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      const data = await response.json();
      // Handle the response data as needed
      console.log('API response:', data);

      // Show success alert message
      alert('Registration successful! Login with Your Password');
      
      // Optionally, redirect to another page
      navigate('/'); // Redirect to a success page or another route

    } catch (error) {
      console.error('Error submitting data:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <FormLayer>
      <div className="flex w-[90%] max-w-[400px] mx-auto flex-col">
        <div className="font-bold text-2xl md:text-[40px]">Create your account</div>
        <p className="text-[#71717A] pt-3 md:text-[20px]">Unlock all Features!</p>
        <hr className="mx-[100px] my-[15px]" />
        <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-2">
          <div className="flex items-center">
            <FaRegUser className="text-2xl me-[-36px] z-[1] text-[#71717A]" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[100%] mx-auto bg-[#EAEFFF] rounded-md border ps-[36px] border-[#B5C3FB] h-[50px]"
              placeholder="Name"
            />
          </div>
          <div className="flex items-center">
            <MdOutlinePhone className="text-2xl me-[-36px] z-[1] text-[#71717A]" />
            <input
              
              value={phoneNumber}
              className="w-[100%] mx-auto bg-[#EAEFFF] rounded-md border ps-[36px] border-[#B5C3FB] h-[50px]"
              placeholder="phone"
              readOnly
            />
          </div>
          <div className="flex items-center relative">
            <FiShieldOff className="text-2xl me-[-36px] z-[1] text-[#71717A]" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[100%] mx-auto bg-[#EAEFFF] rounded-md border ps-[36px] border-[#B5C3FB] h-[50px]"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center relative">
            <FiShieldOff className="text-2xl me-[-36px] z-[1] text-[#71717A]" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-[100%] mx-auto bg-[#EAEFFF] rounded-md border ps-[36px] border-[#B5C3FB] h-[50px]"
              placeholder="Confirm Password"
            />
          </div>
          <div className="full flex items-center justify-between">
            <div className="flex items-center ">
              <input
                type="checkbox"
                id="remember-me"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="remember-me" className="text-[#71717A]">
                Accept <span className="text-[#8098F9] font-semibold">terms and conditions</span>
              </label>
            </div>
          </div>
          <button className="w-full rounded-md text-white md:text-2xl font-bold bg-[#8098F9] py-3" type="submit">SIGN UP</button>
          <div className="text-center">
            Already have an account? <span className="text-[#8098F9] font-semibold cursor-pointer" onClick={() => navigate("/")}>Login</span>
          </div>
        </form>
      </div>
    </FormLayer>
  );
};

export default FillDetails;
