// Trip.js
import React from 'react';
import AddTripForm from '../components/Trips/Trip';
import TripsTabs from '../components/Trips/Tabs';


const Trip = () => {
  return (
    <>
      <div className="relative flex bg-white flex-col h-screen ">
        <div className="flex-1 p-4 bg-white shadow-md">
          <TripsTabs />
          <AddTripForm />
        </div>
      </div>
      {/* <div className="bg-white mt-[60px]">
        <TripsTabs />
        <AddTripForm />
      </div> */}
        
    </>  
    
  
  );
};

export default Trip;
