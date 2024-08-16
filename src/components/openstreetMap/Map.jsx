import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './TollPlazaMap.css'; // Import the CSS file here

// Import the marker icon images
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import carIcon from '../../assets/truck.png'; // Import the car.png image

// Configure the default icon
const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const TollPlazaMap = ({ tollData = [] }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([21.0, 82.0], 6);

      // Define tile layers for different views
      const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });

      // Set default view
      streetLayer.addTo(mapInstanceRef.current);
    }

    if (mapInstanceRef.current) {
      // Clear existing markers
      mapInstanceRef.current.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });

      // Sort tollData by readerReadTime in descending order
      const sortedTollData = tollData.sort((a, b) => new Date(b.readerReadTime) - new Date(a.readerReadTime));

      if (sortedTollData.length > 0) {
        sortedTollData.forEach((plaza, index) => {
          const [lat, lng] = plaza.tollPlazaGeocode.split(',').map(coord => parseFloat(coord));

          if (!isNaN(lat) && !isNaN(lng)) {
            // Determine marker color (green for the most recent entry, blue for the rest)
            const markerColor = index === 0 ? 'green' : 'blue';
            const iconImage = index === 0 ? carIcon : markerIcon;

            // Apply different width and height for the car image
            const iconHtml = `
              <div style="position: relative; color: ${markerColor}; font-weight: bold; text-align: center;">
                ${index + 1}
                <img src="${iconImage}"/>
              </div>
            `;

            const customIcon = L.divIcon({
              html: iconHtml,
              className: 'custom-marker',
              iconSize: [40, 60], // Adjust iconSize according to new image dimensions
              iconAnchor: [20, 60], // Adjust iconAnchor to center the image
              popupAnchor: [1, -60], // Adjust popupAnchor to match new dimensions
            });

            const marker = L.marker([lat, lng], { icon: customIcon }).addTo(mapInstanceRef.current);

            marker.bindPopup(
              `<b>${plaza.tollPlazaName}</b><br>
              Vehicle Type: ${plaza.vehicleType}<br>
              Vehicle Reg. No: ${plaza.vehicleRegNo}<br>
              Read Time: ${plaza.readerReadTime}`
            );

            // Open popup for the latest marker by default
            if (index === 0) {
              marker.openPopup();
            }
          } else {
            console.error('Invalid coordinates:', plaza.tollPlazaGeocode);
          }
        });
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [tollData]);

  return <div ref={mapRef} id="map" />;
};

export default TollPlazaMap;
