import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


const TripsTabs = () => {
    const location = useLocation()
    const pathName = location.pathname.split("/")
    const tabs =  [
        {name:"Active",path:"/trip/active"},
        {name:"Open",path:"/trip/open"},
        {name:"Completed",path:"/trip/completed"},
        {name:"Cancelled",path:"/trip/cancelled"},
    ]
    // {`px-[5px] py-1  text-[13.5px] cursor-pointer ${pathName === data.link ? "bg-[#E1E1FB]" : ""} text-nowrap border border-black duration-150 rounded-full hover:bg-[#E1E1FB]`}
  return (
    <>
      <div className="w-full md:w-[100%] mx-auto flex items-center justify-between mt-[60px]">
        <div className="flex items-center flex-wrap my-3 md:gap-5 gap-3">
            {tabs.map((data) => (
                <Link to={data.path} className={`px-[5px] py-1  text-[13.5px] cursor-pointer ${pathName[pathName.length-1]===data.name.toLowerCase() ? "bg-[#E1E1FB]" : ""} text-nowrap border border-black duration-150 rounded-full hover:bg-[#E1E1FB]`}>{data.name}</Link>
            ))}
        </div>
        <button className="px-3 py-2 rounded-md bg-blue-600 text-white">
            <Link to="/trip/create">Create Trip</Link>
        </button>
      </div>
    </>
  )
}

export default TripsTabs
// {`map font-semibold cursor-pointer  ${pathName[pathName.length-1]===data.name.toLowerCase() ?" bg-blue-600  px-2 py-1 rounded-md text-white":"hover:underline hover:text-blue-600 text-zinc-500"}` }