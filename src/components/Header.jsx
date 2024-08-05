import React from 'react'
import logo from '../assets/logo.png'
import { TiThMenu } from "react-icons/ti";
import { FaPhoneAlt } from "react-icons/fa";
import per from '../assets/person.png'
import { FaChevronDown } from "react-icons/fa";



const Header = () => {
  return (
    <>
      <div className="w-full flex items-center shadow sticky top-0 z-[3]  justify-between bg-white h-[60px]">
        <div className="flex items-center">
            <TiThMenu className='text-2xl text-zinc-400 cursor-pointer mx-2 md:hidden'  />
            <img src={logo} alt="" className="mx-3 cursor-pointer"  />
        </div>
        <div className="flex items-center gap-2">
            <div className="md:flex hidden text-zinc-400 items-center mx-2">
                <FaPhoneAlt className=" text-black"/>
                <div className="pt-[-15px] mx-2">+91 630 373 8847</div>
            </div>
            <div className="flex items-center cursor-pointer group relative">
                <div className="absolute top-[120%] right-[5%] rounded-md bg-white hidden group-hover:flex  flex-col w-[250px] h-[250px] z-[3]" style={{zIndex:"100"}}>
                  <div className="w-full flex items-center justify-center mt-4 gap-2">
                    <div className="flex flex-col text-center mx-2  ">
                      <div className="text-[#5E81F4] font-semibold">Api Hits</div>
                      <div className="font-semibold">1000</div>
                    </div>
                    <div className="flex flex-col text-center mx-2 ">
                      <div className="text-[#5E81F4] font-semibold">Max Hits</div>
                      <div className="font-semibold">1000</div>
                    </div>
                  </div>
                  <div className="w-[80%] mx-auto"></div>
                </div>
                <div className="w-[30px] h-[30px] mx-2 rounded-full overflow-hidden">
                    <img src={per} alt="" className="w-full h-full" />
                </div>
                <div className=" flex-col ps-2 mx-2 hidden md:flex">
                  <div className="font-semibold flex items-center" >
                    <span className="">VS Logistics Solution Pvt.Ltd</span>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className="bg-[#5E81F4] px-2 rounded-lg font-semibold text-white">Basic</div>
                    <div className="text-[#5E81F4]">Upgrade</div>
                  </div>
                </div>
                {/* <FaChevronDown className='mx-3' /> */}
            </div>
        </div>
      </div>
    </>
  )
}

export default Header
