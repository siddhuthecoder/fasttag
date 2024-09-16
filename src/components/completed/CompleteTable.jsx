import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEnvelope, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import EditTripForm from '../Trips/EditDetails';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import { useSelector } from 'react-redux';

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
          <div key={trip._id} className="bg-white w-full min-w-[1200px] shadow rounded-md mt-2">
            <div className="grid grid-cols-12 gap-2 items-center text-sm bg-gray-50 p-4 rounded-b-md shadow">
              <div className="col-span-1 text-blue-500 cursor-pointer text-xs ">#{trip.ID}</div>
              <div className="col-span-2 text-gray-600">
                {formatDate(trip.updatedAt)}
                <br />
              </div>
              <div className="col-span-2">
                <div className="text-gray-700 font-medium ">{trip.from.address}</div>
                <div className="text-gray-500 text-xs ">Lat: {trip.from.lat} <br />Lng: {trip.from.lng}</div>
              </div>
              <div className="col-span-2">
                <div className="text-gray-700 font-medium ">{trip.to.address}</div>
                <div className="text-gray-500 text-xs ">Lat: {trip.to.lat} <br />Lng: {trip.to.lng}</div>
              </div>
              <div className="col-span-1 ">
                <div className="text-gray-700 font-medium">{trip.vehicleNo}</div>
              </div>
              <div className="col-span-2 ">
                <div className="text-gray-700 font-medium">{trip.lrNo || "N/A"}</div>
              </div>
              <div className="col-span-2">
                <div className="bg-pink-100 text-pink-600 text-xs font-semibold px-2 py-1 rounded-md ">Completed</div>
                <div className="text-gray-500 text-xs ">{formatDate(trip.expiryDate)}</div>
              </div>

              <div className="col-span-12  text-gray-500 text-xs pt-4 grid grid-cols-12 gap-2">
                <div className="col-span-2">
                  <span className="font-semibold text-blue-500">Reference ID:</span> {trip.referenceNo}
                  <br />
                  <span className="font-semibold text-blue-500">Product:</span> {trip.Product}
                </div>
                <div className="col-span-2">
                  <span className="font-semibold text-blue-500">Driver:</span> {trip.DriverName}
                  <br />
                  <span className="font-semibold text-blue-500">E-way Bill:</span> {trip.ewayBillNo}
                </div>
                <div className="col-span-2">
                  <span className="font-semibold text-blue-500">Driver No.:</span> {trip.DriverPhone}
                  <br />
                  <span className="font-semibold text-blue-500">Distance:</span> {trip.distance} km
                </div>
                <div className="col-span-2">
                  <span className="font-semibold text-blue-500">Trip Expiry:</span> {formatDate(trip.expiryDate)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} trip={selectedTrip} />
    </>
  );
};

export default CompleteTable;
