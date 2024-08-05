import React from 'react'
import FormLayer from '../components/FormLayer'
import { BsEnvelope } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
  return (
    <FormLayer>
      <div className="flex w-[90%]  max-w-[400px] mx-auto flex-col">
        <div className="font-bold text-2xl md:text-[40px]">Forgot your password?</div>
        <p className=" text-[#71717A] pt-3 md:text-[20px]">Enter your Phone  and get OTP to verification.</p>
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
          <Link to="/otp" className="w-full text-center rounded-md text-white md:text-2xl font-bold bg-[#8098F9] py-3" type="submit">GET OTP</Link>
        </form>
      </div>
    </FormLayer>
  )
}

export default ForgetPassword
