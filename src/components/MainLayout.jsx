import React, { useState } from 'react';
import list from '../assets/list.png';
import Vahan from './layerComponents/Vahan';
import Fastag from './layerComponents/Fastag';
import Sarathi from './layerComponents/Sarathi';
import MyVehicle from './layerComponents/MyVehicle';
import Map from './Map/Map';

const MainLayout = ({children}) => {
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
            <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 overflow-auto  md:gap-2 ">
                <div className="w-[90%] mx-auto max-h-[620px]  md:col-span-4     overflow-y-scroll flex flex-col ">
                    
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
