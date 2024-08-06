import React, { useState } from 'react';
import FormLayer from '../components/FormLayer';
import { BsEnvelope } from 'react-icons/bs';
import { FiShieldOff, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import Axios

const Login = () => {
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passType, setPassType] = useState('password');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://fastagtracking.com/customulip/login', {
        phone: number,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Login successful:', response.data);
      navigate('/fastag');
    } catch (error) {
      if (error.response) {
        // Request made and server responded with a status code that falls out of the range of 2xx
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
      navigate('/fastag');
    }
  };

  return (
    <FormLayer>
      <div className="flex w-[90%] mx-auto max-w-[400px] flex-col">
        <div className="font-semibold text-2xl md:text-[40px]">Login to your Account</div>
        <p className="text-[#71717A] pt-3 md:text-[20px]">Welcome back! Select method to log in:</p>
        <hr className="mx-[100px] my-[15px]" />
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex items-center">
            <BsEnvelope className="text-2xl me-[-36px] z-[1] text-[#71717A]" />
            <input
              type="number"
              className="w-[100%] mx-auto bg-[#EAEFFF] rounded-md border ps-[36px] border-[#B5C3FB] h-[50px]"
              placeholder="Phone Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="flex items-center relative">
            <FiShieldOff className="text-2xl me-[-36px] z-[1] text-[#71717A]" />
            <input
              type={passType}
              className="w-[100%] mx-auto bg-[#EAEFFF] rounded-md border ps-[36px] border-[#B5C3FB] h-[50px]"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passType === 'password' ? (
              <FiEye
                className="text-2xl absolute right-3 text-zinc-400 cursor-pointer"
                onClick={() => setPassType('text')}
              />
            ) : (
              <FiEyeOff
                className="text-2xl absolute right-3 text-[#71717A] cursor-pointer"
                onClick={() => setPassType('password')}
              />
            )}
          </div>
          <div className="full flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" id="remember-me" className="mr-2" />
              <label htmlFor="remember-me" className="text-[#71717A]">
                Remember me
              </label>
            </div>
            <Link to="/forgotPassword" className="font-semibold text-[#8098F9] cursor-pointer">
              Forgot Password?
            </Link>
          </div>
          <button className="w-full rounded-md text-white md:text-2xl font-bold bg-[#8098F9] py-3" type="submit">
            LOG IN
          </button>
          <div className="text-center">
            Don't have an account?{' '}
            <span className="text-[#8098F9] font-semibold cursor-pointer" onClick={() => navigate('/register')}>
              Create an account
            </span>
          </div>
        </form>
      </div>
    </FormLayer>
  );
};

export default Login;
