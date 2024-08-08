import React, { useState, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { useParams } from 'react-router-dom';

const FastagId = () => {
  const { id } = useParams(); // Get vehicleNumber from URL parameters
  const [trackingData, setTrackingData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      alert(id)
      try {
        const payload = {
          "company_id": "66b2f12abbef97c004389b88",
          "tracking_For": "FASTAG",
          "parameters": {
            "vehiclenumber": id
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

    fetchTrackingData();
  }, [id]); // Fetch data when id changes

  return (
    <>  
      <div className="w-full flex flex-col">
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
};

export default FastagId;
