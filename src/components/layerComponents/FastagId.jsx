import React, { useState, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Map from '../openstreetMap/Map';

const Fastag = () => {
  const [trackingData, setTrackingData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state
  const location = useLocation();
  const pathName = location.pathname;

  // Get ID from URL parameters
  const { id } = useParams();

  const tabs = [
    { name: "Fastag", link: "/fastag" },
    { name: "Vahan", link: "/vahan" },
    { name: "Sarathi", link: "/sarathi" },
    { name: "My Vehicles", link: "/MyVehicles" }
  ];

  // Fetch data on component mount or when ID changes
  useEffect(() => {
    if (id) {
      handleSearch(id);
    }
  }, [id]);

  const handleSearch = async (vehicleNumber) => {
    setLoading(true); // Set loading to true when fetch starts
    const comapny_id=localStorage.getItem('userID')
    try {
      const payload = {
        "company_id": comapny_id,
        "tracking_For": "FASTAG",
        "parameters": { "vehiclenumber": vehicleNumber }
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
        <div className="md:w-[90%] ms-2 w-[100%] mx-auto max-h-[620px] md:col-span-4 flex flex-col h-full overflow-hidden">
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
            <div className="w-full flex flex-col bg-white mt-5 p-3 rounded-md shadow-lg border border-[#E0E0E0] flex-grow overflow-y-auto">
              <div className="flex items-center p-3 border-b text-gray-500">
                <div className="text-xs font-medium">Vehicle Number</div>
                <div className="text-xs font-medium ml-auto">{id}</div>
              </div>
              {loading && <div className="text-center text-gray-500 py-5">Loading...</div>} {/* Loading text */}
              {error && !loading && <div className="text-center text-red-500 py-5">{error}</div>} {/* Error text */}
              {!loading && trackingData.length > 0 ? (
                trackingData.map((location, idx) => (
                  <div key={idx} className="w-full flex items-center justify-between py-3 px-2 border-dashed border-t-0 border-r-0 border-b-0 border-l-2 relative">
                    <div className="absolute left-[-15px] flex items-center">
                      <div className={`w-[30px] h-[30px] z-[3] rounded-full flex justify-center items-center ${idx === 0 ? 'bg-[#E8F9EE]' : 'bg-[#E5E5FE]'}`}>
                        <FaLocationDot className='text-blue-500' />
                      </div>
                    </div>
                    <div className="text-gray-700 ps-[40px]">{location.tollPlazaName}</div>
                    <div className="flex flex-col text-right text-sm">
                      <div className="text-black font-semibold">{location.readerReadTime.split(' ')[0]}</div>
                      <div className="font-semibold">{location.readerReadTime.split(' ')[1]}</div>
                    </div>
                  </div>
                ))
              ) : (
                !loading && <div className="text-center text-gray-500 py-5">No tracking information available.</div> // No data message
              )}
            </div>
          </div>
        </div>
        <div className="md:w-[90%] flex w-[100%]  ms-1 mx-auto min-h-[620px] z-[-0] md:col-span-8 justify-center items-center">
          <Map tollData={trackingData}/>
        </div>
      </div>
    </>
  );
}

export default Fastag;
