import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const TripsTabs = () => {
  const [tripCounts, setTripCounts] = useState({
    active: 0,
    completed: 0,
    open: 0, // For open trips
    cancelled: 0
  });

  const location = useLocation();
  const pathName = location.pathname.split("/");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // Fetch trip data from the API
    const fetchTripData = async () => {
      try {
        // Fetch active trips
        const activeResponse = await axios.get(
          `https://fastagtracking.com/customulip/company/${user._id}/active-trips`
        );
        const activeTrips = activeResponse.data.length;
        console.log("Active trips:", activeResponse.data.length);

        // Fetch all trips (for completed and open)
        const completedResponse = await axios.get(
          `https://fastagtracking.com/customulip/company/${user._id}/all-trips`
        );
        const completedTrips = completedResponse.data

        // Fetch cancelled (expired) trips
        const cancelledResponse = await axios.get(
          `https://fastagtracking.com/customulip/company/${user._id}/expired-trips`
        );
        const cancelledTrips = cancelledResponse.data.length 
        console.log("Cancelled trips:", cancelledTrips);

        // Count the active, completed, open, and cancelled trips
        const activeCount = activeTrips;
        const completedCount = completedTrips.filter(trip => trip.Completed === true).length;
        const openCount = completedTrips.filter(trip => !(trip.isActive === true || trip.Completed === true)).length;
        const cancelledCount = cancelledTrips.length || 0;

        setTripCounts({
          active: activeCount,
          completed: completedCount,
          open: openCount,
          cancelled: cancelledCount,
        });
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };

    fetchTripData();
  }, [user._id]);

  const tabs = [
    { name: "Active", path: "/trip/active", count: tripCounts.active},
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
