import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Map from '../openstreetMap/Map';

const Fastag = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [trackingData, setTrackingData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state
  const location = useLocation();
  const pathName = location.pathname;

  const tabs = [
    { name: "Fastag", link: "/fastag" },
    { name: "Vahan", link: "/vahan" },
    { name: "Sarathi", link: "/sarathi" },
    { name: "My Vehicles", link: "/MyVehicles" }
  ];
   
  const handleSearch = async () => {
    const comapny_id=localStorage.getItem('userID')
    
    setLoading(true); // Set loading to true when fetch starts
    const capitalizedVehicleNumber = vehicleNumber.toUpperCase();
    try {
      const payload = {
        "company_id": comapny_id,
        "tracking_For": "FASTAG",
        "parameters": { "vehiclenumber": capitalizedVehicleNumber }
      };

      const response = await fetch('https://fastagtracking.com/customulip/ulipApi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
      }

      const data = await response.json();
      setTrackingData(data.response || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching tracking data:', error);
      setError('Failed to fetch tracking data.');
    } finally {
      setLoading(false); // Set loading to false when fetch completes
    }
  };

  return (
    <>  
      <div className="w-full grid grid-cols-1 mt-[80px] md:grid-cols-12 gap-5 md:gap-2">
        <div className="md:w-[90%] ms-2 w-[100%] mx-auto max-h-[82vh] md:col-span-4 flex flex-col h-full overflow-hidden">
          <div className="flex items-center flex-wrap mt-2 gap-2 md:hidden">
            {tabs.map((data, index) => (
              <Link
                to={data.link}
                key={index}
                className={`px-3 py-1 cursor-pointer ${pathName === data.link ? "bg-[#E1E1FB]" : ""} text-nowrap border border-black duration-150 rounded-full hover:bg-[#E1E1FB]`}
              >
                {data.name}
              </Link>
            ))}
          </div>
          <div className="w-full flex flex-col h-full overflow-hidden">
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
            <div className="w-full flex flex-col bg-white mt-5 p-3 rounded-md shadow-lg border border-[#E0E0E0] flex-grow overflow-y-auto">
              <div className="flex items-center p-3 border-b text-gray-500">
                <div className="text-xs font-medium">Vehicle Number</div>
                <div className="text-xs font-medium ml-auto">{vehicleNumber}</div>
              </div>
              {loading &&<div className="flex justify-center items-center h-full">
                   <svg
                     className="animate-spin h-5 w-5 mr-3 text-blue-500"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                   >
                     <circle
                       className="opacity-25"
                       cx="12"
                       cy="12"
                       r="10"
                       stroke="currentColor"
                       strokeWidth="4"
                     ></circle>
                     <path
                       className="opacity-75"
                       fill="currentColor"
                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                     ></path>
                   </svg>
                   Please Wait, Data is Fetching...
                 </div>} {/* Loading text */}
              {error && !loading && <div className="text-center text-red-500 py-5">{error}</div>} {/* Error text */}
              {!loading && trackingData.length > 0 ? (
               trackingData.map((location, idx) => (
                <div key={idx} className={`w-full flex items-center justify-between py-3 px-2 ml-4 relative 
                  border-l-2 border-dashed ${idx !== trackingData.length - 1 ? 'border-b' : ''}`}>
                  
                  <div className="absolute left-[-15px] flex items-center">
                    <div className={`w-[30px] h-[30px] z-[3] rounded-full flex justify-center items-center ${idx === 0 ? 'bg-[#E8F9EE]' : 'bg-[#E5E5FE]'}`}>
                      <FaLocationDot className='text-blue-500' />
                    </div>
                  </div>
              
                  <div className="text-gray-700 ps-[20px]">{location.tollPlazaName}</div>
                  <div className="flex flex-col text-right text-sm">
                    <div className="text-black font-semibold mt-5 ">{location.readerReadTime.split(' ')[0]}</div>
                    <div className="text-gray-400">{location.readerReadTime.split(' ')[1]}</div>
                  </div>
              
                </div>
              ))
              
              ) : (
                !loading && <div className="text-center text-gray-500 py-5">Enter A Vechile Number</div> // No data message
              )}
            </div>
          </div>
        </div>
        <div className="md:w-[90%] flex w-[100%] ms-1 mx-auto min-h-[90vh] z-[-0] md:col-span-8 justify-center items-center">
          <Map tollData={trackingData}/>
        </div>
      </div>
    </>
  );
}

export default Fastag;
