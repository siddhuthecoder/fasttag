import React, { useState } from 'react';
import list from '../assets/list.png';
import Vahan from './layerComponents/Vahan';
import Fastag from './layerComponents/Fastag';
import Sarathi from './layerComponents/Sarathi';
import MyVehicle from './layerComponents/MyVehicle';
import Map from './Map/Map';
import { Link } from 'react-router-dom';

const MainLayout = ({children}) => {
    const [tab, setTab] = useState("Fastag");

    
    const tabs = [
        {
            name: "Fastag",
            component: <Fastag />,
            link: "/fastag"
        },
        {
            name: "Vahan",
            component: <Vahan />,
            link: "/vahan"
        },
        {
            name: "Sarathi",
            component: <Sarathi />,
            link: "/sarathi"
        },
        {
            name: "My Vehicles",
            component: <MyVehicle />,
            link: "/MyVehicles"
        }
    ];
    
    const activeTab = tabs.find(data => data.name === tab)?.component;

    return (
        <>
            <div className="w-full grid grid-cols-1 mt-[80px] md:grid-cols-12 gap-5 overflow-auto  md:gap-2 ">
                <div className="w-[90%] mx-auto max-h-[620px]  md:col-span-4     overflow-y-scroll flex flex-col ">
                    <div className="flex items-center flex-wrap mt-2 gap-2 md:hidden ">
                        {tabs.map((data, index) => (
                            <Link
                                to={data.link}
                                key={index}
                                className={`px-3 py-1 cursor-pointer  text-nowrap border border-black duration-150 rounded-full  hover:bg-[#E1E1FB]`}
                                // onClick={() => setTab(data.name)}
                            >
                                {data.name}
                            </Link>
                        ))}
                    </div>
                    <div className="w-full flex flex-col">
                        {children}
                    </div>
                </div>
                <div className="w-[90%] mx-auto min-h-[620px]  z-[-0]  md:col-span-8 overflow-y-scroll flex justify-center items-center">
                    <Map />
                </div>
                
                
            </div>
        </>
    );
}

export default MainLayout;
