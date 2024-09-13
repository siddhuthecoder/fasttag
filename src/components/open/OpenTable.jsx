import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';

const OpenTable = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user._id) {
        try {
          setLoading(true); // Set loading to true before fetching
          const response = await axios.get(
            `https://fastagtracking.com/customulip/company/${user._id}/all-trips`
          );
          setTrips(
            response.data.map((trip) => ({ ...trip, showDetails: false }))
          );
        } catch (err) {
          setError(err.message || 'Error fetching data');
          console.error('Error fetching data:', err);
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      }
    };

    fetchData();
  }, [user?._id]);

  // Filter completed trips once
  const filterCompletedTrips = (trips) => {
    return trips.filter((trip) => trip.isActive === false);
  };

  const completedTrips = filterCompletedTrips(trips);

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>{error}</div>; // Show error message
  console.log(trips)

  return (
    <>
    <div className="w-full overflow-x-scroll">
      <div className="grid w-full min-w-[1200px] grid-cols-12 gap-1 text-sm font-semibold text-gray-700 bg-gray-100 p-2 rounded-t-md mt-4">
        <div className="col-span-1">ID</div>
        <div className="col-span-1">Date</div>
        <div className="col-span-1">Loading Point</div>
        <div className="col-span-2 ml-10">Unloading Point</div>
        <div className="col-span-1">Vehicle</div>
        <div className="col-span-1">Invoice</div>
        <div className="col-span-1">LR No.</div>
        <div className="col-span-2">Location</div>
        <div className="col-span-1">Status</div>
      </div>
      {trips.map((item) => (
        <div className="bg-white w-full min-w-[1200px] shadow rounded-md mt-2">
        <div className="grid grid-cols-12 gap-1 items-center text-sm bg-gray-50 p-2 rounded-b-md shadow">
        
          <div className="col-span-1 text-blue-500 cursor-pointer">#{item.ID}</div>
          <div className="col-span-1 text-gray-600">
            27 Aug 2024
            <br />
            8:00 AM
          </div>

          
          <div className="col-span-1 ">
            <div className="text-gray-700 font-medium">Delhi, Plant 1</div>
            <div className="text-gray-500 text-xs">
              XYZ Warehouse
              <br />
              Gurgaon, Haryana
              <br />
              (123456)
            </div>
          </div>

          
          <div className="col-span-2 ml-10">
            <div className="text-gray-700 font-medium">Kolkata, West Bengal</div>
            <div className="text-gray-500 text-xs">
              PQR Warehouse
              <br />
              Gurgaon, Haryana
              <br />
              (123457)
            </div>
          </div>

          
          <div className="col-span-1">
            <div className="text-gray-700 font-medium">HR CYV 3456</div>
            <div className="text-blue-500 text-xs cursor-pointer">Vehicle Type 3</div>
          </div>

        
          <div className="col-span-1">
            <div className="text-gray-700 font-medium">INV5678904</div>
            <div className="text-blue-500 text-xs cursor-pointer">Edit</div>
          </div>
          <div className="col-span-1">
            <div className="text-gray-700 font-medium">INV5678904</div>
            <div className="text-blue-500 text-xs cursor-pointer">Edit</div>
          </div>

        
          <div className="col-span-2">
            <div className="text-gray-700 font-medium">Kolkata, West Bengal</div>
            <div className="text-gray-500 text-xs">
              PQR Warehouse
              <br />
              Gurgaon, Haryana
              <br />
              (123457)
            </div>
          </div>

        
          <div className="col-span-1 relative">
            <div className="bg-pink-100 text-pink-600 text-xs font-semibold px-2 py-1 rounded-md">
              In Transit
            </div>
            <button className="bg-blue-600 text-white px-5 py-1 my-3 rounded-md">Start</button>
            <div className="text-gray-500 text-xs">
              27 Aug 2024
              <br />
              8:00 AM
            </div>

            
            <div className="absolute top-0 right-[-80px] flex space-x-2 mt-[-10] ">
              <FontAwesomeIcon icon={faEdit} className="text-blue-500 cursor-pointer" />
              <FontAwesomeIcon icon={faEnvelope} className="text-blue-500 cursor-pointer" />
            </div>
          </div>

          
          <div className="col-span-12 text-gray-500 text-xs pt-2 mt-2 grid grid-cols-12 gap-1">
            <div className="col-span-2">
              <span className="font-semibold text-blue-500">Reference ID:</span> 45867
              <br />
              <span className="font-semibold text-blue-500">Product:</span> Boxes
            </div>
            <div className="col-span-2">
              <span className="font-semibold text-blue-500">Driver:</span> Ravi Kumar
              <br />
              <span className="font-semibold text-blue-500">E-way Bill:</span> 23432489
            </div>
            <div className="col-span-2">
              <span className="font-semibold text-blue-500">Driver No.:</span> 9415413752
              <br />
              <span className="font-semibold text-blue-500">Distance:</span> 529km
            </div>
            <div className="col-span-2">
              <span className="font-semibold text-blue-500">E-way Bill Expiry:</span> 7
              <br />
              <span className="font-semibold text-blue-500">Trip Duration:</span> 2 Days
              <div className="flex items-center absolute ml-40 mt-[-40px]">
                <img
                  src="https://play-lh.googleusercontent.com/PxLpEIenBKcfZ1ZvCipf4L-ywZZpgD4I30GXnGpKGbprH-b-TKPxKPQatpWXb3EPsTM"
                  alt="FASTag Logo"
                  className="w-14 h-14 ml-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      ))}
      </div>
    </>
  );
};

export default OpenTable;
