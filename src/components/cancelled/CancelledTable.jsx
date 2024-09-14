import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useSelector } from 'react-redux';

const CancelledTable = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const user = useSelector((state) => state.auth.user);
  const companyId=user._id;
  useEffect(() => {
    const fetchData = async () => {
      if (user && user._id) {
        try {
          setLoading(true); // Set loading to true before fetching
          const response = await axios.get(
            `https://fastagtracking.com/customulip/company/${companyId}/expired-trips`
          );
          // setTrips(
          //   response.data.map((trip) => ({ ...trip, showDetails: false }))
          // );
          setTrips(filterCompletedTrips(response.data))
          
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
    console.log({trips})
    return trips.filter((trip) => trip.isDeleted === true);
  };
  const toggleDetails = (id) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip._id === id ? { ...trip, showDetails: !trip.showDetails } : trip
      )
    );
  };



  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,  // 24-hour format
        timeZone: 'UTC' // Ensure it remains in UTC
    });
}




  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }
  
   
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
        {trips.map((trip) => (
         <div className="bg-white w-full min-w-[1200px] shadow rounded-md mt-2">
        

    
         <div className="grid grid-cols-12 gap-1 items-center text-sm bg-gray-50 p-2 rounded-b-md shadow">
           
           <div className="col-span-1 text-blue-500 cursor-pointer text-[12px] me-2">#{trip.ID}</div>
           <div className="col-span-1 text-gray-600">
             {formatDate(trip.updatedAt)}
             <br />
           </div>
 
         
           <div className="col-span-1 ">
             <div className="text-gray-700 font-medium">{trip.from.address}</div>
             <div className="text-gray-500 text-xs">
               XYZ Warehouse
               <br />
               Gurgaon, Haryana
               <br />
               (123456)
             </div>
           </div>
 
           
           <div className="col-span-2 ml-10">
             <div className="text-gray-700 font-medium">{trip.to.address}</div>
             <div className="text-gray-500 text-xs">
               PQR Warehouse
               <br />
               Gurgaon, Haryana
               <br />
               (123457)
             </div>
           </div>
 
           
           <div className="col-span-1">
             <div className="text-gray-700 font-medium">{trip.vehicleNo}</div>
             <div className="text-blue-500 text-xs cursor-pointer">Vehicle Type {trip.vehicleType}</div>
           </div>
 
           
           <div className="col-span-1">
             <div className="text-gray-700 font-medium">INV5678904</div>
             <div className="text-blue-500 text-xs cursor-pointer">Edit</div>
           </div>
           <div className="col-span-1">
             <div className="text-gray-700 font-medium">{trip.lrNo}</div>
             <div className="text-blue-500 text-xs cursor-pointer">Edit</div>
           </div>
 
           
           <div className="col-span-2">
             <div className="text-gray-700 font-medium">{trip.to.address}</div>
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
               <span className="font-semibold text-blue-500">Reference ID:</span> {trip.referenceNo}
               <br />
               <span className="font-semibold text-blue-500">Product:</span> Boxes
             </div>
             <div className="col-span-2">
               <span className="font-semibold text-blue-500">Driver:</span> {trip.driverName}
               <br />
               <span className="font-semibold text-blue-500">E-way Bill:</span> {trip.ewayBillNo}
             </div>
             <div className="col-span-2">
               <span className="font-semibold text-blue-500">Driver No.:</span> {trip.driverN}
               <br />
               <span className="font-semibold text-blue-500">Distance:</span> {trip.distance}km
             </div>
             <div className="col-span-2">
               <span className="font-semibold text-blue-500">E-way Bill Expiry:</span> 7
               <br />
               <span className="font-semibold text-blue-500">Trip Duration:</span> 2 Days
               
             </div>
             <div className="flex items-center  col-span-2 ">
                 <img
                   src="https://play-lh.googleusercontent.com/PxLpEIenBKcfZ1ZvCipf4L-ywZZpgD4I30GXnGpKGbprH-b-TKPxKPQatpWXb3EPsTM"
                   alt="FASTag Logo"
                   className="w-14 h-14 ml-2"
                 />
             </div>
               <button className="bg-red-500 p-1 rounded col-span-2 max-h-[30px] text-white px-6">Delete</button>
             
           </div>
         </div>
       </div>
      ))}
      </div>
    </>
  );
};

export default CancelledTable;
