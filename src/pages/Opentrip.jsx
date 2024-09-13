// OpenCreate.js
import React from 'react';
import AddTripForm from '../components/Trips/Trip';
import Sidebar from '../components/Trips/TripSidebar';
import MapIntegration from '../components/TripMaps';
import TripDetailCard from '../components/TripCreate';
import TripDetailsCard from '../components/TripCreate';
import CreateSidebar from '../components/CreateSidebar';
import TripDetailsHeader from '../components/TripDetails';
import OpenSidebar from '../components/open/OpenSidebar';
import OpenTable from '../components/open/OpenTable';
import OpenHeader from '../components/open/OpenHeader';
import OpenTab from '../components/open/OpenSidebar';
import TripsTabs from '../components/Trips/Tabs';

const OpenCreate = () => {
  return (
    <div className="relative flex flex-col h-screen bg-gray-50">
     
          <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
            <TripsTabs />
            <OpenTable/>
          </div>
        </div>
     
  );
};

export default OpenCreate;
