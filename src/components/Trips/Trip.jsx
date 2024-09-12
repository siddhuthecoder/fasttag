import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddTripForm = () => {
  // Initialize navigate
  const navigate = useNavigate();

  // State to store form data
  const [formData, setFormData] = useState({
    companyID: "66b79cb0999e3c7ce24cb74c",
    from: {
      address: "",
      lat: "",
      lng: "",
    },
    to: {
      address: "",
      lat: "",
      lng: "",
    },
    expiryDate: "",
    vehicleNo: "",
    referenceNo: "",
    lrNo: "",
    ewayBillNo: "",
    notes: "",
    vehicleType: "",
    tripDays: "",
    DriverName: "",
    DriverPhone: "",
    EwayBill: "",
    Product: "",
    ifActive: true,
    Completed: false,
    isDeleted: false,
  });

  // State to store loading and unloading points
  const [loadingPoints, setLoadingPoints] = useState([]);
  const [unloadingPoints, setUnloadingPoints] = useState([]);

  // Fetch loading and unloading points from the API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          "https://fastagtracking.com/customulip/savelocations",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log(data);

        // Filter loading and unloading points based on the type
        const loading = data.filter((point) => point.type === "loading");
        const unloading = data.filter((point) => point.type === "unloading");

        // Set the state for loading and unloading points
        setLoadingPoints(loading);
        setUnloadingPoints(unloading);
      } catch (error) {
        console.error("Error fetching locations:", error);
        toast.error("Failed to fetch locations");
      }
    };

    fetchLocations();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle loading point selection
  const handleLoadingPointChange = (e) => {
    const selectedPoint = loadingPoints.find(
      (point) => point.name === e.target.value
    );
    if (selectedPoint) {
      setFormData({
        ...formData,
        from: {
          address: selectedPoint.name,
          lat: selectedPoint.lat,
          lng: selectedPoint.lng,
        },
      });
    }
  };

  // Handle unloading point selection
  const handleUnloadingPointChange = (e) => {
    const selectedPoint = unloadingPoints.find(
      (point) => point.name === e.target.value
    );
    if (selectedPoint) {
      setFormData({
        ...formData,
        to: {
          address: selectedPoint.name,
          lat: selectedPoint.lat,
          lng: selectedPoint.lng,
        },
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://fastagtracking.com/customulip/trip",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("Trip added successfully");
        navigate("/active"); // Navigate to /active page after success
      } else {
        toast.error("Failed to add trip");
        console.error("API Error:", result);
      }
    } catch (error) {
      console.error("Error adding trip:", error);
      toast.error("Error adding trip");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 mt-10">Add Trip</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
          {/* Loading Point Dropdown */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="loading-point"
                className="font-medium text-gray-700"
              >
                Loading Point
              </label>
              <a href="/map">
                <button type="button" className="text-blue-500">
                  +ADD
                </button>
              </a>
            </div>
            <select
              id="loading-point"
              required
              value={formData.from.address}
              onChange={handleLoadingPointChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Loading Point</option>
              {loadingPoints.map((point) => (
                <option key={point._id} value={point.name}>
                  {point.name}
                </option>
              ))}
            </select>
          </div>

          {/* Unloading Point Dropdown */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="unloading-point"
                className="font-medium text-gray-700"
              >
                Unloading Point
              </label>
              <a href="/map">
                <button type="button" className="text-blue-500">
                  +ADD
                </button>
              </a>
            </div>
            <select
              id="unloading-point"
              required
              value={formData.to.address}
              onChange={handleUnloadingPointChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Unloading Point</option>
              {unloadingPoints.map((point) => (
                <option key={point._id} value={point.name}>
                  {point.name}
                </option>
              ))}
            </select>
          </div>

          {/* Other form fields remain the same */}
          <div className="flex flex-col">
            <label
              htmlFor="vehicleNo"
              className="mb-1 font-medium text-gray-700"
            >
              Enter Vehicle Number
            </label>
            <input
              id="vehicleNo"
              type="text"
              value={formData.vehicleNo}
              onChange={handleChange}
              required
              placeholder="Enter vehicle number"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="expiryDate"
              className="mb-1 font-medium text-gray-700"
            >
              E-bill Expiry Date
            </label>
            <input
              id="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={handleChange}
              required
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="referenceNo"
              className="mb-1 font-medium text-gray-700"
            >
              Reference Number (optional)
            </label>
            <input
              id="referenceNo"
              type="text"
              value={formData.referenceNo}
              onChange={handleChange}
              placeholder="Enter reference number"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lrNo" className="mb-1 font-medium text-gray-700">
              Enter LR/GR/CN Number (optional)
            </label>
            <input
              id="lrNo"
              type="text"
              value={formData.lrNo}
              onChange={handleChange}
              placeholder="Enter your LR/GR/CN number"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="ewayBillNo"
              className="mb-1 font-medium text-gray-700"
            >
              E-bill Number (optional)
            </label>
            <input
              id="ewayBillNo"
              type="text"
              value={formData.ewayBillNo}
              onChange={handleChange}
              placeholder="Enter your E-bill number"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="vehicleType"
              className="mb-1 font-medium text-gray-700"
            >
              Vehicle Type
            </label>
            <input
              id="vehicleType"
              type="text"
              value={formData.vehicleType}
              onChange={handleChange}
              placeholder="Enter vehicle type"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="tripDays"
              className="mb-1 font-medium text-gray-700"
            >
              Trip Duration (Days)
            </label>
            <input
              id="tripDays"
              type="number"
              value={formData.tripDays}
              onChange={handleChange}
              placeholder="Enter trip duration"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="DriverName"
              className="mb-1 font-medium text-gray-700"
            >
              Driver Name
            </label>
            <input
              id="DriverName"
              type="text"
              value={formData.DriverName}
              onChange={handleChange}
              placeholder="Enter Driver Name"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="DriverPhone"
              className="mb-1 font-medium text-gray-700"
            >
              Driver Phone
            </label>
            <input
              id="DriverPhone"
              type="text"
              value={formData.DriverPhone}
              onChange={handleChange}
              placeholder="Enter Driver Phone"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="EwayBill"
              className="mb-1 font-medium text-gray-700"
            >
              Eway Bill
            </label>
            <input
              id="EwayBill"
              type="text"
              value={formData.EwayBill}
              onChange={handleChange}
              placeholder="Enter Eway Bill"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="Product" className="mb-1 font-medium text-gray-700">
              Product
            </label>
            <input
              id="Product"
              type="text"
              value={formData.Product}
              onChange={handleChange}
              placeholder="Enter Product"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-6">
            <a href="/active">
              <button
                type="submit"
                className="bg-orange-500 text-white p-2 rounded-md"
              >
                Create Now
              </button>
            </a>
            <a href="/open">
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded-md m-4"
              >
                Save Later
              </button>
            </a>
          </div>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default AddTripForm;
