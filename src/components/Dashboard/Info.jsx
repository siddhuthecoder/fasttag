import React from 'react'
import i1 from '../../assets/ic1.png'
import i2 from '../../assets/i2.png'
import i3 from '../../assets/i3.png'
import { useSelector } from 'react-redux'

const Info = () => {
    const user = useSelector((state) => state.auth.user)
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="py-4 bg-white rounded-md flex flex-col justify-between w-full   p-4 shadow-md">
            <div className="text-xl md:text-2xl font-semibold truncate">{user.name}</div>
            <div className="w-full flex items-center gap-2 mt-4">
                <button className="px-4 py-2 rounded-md bg-[#5E81F4] text-white text-sm md:text-base font-semibold">{localStorage.getItem('plan')}</button>
                <div className="text-zinc-400 text-sm md:text-base">
  Expiry Date: {new Date(user.expiryDate).toLocaleDateString('en-GB')}
</div>

            </div>
        </div>

        <div className="py-4 bg-white rounded-md flex justify-between items-center w-full   p-4 shadow-md">
            <div className="flex flex-col">
                <div className="font-semibold text-lg md:text-xl text-zinc-500">Max search limit</div>
                <div className="font-bold text-2xl md:text-3xl pt-2">{user.maxApiHit}</div>
            </div>
            <div className="flex w-[50px] h-[50px] rounded-md justify-center items-center bg-[#FEFCF6]">
                <img src={i1} alt="API Hit Limit" />
            </div>
        </div>

        <div className="py-4 bg-white rounded-md flex justify-between items-center w-full   p-4 shadow-md">
            <div className="flex flex-col">
                <div className="font-semibold text-lg md:text-xl text-zinc-500">Total Searches</div>
                <div className="font-bold text-2xl md:text-3xl pt-2">{user.apiHit}</div>
            </div>
            <div className="flex w-[50px] h-[50px] rounded-md justify-center items-center bg-[#F7FDFA]">
                <img src={i2} alt="Total API Hit" />
            </div>
        </div>

        <div className="py-4 bg-white rounded-md flex justify-between items-center w-full   p-4 shadow-md">
            <div className="flex flex-col">
                <div className="font-semibold text-lg md:text-xl text-zinc-500">Remaining Searches </div>
                <div className="font-bold text-2xl md:text-3xl pt-2">{user.maxApiHit - user.apiHit}</div>
            </div>
            <div className="flex w-[50px] h-[50px] rounded-md justify-center items-center bg-[#FFDED2]">
                <img src={i3} alt="Remaining API Hits" />
            </div>
        </div>
    </div>
  )
}

export default Info
