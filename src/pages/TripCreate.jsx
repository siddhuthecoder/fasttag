import React from 'react';
import AddTripForm from '../components/Trips/Trip';
import Sidebar from '../components/Trips/TripSidebar';
import MapIntegration from '../components/TripMaps';
import TripDetailCard from '../components/TripCreate';
import TripDetailsCard from '../components/TripCreate';
import CreateSidebar from '../components/CreateSidebar';
import TripDetailsHeader from '../components/TripDetails';

const TripCreate = () => {
  return (
    <div className="relative flex flex-col h-screen bg-gray-50">
      {/* Main content area with sidebar and form */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar on the left */}
        <div className="hidden lg:flex lg:flex-none lg:w-10 bg-white shadow-md border-r mt-20">
          <CreateSidebar />
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col lg:flex-row p-6 gap-6 overflow-auto">
          {/* Trip Details Card */}
          <div className="flex-1  p-4 rounded-lg shadow-md ">
            <TripDetailsHeader/>
            <TripDetailsCard />
          
          </div>

          

         
        </div>
      </div>
    </div>
  );
};

export default TripCreate;

