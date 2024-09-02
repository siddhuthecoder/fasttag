import React from 'react'
import img1 from '../../assets/box-truck.png'
import img2 from '../../assets/car1.png'
import img3 from '../../assets/items.png'

const Features = () => {
  return (
    <>
        <div className="w-full flex items-center flex-wrap justify-center my-[30px]  rounded-md gap-3">
            <div className="flex flex-col w-full max-w-[320px] shadow-md rounded-md h-[280px] bg-white">
                <div className="w-full flex items-center justify-center">
                    <img src={img1} alt=""  className="w-[100px] my-3 h-[100px]" />
                </div>
                <div className="text-center font-semibold text-2xl">FASSTAG</div>
                <div className="px-3 text-zinc-400 py-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit magni exercitatisunt explicabo consequuntur inventore.</div>
            </div>
            <div className="flex flex-col w-full max-w-[320px] shadow-md rounded-md h-[280px] bg-white">
                <div className="w-full flex items-center justify-center">
                    <img src={img2} alt=""  className="w-[100px] my-3 h-[100px]" />
                </div>
                <div className="text-center font-semibold text-2xl">VAAHAN</div>
                <div className="px-3 text-zinc-400 py-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit magni exercitatisunt explicabo consequuntur inventore.</div>
            </div>
            <div className="flex flex-col w-full max-w-[320px] shadow-md rounded-md h-[280px] bg-white">
                <div className="w-full flex items-center justify-center">
                    <img src={img3} alt=""  className="w-[100px] my-3 h-[100px]" />
                </div>
                <div className="text-center font-semibold text-2xl">SAARADHI</div>
                <div className="px-3 pb-3 text-zinc-400 py-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit magni exercitatisunt explicabo consequuntur inventore.</div>
            </div>
        </div>
    </>
  )
}

export default Features
