import React,{useEffect} from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import './index.css';
import Login from './auth/Login';
import Register from './auth/Register';
import ForgetPassword from './auth/ForgetPassword';
import NewPassword from './auth/NewPassword';
import OTPForm from './auth/OtpForm';
import Fastag from './components/layerComponents/Fastag';
import Vahan from './components/layerComponents/Vahan';
import Sarathi from './components/layerComponents/Sarathi';
import MyVehicle from './components/layerComponents/MyVehicle';
import VahanId from './components/layerComponents/VahanId';
import FastagId from './components/layerComponents/FastagId';
import Pricing from './pages/Pricing';
import PrivateRoutes from './PrivateRoutes';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NotFound from './components/NotFound';

const App = () => {
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state) =>state.auth.user)

  
  return (
    <>
      {
        isAuthenticated ? (
          <main>
              <Header />
                <Home>
                  <Routes>
                    <Route element={<PrivateRoutes />}>
                      <Route path="/fastag" element={<Fastag />} />
                      <Route path="/fastag/:id" element={<FastagId />} />
                      <Route path="/sarathi" element={<Sarathi />} />
                      <Route path="/myVehicles" element={<MyVehicle />} />
                      <Route path="/vahan" element={<Vahan />} />
                      <Route path="/vahan/:id" element={<VahanId />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgotPassword" element={<ForgetPassword />} />
                    <Route path="/newPassword" element={<NewPassword />} />
                    <Route path="/otp" element={<OTPForm />} />
                    </Route>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgotPassword" element={<ForgetPassword />} />
                    <Route path="/newPassword" element={<NewPassword />} />
                    <Route path="/otp" element={<OTPForm />} />
                  </Routes>
              </Home>
          </main>):(
            <main>
              <Home>
                  <Routes>
                    
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgotPassword" element={<ForgetPassword />} />
                    <Route path="/newPassword" element={<NewPassword />} />
                    <Route path="/otp" element={<OTPForm />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
              </Home>
            </main>
          )
        
      }
      
    </>
  );
}

export default App;
