import React from "react";
import AddTripForm from "../components/Trips/Trip";
import Sidebar from "../components/Trips/TripSidebar";
import MapIntegration from "../components/TripMaps";
import TripDetailCard from "../components/TripCreate";
import TripDetailsCard from "../components/TripCreate";
import CreateSidebar from "../components/CreateSidebar";
import TripDetailsHeader from "../components/TripDetails";
import OpenSidebar from "../components/open/OpenSidebar";
import CancelSidebar from "../components/cancelled/CancelledSidebar";
import CancelledTable from "../components/cancelled/CancelledTable";
import CancelledHeader from "../components/cancelled/CancelledHeader";
import ActiveSidebar from "../components/active/Activesidebar";
import ActiveHeader from "../components/active/ActiveHeader";
import ActiveTable from "../components/active/ActiveTable";

const ActiveTrip = () => {
  return (
    <div className="relative flex bg-white flex-col h-screen ">
      <div className="flex-1 p-4 bg-white shadow-md">
        <ActiveSidebar />
        <ActiveHeader />
        <ActiveTable />
      </div>
    </div>
  );
};

export default ActiveTrip;
