import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BsEnvelope } from 'react-icons/bs';
import { FiShieldOff } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa6';
import FormLayer from '../components/FormLayer';
import { MdOutlinePhone } from 'react-icons/md';

// Modal Component
const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 md:p-8 rounded-lg shadow-lg w-[90%] max-w-md h-[90vh] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-3xl"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 md:mb-6 text-[#2D3748]">Terms and Conditions</h2>
        <p className="text-base text-[#4A5568] mb-6 leading-relaxed">
          Disclaimer for Adding Companies/Users on FastagTracking.com
          When adding a company or user to our platform, FastagTracking.com, the following use cases and terms apply:

          <br /><br />

          <strong>Use Cases:</strong>
          <br />
          <strong>Vehicle Owner:</strong> Vehicle owners can track their vehicles using Fastag location data, particularly in situations where the GPS device is absent or has been removed by a thief. This enables them to locate their vehicle based on toll plaza locations.
          <br />
          Vehicle owners can also manage their vehicle documents, monitor expiry dates, and validate driver’s license details to ensure legal compliance for transport operations.
          <br />
          <strong>Broker:</strong> Brokers can monitor vehicles they have hired from the market, gaining visibility into the current location of these vehicles, which is essential for effective logistics coordination.
          <br />
          <strong>Logistics Company:</strong> Logistics companies can use FastagTracking.com to efficiently manage vehicles hired from the market, ensuring they have full control over their operations. This includes tracking real-time locations to optimize delivery routes and prevent delays. Furthermore, logistics companies can verify and manage vehicle documents, ensuring that all necessary paperwork is up-to-date and compliant with regulations. Additionally, they can check driver documentation to confirm that drivers are legally eligible to operate transport vehicles, safeguarding their operations against potential legal issues.
          <br />
          <strong>Manufacturer:</strong> Manufacturers can track their consignments and associated vehicle details, ensuring that goods are transported according to the planned schedule.

          <br /><br />

          <strong>Strict Terms of Use:</strong>
          <br />
          <strong>Prohibition of Misuse:</strong> The misuse of FastagTracking.com for illegal purposes, including but not limited to tracking vehicles without a legitimate reason, is strictly prohibited. Such actions are a violation of the laws of India and will be subject to legal action.
          <br />
          <strong>Legal Compliance:</strong> All users and companies are required to comply with the relevant provisions of the Information Technology Act, 2000, and any other applicable laws in India. FastagTracking.com is committed to upholding the law and will cooperate fully with law enforcement authorities in the event of any illegal activity.
          <br />
          <strong>Company Liability:</strong> FastagTracking.com is not responsible for any illegal tracking conducted by users or companies on the platform. The responsibility for legal compliance rests solely with the user or company performing the tracking.
          <br />
          <strong>Search Logs:</strong> FastagTracking.com maintains comprehensive logs of all vehicle searches conducted by any company or user. In the event you wish to know who has searched for your vehicle, you can request this information by emailing us at qiktrack@gmail.com.

          <br /><br />

          By using FastagTracking.com, you agree to these terms and acknowledge that any misuse of the platform will result in legal consequences.
        </p>
        <button
          onClick={onClose}
          className="mt-4 py-2 px-6 bg-[#4A90E2] text-white rounded-lg shadow hover:bg-[#357ABD] transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};




// FillDetails Component
const FillDetails = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agentPhoneNumber, setAgentPhoneNumber] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const phone = searchParams.get('phone');
    const otpFromParams = searchParams.get('otp');
    setPhoneNumber(phone);
    setOtp(otpFromParams);
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

   

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 15);

    const payload = {
      name,
      phone: phoneNumber,
      password,
      otp,
      vehicleNumbers: [],
      plan: '66b596f6e999e25b6217b388',
      expiryDate: expireDate.toISOString(),
      maxApiHit: 10,
      apiHit: 0,
      agentPhone: agentPhoneNumber || undefined,
    };

    try {
      const response = await fetch('https://fastagtracking.com/customulip/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      const data = await response.json();
      console.log('API response:', data);
      alert('Registration successful! Login with Your Password');
      navigate('/');

    } catch (error) {
      console.error('Error submitting data:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <FormLayer>
      <div className="flex w-[90%] max-w-[400px] mx-auto flex-col">
      
        <hr className="mx-[100px] my-[15px]" />
        <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-2">
          <div className="flex items-center">
            <FaRegUser className="text-2xl me-[-36px] z-[1] text-[#71717A]" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[100%] mx-auto bg-[#EAEFFF] rounded-md border ps-[36px] border-[#B5C3FB] h-[50px]"
              placeholder="Name"
            />
          </div>
          <div className="flex items-center">
            <MdOutlinePhone className="text-2xl me-[-36px] z-[1] text-[#71717A]" />
            <input
              value={phoneNumber}
              className="w-[100%] mx-auto bg-[#EAEFFF] rounded-md border ps-[36px] border-[#B5C3FB] h-[50px]"
              placeholder="Phone"
              readOnly
            />
          </div>
          <div className="flex items-center relative">
            <FiShieldOff className="text-2xl me-[-36px] z-[1] text-[#71717A]" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[100%] mx-auto bg-[#EAEFFF] rounded-md border ps-[36px] border-[#B5C3FB] h-[50px]"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center relative">
            <FiShieldOff className="text-2xl me-[-36px] z-[1] text-[#71717A]" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-[100%] mx-auto bg-[#EAEFFF] rounded-md border ps-[36px] border-[#B5C3FB] h-[50px]"
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex items-center relative">
            <MdOutlinePhone className="text-2xl me-[-36px] z-[1] text-[#71717A]" />
            <input
              type="text"
              value={agentPhoneNumber}
              onChange={(e) => setAgentPhoneNumber(e.target.value)}
              className="w-[100%] mx-auto bg-[#EAEFFF] rounded-md border ps-[36px] border-[#B5C3FB] h-[50px]"
              placeholder="Agent Phone (optional)"
            />
          </div>
          {/* <div className="full flex items-center justify-between">
            <div className="flex items-center ">
              <input
                type="checkbox"
                id="terms-conditions"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="terms-conditions" className="text-[#71717A]">
                Accept <span className="text-[#8098F9] font-semibold cursor-pointer" >terms and conditions</span>
              </label>
            </div>
          </div> */}
          <button className="w-full rounded-md text-white md:text-2xl font-bold bg-[#8098F9] py-3" type="submit">SIGN UP</button>
          <div className="text-center">
            Already have an account? <span className="text-[#8098F9] font-semibold cursor-pointer" onClick={() => navigate("/")}>Login</span>
          </div>
        </form>
      </div>
      {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
    </FormLayer>
  );
};

export default FillDetails;
