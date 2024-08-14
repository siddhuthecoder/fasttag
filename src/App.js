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
import TermsPage from './pages/Terms';
import Dashboard from './pages/Dashboard'
import Terms from './components/Terms';
import Policy from './components/Policy';
import Contact from './components/Contact';
import Header2 from './components/Header2';
import SearchHistory from './pages/SearchHistory';
import TransactionHistory from './pages/TransactionHistory';



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
                      <Route path='/dashboard' element={<Dashboard/>}/>
                      <Route path='/searchhistory' element={<SearchHistory/>}/>
                      <Route path='/transaction' element={<TransactionHistory/>}/>
                      <Route path="/" element={<Login />} />
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
          </main>):(
            <main>
              <Header2 />
              <Home>
                  <Routes>
                    
                    <Route path="/" element={<Login />} />
                    <Route path="/fillDetails" element={<Register />} />
                    <Route path="/register" element={<ForgetPassword />} />
                    <Route path="/newPassword" element={<NewPassword />} />
                    <Route path="/otp" element={<OTPForm />} />
                    <Route path="/terms" element={<Terms/>}/>
                    <Route path='/privacy' element={<Policy/>}/>
                    <Route path='/contact' element={<Contact/>}/>
                    <Route path="/pricing" element={<Pricing />} />
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
