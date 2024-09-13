
import React from 'react';
import AddTripForm from '../components/Trips/Trip';
import Sidebar from '../components/Trips/TripSidebar';
import MapIntegration from '../components/TripMaps';
import TripDetailCard from '../components/TripCreate';
import TripDetailsCard from '../components/TripCreate';
import CreateSidebar from '../components/CreateSidebar';
import TripDetailsHeader from '../components/TripDetails';
import OpenSidebar from '../components/open/OpenSidebar';
import CancelSidebar from '../components/cancelled/CancelledSidebar';
import CancelledTable from '../components/cancelled/CancelledTable';
import CancelledHeader from '../components/cancelled/CancelledHeader';
import CanceledTab from '../components/cancelled/CancelledSidebar';
import TripsTabs from '../components/Trips/Tabs';

const CancelTrip = () => {
  return (
    <div className="relative flex flex-col h-screen bg-white">
  
          <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
            <TripsTabs/>
            <CancelledTable/>
          </div>
        </div>
      
  );
};

export default CancelTrip;
