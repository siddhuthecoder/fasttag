import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";



const Fastag = () => {
  return (
    <>  
      <div className="w-full flex flex-col">
          {/* <div className="flex w-full  mx-auto items-center mt-3 relative">
            <input type="text" className="w-full  px-3  h-[52px] rounded-md border"  placeholder="Enter Vehicle Number"/>
            <div className="absolute right-0 w-[50px]  h-[50px] bg-[#5E81F4] rounded-tr-md rounded-tb-md rounded-br-md flex justify-center   items-center">
              <IoSearchOutline className="text-white text-2xl" />
            </div>
          </div> */}
        <div className="w-full flex flex-col bg-white mt-5 ps-3  rounded-md">
            <div className="text-zinc-400 pt-3 ">Vehicle Number</div>
            <div className="text-2xl font-semibold">EV-2017002346</div>
            <hr className="mx-3 my-2" />
            <div className="w-full flex bg-white">
              {/* <div className="h-[250px] flex flex-col relative  border-dashed ms-4  my-3 border-[2px] border-zinc-400">
                  <div className="absolute  ms-[-20px] flex flex-col justify-between h-[250px]">
                    <div className="w-[40px] h-[40px] rounded-full bg-[#E8F9EE] flex justify-center items-center">
                      <div className="w-[15px] h-[15px] rounded-full bg-green-500"></div>
                    </div>
                    <div className="w-[40px] h-[40px] rounded-full bg-[#E5E5FE] flex justify-center items-center">
                      <FaLocationDot className='text-blue-500' />
                    </div>
                    <div className="w-[40px] h-[40px] rounded-full bg-[#E5E5FE] flex justify-center items-center">
                      <FaLocationDot className='text-blue-500' />
                    </div>
                  </div>
              </div> */}
              {/* ====== repeating section ========== */}
              <div className="w-full  z-[1] flex flex-col h-[260px] ps-[20px]  overflow-x-visible overflow-y-scroll">
                <div className="w-full  flex items-center justify-between  border-dashed border-t-0 border-r-0 border-b-0 border-[2px] relative">
                  <div className="ms-[-15px] absolute">
                    <div className="w-[30px] h-[30px]  z-[3] rounded-full bg-[#E8F9EE] flex justify-center items-center">
                      <div className="w-[11px] h-[11px]  z-[3] rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="text-zinc-400 ps-[20px]">2972 Westheimer </div>
                  <div className="flex flex-col text-right text-[16px] ">
                    <div className="text-black font-semibold">30-04-2005</div>
                    <div className="font-semibold">17:35</div>
                  </div>
                </div>
                <hr className="mx-2 my-1" />
                <div className="w-full  flex items-center justify-between  border-dashed border-t-0 border-r-0 border-b-0 border-[2px] relative">
                  <div className="ms-[-15px] absolute">
                    <div className="w-[30px] h-[30px]  z-[3] rounded-full bg-[#E5E5FE] flex justify-center items-center">
                    <FaLocationDot className='text-blue-500' />
                    </div>
                  </div>
                  <div className="text-zinc-400 ps-[20px]">2972 Westheimer </div>
                  <div className="flex flex-col text-right text-[16px] ">
                    <div className="text-black font-semibold">30-04-2005</div>
                    <div className="font-semibold">17:35</div>
                  </div>
                </div>
                <hr className="mx-2 my-1" />
                <div className="w-full  flex items-center justify-between  border-dashed border-t-0 border-r-0 border-b-0 border-[2px] relative">
                  <div className="ms-[-15px] absolute">
                    <div className="w-[30px] h-[30px]  z-[3] rounded-full bg-[#E5E5FE] flex justify-center items-center">
                    <FaLocationDot className='text-blue-500' />
                    </div>
                  </div>
                  <div className="text-zinc-400 ps-[20px]">2972 Westheimer </div>
                  <div className="flex flex-col text-right text-[16px] ">
                    <div className="text-black font-semibold">30-04-2005</div>
                    <div className="font-semibold">17:35</div>
                  </div>
                </div>
                <hr className="mx-2 my-1" />
                <div className="w-full  flex items-center justify-between  border-dashed border-t-0 border-r-0 border-b-0 border-[2px] relative">
                  <div className="ms-[-15px] absolute">
                    <div className="w-[30px] h-[30px]  z-[3] rounded-full bg-[#E5E5FE] flex justify-center items-center">
                    <FaLocationDot className='text-blue-500' />
                    </div>
                  </div>
                  <div className="text-zinc-400 ps-[20px]">2972 Westheimer </div>
                  <div className="flex flex-col text-right text-[16px] ">
                    <div className="text-black font-semibold">30-04-2005</div>
                    <div className="font-semibold">17:35</div>
                  </div>
                </div>
                <hr className="mx-2 my-1" />
                
                <div className="w-full  flex items-center justify-between  border-dashed border-t-0 border-r-0 border-b-0 border-[2px] relative">
                  <div className="ms-[-15px] absolute">
                    <div className="w-[30px] h-[30px]  z-[3] rounded-full bg-[#E5E5FE] flex justify-center items-center">
                    <FaLocationDot className='text-blue-500' />
                    </div>
                  </div>
                  <div className="text-zinc-400 ps-[20px]">2972 Westheimer </div>
                  <div className="flex flex-col text-right text-[16px] ">
                    <div className="text-black font-semibold">30-04-2005</div>
                    <div className="font-semibold">17:35</div>
                  </div>
                </div>
                <hr className="mx-2 my-1" />
                
                <div className="w-full  flex items-center justify-between  border-dashed border-t-0 border-r-0 border-b-0 border-[2px] relative">
                  <div className="ms-[-15px] absolute">
                    <div className="w-[30px] h-[30px]  z-[3] rounded-full bg-[#E5E5FE] flex justify-center items-center">
                    <FaLocationDot className='text-blue-500' />
                    </div>
                  </div>
                  <div className="text-zinc-400 ps-[20px]">2972 Westheimer </div>
                  <div className="flex flex-col text-right text-[16px] ">
                    <div className="text-black font-semibold">30-04-2005</div>
                    <div className="font-semibold">17:35</div>
                  </div>
                </div>
                <hr className="mx-2 my-1" />
                
                <div className="w-full  flex items-center justify-between   border-dashed border-t-0 border-r-0 border-b-0 border-[2px] relative">
                  <div className="ms-[-15px] absolute">
                    <div className="w-[30px] h-[30px]  z-[3] rounded-full bg-[#E5E5FE] flex justify-center items-center">
                    <FaLocationDot className='text-blue-500' />
                    </div>
                  </div>
                  <div className="text-zinc-400 ps-[20px]">2972 Westheimer </div>
                  <div className="flex flex-col text-right text-[16px] ">
                    <div className="text-black font-semibold">30-04-2005</div>
                    <div className="font-semibold">17:35</div>
                  </div>
                </div>
                <hr className="mx-2 my-1" />
                
                <div className="w-full  flex items-center justify-between  border-dashed border-t-0 border-r-0 border-b-0 border-[2px] relative">
                  <div className="ms-[-15px] absolute">
                    <div className="w-[30px] h-[30px]  z-[3] rounded-full bg-[#E5E5FE] flex justify-center items-center">
                    <FaLocationDot className='text-blue-500' />
                    </div>
                  </div>
                  <div className="text-zinc-400 ps-[20px]">2972 Westheimer </div>
                  <div className="flex flex-col text-right text-[16px] ">
                    <div className="text-black font-semibold">30-04-2005</div>
                    <div className="font-semibold">17:35</div>
                  </div>
                </div>
                <hr className="mx-2 my-1" />
                
                <div className="w-full  flex items-center justify-between  border-dashed border-t-0 border-r-0 border-b-0 border-[2px] relative">
                  <div className="ms-[-15px] absolute">
                    <div className="w-[30px] h-[30px]  z-[3] rounded-full bg-[#E5E5FE] flex justify-center items-center">
                    <FaLocationDot className='text-blue-500' />
                    </div>
                  </div>
                  <div className="text-zinc-400 ps-[20px]">2972 Westheimer </div>
                  <div className="flex flex-col text-right text-[16px] ">
                    <div className="text-black font-semibold">30-04-2005</div>
                    <div className="font-semibold">17:35</div>
                  </div>
                </div>
                <hr className="mx-2 my-1" />
                
              </div>
              
            </div>
        </div>
        
      </div>
    </>
  )
}

export default Fastag
