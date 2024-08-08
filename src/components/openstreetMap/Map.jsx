import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import the marker icon images
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

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

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(mapInstanceRef.current);
    }

    if (mapInstanceRef.current) {
      mapInstanceRef.current.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });

      if (tollData.length > 0) {
        tollData.forEach(plaza => {
          const [lat, lng] = plaza.tollPlazaGeocode.split(',').map(coord => parseFloat(coord));

          if (!isNaN(lat) && !isNaN(lng)) {
            const marker = L.marker([lat, lng]).addTo(mapInstanceRef.current);

            marker.bindPopup(
              `<b>${plaza.tollPlazaName}</b><br>
              Vehicle Type: ${plaza.vehicleType}<br>
              Vehicle Reg. No: ${plaza.vehicleRegNo}<br>
              Read Time: ${plaza.readerReadTime}`
            );
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

  return <div ref={mapRef} id="map" style={{ height: '600px', width: '100%' }} />;
};

export default TollPlazaMap;
