import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEnvelope, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import EditTripForm from '../Trips/EditDetails';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from 'react-redux';
import fastag from '../../assets/mod1.png'
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const Modal = ({ isOpen, onClose, onSave, trip }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-[1000px] h-[70vh] overflow-y-scroll">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Edit Trip</h2>
          <IoMdClose className="text-2xl text-red-600 cursor-pointer" onClick={onClose} />
        </div>
        <EditTripForm tripDetails={trip} />
      </div>
    </div>
  );
};

const CompleteTable = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const companyId = user?._id;

  useEffect(() => {
    const fetchData = async () => {
      if (user && user._id) {
        try {
          setLoading(true);
          const response = await axios.get(`https://fastagtracking.com/customulip/company/${companyId}/all-trips`);
          const completedTrips = filterCompletedTrips(response.data);
          setTrips(completedTrips);
        } catch (err) {
          setError(err.message || 'Error fetching data');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user?._id]);

  const filterCompletedTrips = (trips) => {
    return trips.filter((trip) => trip.Completed === true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    });
  };

  const deleteTrip = async (id) => {
    try {
      await axios.put(`https://fastagtracking.com/customulip/trip/${id}`, {
        tripId: id,
        isDeleted: true,
      });

      window.location.reload();
    } catch (error) {
      console.error("Error deleting the trip:", error);
      setError("Error deleting the trip.");
    }
  };

  const toggleDetails = (id) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip._id === id ? { ...trip, showDetails: !trip.showDetails } : trip
      )
    );
  };

  const openModal = (trip) => {
    setSelectedTrip(trip);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTrip(null);
  };

  const handleSave = async (id) => {
    console.log('Saving trip with ID:', id);
    closeModal();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="grid w-full min-w-[1200px] grid-cols-12 gap-2 text-sm font-semibold text-gray-700 bg-gray-100 p-2 rounded-t-md mt-4">
          <div className="col-span-1 ps-3 ">ID</div>
          <div className="col-span-2 ps-3 ">Date</div>
          <div className="col-span-2 ps-3 ">Loading Point</div>
          <div className="col-span-2 ps-3 ">Unloading Point</div>
          <div className="col-span-1 ps-3 ">Vehicle</div>
          <div className="col-span-2 ps-3 ">LR No.</div>
          <div className="col-span-2 ps-3 ">Status</div>
        </div>
        {trips.map((trip) => (
         <div
         className="bg-white w-full min-w-[1200px] shadow rounded-md mt-2"
         key={trip._id}
       >
         <div className="grid grid-cols-12 gap-4 items-center text-sm bg-gray-50 p-2 rounded-b-md">
           <div className="col-span-1 text-blue-500 cursor-pointer text-[12px] text-center">
             #{trip.ID}
           </div>
           <div className="col-span-2">
             <div className="text-gray-700 font-medium text-center">
               {trip.from.address}
             </div>
           </div>
           <div className="col-span-2">
             <div className="text-gray-700 font-medium text-center">
               {trip.to.address}
             </div>
           </div>
           <div className="col-span-1 text-center">
             <div className="text-gray-700 font-medium">{trip.vehicleNo}</div>
           </div>
           <div className="col-span-1 text-center">
             <div className="text-gray-700 font-medium">
               {trip.lrNo || "N/A"}
             </div>
           </div>
           <div className="col-span-2 text-center">
             <div className="text-gray-700 font-medium">{trip.to.address}</div>
           </div>
           <div className="col-span-1 text-center">
             <div className="bg-pink-100 text-pink-600 text-xs font-semibold px-2 py-1 rounded-md">
               In Transit
             </div>
           </div>
           <div className="col-span-2 flex justify-center ">
             <div className="flex items-center">
             <div className="flex items-center cursor-pointer" onClick={() => toggleDetails(trip._id)}>
               <div className="text-blue-600">
                 {trip.showDetails ? "Hide details" : "Show details"}
               </div>
               {trip.showDetails ? (
                 <FaChevronUp className="text-[12px] pt-1 text-blue-600" />
               ) : (
                 <FaChevronDown className="text-[12px] pt-1 text-blue-600" />
               )}
             </div>
             <div className="ms-3">
               <img
                   src={fastag}
                   alt="FASTag Logo"
                   className="w-14 h-7 scale-[0.7] rounded-full  border border-black bg-[#EDEDED]"
                 />
             </div>
             </div>
           </div>
         </div>

         {/* Details Section */}
         {trip.showDetails && (
           <>
           <div className="grid grid-cols-12 gap-4 items-center text-sm bg-gray-50 p-2 rounded-b-md">
           <div className="col-span-1 text-blue-500 cursor-pointer text-[12px] text-center">
             
           </div>
           <div className="col-span-2">
             <div className="text-gray-700 font-medium text-center">
               
             </div>
             <div className="text-gray-500 text-xs text-center">
               Lat: {trip.from.lat} <br />
               Lng: {trip.from.lng}
             </div>
           </div>
           <div className="col-span-2">
             <div className="text-gray-700 font-medium text-center">
               
             </div>
             <div className="text-gray-500 text-xs text-center">
               Lat: {trip.to.lat} <br />
               Lng: {trip.to.lng}
             </div>
           </div>
           <div className="col-span-1 text-center">
             <div className="text-gray-700 font-medium"></div>
           </div>
           <div className="col-span-1 text-center">
             <div className="text-gray-700 font-medium">
               
             </div>
           </div>
           <div className="col-span-2 text-center">
             <div className="text-gray-700 font-medium"></div>
             <div className="text-gray-500 text-xs">
               {trip.to.lat} <br />
               {trip.to.lng}
             </div>
           </div>
           <div className="col-span-1 text-center">
             <div className="">
               
             </div>
             <div className="text-gray-500 text-xs">
               {formatDate(trip.updatedAt)}
             </div>
           </div>
           <div className="col-span-2 flex justify-center space-x-2">
             <FontAwesomeIcon
               icon={faEdit}
               className="text-blue-500 cursor-pointer"
               onClick={() => openModal(trip)}
             />
             <FontAwesomeIcon
               icon={faTrash}
               className="text-red-500 cursor-pointer"
               onClick={() => deleteTrip(trip._id)}
             />
           </div>

           
         </div>
         <div className="col-span-12 bg-gray-50 text-gray-500 text-xs pt-2  grid grid-cols-12 gap-1">
             <div className="col-span-2">
               <span className="font-semibold text-blue-500">
                 Reference ID:
               </span>{" "}
               {trip.referenceNo}
               <br />
               <span className="font-semibold text-blue-500">
                 Product:
               </span>{" "}
               {trip.Product }
             </div>
             <div className="col-span-2">
               <span className="font-semibold text-blue-500">Driver:</span>{" "}
               {trip.DriverName}
               <br />
               <span className="font-semibold text-blue-500">
                 E-way Bill:
               </span>{" "}
               {trip.ewayBillNo}
             </div>
             <div className="col-span-2">
               <span className="font-semibold text-blue-500">Driver No.:</span>{" "}
               {trip.DriverPhone}
               <br />
               <span className="font-semibold text-blue-500">
                 Distance:
               </span>{" "}
               {trip.distance}km
             </div>
             <div className="col-span-2">
               <span className="font-semibold text-blue-500">
                 Trip Expiry:
               </span>{" "}
               {formatDate(trip.expiryDate)}
               <br />
              
             </div>
             <div className="flex items-center  col-span-2 ">
               {/* <img
                 src={fastag}
                 alt="FASTag Logo"
                 className="w-14 h-7 rounded border border-black bg-[#EDEDED]"
               /> */}
             </div>
             {/* <button
              //  onClick={() => markAsCompleted(trip._id)}
               className="bg-green-500 p-1 rounded col-span-2 max-h-[30px] text-white px-6"
             >
               Mark as completed
             </button> */}
           </div>
           
           </>
          
         )}
       </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} trip={selectedTrip} />
    </>
  );
};

export default CompleteTable;


