import React from 'react'
import Info from './Info'
import ApiHistory from './ApiHistory'
import { Link } from 'react-router-dom';

const Layout = () => {
  const tabs = [
    { name: "Fastag", link: "/fastag" },
    { name: "Vahan", link: "/vahan" },
    { name: "Sarathi", link: "/sarathi" },
    { name: "My Vehicles", link: "/MyVehicles" }
  ];
  return (
    <>
        <div className=" w-full md:w-[80%] mx-auto mt-[80px] flex flex-col ps-2 pt-2">
        <div className="flex items-center flex-wrap mt-2 gap-2 md:hidden">
            {tabs.map((data, index) => (
              <Link
                to={data.link}
                key={index}
                className={`px-3 py-1 cursor-pointer  text-nowrap border border-black duration-150 rounded-full hover:bg-[#E1E1FB]`}
              >
                {data.name}
              </Link>
            ))}
          </div>
          {/* <div className="font-semibold text-2xl py-2">Dashboard</div> */}
          <Info />
          <div className="w-full grid gird-cols-1  mt-3 lg:grid-cols-2 gap-3">
              <ApiHistory />
              <ApiHistory />
          </div>
        </div>
    </>
      )
}

export default Layout