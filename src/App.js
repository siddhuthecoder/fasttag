import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import './index.css'
import Login from './auth/Login';
import Register from './auth/Register'
import ForgetPassword from './auth/ForgetPassword';
import NewPassword from './auth/NewPassword';
import OTPForm from './auth/OtpForm';
const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgetPassword />} />
        <Route path="/newPassword" element={<NewPassword />} />
        <Route path="/otp" element={<OTPForm />} />
    </Routes>
  )
}

export default App
