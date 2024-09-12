import React from 'react'
import Info from './Info'
// import ApiHistory from './ApiHistory'
import { Link } from 'react-router-dom';
// import SearchHistory from './../../pages/SearchHistory';
// import { FaLocationDot } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';
// import { FaLongArrowAltRight } from "react-icons/fa";
const Layout = () => {
  const location = useLocation();
  const pathName = location.pathname;
  // alert(pathName)
  const tabs = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Fastag", link: "/fastag" },
    { name: "Vahan", link: "/vahan" },
    { name: "Sarathi", link: "/sarathi" },
    { name: "My Vehicles", link: "/MyVehicles" },
    {name:"Trip" , link: "/trip"}
  ];
  return (
    <>
        <div className=" w-full md:w-[80%]  mx-auto mt-[70px] flex flex-col ps-2 md:pt-0 ">
        <div className="flex items-center flex-wrap mt-2 gap-2 md:hidden">
        {tabs.map((data, index) => (
              <Link
                to={data.link}
                key={index}
                className={`px-[5px] py-1  text-[13.5px] cursor-pointer ${pathName === data.link ? "bg-[#E1E1FB]" : ""} text-nowrap border border-black duration-150 rounded-full hover:bg-[#E1E1FB]`}
              >
                {data.name}
              </Link>
            ))}
          </div>
          <div className="font-semibold text-3xl  md:pb-9 py-5 text-[#242e4c] ">Dashboard</div>
          <Info />
          <div className="pt-9 mt-3 pb-3 ">
              {/* <ApiHistory />
              <ApiHistory /> */}
              <Link to='/searchhistory'> <button className="px-4   py-2 rounded-md bg-[#5E81F4] text-white text-sm md:text-base font-semibold">Search History </button></Link>
              <Link to='/transaction'> <button className="px-4 mx-3 md:mx-9  py-2 rounded-md bg-[#5E81F4] text-white text-sm md:text-base font-semibold">Transcation History</button></Link>
          </div>
        </div>
    </>
      )
}

export default Layout 