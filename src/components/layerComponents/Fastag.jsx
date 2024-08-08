import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

const Fastag = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [trackingData, setTrackingData] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const payload = {
        "company_id": "66b2f12abbef97c004389b88",
        "tracking_For": "FASTAG",
        "parameters": {
          "vehiclenumber": vehicleNumber
        }
      };
  
      console.log('Request Payload:', payload); // Log the payload
  
      const response = await fetch('https://fastagtracking.com/customulip/ulipApi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        
        const errorText = await response.text(); // Get error text
        throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
      }
  
      const data = await response.json();
      console.log('Tracking data:', data); // Log the data
      setTrackingData(data.response || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching tracking data:', error);
      setError('Failed to fetch tracking data.');
    }
  };

  return (
    <>  
      <div className="w-full flex flex-col">
        <div className="flex w-full mx-auto items-center mt-3 relative">
          <input 
            type="text" 
            className="w-full px-3 h-[52px] rounded-md border"  
            placeholder="Enter Vehicle Number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
          />
          <div 
            className="absolute right-0 w-[50px] h-[50px] bg-[#5E81F4] rounded-tr-md rounded-br-md flex justify-center items-center cursor-pointer"
            onClick={handleSearch}
          >
            <IoSearchOutline className="text-white text-2xl" />
          </div>
        </div>
        <div className="w-full flex flex-col bg-white mt-5 ps-3 rounded-md">
          {error && <div className="text-center text-red-500 py-5">{error}</div>}
          {trackingData.length > 0 ? (
            trackingData.map((location, idx) => (
              <div key={idx} className="w-full flex items-center justify-between border-dashed border-t-0 border-r-0 border-b-0 border-[2px] relative">
                <div className="ms-[-15px] absolute">
                  <div className={`w-[30px] h-[30px] z-[3] rounded-full flex justify-center items-center ${idx === 0 ? 'bg-[#E8F9EE]' : 'bg-[#E5E5FE]'}`}>
                    <FaLocationDot className='text-blue-500' />
                  </div>
                </div>
                <div className="text-zinc-400 ps-[20px]">{location.tollPlazaName}</div>
                <div className="flex flex-col text-right text-[16px] ">
                  <div className="text-black font-semibold">{location.readerReadTime.split(' ')[0]}</div>
                  <div className="font-semibold">{location.readerReadTime.split(' ')[1]}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-5">No tracking information available.</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Fastag;
