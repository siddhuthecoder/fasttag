import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./TollPlazaMap.css";

// Default Leaflet icons (blue, green, red)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Custom icons for start (green) and end (red) markers
const greenIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconRetinaUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: markerShadow,
});

const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconRetinaUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: markerShadow,
});

const blueIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Main component
const TollPlazaMap = ({ tollData = [] }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([21.0, 82.0], 5); // Adjust zoom and location

      const streetLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 18,
          attribution:
            'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      );

      streetLayer.addTo(mapInstanceRef.current);
    }

    if (mapInstanceRef.current) {
      // Remove existing markers
      mapInstanceRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });

      tollData.forEach((plaza, index) => {
        const { lat, lng, tollPlazaName, readerReadTime } = plaza;

        if (!isNaN(lat) && !isNaN(lng)) {
          let customIcon = blueIcon; // Default icon is blue

          // First location (green marker)
          if (index === 0) {
            customIcon = greenIcon;
          }
          // Last location (red marker)
          else if (index === tollData.length - 1) {
            customIcon = redIcon;
          }

          const marker = L.marker([lat, lng], { icon: customIcon }).addTo(
            mapInstanceRef.current
          );

          marker.bindPopup(
            `<b>${tollPlazaName}</b><br>
            Read Time: ${new Date(readerReadTime).toLocaleString()}`
          );

          // Automatically open popup for the first marker
          if (index === 0) {
            marker.openPopup();
          }
        } else {
          console.error("Invalid coordinates:", lat, lng);
        }
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [tollData]);

  return (
    <div id="map-container" className="sticky top-[60px]">
      <div ref={mapRef} id="map"  style={{
        maxHeight:"80vh"
      }} />
    </div>
  );
};

export default TollPlazaMap;
