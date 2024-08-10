import React, { useState, useEffect } from 'react';

const Otp = ({ length, onChange }) => {
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;

    setOtp(newOtp);
    onChange(newOtp.join(''));

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  useEffect(() => {
    const requestOtp = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('https://fastagtracking.com/customulip/requestOtp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone: '9398848215' }), // Replace with actual phone number
        });

        if (!response.ok) {
          throw new Error('Failed to request OTP');
        }

        const data = await response.json();
        // Handle the response as needed
        console.log('OTP requested:', data);

      } catch (error) {
        setError(error.message);
        console.error('Error requesting OTP:', error);
      } finally {
        setLoading(false);
      }
    };

    requestOtp();
  }, []); // Empty dependency array ensures this runs only on component mount

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex space-x-2 mb-4">
        {otp.map((data, index) => (
          <input
            className="w-12 h-12 text-center border-2 border-blue-300 rounded focus:outline-none focus:border-blue-500"
            type="text"
            name="otp"
            maxLength="1"
            key={index}
            value={data}
            onChange={e => handleChange(e.target, index)}
            onFocus={e => e.target.select()}
          />
        ))}
      </div>
      {loading && <p className="text-blue-500 mt-2">Requesting OTP...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Otp;
