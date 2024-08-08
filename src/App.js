import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import './index.css';
import Login from './auth/Login';
import Register from './auth/Register';
import ForgetPassword from './auth/ForgetPassword';
import NewPassword from './auth/NewPassword';
import OTPForm from './auth/OtpForm';

import FastagPage from './pages/FastagPage';
import MyVehiclePage from './pages/MyVehiclePage';
import SarathiPage from './pages/SarathiPage';
import VahanPage from './pages/VahanPage';
import Pricing from './pages/Pricing';
import FastageIdPage from './pages/FastageIdPage';
import VahanIdPage from './pages/VahanIdPage'

import Header from './components/Header';

const App = () => {
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
          <Route path="/fastag/:id" element={<FastageIdPage />} />
          <Route path="/sarathi" element={<SarathiPage />} />
          <Route path="/myVehicles" element={<MyVehiclePage />} />
          <Route path="/vahan" element={<VahanPage />} />
          <Route path="/vahan/:id" element={<VahanIdPage />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </Home>
    </>
  );
}

export default App;
