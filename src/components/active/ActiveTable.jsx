import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { faEdit, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import EditTripForm from "../Trips/EditDetails";
import { IoMdClose } from "react-icons/io";


const Modal = ({ isOpen, onClose, onSave, trip }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-[97%] max-w-[1000px] h-[70vh] overflow-y-scroll">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-xl font-semibold mb-4">Edit Trip</h2>
          <IoMdClose className="text-2xl text-red-600 cursor-pointer" onClick={onClose} />
        </div>
        <EditTripForm tripDetails={trip} />
      </div>
    </div>
  );
};


const ActiveTable = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null); // State to track the trip being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user._id) {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://fastagtracking.com/customulip/company/${user._id}/active-trips`
          );
          setTrips(
            response.data.map((trip) => ({ ...trip, showDetails: false }))
          );
        } catch (err) {
          setError(err.message || "Error fetching data");
          console.error("Error fetching data:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user?._id]);

  const toggleDetails = (id) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip._id === id ? { ...trip, showDetails: !trip.showDetails } : trip
      )
    );
  };

  const markAsCompleted = async (id) => {
    try {
      await axios.put(
        `https://fastagtracking.com/customulip/trip/${id}`,
        {
          tripId: id,
          isActive: false,
          Completed: true
        }
      );

      setTrips((prevTrips) =>
        prevTrips.map((trip) =>
          trip._id === id ? { ...trip, isActive: false } : trip
        )
      );
      window.location.reload();
    } catch (error) {
      console.error("Error marking the trip as completed:", error);
      setError("Error marking the trip as completed.");
    }
  };
  // Function to handle deleting a trip
  const deleteTrip = async (id) => {
    try {
      // Send PATCH request to the API to update isDeleted to true
      await axios.put(`https://fastagtracking.com/customulip/trip/${id}`, {
        tripId: id,
        isDeleted: true, // Mark trip as deleted
      });

      // // Update the trips state to reflect the change locally
      // setTrips(
      //   (prevTrips) => prevTrips.filter((trip) => trip._id !== id) // Remove the deleted trip from the list
      // );
    
      // Optionally, reload the page or trigger a success message
      window.location.reload();
    } catch (error) {
      console.error("Error deleting the trip:", error);
      setError("Error deleting the trip.");
    }
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
    // Implement save logic here
    console.log('Saving trip with ID:', id);
    closeModal();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC'
    });
  }

  return (
    <div className="w-full overflow-x-scroll">
      <div className="grid w-full min-w-[1200px] grid-cols-12 gap-4 text-sm font-semibold text-gray-700 bg-gray-100 p-2 rounded-t-md">
        <div className="col-span-1 text-center">ID</div>
        <div className="col-span-2 text-center">Date</div>
        <div className="col-span-2 text-center">Loading Point</div>
        <div className="col-span-2 text-center">Unloading Point</div>
        <div className="col-span-1 text-center">Vehicle</div>
        <div className="col-span-1 text-center">LR No.</div>
        <div className="col-span-1 text-center">Location</div>
        <div className="col-span-1 text-center">Status</div>
      </div>
      {trips.map((trip) => (
        <div className="bg-white w-full min-w-[1200px] shadow rounded-md mt-2" key={trip._id}>
          <div className="grid grid-cols-12 gap-1 items-center text-sm bg-gray-50 p-2 rounded-b-md shadow">
            <div className="col-span-1 text-blue-500 cursor-pointer text-[12px] me-2">#{trip.ID}</div>
            <div className="col-span-1 text-gray-600">
              {formatDate(trip.updatedAt)}
              <br />
            </div>
            <div className="col-span-1">
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
              <div className="text-blue-500 text-xs cursor-pointer">
                Vehicle Type {trip.vehicleType}
              </div>
            </div>
            <div className="col-span-1">
              <div className="text-gray-700 font-medium">INV5678904</div>
              <div className="text-blue-500 text-xs cursor-pointer" onClick={() => openModal(trip)}>Edit</div>
            </div>
            <div className="col-span-1">
              <div className="text-gray-700 font-medium">{trip.lrNo}</div>
              <div className="text-blue-500 text-xs cursor-pointer" onClick={() => openModal(trip)}>Edit</div>
            </div>
            <div className="col-span-2">
              <div className="text-gray-700 font-medium">{trip.to.address}</div>
              <div className="text-gray-500 text-xs">
                {trip.to.lat}
                <br />
                {trip.to.lng}
              </div>
            </div>
            <div className="col-span-1 relative">
              <div className="bg-pink-100 text-pink-600 text-xs font-semibold px-2 py-1 rounded-md">
                In Transit
              </div>
              <div className="text-gray-500 text-xs">
                {formatDate(trip.updatedAt)}
              </div>
              <div className="absolute top-0 right-[-80px] flex space-x-2 mt-[-10] ">
                <FontAwesomeIcon icon={faEdit} className="text-blue-500 cursor-pointer" onClick={() => openModal(trip)} />
                <FontAwesomeIcon icon={faEnvelope} className="text-blue-500 cursor-pointer" />
              </div>
            </div>
            <div className="col-span-12 text-gray-500 text-xs pt-2 mt-2 grid grid-cols-12 gap-1">
              <div className="col-span-2">
                <span className="font-semibold text-blue-500">
                  Reference ID:
                </span>{" "}
                {trip.referenceNo}
                <br />
                <span className="font-semibold text-blue-500">
                  Product:
                </span>{" "}
                Boxes
              </div>
              <div className="col-span-2">
                <span className="font-semibold text-blue-500">Driver:</span>{" "}
                {trip.driverName}
                <br />
                <span className="font-semibold text-blue-500">
                  E-way Bill:
                </span>{" "}
                {trip.ewayBillNo}
              </div>
              <div className="col-span-2">
                <span className="font-semibold text-blue-500">Driver No.:</span>{" "}
                {trip.driverNo}
                <br />
                <span className="font-semibold text-blue-500">
                  Distance:
                </span>{" "}
                {trip.distance}km
              </div>
              <div className="col-span-2">
                <span className="font-semibold text-blue-500">
                  E-way Bill Expiry:
                </span>{" "}
                7
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
              <button onClick={() => markAsCompleted(trip._id)} className="bg-green-500 p-1 rounded col-span-2 max-h-[30px] text-white px-6">Mark as completed</button>
            </div>
          </div>
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} trip={selectedTrip} />
    </div>
  );
};

export default ActiveTable;
