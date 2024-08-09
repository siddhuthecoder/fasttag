import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/authSlice';
import { BsEnvelope } from 'react-icons/bs';
import { FiShieldOff, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import FormLayer from '../components/FormLayer';

const Login = () => {
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passType, setPassType] = useState('password');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ phone: number, password }));
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center">
        <div className="">Loading....</div>
      </div>
    );
  }

  if (userInfo) {
    navigate('/fastag');
  }

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
          <button type="submit" className="w-full rounded-md text-white md:text-2xl font-bold bg-[#8098F9] py-3">
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
