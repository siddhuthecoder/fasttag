import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import './index.css'
import Login from './auth/Login';
import Register from './auth/Register'
import ForgetPassword from './auth/ForgetPassword';
import NewPassword from './auth/NewPassword';
import OTPForm from './auth/OtpForm';

import FastagPage from './pages/FastagPage'
import MyVehiclePage from './pages/MyVehiclePage'
import SarathiPage from './pages/SarathiPage'
import VahanPage from './pages/VahanPage'

import Header from './components/Header';

import { useLocation } from 'react-router-dom';
const App = () => {
  const location = useLocation()
  console.log(location.pathname)
  const pathArray = location.pathname.split("/")
  const isPath = pathArray.includes("","register","forgotPassword","newPassword","otp")
  console.log(isPath)
  



  return (
    <>
    <Header />
      <Home>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgetPassword />} />
          <Route path="/newPassword" element={<NewPassword />} />
          <Route path="/otp" element={<OTPForm />} />
          <Route path="/fastag" element={<FastagPage />} />
          <Route path="/sarathi" element={<SarathiPage />} />
          <Route path="/myVehicles" element={<MyVehiclePage />} />
          <Route path="/vahan" element={<VahanPage />} />
      </Routes>
      </Home>
    
    </>
  )
}

export default App
