// Trip.js
import React from 'react';
import AddTripForm from '../components/Trips/Trip';
import TripsTabs from '../components/Trips/Tabs';


const Trip = () => {
  return (
    <>
      <div className="bg-white mt-[60px]">
        <TripsTabs />
        <AddTripForm />
      </div>
        
    </>  
    
  
  );
};

export default Trip;
