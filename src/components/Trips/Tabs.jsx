import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const TripsTabs = () => {
  const [tripCounts, setTripCounts] = useState({
    active: 0,
    completed: 0,
    open: 0, // If you want to count open or cancelled trips too
    cancelled: 0
  });

  const location = useLocation();
  const pathName = location.pathname.split("/");

  useEffect(() => {
    // Fetch trip data from the API
    const fetchTripData = async () => {
      try {
        const response = await axios.get(
          'https://fastagtracking.com/customulip/company/66c5c7b3811b9657c7b7c8ca/all-trips'
        );
        const trips = response.data;

        // Count the active and completed trips
        const activeCount = trips.filter(trip => trip.isActive).length;
        const completedCount = trips.filter(trip => trip.Completed).length;
        const cancelledCount = trips.filter(trip => trip.isDeleted).length;
        const openCount = trips.filter((trip) => !(trip.isActive === true || trip.Completed===true)).length;
        


        setTripCounts({
          active: activeCount-1,
          completed: completedCount,
          open: completedCount, // Assuming open trips are neither active nor completed
          cancelled:cancelledCount, // Assuming cancelled trips are marked with isDeleted
          open:openCount, 
        });
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };

    fetchTripData();
  }, []);

  const tabs = [
    { name: "Active", path: "/trip/active", count: tripCounts.active },
    { name: "Open", path: "/trip/open", count: tripCounts.open },
    { name: "Completed", path: "/trip/completed", count: tripCounts.completed },
    { name: "Cancelled", path: "/trip/cancelled", count: tripCounts.cancelled },
  ];

  return (
    <>
      <div className="w-full md:w-[100%] mx-auto flex items-center justify-between mt-[60px]">
        <div className="flex items-center flex-wrap my-3 md:gap-5 gap-3">
          {tabs.map((data) => (
            <Link
              key={data.name}
              to={data.path}
              className={`px-[5px] py-1 text-[13.5px] cursor-pointer ${
                pathName[pathName.length - 1] === data.name.toLowerCase()
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : ""
              } text-nowrap duration-150 hover:bg-[#E1E1FB]`}
            >
              {data.name} ({data.count})
            </Link>
          ))}
        </div>
        <button className="px-3 py-2 rounded-md bg-blue-600 text-white">
          <Link to="/trip/create">Create Trip</Link>
        </button>
      </div>
    </>
  );
};

export default TripsTabs;
