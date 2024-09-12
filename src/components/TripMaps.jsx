import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import flagIcon from 'leaflet/dist/images/marker-icon.png'; 

const flagMarkerIcon = new L.Icon({
  iconUrl: flagIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'leaflet/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const MapIntegration = ({ onSaveDetails }) => {
  const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 }); 
  const [name, setName] = useState('');
  const [latLng, setLatLng] = useState(''); 
  const [searchQuery, setSearchQuery] = useState(''); 

  const handleSearch = async () => {
    if (searchQuery) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
        );
        const data = await response.json();

        if (data.length > 0) {
          const { lat, lon } = data[0];
          const newLocation = { lat: parseFloat(lat), lng: parseFloat(lon) };
          setLocation(newLocation);
          setLatLng(`${lat}, ${lon}`); 
        } else {
          alert('Location not found, please try another search.');
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        alert('Error fetching location data, please try again later.');
      }
    }
  };

  const handleSave = () => {
    if (name && latLng) {
      const [latitude, longitude] = latLng.split(',').map(coord => coord.trim());
      const details = {
        name,
        latitude,
        longitude,
      };
      onSaveDetails(details); 
      setName(''); 
      setLatLng('');
      setSearchQuery('');
    } else {
      alert('Please fill in the name and latitude/longitude');
    }
  };

  const PanToLocation = ({ position }) => {
    const map = useMap();
    map.setView(position, 13);
    return null;
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setLocation(e.latlng);
        setLatLng(`${lat.toFixed(6)}, ${lng.toFixed(6)}`); 
      },
    });

    return <Marker position={location} icon={flagMarkerIcon}></Marker>;
  };

  const mapContainerStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '8px',
    overflow: 'hidden',
    marginTop: '20px',
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full flex flex-col items-center fixed">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-full max-w-10xl  mt-6">
        <div className="flex flex-wrap gap-4 items-end mt-[-10]">
          <div className="flex flex-col w-1/5">
            <label className="mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col w-1/5 min-w-[120px]">
            <label className="mb-1 font-medium text-gray-700">Latitude, Longitude</label>
            <input
              type="text"
              value={latLng}
              onChange={(e) => setLatLng(e.target.value)}
              placeholder="Select pointer in map"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col w-1/4 min-w-[180px]">
            <label className="mb-1 font-medium text-gray-700">Search Location</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a place"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white p-2 rounded-md h-10"
            >
              Search City
            </button>
            <button
              className="bg-gray-500 text-white p-2 rounded-md h-10"
              onClick={handleSave}
            >
              Save Details
            </button>
          </div>
        </div>
      </div>

      <div style={mapContainerStyle}>
        <MapContainer center={location} zoom={13} style={{ height: '100%', width: '100%' }} className='mt-[-10]'>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <PanToLocation position={location} />
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapIntegration;

