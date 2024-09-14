import React, { useEffect } from "react";
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
import TermsPage from './pages/Terms';
import Dashboard from './pages/Dashboard'
import Terms from './components/Terms';
import Policy from './components/Policy';
import Contact from './components/Contact';
import Header2 from './components/Header2';
import SearchHistory from './pages/SearchHistory';
import TransactionHistory from './pages/TransactionHistory';
import Layout from './components/admin/Layout';
import Footer from './components/Footer';
import Phone from './auth/Phone';
import SelectType from './auth/SelectType';
import HomePage from './pages/HomePage';
import Trip from './pages/Trip';
import TripMap from './pages/TripMap';
import TripCreate from './pages/TripCreate';
import OpenCreate from './pages/Opentrip';
import CancelTrip from './pages/CancelTrip';
import CompletedTrip from './pages/CompletedTrip';
import ActiveTrip from './pages/ActiveTrip';

const App = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.user);

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
                      <Route path="/home" element={<HomePage />} />
                      <Route path="/sarathi" element={<Sarathi />} />
                      <Route path="/myVehicles" element={<MyVehicle />} />
                      <Route path="/vahan" element={<Vahan />} />
                      <Route path="/vahan/:id" element={<VahanId />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path='/dashboard' element={<Dashboard/>}/>
                      <Route path='/searchhistory' element={<SearchHistory/>}/>
                      <Route path='/transaction' element={<TransactionHistory/>}/>
                      <Route path='/privacy' element={<Policy/>}/>
                      <Route path='/trip' element={<Trip/>}/>
                      <Route path='/map' element={<TripMap/>}/>
                      <Route path='/trip/create' element={<Trip/>}/>
                      <Route path='/trip/active' element={<ActiveTrip/>}/>
                      <Route path='/trip/open' element={<OpenCreate/>}/>
                      <Route path='/trip/cancelled' element={<CancelTrip/>}/>
                      <Route path='/trip/completed' element={<CompletedTrip/>}/>
                      <Route path='/contact' element={<Contact/>}/>
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/" element={<Phone/>} />
                      <Route path="/layout" element={<Layout />} />
                      <Route path="/terms" element={<Terms/>}/>
                      <Route path="/selectType" element={<SelectType />} />
                    {/* <Route path="/fillDetails" element={<Register />} />
                    <Route path="/register" element={<ForgetPassword />} />
                    <Route path="/newPassword" element={<NewPassword />} />
                    <Route path="/otp" element={<OTPForm />} /> */}
              </Route>
              {/* <Route path="/" element={<Login />} />
                    <Route path="/fillDetails" element={<Register />} />
                    <Route path="/register" element={<ForgetPassword />} />
                    <Route path="/newPassword" element={<NewPassword />} />
                    <Route path="/otp" element={<OTPForm />} /> */}
            </Routes>
          </Home>
          {/* <Footer /> */}
        </main>
      ) : (
        <main>
          <Header2 />
          <Home>
            <Routes>
              <Route path="/" element={<Phone />} />
              <Route path="/login" element={<Login />} />
              <Route path="/fillDetails" element={<Register />} />
              <Route path="/register" element={<ForgetPassword />} />
              <Route path="/newPassword" element={<NewPassword />} />
              <Route path="/otp" element={<OTPForm />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Policy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/selectType" element={<SelectType />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Home>
          {/* <Footer /> */}
        </main>
      )}
    </>
  );
};

export default App;
