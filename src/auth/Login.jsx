import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../store/authSlice';
import { MdOutlinePhone } from "react-icons/md";
// import { BsEnvelope } from 'react-icons/bs';
import { FiShieldOff, FiEye, FiEyeOff } from 'react-icons/fi';
import {  useNavigate } from 'react-router-dom';
import FormLayer from '../components/FormLayer';
import axios from 'axios'
import { signInStart, signInSuccess, signInFailure } from '../store/authSlice';
// import FAQAccordion from './FAQS';

const Login = () => {
  const isAuthenticated = useSelector((state) => state.auth.user)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)
  const [data,setData] = useState({
    phone:"",
    password:""
  })


  const handleChange =(e) => {
    const formData = {...data}
    formData[e.target.name] = e.target.value
    setData(formData)
  }
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passType, setPassType] = useState('password');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [responseData,setResponseData] = useState({})
  // const { userInfo, loading, error } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (error) {
  //     alert(error);
  //   }
  // }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    dispatch(signInStart());
  
    try {
      setLoading(true);
  
      // Step 1: Call the login API
      const loginResponse = await axios.post("https://fastagtracking.com/customulip/login", data);
  
      if (loginResponse.status === 200) {
        const userData = loginResponse.data;
        const { phone, password, plan } = userData;
  
        // Save user data in localStorage
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("userID", userData._id);
  
        // Dispatch success action
        dispatch(signInSuccess(userData));
  
        // Step 2: Fetch the plans
        const plansResponse = await axios.get("https://fastagtracking.com/customulip/plans");
  
        if (plansResponse.status === 200) {
          const plans = plansResponse.data;
  
          // Step 3: Find the matching plan based on the plan ID
          const userPlan = plans.find((p) => p._id === plan);
  
          if (userPlan) {
            // Step 4: Alert the plan name
            // alert(`Your plan is: ${userPlan.name}`);
            localStorage.setItem('plan',userPlan.name)
          }
        }
  
        // Reset the form and navigate to the home page
        setData({ phone: '', password: '' });
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.response?.data?.message || 'An error occurred');
      dispatch(signInFailure(error.response?.data || 'An error occurred'));
    } finally {
      setLoading(false);
    }
  };
  

useEffect(() => {
  if(isAuthenticated){
    navigate("/dashboard")
  }
})

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center">
        <div className="">Loading....</div>
      </div>
    );
  }

  // if (userInfo) {
  //   navigate('/fastag');
  // }

  return (
    <>
    <FormLayer>
      <div className="flex w-[90%] mx-auto max-w-[410px] flex-col">
        <div className="font-semibold text-2xl md:text-[40px]">Login to your Account</div>
        <p className="text-[#71717A] pt-3 md:text-[20px]">Welcome back! </p>
        <hr className="mx-[100px] my-[15px]" />
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex items-center">
            <MdOutlinePhone className="text-2xl me-[-36px] z-[1] text-[#71717A]" />
            <input
             type='text'
              className="w-[100%] mx-auto bg-[#EAEFFF] rounded-md border ps-[36px] border-[#B5C3FB] h-[50px]"
              placeholder="Phone Number"
              name="phone"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center relative">
            <FiShieldOff className="text-2xl me-[-36px] z-[1] text-[#71717A]" />
            <input
              type={passType}
              className="w-[100%] mx-auto bg-[#EAEFFF] rounded-md border ps-[36px] border-[#B5C3FB] h-[50px]"
              placeholder="Password"
              name="password"
              onChange={handleChange}
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
            {/* <Link to="/forgotPassword" className="font-semibold text-[#8098F9] cursor-pointer">
              Forgot Password?
            </Link> */}
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
    {/* <FAQAccordion/> */}
    </>
  );
};

export default Login;
