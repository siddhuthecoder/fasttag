import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddTripForm = () => {
  const navigate = useNavigate();
  
  // State to manage form data
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
    tripDays: "",
    referenceNo: "",
    lrNo: "",
    ewayBillNo: "",
    notes: "",
    vehicleType: "",
    DriverName: "",
    DriverPhone: "",
    EwayBill: "",
    Product: "",
    ifActive: true,
    Completed: false,
    isDeleted: false,
  });

  const [loadingPoints, setLoadingPoints] = useState([]);
  const [unloadingPoints, setUnloadingPoints] = useState([]);
  const [showMore, setShowMore] = useState(false); // For toggling optional fields

  // Fetch loading and unloading points
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
        
        const loading = data.filter((point) => point.type === "loading");
        const unloading = data.filter((point) => point.type === "unloading");

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
        navigate("/active");
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
    <>
      <div className="bg-white w-full md:w-[80%] mx-auto mt-3">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            {/* First row: Loading Point and Unloading Point */}
            <div className="flex flex-col">
              <label htmlFor="loading-point" className="font-medium text-gray-700 mb-1">
                Loading Point
              </label>
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

            <div className="flex flex-col">
              <label htmlFor="unloading-point" className="font-medium text-gray-700 mb-1">
                Unloading Point
              </label>
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

            {/* Second row: Vehicle No and Trip Duration */}
            <div className="flex flex-col">
              <label htmlFor="vehicleNo" className="font-medium text-gray-700 mb-1">
                Vehicle Number
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
              <label htmlFor="tripDays" className="text-[12px] font-semibold md:font-medium text-gray-700 mb-1">
                Trip Duration (Days)
              </label>
              <input
                id="tripDays"
                type="number"
                value={formData.tripDays}
                onChange={handleChange}
                required
                placeholder="Enter trip duration"
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Third row: Expiry Date */}
            <div className="col-span-2 flex flex-col">
              <label htmlFor="expiryDate" className="font-medium text-gray-700 mb-1">
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

            {/* Button to show more fields */}
            <div className="col-span-2 mt-4">
              <button
                type="button"
                onClick={() => setShowMore(!showMore)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {showMore ? "Hide Details" : "Fill More Details"}
              </button>
            </div>

            {/* Optional fields */}
            {showMore && (
  <>
    <div className="flex flex-col">
      <label htmlFor="referenceNo" className="font-medium text-gray-700 mb-1">
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
      <label htmlFor="lrNo" className="font-medium text-gray-700 mb-1">
        LR/GR/CN Number (optional)
      </label>
      <input
        id="lrNo"
        type="text"
        value={formData.lrNo}
        onChange={handleChange}
        placeholder="Enter LR/GR/CN number"
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="ewayBillNo" className="font-medium text-gray-700 mb-1">
        Eway Bill Number (optional)
      </label>
      <input
        id="ewayBillNo"
        type="text"
        value={formData.ewayBillNo}
        onChange={handleChange}
        placeholder="Enter Eway Bill number"
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="notes" className="font-medium text-gray-700 mb-1">
        Notes (optional)
      </label>
      <textarea
        id="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Add any additional notes"
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="vehicleType" className="font-medium text-gray-700 mb-1">
        Vehicle Type (optional)
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
      <label htmlFor="DriverName" className="font-medium text-gray-700 mb-1">
        Driver Name (optional)
      </label>
      <input
        id="DriverName"
        type="text"
        value={formData.DriverName}
        onChange={handleChange}
        placeholder="Enter driver name"
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="DriverPhone" className="font-medium text-gray-700 mb-1">
        Driver Phone Number (optional)
      </label>
      <input
        id="DriverPhone"
        type="text"
        value={formData.DriverPhone}
        onChange={handleChange}
        placeholder="Enter driver phone number"
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="Product" className="font-medium text-gray-700 mb-1">
        Product Name (optional)
      </label>
      <input
        id="Product"
        type="text"
        value={formData.Product}
        onChange={handleChange}
        placeholder="Enter product name"
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </>
)}

            <div className="col-span-2 mt-6">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default AddTripForm;
