import React, { useState } from 'react';
import FormLayer from '../components/FormLayer';
import { Form } from 'react-router-dom';
import { BsEnvelope } from 'react-icons/bs';
import { FiShieldOff } from 'react-icons/fi';
import { FiEye } from 'react-icons/fi';
import { FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [passType, setPassType] = useState('password');
  const navigate = useNavigate()

  return (
    <FormLayer>
      <div className="flex w-[90%]  mx-auto max-w-[400px] flex-col">
        <div className=" font-semibold text-2xl md:text-[40px]">Login to your Account</div>
        <p className=" text-[#71717A] pt-3 md:text-[20px]">Welcome back! Select method to log in:</p>
        <hr className="mx-[100px] my-[15px]" />
        <form action="" className="flex flex-col space-y-4">
          <div className="flex items-center">
            <BsEnvelope className="text-2xl me-[-36px] z-[1] text-[#71717A]" />
            <input
              type="email"
              className="w-[100%] mx-auto bg-[#EAEFFF] rounded-md border ps-[36px] border-[#B5C3FB] h-[50px]"
              placeholder="Email"
            />
          </div>
          <div className="flex items-center relative">
            <FiShieldOff className="text-2xl me-[-36px] z-[1] text-[#71717A]" />
            <input
              type={passType}
              className="w-[100%] mx-auto bg-[#EAEFFF] rounded-md border ps-[36px] border-[#B5C3FB] h-[50px]"
              placeholder="Password"
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
            <div className="flex items-center ">
              <input
                type="checkbox"
                id="remember-me"
                className="mr-2"
                // checked={isChecked}
                // onChange={() => setIsChecked(!isChecked)}
              />
              <label htmlFor="remember-me" className="text-[#71717A]">
                Remember me
              </label>
            </div>
            <Link to="/forgotPassword" className="font-semibold text-[#8098F9] cursor-pointer">Forgot Password?</Link>
          </div>
          <button className="w-full rounded-md text-white md:text-2xl font-bold bg-[#8098F9] py-3" type="submit" onClick={() => navigate('/fastag')}>LOG IN</button>
          <div className="text-center">
            Don't Have account ? <span className="text-[#8098F9] font-semibold" onClick={() => navigate('/register')}>Create an account</span>
          </div>
        </form>
      </div>
    </FormLayer>
  );
};

export default Login;
