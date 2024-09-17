import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const TripMap = ({ tripDetails }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyID: tripDetails.companyID,
    from: {
      address: tripDetails.from.address || "",
      lat: tripDetails.from.lat || "",
      lng: tripDetails.from.lng || "",
    },
    to: {
      address: tripDetails.to.address || "",
      lat: tripDetails.to.lat || "",
      lng: tripDetails.to.lng || "",
    },
    expiryDate: tripDetails.expiryDate || "", 
    vehicleNo: tripDetails.vehicleNo || "",
    tripDays: tripDetails.tripDays || "",
    referenceNo: tripDetails.referenceNo || "",
    lrNo: tripDetails.lrNo || "",
    ewayBillNo: tripDetails.ewayBillNo || "",
    notes: tripDetails.notes || "",
    vehicleType: tripDetails.vehicleType || "",
    DriverName: tripDetails.DriverName || "",
    DriverPhone: tripDetails.DriverPhone || "",
    EwayBill: tripDetails.EwayBill || "",
    Product: tripDetails.Product || "",
  });

  const [loadingPoints, setLoadingPoints] = useState([]);
  const [unloadingPoints, setUnloadingPoints] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          "https://fastagtracking.com/customulip/savelocations",
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );
        const data = await response.json();
        setLoadingPoints(data.filter((point) => point.type === "loading"));
        setUnloadingPoints(data.filter((point) => point.type === "unloading"));
      } catch (error) {
        toast.error("Failed to fetch locations");
      }
    };

    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "tripDays") {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + parseInt(value - 1, 10));
      const expiryDate = currentDate.toISOString().split("T")[0]; 
      setFormData((prev) => ({ ...prev, tripDays: value, expiryDate }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleLoadingPointChange = (e) => {
    const selectedPoint = loadingPoints.find((point) => point.name === e.target.value);
    if (selectedPoint) {
      setFormData((prev) => ({
        ...prev,
        from: { address: selectedPoint.name, lat: selectedPoint.lat, lng: selectedPoint.lng },
      }));
    }
  };

  const handleUnloadingPointChange = (e) => {
    const selectedPoint = unloadingPoints.find((point) => point.name === e.target.value);
    if (selectedPoint) {
      setFormData((prev) => ({
        ...prev,
        to: { address: selectedPoint.name, lat: selectedPoint.lat, lng: selectedPoint.lng },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://fastagtracking.com/customulip/trip/${tripDetails._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      if (response.ok) {
        alert("Trip updated successfully");
        window.location.reload();
        navigate("/trip/active");
      } else {
        toast.error("Failed to update trip");
      }
    } catch (error) {
      toast.error("Error updating trip");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Edit Trip Information</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Existing fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Loading Point */}
            <div className="flex flex-col">
              <label htmlFor="loading-point" className="font-medium text-gray-600 mb-2">
                Loading Point
              </label>
              <select
                id="loading-point"
                value={formData.from.address}
                onChange={handleLoadingPointChange}
                className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Loading Point</option>
                {loadingPoints.map((point) => (
                  <option key={point._id} value={point.name}>
                    {point.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Unloading Point */}
            <div className="flex flex-col">
              <label htmlFor="unloading-point" className="font-medium text-gray-600 mb-2">
                Unloading Point
              </label>
              <select
                id="unloading-point"
                value={formData.to.address}
                onChange={handleUnloadingPointChange}
                className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Unloading Point</option>
                {unloadingPoints.map((point) => (
                  <option key={point._id} value={point.name}>
                    {point.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Vehicle Number and Trip Days */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="vehicleNo" className="font-medium text-gray-600 mb-2">
                Vehicle Number
              </label>
              <input
                id="vehicleNo"
                type="text"
                value={formData.vehicleNo}
                onChange={handleChange}
                className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter vehicle number"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="tripDays" className="font-medium text-gray-600 mb-2">
                Trip Duration (Days)
              </label>
              <input
                id="tripDays"
                type="number"
                value={formData.tripDays}
                onChange={handleChange}
                className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter trip duration"
              />
            </div>
          </div>

          {/* Reference Number and LR Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="referenceNo" className="font-medium text-gray-600 mb-2">
                Reference Number
              </label>
              <input
                id="referenceNo"
                type="text"
                value={formData.referenceNo}
                onChange={handleChange}
                className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter reference number"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="lrNo" className="font-medium text-gray-600 mb-2">
                LR Number
              </label>
              <input
                id="lrNo"
                type="text"
                value={formData.lrNo}
                onChange={handleChange}
                className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter LR number"
              />
            </div>
          </div>

          {/* E-way Bill and Expiry Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="ewayBillNo" className="font-medium text-gray-600 mb-2">
                E-way Bill Number
              </label>
              <input
                id="ewayBillNo"
                type="text"
                value={formData.ewayBillNo}
                onChange={handleChange}
                className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter e-way bill number"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="expiryDate" className="font-medium text-gray-600 mb-2">
                Expiry Date
              </label>
              <input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                readOnly
                className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Vehicle Type and Product */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="vehicleType" className="font-medium text-gray-600 mb-2">
                Vehicle Type
              </label>
              <input
                id="vehicleType"
                type="text"
                value={formData.vehicleType}
                onChange={handleChange}
                className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter vehicle type"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="Product" className="font-medium text-gray-600 mb-2">
                Product
              </label>
              <input
                id="Product"
                type="text"
                value={formData.Product}
                onChange={handleChange}
                className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter product name"
              />
            </div>
          </div>

          {/* Driver Name and Driver Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="DriverName" className="font-medium text-gray-600 mb-2">
                Driver Name
              </label>
              <input
                id="DriverName"
                type="text"
                value={formData.DriverName}
                onChange={handleChange}
                className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter driver name"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="DriverPhone" className="font-medium text-gray-600 mb-2">
                Driver Phone
              </label>
              <input
                id="DriverPhone"
                type="text"
                value={formData.DriverPhone}
                onChange={handleChange}
                className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter driver phone"
              />
            </div>
          </div>

          {/* E-way Bill Document and Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* wwww */}

            <div className="flex flex-col">
              <label htmlFor="notes" className="font-medium text-gray-600 mb-2">
                Notes
              </label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={handleChange}
                className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter any notes"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition duration-300"
            >
              Update Trip
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TripMap;
