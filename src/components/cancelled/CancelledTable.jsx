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
    console.log({trips})
    return trips.filter((trip) => trip.Completed === true);
  };
  const toggleDetails = (id) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip._id === id ? { ...trip, showDetails: !trip.showDetails } : trip
      )
    );
  };

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
        <div className="bg-white shadow rounded-md w-full min-w-[1200px] mt-2 p-2" key={trip._id}>
          <div className="grid grid-cols-12 gap-4 items-center text-sm">
            {/* Trip Number */}
            <div className="col-span-1 text-blue-500 font-semibold text-center">
              #{trip.tripNo}
            </div>
            {/* Date */}
            <div className="col-span-2 text-gray-600 text-center">
              <div>{new Date(trip.createdAt).toLocaleDateString()}</div>
              <div>{new Date(trip.createdAt).toLocaleTimeString()}</div>
            </div>
            {/* Loading/Consignor */}
            <div className="col-span-2 text-center">
              <div className="text-gray-700 font-medium">
                {trip.from.address}
              </div>
            </div>
            {/* Unloading/Consignee */}
            <div className="col-span-2 text-center">
              <div className="text-gray-700 font-medium">{trip.to.address}</div>
            </div>
            {/* Vehicle */}
            <div className="col-span-1 text-center">
              <div className="text-gray-700 font-medium">{trip.vehicleNo}</div>
              <div className="text-blue-500 text-xs cursor-pointer">
                {trip.vehicleType}
              </div>
            </div>
            {/* LR No. */}
            <div className="col-span-1 text-center">
              <div className="text-gray-700 font-medium">{trip.lrNo}</div>
              <div className="text-blue-500 text-xs cursor-pointer">Edit</div>
            </div>
            {/* Location and In Transit */}
            <div className="col-span-1 text-center">
              <div
                className={`text-xs font-semibold px-2 py-1 rounded-md ${
                  trip.isActive
                    ? "bg-pink-100 text-pink-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {trip.isActive ? "In Transit" : "Completed"}
              </div>
            </div>
            {/* Status and Active Button */}
            <div className="col-span-1 text-center">
              <button className="bg-green-500 px-4 py-1 rounded text-white">
                {trip.isActive ? "Active" : "Completed"}
              </button>
            </div>
            {/* View More Details Button with Icon */}
            <div className="col-span-1 text-center">
              <button
                onClick={() => toggleDetails(trip._id)}
                className="text-blue-500 underline flex items-center justify-center"
              >
                {trip.showDetails ? "Hide Details" : "Get Details"}
                <FontAwesomeIcon
                  icon={trip.showDetails ? faChevronUp : faChevronDown}
                  className="ml-1"
                />
              </button>
            </div>
          </div>

          {/* Conditional rendering for additional trip information with smooth transition */}
          <div
            className={`grid grid-cols-12  text-xs mt-4 text-gray-500 overflow-hidden transition-all duration-300 ease-in-out ${
              trip.showDetails ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="col-span-3">
              <span className="font-semibold text-blue-500">Reference ID:</span>{" "}
              {trip.referenceNo}
              <br />
              <span className="font-semibold text-blue-500">Product:</span>{" "}
              Boxes
            </div>
            <div className="col-span-3">
              <span className="font-semibold text-blue-500">Driver:</span> Ravi
              Kumar
              <br />
              <span className="font-semibold text-blue-500">
                E-way Bill:
              </span>{" "}
              {trip.ewayBillNo}
            </div>
            <div className="col-span-3 ">
              <span className="font-semibold text-blue-500">Distance:</span>{" "}
              529km
            </div>
            <div className="col-span-3">
              <span className="font-semibold text-blue-500">
                E-way Bill Expiry:
              </span>{" "}
              {new Date(trip.expiryDate).toLocaleDateString()}
              <br />
              <span className="font-semibold text-blue-500">
                Trip Duration:
              </span>{" "}
              2 Days
            </div>
          </div>
        </div>
      ))}
      </div>
    </>
  );
};

export default CancelledTable;
