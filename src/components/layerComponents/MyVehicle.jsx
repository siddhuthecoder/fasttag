import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import mod1 from '../../assets/mod1.png'
import mod2 from '../../assets/mod2.png'





const MyVehicle = () => {
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full grid grid-cols-12 gap-3">
          <div className="flex w-full col-span-7 md:col-span-8 mx-auto items-center mt-3 relative">
            <input type="text" className="w-full  px-3  h-[52px] rounded-md border"  placeholder="Enter Vehicle Number"/>
            <div className="absolute right-0 w-[50px] z-[2] h-[50px] bg-[#5E81F4] rounded-tr-md rounded-tb-md rounded-br-md flex justify-center   items-center">
              <IoSearchOutline className="text-white text-2xl" />
            </div>
          </div>
          <div className="col-span-5 md:col-span-4 flex justify-center mt-3 items-center">
            <button className="w-full rounded-md h-[50px] px-2 text-white text-lg font-semibold  bg-blue-500">Add Vehicle</button>
          </div>
          
        </div>
       <div className="w-full flex-col mt-3 h-[70vh] overflow-y-auto">
        <div className="w-full bg-white rounded-md mt-3 justify-between flex-wrap  flex items-center">
            <div className="flex w-full  justify-between ,d:justify-start md:w-auto items-center gap-1">
              <div className="flex flex-col ps-2 my-2">
                <div className="font-semibold text-lg">Vehicle Number</div>
                <div className="text-zinc-400">HR55AQ5884</div>
              </div>
             <div className="flex items-center">
             <RiDeleteBinLine className="text-2xl ms-3 text-red-500 mx-3" />
              <FiEdit className='text-2xl ms-3 text-blue-500 mx-3' />

             </div>
            </div>
            <div className="flex items-center m-2 gap-3">
              <div className="w-[100px] cursor-pointer  h-[40px] flex justify-center items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod1} className='w' alt="" />
              </div>
              <div className="w-[100px] h-[40px] cursor-pointer flex justify-center mx-2 items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod2} className='w' alt="" />
              </div>
            </div>
        </div>
        <div className="w-full bg-white rounded-md mt-3 justify-between flex-wrap  flex items-center">
            <div className="flex w-full  justify-between ,d:justify-start md:w-auto items-center gap-1">
              <div className="flex flex-col ps-2 my-2">
                <div className="font-semibold text-lg">Vehicle Number</div>
                <div className="text-zinc-400">HR55AQ5884</div>
              </div>
             <div className="flex items-center">
             <RiDeleteBinLine className="text-2xl ms-3 text-red-500 mx-3" />
              <FiEdit className='text-2xl ms-3 text-blue-500 mx-3' />

             </div>
            </div>
            <div className="flex items-center m-2 gap-3">
              <div className="w-[100px] cursor-pointer  h-[40px] flex justify-center items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod1} className='w' alt="" />
              </div>
              <div className="w-[100px] h-[40px] cursor-pointer flex justify-center mx-2 items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod2} className='w' alt="" />
              </div>
            </div>
        </div>
        <div className="w-full bg-white rounded-md mt-3 justify-between flex-wrap  flex items-center">
            <div className="flex w-full  justify-between ,d:justify-start md:w-auto items-center gap-1">
              <div className="flex flex-col ps-2 my-2">
                <div className="font-semibold text-lg">Vehicle Number</div>
                <div className="text-zinc-400">HR55AQ5884</div>
              </div>
             <div className="flex items-center">
             <RiDeleteBinLine className="text-2xl ms-3 text-red-500 mx-3" />
              <FiEdit className='text-2xl ms-3 text-blue-500 mx-3' />

             </div>
            </div>
            <div className="flex items-center m-2 gap-3">
              <div className="w-[100px] cursor-pointer  h-[40px] flex justify-center items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod1} className='w' alt="" />
              </div>
              <div className="w-[100px] h-[40px] cursor-pointer flex justify-center mx-2 items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod2} className='w' alt="" />
              </div>
            </div>
        </div>
        <div className="w-full bg-white rounded-md mt-3 justify-between flex-wrap  flex items-center">
            <div className="flex w-full  justify-between ,d:justify-start md:w-auto items-center gap-1">
              <div className="flex flex-col ps-2 my-2">
                <div className="font-semibold text-lg">Vehicle Number</div>
                <div className="text-zinc-400">HR55AQ5884</div>
              </div>
             <div className="flex items-center">
             <RiDeleteBinLine className="text-2xl ms-3 text-red-500 mx-3" />
              <FiEdit className='text-2xl ms-3 text-blue-500 mx-3' />

             </div>
            </div>
            <div className="flex items-center m-2 gap-3">
              <div className="w-[100px] cursor-pointer  h-[40px] flex justify-center items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod1} className='w' alt="" />
              </div>
              <div className="w-[100px] h-[40px] cursor-pointer flex justify-center mx-2 items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod2} className='w' alt="" />
              </div>
            </div>
        </div>
        <div className="w-full bg-white rounded-md mt-3 justify-between flex-wrap  flex items-center">
            <div className="flex w-full  justify-between ,d:justify-start md:w-auto items-center gap-1">
              <div className="flex flex-col ps-2 my-2">
                <div className="font-semibold text-lg">Vehicle Number</div>
                <div className="text-zinc-400">HR55AQ5884</div>
              </div>
             <div className="flex items-center">
             <RiDeleteBinLine className="text-2xl ms-3 text-red-500 mx-3" />
              <FiEdit className='text-2xl ms-3 text-blue-500 mx-3' />

             </div>
            </div>
            <div className="flex items-center m-2 gap-3">
              <div className="w-[100px] cursor-pointer  h-[40px] flex justify-center items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod1} className='w' alt="" />
              </div>
              <div className="w-[100px] h-[40px] cursor-pointer flex justify-center mx-2 items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod2} className='w' alt="" />
              </div>
            </div>
        </div>
        <div className="w-full bg-white rounded-md mt-3 justify-between flex-wrap  flex items-center">
            <div className="flex w-full  justify-between ,d:justify-start md:w-auto items-center gap-1">
              <div className="flex flex-col ps-2 my-2">
                <div className="font-semibold text-lg">Vehicle Number</div>
                <div className="text-zinc-400">HR55AQ5884</div>
              </div>
             <div className="flex items-center">
             <RiDeleteBinLine className="text-2xl ms-3 text-red-500 mx-3" />
              <FiEdit className='text-2xl ms-3 text-blue-500 mx-3' />

             </div>
            </div>
            <div className="flex items-center m-2 gap-3">
              <div className="w-[100px] cursor-pointer  h-[40px] flex justify-center items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod1} className='w' alt="" />
              </div>
              <div className="w-[100px] h-[40px] cursor-pointer flex justify-center mx-2 items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod2} className='w' alt="" />
              </div>
            </div>
        </div>
        <div className="w-full bg-white rounded-md mt-3 justify-between flex-wrap  flex items-center">
            <div className="flex w-full  justify-between ,d:justify-start md:w-auto items-center gap-1">
              <div className="flex flex-col ps-2 my-2">
                <div className="font-semibold text-lg">Vehicle Number</div>
                <div className="text-zinc-400">HR55AQ5884</div>
              </div>
             <div className="flex items-center">
             <RiDeleteBinLine className="text-2xl ms-3 text-red-500 mx-3" />
              <FiEdit className='text-2xl ms-3 text-blue-500 mx-3' />

             </div>
            </div>
            <div className="flex items-center m-2 gap-3">
              <div className="w-[100px] cursor-pointer  h-[40px] flex justify-center items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod1} className='w' alt="" />
              </div>
              <div className="w-[100px] h-[40px] cursor-pointer flex justify-center mx-2 items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod2} className='w' alt="" />
              </div>
            </div>
        </div>
        <div className="w-full bg-white rounded-md mt-3 justify-between flex-wrap  flex items-center">
            <div className="flex w-full  justify-between ,d:justify-start md:w-auto items-center gap-1">
              <div className="flex flex-col ps-2 my-2">
                <div className="font-semibold text-lg">Vehicle Number</div>
                <div className="text-zinc-400">HR55AQ5884</div>
              </div>
             <div className="flex items-center">
             <RiDeleteBinLine className="text-2xl ms-3 text-red-500 mx-3" />
              <FiEdit className='text-2xl ms-3 text-blue-500 mx-3' />

             </div>
            </div>
            <div className="flex items-center m-2 gap-3">
              <div className="w-[100px] cursor-pointer  h-[40px] flex justify-center items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod1} className='w' alt="" />
              </div>
              <div className="w-[100px] h-[40px] cursor-pointer flex justify-center mx-2 items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod2} className='w' alt="" />
              </div>
            </div>
        </div>
        <div className="w-full bg-white rounded-md mt-3 justify-between flex-wrap  flex items-center">
            <div className="flex w-full  justify-between ,d:justify-start md:w-auto items-center gap-1">
              <div className="flex flex-col ps-2 my-2">
                <div className="font-semibold text-lg">Vehicle Number</div>
                <div className="text-zinc-400">HR55AQ5884</div>
              </div>
             <div className="flex items-center">
             <RiDeleteBinLine className="text-2xl ms-3 text-red-500 mx-3" />
              <FiEdit className='text-2xl ms-3 text-blue-500 mx-3' />

             </div>
            </div>
            <div className="flex items-center m-2 gap-3">
              <div className="w-[100px] cursor-pointer  h-[40px] flex justify-center items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod1} className='w' alt="" />
              </div>
              <div className="w-[100px] h-[40px] cursor-pointer flex justify-center mx-2 items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod2} className='w' alt="" />
              </div>
            </div>
        </div>
        <div className="w-full bg-white rounded-md mt-3 justify-between flex-wrap  flex items-center">
            <div className="flex w-full  justify-between ,d:justify-start md:w-auto items-center gap-1">
              <div className="flex flex-col ps-2 my-2">
                <div className="font-semibold text-lg">Vehicle Number</div>
                <div className="text-zinc-400">HR55AQ5884</div>
              </div>
             <div className="flex items-center">
             <RiDeleteBinLine className="text-2xl ms-3 text-red-500 mx-3" />
              <FiEdit className='text-2xl ms-3 text-blue-500 mx-3' />

             </div>
            </div>
            <div className="flex items-center m-2 gap-3">
              <div className="w-[100px] cursor-pointer  h-[40px] flex justify-center items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod1} className='w' alt="" />
              </div>
              <div className="w-[100px] h-[40px] cursor-pointer flex justify-center mx-2 items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod2} className='w' alt="" />
              </div>
            </div>
        </div>
        <div className="w-full bg-white rounded-md mt-3 justify-between flex-wrap  flex items-center">
            <div className="flex w-full  justify-between ,d:justify-start md:w-auto items-center gap-1">
              <div className="flex flex-col ps-2 my-2">
                <div className="font-semibold text-lg">Vehicle Number</div>
                <div className="text-zinc-400">HR55AQ5884</div>
              </div>
             <div className="flex items-center">
             <RiDeleteBinLine className="text-2xl ms-3 text-red-500 mx-3" />
              <FiEdit className='text-2xl ms-3 text-blue-500 mx-3' />

             </div>
            </div>
            <div className="flex items-center m-2 gap-3">
              <div className="w-[100px] cursor-pointer  h-[40px] flex justify-center items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod1} className='w' alt="" />
              </div>
              <div className="w-[100px] h-[40px] cursor-pointer flex justify-center mx-2 items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod2} className='w' alt="" />
              </div>
            </div>
        </div>
        <div className="w-full bg-white rounded-md mt-3 justify-between flex-wrap  flex items-center">
            <div className="flex w-full  justify-between ,d:justify-start md:w-auto items-center gap-1">
              <div className="flex flex-col ps-2 my-2">
                <div className="font-semibold text-lg">Vehicle Number</div>
                <div className="text-zinc-400">HR55AQ5884</div>
              </div>
             <div className="flex items-center">
             <RiDeleteBinLine className="text-2xl ms-3 text-red-500 mx-3" />
              <FiEdit className='text-2xl ms-3 text-blue-500 mx-3' />

             </div>
            </div>
            <div className="flex items-center m-2 gap-3">
              <div className="w-[100px] cursor-pointer  h-[40px] flex justify-center items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod1} className='w' alt="" />
              </div>
              <div className="w-[100px] h-[40px] cursor-pointer flex justify-center mx-2 items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod2} className='w' alt="" />
              </div>
            </div>
        </div>
        <div className="w-full bg-white rounded-md mt-3 justify-between flex-wrap  flex items-center">
            <div className="flex w-full  justify-between ,d:justify-start md:w-auto items-center gap-1">
              <div className="flex flex-col ps-2 my-2">
                <div className="font-semibold text-lg">Vehicle Number</div>
                <div className="text-zinc-400">HR55AQ5884</div>
              </div>
             <div className="flex items-center">
             <RiDeleteBinLine className="text-2xl ms-3 text-red-500 mx-3" />
              <FiEdit className='text-2xl ms-3 text-blue-500 mx-3' />

             </div>
            </div>
            <div className="flex items-center m-2 gap-3">
              <div className="w-[100px] cursor-pointer  h-[40px] flex justify-center items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod1} className='w' alt="" />
              </div>
              <div className="w-[100px] h-[40px] cursor-pointer flex justify-center mx-2 items-center rounded-full border border-black bg-[#EDEDED]">
                <img src={mod2} className='w' alt="" />
              </div>
            </div>
        </div>

       </div>
       
        
      </div>
    </>
  )
}

export default MyVehicle
