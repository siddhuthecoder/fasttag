import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { TiThMenu } from "react-icons/ti";
import { FaPhoneAlt } from "react-icons/fa";
import per from '../assets/person.png';
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import Fastag from '../components/layerComponents/Fastag'
import Vahan from '../components/layerComponents/Vahan'
import Sarathi from '../components/layerComponents/Sarathi'
import MyVehicle from '../components/layerComponents/MyVehicle'

import { Link } from 'react-router-dom';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const tabs = [
    {
        name: "Fastag",
        component: <Fastag />,
        link: "/fastag"
    },
    {
        name: "Vahan",
        component: <Vahan />,
        link: "/vahan"
    },
    {
        name: "Sarathi",
        component: <Sarathi />,
        link: "/sarathi"
    },
    {
        name: "My Vehicles",
        component: <MyVehicle />,
        link: "/MyVehicles"
    }
];

  return (
    <>
      <div className="w-full border flex items-center shadow fixed top-0 z-[3] justify-between bg-white h-[80px]">
        <div className="flex items-center">
          <TiThMenu 
            className='text-2xl  cursor-pointer mx-2 md:hidden'  
            onClick={toggleMenu} 
          />
          <img src={logo} alt="Logo" className="mx-3 cursor-pointer" />
          
        </div>
        <div className="md:flex items-center gap-2 hidden ">
          {tabs.map((data, index) => (
              <Link
                  to={data.link}
                  key={index}
                  className={`px-3 py-1 cursor-pointer  text-nowrap border border-black duration-150 rounded-full  hover:bg-[#E1E1FB]`}
                  // onClick={() => setTab(data.name)}
              >
                  {data.name}
              </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="md:flex hidden items-center mx-2 group relative">
            <div className=" hover:text-[#5E81F4] font-semibold cursor-pointer">ABOUT</div>
            <div className="absolute top-[100%] right-[5%] rounded-md bg-white hidden group-hover:flex overflow-hidden flex-col w-[230px] shadow-lg border z-[3]" style={{ zIndex: "100" }}>
              <div className="flex flex-col divide-y gap-1 w-full">
                <div className="w-full px-2  text-lg hover:bg-[#5E81F4] hover:text-white  cursor-pointer">Terms and Conditions</div>
                <div className="w-full px-2  text-lg hover:bg-[#5E81F4] hover:text-white  cursor-pointer">Privacy Policy</div>
                <div className="w-full px-2  text-lg hover:bg-[#5E81F4] hover:text-white  cursor-pointer">Contact Us</div>
              </div>
            </div>
          </div>
          <div className="flex items-center cursor-pointer group relative">
            <div className="absolute top-[100%] right-[5%] rounded-md bg-white hidden group-hover:flex flex-col w-[180px] h-[180px] shadow-lg border z-[3]" style={{ zIndex: "100" }}>
              <div className="w-full flex items-center justify-center mt-4 gap-2">
                <div className="flex flex-col text-center mx-2">
                  <div className="text-[#5E81F4] font-semibold">Api Hits</div>
                  <div className="font-semibold">1000</div>
                </div>
                <div className="flex flex-col text-center mx-2">
                  <div className="text-[#5E81F4] font-semibold">Max Hits</div>
                  <div className="font-semibold">1000</div>
                </div>
              </div>
              <div className="w-[75%] mx-auto mt-3">
                <button className="w-full bg-[#EDEDED] py-1 border border-black rounded-md font-semibold">Pricing/Plan</button>
              </div>
              <div className="w-[75%] mx-auto mt-3">
                <button className="w-full bg-[#5E81F4] text-white py-1 rounded-md font-semibold">Log Out</button>
              </div>
            </div>
            <div className="w-[30px] h-[30px] mx-2 rounded-full overflow-hidden">
              <img src={per} alt="Profile" className="w-full h-full" />
            </div>
            <div className="flex-col ps-2 mx-2 hidden md:flex">
              <div className="font-semibold flex items-center">
                <div className="ps-2 font-semibold text-[#5E81F4] hidden md:block text-1xl">VS Logistics Solution Pvt.Ltd</div>
              </div>
              <div className="w-full flex items-center justify-between">
                <div className="bg-[#5E81F4] px-2 rounded-lg font-semibold text-white">Basic</div>
                <div className="text-[#5E81F4]">Upgrade</div>
              </div>
            </div>
            <FaChevronDown className="me-1" /> 
          </div>
        </div>
      </div>
      {/* Side Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000]">
          <div className="absolute flex  flex-col top-0 left-0 w-full h-[100vh]  z-[1000] bg-white shadow-md">
              <div className="w-full flex items-center justify-between">
                <div className=""></div>
                <MdOutlineClose className="text-2xl m-2 text-red-500" onClick={toggleMenu} />
              </div>
              <div className="flex w-[70%] flex-col ps-2 divide-y">
                {
                  tabs.map((data) => (
                    <Link to={data.link} className="font-semibold mt-2 ps-3 hover:text-[#5E81F4]" onClick={toggleMenu}>{data.name}</Link>
                  ))
                }
                <div className="font-semibold mt-2 ps-3 hover:text-[#5E81F4]" onClick={toggleMenu}>Privacy Policy</div>
                <div className="font-semibold mt-2 ps-3 hover:text-[#5E81F4]" onClick={toggleMenu}>Terms and Conditions</div>
                <div className="font-semibold mt-2 ps-3 hover:text-[#5E81F4]" onClick={toggleMenu}>Contact Us</div>

              </div>
              <div className="w-full flex flex-col">

              </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
