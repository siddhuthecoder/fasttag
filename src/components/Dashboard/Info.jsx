import React from 'react'
import i1 from '../../assets/ic1.png'
import i2 from '../../assets/i2.png'
import i3 from '../../assets/i3.png'
import { useSelector } from 'react-redux'


const Info = () => {
    const user = useSelector((state) => state.auth.user)
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <div className="py-2 bg-white rounded-md flex flex-col ps-2">
            <div className="text-nowrap text-2xl font-semibold">{user.name}</div>
            <div className="w-full flex items-center gap-2 mt-2">
                <button className="px-4 py-1 rounded-md bg-[#5E81F4] text-white font-semibold">Basic</button>
                <div className="text-zinc-400">Expiry Date : 00-00-0000</div>
            </div>
        </div>
        <div className="py-2 bg-white rounded-md flex justify-between gap-1 ps-2">
            <div className="flex flex-col py-1">
                <div className="text-2xl font-semibold text-zinc-500">Api Hit Limit</div>
                <div className="font-bold text-2xl pt-1">{user.maxApiHit}</div>
            </div>
            <div className="flex w-[50px] h-[50px] rounded-md mx-5 justify-center items-center bg-[#FEFCF6]">
                <img src={i1} alt="" />
            </div>
        </div>
        <div className="py-2 bg-white rounded-md flex justify-between gap-1 ps-2">
            <div className="flex flex-col py-1">
                <div className="text-2xl font-semibold text-zinc-500">Total Api Hit </div>
                <div className="font-bold text-2xl pt-1">{user.apiHit}</div>
            </div>
            <div className="flex w-[50px] h-[50px] rounded-md mx-5 justify-center items-center bg-[#F7FDFA]">
                <img src={i2} alt="" />
            </div>
        </div>
        <div className="py-2 bg-white rounded-md flex justify-between gap-1 ps-2">
            <div className="flex flex-col py-1">
                <div className="text-2xl font-semibold text-zinc-500">Remaining Api Hits </div>
                <div className="font-bold text-2xl pt-1">{user.maxApiHit - user.apiHit}</div>
            </div>
            <div className="flex w-[50px] h-[50px] rounded-md mx-5 justify-center items-center bg-[#FFDED2]">
                <img src={i3} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Info
