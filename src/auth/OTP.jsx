import React, { useState } from 'react';
import FormLayer from '../components/FormLayer';

const Otp = ({ length, onChange }) => {
  const [otp, setOtp] = useState(new Array(4).fill(''));

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

  return (
        <div className="flex space-x-2 justify-center mb-4">
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
  );
};

export default Otp;
