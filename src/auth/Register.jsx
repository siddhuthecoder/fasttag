import React from 'react'
import { BsEnvelope } from 'react-icons/bs';
import { FiShieldOff } from 'react-icons/fi';
import { FaRegUser } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

import FormLayer from '../components/FormLayer'

const Register = () => {
  const navigate = useNavigate()
  return (
    <FormLayer>
      <div className="flex   flex-col">
        <div className="text-center font-bold text-2xl md:text-[40px]">Create your accoumt</div>
        <p className=" text-[#71717A] pt-3 md:text-[20px]">Unlock all Features!</p>
        <hr className="mx-[100px] my-[15px]" />
        <form action="" className="flex flex-col w-full  space-y-2">
        <div className="flex  items-center">
            <FaRegUser className="text-2xl me-[-36px] z-[1] text-[#71717A]" />
            <input
              type="text"
              className="w-[100%] mx-auto bg-[#EAEFFF] rounded-md border ps-[36px] border-[#B5C3FB] h-[50px]"
              placeholder="Username"
            />
          </div>
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
              type="password"
              className="w-[100%] mx-auto bg-[#EAEFFF] rounded-md border ps-[36px] border-[#B5C3FB] h-[50px]"
              placeholder="Password"
            />
            
          </div>
          <div className="flex items-center relative">
            <FiShieldOff className="text-2xl me-[-36px] z-[1] text-[#71717A]" />
            <input
              type="password"
              className="w-[100%] mx-auto bg-[#EAEFFF] rounded-md border ps-[36px] border-[#B5C3FB] h-[50px]"
              placeholder="Confirm Password"
            />
            
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
                Accept <span className="text-[#8098F9] font-semibold">terms and conditions</span>
              </label>
            </div>
            
          </div>
          <button className="w-full rounded-md text-white md:text-2xl font-bold bg-[#8098F9] py-3" type="submit">SIGN UP</button>
          <div className="text-center">
            Already have an account ? <span className="text-[#8098F9] font-semibold cursor-pointer" onClick={() => navigate("/")}>Login</span>
          </div>
        </form>
      </div>
  </FormLayer>
  )
}

export default Register
