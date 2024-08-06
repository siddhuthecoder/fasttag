import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import car1 from '../../assets/car1.png'


const Sarathi = () => {
  return (
    <>
      <div className="w-full flex flex-col mt-3 ">
        <input type="text" className="w-full  px-3  min-h-[52px] rounded-md border"  placeholder="Enter Driving Licesnes Number"/>
        <div className="flex w-full  mx-auto items-center mt-3 relative">
            <input type="text" className="w-full  px-3  h-[52px] rounded-md border"  placeholder="Enter Date of birth as per driving license"/>
            <div className="absolute right-0 w-[50px] z-[2] h-[50px] bg-[#5E81F4] rounded-tr-md rounded-tb-md rounded-br-md flex justify-center   items-center">
              <IoSearchOutline className="text-white text-2xl" />
            </div>
        </div>
        <div className="mt-3 w-full bg-white rounded-md h-[450px] overflow-y-scroll flex flex-col ps-3">
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-zinc-400 text-sm">
                Dl  Number
              </div>
              <div className="font-semi-bold text-lg">HR55AQ5994 <span className="text-green-500">(Active)</span></div>
            </div>
            <img src={car1} alt="" className="m-2" />
          </div>
          <hr className="mx-3 my-1" />
          
          <div className="w-full flex flex-col ">
            <div className="text-2xl font-semibold text-[#5E81F4]">Driving license Details</div>
            <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-3 ">
              <div className="flex flex-col ps-2">
                <div className="text-zinc-400">Vehicle Number</div>
                <div className="font-semibold">EV-2017002346</div>
              </div>
              <div className="flex flex-col ps-2">
                <div className="text-zinc-400">Vehicle Number</div>
                <div className="font-semibold">EV-2017002346</div>
              </div>
              <div className="flex flex-col ps-2">
                <div className="text-zinc-400">Vehicle Number</div>
                <div className="font-semibold">EV-2017002346</div>
              </div>
              <div className="flex flex-col ps-2">
                <div className="text-zinc-400">Vehicle Number</div>
                <div className="font-semibold">EV-2017002346</div>
              </div>
              <div className="flex flex-col ps-2">
                <div className="text-zinc-400">Vehicle Number</div>
                <div className="font-semibold">EV-2017002346</div>
              </div>
              <div className="flex flex-col ps-2">
                <div className="text-zinc-400">Vehicle Number</div>
                <div className="font-semibold">EV-2017002346</div>
              </div>
              <div className="flex flex-col ps-2">
                <div className="text-zinc-400">Vehicle Number</div>
                <div className="font-semibold">EV-2017002346</div>
              </div>
            </div>
            <hr className="mx-3 my-1" />
            <div className="flex flex-col h-[200px] overflow-y-auto">
                <div className="text-2xl font-semibold text-[#5E81F4]">Driving Class</div>
                  {/* ============ classes ============== */}
                  <div className="font-semibold text-lg ps-3">Motot Cycle WIth Gear <span className="text-green-600">(Active)</span></div>
                  <div className=" ps-[30px] text-zinc-400">Validity <span className="text-semibold">00/00/0000-11/11/1111 </span></div>
                  <div className="font-semibold text-lg ps-3">Motot Cycle WIth Gear <span className="text-green-600">(Active)</span></div>
                  <div className=" ps-[30px] text-zinc-400">Validity <span className="text-semibold">00/00/0000-11/11/1111 </span></div>
                  <div className="font-semibold text-lg ps-3">Motot Cycle WIth Gear <span className="text-green-600">(Active)</span></div>
                  <div className=" ps-[30px] text-zinc-400">Validity <span className="text-semibold">00/00/0000-11/11/1111 </span></div>
                  <div className="font-semibold text-lg ps-3">Motot Cycle WIth Gear <span className="text-green-600">(Active)</span></div>
                  <div className=" ps-[30px] text-zinc-400">Validity <span className="text-semibold">00/00/0000-11/11/1111 </span></div>
                  <div className="font-semibold text-lg ps-3">Motot Cycle WIth Gear <span className="text-green-600">(Active)</span></div>
                  <div className=" ps-[30px] text-zinc-400">Validity <span className="text-semibold">00/00/0000-11/11/1111 </span></div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Sarathi
