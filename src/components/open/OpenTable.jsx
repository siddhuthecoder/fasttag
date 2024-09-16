import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEnvelope, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import EditTripForm from "../Trips/EditDetails";
import { IoMdClose } from "react-icons/io";
import fastag from "../../assets/mod1.png";

const Modal = ({ isOpen, onClose, onSave, trip }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-[97%] max-w-[1000px] h-[70vh] overflow-y-scroll">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-xl font-semibold mb-4">Edit Trip</h2>
          <IoMdClose
            className="text-2xl text-red-600 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <EditTripForm tripDetails={trip} />
      </div>
    </div>
  );
};

const OpenTable = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const user = useSelector((state) => state.auth.user);
  const [selectedTrip, setSelectedTrip] = useState(null); // State to track the trip being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const companyId = user._id;
  useEffect(() => {
    const fetchData = async () => {
      if (user && user._id) {
        try {
          setLoading(true); // Set loading to true before fetching
          const response = await axios.get(
            `https://fastagtracking.com/customulip/company/${companyId}/all-trips`
          );
          setTrips(filterOpenData(response.data));
          const completedTrips = filterOpenData(response.data);
          setTrips(completedTrips);
        } catch (err) {
          setError(err.message || "Error fetching data");
          console.error("Error fetching data:", err);
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      }
    };

    fetchData();
  }, [user?._id]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24-hour format
      timeZone: "UTC", // Ensure it remains in UTC
    });
  }

  // Filter completed trips once
  const filterOpenData = (trips) => {
    console.log({ trips });
    return trips.filter(
      (trip) => !(trip.isActive === true || trip.Completed === true)
    );
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
    // Implement save logic here
    console.log("Saving trip with ID:", id);
    closeModal();
  };

  const makeActive = async (id) => {
    try {
      // Send PATCH request to the API to update isActive to false
      await axios.put(`https://fastagtracking.com/customulip/trip/${id}`, {
        tripId: id,
        isActive: true,
      });

      // Update the trips state to reflect the change locally
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

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>{error}</div>; // Show error message
  console.log(trips);

  return (
    <>
      <div className="w-full overflow-x-scroll">
        <div className="grid w-full min-w-[1200px] grid-cols-12 gap-1 text-sm font-semibold text-gray-700 bg-gray-100 p-2 rounded-t-md mt-4">
          <div className="col-span-1 text-center">ID</div>
          <div className="col-span-2 text-center">Loading Point</div>
          <div className="col-span-2 text-center">Unloading Point</div>
          <div className="col-span-1 text-center">Vehicle</div>
          <div className="col-span-1 text-center">LR No.</div>
          <div className="col-span-2 text-center">Location</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-2 text-center">Actions</div>
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
                <div className="text-gray-500 text-xs text-center">
                  Lat: {trip.from.lat} <br />
                  Lng: {trip.from.lng}
                </div>
              </div>
              <div className="col-span-2">
                <div className="text-gray-700 font-medium text-center">
                  {trip.to.address}
                </div>
                <div className="text-gray-500 text-xs text-center">
                  Lat: {trip.to.lat} <br />
                  Lng: {trip.to.lng}
                </div>
              </div>
              <div className="col-span-1 text-center">
                <div className="text-gray-700 font-medium">
                  {trip.vehicleNo}
                </div>
              </div>
              <div className="col-span-1 text-center">
                <div className="text-gray-700 font-medium">
                  {trip.lrNo || "N/A"}
                </div>
              </div>
              <div className="col-span-2 text-center">
                <div className="text-gray-700 font-medium">
                  {trip.to.address}
                </div>
                <div className="text-gray-500 text-xs">
                  {trip.to.lat} <br />
                  {trip.to.lng}
                </div>
              </div>
              <div className="col-span-1 text-center">
                <div className="bg-pink-100 text-pink-600 text-xs font-semibold px-2 py-1 rounded-md">
                  In Transit
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
                  {trip.Product}
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
                  <span className="font-semibold text-blue-500">
                    Driver No.:
                  </span>{" "}
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
                  <img
                    src={fastag}
                    alt="FASTag Logo"
                    className="w-16 h-9 ml-2 border2 border-blue-300"
                  />
                </div>
                <button
                  onClick={() => makeActive(trip._id)}
                  className="bg-green-500 p-1 rounded col-span-2 max-h-[30px] text-white px-6"
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        trip={selectedTrip}
      />
    </>
  );
};

export default OpenTable;
