import React, { useState } from 'react';
import list from '../assets/list.png';
import Vahan from './layerComponents/Vahan';
import Fastag from './layerComponents/Fastag';
import Sarathi from './layerComponents/Sarathi';
import MyVehicle from './layerComponents/MyVehicle';
import Map from './Map/Map';

const MainLayout = () => {
    const [tab, setTab] = useState("Fastag");
    const tabs = [
        {
            name: "Fastag",
            component: <Fastag />
        },
        {
            name: "Vahan",
            component: <Vahan />
        },
        {
            name: "Sarathi",
            component: <Sarathi />
        },
        {
            name: "My Vehicles",
            component: <MyVehicle />
        }
    ];
    
    const activeTab = tabs.find(data => data.name === tab)?.component;

    return (
        <>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5  md:gap-2 mt-5">
                <div className="w-[90%] mx-auto h-[650px]  overflow-y-scroll flex flex-col ">
                    <div className="w-full overflow-x-scroll   mx-auto flex items-center justify-start gap-3">
                        {tabs.map((data, index) => (
                            <div
                                key={index}
                                className={`px-3 py-1 cursor-pointer  text-nowrap border border-black duration-150 rounded-full ${tab === data.name ? "bg-[#E1E1FB]" : ""} hover:bg-[#E1E1FB]`}
                                onClick={() => setTab(data.name)}
                            >
                                {data.name}
                            </div>
                        ))}
                        {/* <img src={list} alt="" className='cursor-pointer mx-3' /> */}
                    </div>
                    <div className="w-full flex flex-col">
                        {activeTab}
                    </div>
                </div>
                <div className="w-[90%] mx-auto h-[650px]  z-[-5] overflow-y-scroll flex justify-center items-center">
                    <Map />
                </div>
                
            </div>
        </>
    );
}

export default MainLayout;
