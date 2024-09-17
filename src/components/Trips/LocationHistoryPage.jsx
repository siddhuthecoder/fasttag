import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import TollPlazaMap from "./TollPlazaMap";
import "./TollPlazaMap.css"; // Ensure this file contains your styles

const LocationHistoryPage = () => {
  const { tripId } = useParams();
  const [locationHistory, setLocationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromAddress, setFromAddress] = useState(null);
  const [toAddress, setToAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocationHistory = async () => {
      try {
        const response = await axios.get(
          `https://fastagtracking.com/customulip/trip/${tripId}`
        );
        setLocationHistory(response.data.locationHistory.locationHistory || []);
        setFromAddress(response.data.trip.from);
        setToAddress(response.data.trip.to);
      } catch (err) {
        setError(err.message || "Error fetching location history");
        console.error("Error fetching location history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationHistory();
  }, [tripId]);

  const mapData = [
    {
      lat: fromAddress?.lat,
      lng: fromAddress?.lng,
      tollPlazaName: "Start Location",
      readerReadTime: new Date().toISOString(),
    },
    ...locationHistory.map((location) => ({
      lat: location.lat,
      lng: location.lng,
      tollPlazaName: location.tollPlazaName,
      readerReadTime: location.timestamp,
    })),
    {
      lat: toAddress?.lat,
      lng: toAddress?.lng,
      tollPlazaName: "End Location",
      readerReadTime: new Date().toISOString(),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="location-history-page">
      <button onClick={handleBackClick} className="back-button mt-1">
        Go Back
      </button>
      <TollPlazaMap tollData={mapData} />
    </div>
  );
};

export default LocationHistoryPage;
