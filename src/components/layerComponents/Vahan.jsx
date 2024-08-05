import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import truck from '../../assets/truck.png'

const Vahan = () => {
  return (
    <>
      <div className="w-full flex flex-col ">
          <div className="flex w-full  mx-auto items-center mt-3 relative">
            <input type="text" className="w-full  px-3  h-[52px] rounded-md border"  placeholder="Enter Vehicle Number"/>
            <div className="absolute right-0 w-[50px] z-[2] h-[50px] bg-[#5E81F4] rounded-tr-md rounded-tb-md rounded-br-md flex justify-center   items-center">
              <IoSearchOutline className="text-white text-2xl" />
            </div>
          </div>
          <div className="flex flex-col w-full rounded-md bg-white h-[70vh] overflow-y-auto mt-3 ps-3">
              <div className="w-full flex items-center justify-between">
                <div className="flex flex-col ps-2 my-1">
                  <div className="text-zinc-400">Vehicle Number</div>
                  <div className="font-semibold text-lg">HR55AQ5994 <span className="text-green-600">(Active)</span></div>
                </div>
                <img src={truck} className='m-2' alt="" />
              </div>
              <div className="w-full flex flex-col">
                <div className="text-zinc-400">Registeration Date: </div>
                <div className="font-semibold">30-04-2005</div>
              </div>
              <hr className="mx-3 my-1" />
              <div className="text-2xl font-semi-bold text-[#5E81F4]">Vehicle Info</div>
              <div className="flex flex-col ps-2">
                <div className="text-zinc-400">Owner Name</div>
                <div className=" text-lg">Sribabu Mandraju</div>
              </div>
              <div className="w-full grid grid-cols-1 mt-2 gap-2 md:grid-cols-2">
                <div className="flex flex-col ps-2">
                  <div className="text-zinc-400">Registering Authority</div>
                  <div className="font-semibold">EV-2017002346</div>
                </div>
                <div className="flex flex-col ps-2">
                  <div className="text-zinc-400">Vehicle class</div>
                  <div className="font-semibold">EV-2017002346</div>
                </div>
                <div className="flex flex-col ps-2">
                  <div className="text-zinc-400">Fuel</div>
                  <div className="font-semibold">EV-2017002346</div>
                </div>
                <div className="flex flex-col ps-2">
                  <div className="text-zinc-400">Emission Norms</div>
                  <div className="font-semibold">EV-2017002346</div>
                </div>
              </div>
              <div className="mt-3 text-2xl font-semi-bold text-[#5E81F4]">Document Info</div>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
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
          </div>
      </div>
    </>
  )
}

export default Vahan
