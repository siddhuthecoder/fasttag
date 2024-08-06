import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { TiThMenu } from "react-icons/ti";
import { FaPhoneAlt } from "react-icons/fa";
import per from '../assets/person.png';
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="w-full flex items-center shadow sticky top-0 z-[3] justify-between bg-white h-[80px]">
        <div className="flex items-center">
          <TiThMenu 
            className='text-2xl text-zinc-400 cursor-pointer mx-2 md:hidden'  
            onClick={toggleMenu} 
          />
          <img src={logo} alt="Logo" className="mx-3 cursor-pointer" />
        </div>
        <div className="flex items-center gap-2">
          <div className="md:flex hidden items-center mx-2 group relative">
            <div className="text-zinc-400 hover:text-[#5E81F4] cursor-pointer">About</div>
            <div className="absolute top-[100%] right-[5%] rounded-md bg-white hidden group-hover:flex overflow-hidden flex-col w-[230px] shadow-lg border z-[3]" style={{ zIndex: "100" }}>
              <div className="flex flex-col divide-y gap-1 w-full">
                <div className="w-full px-2 text-zinc-400 text-lg hover:bg-[#5E81F4] hover:text-white font-semibold cursor-pointer">Terms and Conditions</div>
                <div className="w-full px-2 text-zinc-400 text-lg hover:bg-[#5E81F4] hover:text-white font-semibold cursor-pointer">Privacy Policy</div>
                <div className="w-full px-2 text-zinc-400 text-lg hover:bg-[#5E81F4] hover:text-white font-semibold cursor-pointer">Contact Us</div>
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
                <span>VS Logistics Solution Pvt.Ltd</span>
              </div>
              <div className="w-full flex items-center justify-between">
                <div className="bg-[#5E81F4] px-2 rounded-lg font-semibold text-white">Basic</div>
                <div className="text-[#5E81F4]">Upgrade</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Side Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000]">
          <div className="absolute top-0 left-0 w-full h-full z-[1000] bg-white shadow-md">
            <div className="w-full flex flex-row-reverse">
                <MdOutlineClose  className="text-2xl m-2 text-red-500" onClick={toggleMenu} />
            </div>
            {/* Side menu content */}
            <div className="p-4">
              <div className="space-y-2 flex flex-col items-center h-[80vh] justify-between">
                <div className="flex flex-col ">
                <div className="text-zinc-700 font-semibold hover:text-[#5E81F4] my-4 cursor-pointer">Privacy Policy</div>
                <div className="text-zinc-700 font-semibold hover:text-[#5E81F4] my-4 cursor-pointer">Terms and Conditions</div>
                <div className="text-zinc-700 font-semibold hover:text-[#5E81F4] my-4 cursor-pointer">Contact Us</div>
                </div>
                <div className="" style={{ zIndex: "100" }}>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
