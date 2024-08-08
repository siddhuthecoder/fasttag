import React, { useState } from 'react';
import list from '../assets/list.png';
import Vahan from './layerComponents/Vahan';
import Fastag from './layerComponents/Fastag';
import Sarathi from './layerComponents/Sarathi';
import MyVehicle from './layerComponents/MyVehicle';
// import Map from './Map/Map';
import Map from './openstreetMap/Map'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const MainLayout = ({children}) => {
    const [tab, setTab] = useState("Fastag");
    const location = useLocation()

    const pathName = location.pathname

    const tollData = [
        {
            "readerReadTime": "2024-08-08 14:13:49.000",
            "tollPlazaName": "Dhank Toll Plaza",
            "tollPlazaGeocode": "21.227203,82.42025",
            "vehicleType": "VC10",
            "vehicleRegNo": "HR55AQ5994"
        },
        {
            "readerReadTime": "2024-08-08 13:04:04.000",
            "tollPlazaName": "Chhuhipali Toll Plaza",
            "tollPlazaGeocode": "21.299821,82.942781",
            "vehicleType": "VC10",
            "vehicleRegNo": "HR55AQ5994"
        },
        {
            "readerReadTime": "2024-08-08 11:15:50.000",
            "tollPlazaName": "Sambalpur Baragarh Tollways",
            "tollPlazaGeocode": "21.353192,83.684183",
            "vehicleType": "VC10",
            "vehicleRegNo": "HR55AQ5994"
        },
        {
            "readerReadTime": "2024-08-08 00:17:16.000",
            "tollPlazaName": "Pudapada Nildungri Toll Plaza",
            "tollPlazaGeocode": "21.449859, 84.115361",
            "vehicleType": "VC10",
            "vehicleRegNo": "HR55AQ5994"
        },
        {
            "readerReadTime": "2024-08-07 20:12:37.000",
            "tollPlazaName": "Bideibadkudar Toll Plaza",
            "tollPlazaGeocode": "21.505816,85.058237",
            "vehicleType": "VC10",
            "vehicleRegNo": "HR55AQ5994"
        },
        {
            "readerReadTime": "2024-08-07 19:19:43.000",
            "tollPlazaName": "Janasanpur Toll Plaza",
            "tollPlazaGeocode": "21.448549,85.373375",
            "vehicleType": "VC10",
            "vehicleRegNo": "HR55AQ5994"
        },
        {
            "readerReadTime": "2024-08-07 16:35:06.000",
            "tollPlazaName": "Khireitangiri Toll Plaza",
            "tollPlazaGeocode": "21.705647,85.697266",
            "vehicleType": "VC10",
            "vehicleRegNo": "HR55AQ5994"
        },
        {
            "readerReadTime": "2024-08-07 10:54:19.000",
            "tollPlazaName": "Jharpokharia Toll Plaza",
            "tollPlazaGeocode": "22.180518, 86.636253",
            "vehicleType": "VC10",
            "vehicleRegNo": "HR55AQ5994"
        },
        {
            "readerReadTime": "2024-08-07 06:37:21.000",
            "tollPlazaName": "Balibhasa Toll Plaza",
            "tollPlazaGeocode": "22.34462627,87.12665241",
            "vehicleType": "VC10",
            "vehicleRegNo": "HR55AQ5994"
        },
        {
            "readerReadTime": "2024-08-07 05:44:25.000",
            "tollPlazaName": "Debra toll plaza",
            "tollPlazaGeocode": "22.397144,87.522855",
            "vehicleType": "VC10",
            "vehicleRegNo": "HR55AQ5994"
        },
        {
            "readerReadTime": "2024-08-06 22:26:28.000",
            "tollPlazaName": "Jaladhulagori toll plaza",
            "tollPlazaGeocode": "22.573188,88.181679",
            "vehicleType": "VC10",
            "vehicleRegNo": "HR55AQ5994"
        },
        {
            "readerReadTime": "2024-08-06 06:29:37.000",
            "tollPlazaName": "Jaladhulagori toll plaza",
            "tollPlazaGeocode": "22.573188,88.181679",
            "vehicleType": "VC10",
            "vehicleRegNo": "HR55AQ5994"
        },
        {
            "readerReadTime": "2024-08-06 05:04:19.000",
            "tollPlazaName": "Debra toll plaza",
            "tollPlazaGeocode": "22.397144,87.522855",
            "vehicleType": "VC10",
            "vehicleRegNo": "HR55AQ5994"
        },
        {
            "readerReadTime": "2024-08-06 04:26:25.000",
            "tollPlazaName": "Rampura Plaza",
            "tollPlazaGeocode": "22.24076,87.39207",
            "vehicleType": "VC10",
            "vehicleRegNo": "HR55AQ5994"
        },
        {
            "readerReadTime": "2024-08-05 18:11:45.000",
            "tollPlazaName": "Laxamannath Plaza",
            "tollPlazaGeocode": "13.193545,77.64981",
            "vehicleType": "VC10",
            "vehicleRegNo": "HR55AQ5994"
        },
        {
            "readerReadTime": "2024-08-05 16:40:20.000",
            "tollPlazaName": "SERGARH TOLL PLAZA",
            "tollPlazaGeocode": " 21.429889,86.836645",
            "vehicleType": "VC10",
            "vehicleRegNo": "HR55AQ5994"
        },
        {
            "readerReadTime": "2024-08-05 12:00:00.000",
            "tollPlazaName": "Vijayawada Toll Plaza",
            "tollPlazaGeocode": "16.506174,80.648015",
            "vehicleType": "VC10",
            "vehicleRegNo": "HR55AQ5994"
        }   // Add other toll plaza data here...
        ];
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
            <div className="w-full grid grid-cols-1 mt-[80px] md:grid-cols-12 gap-5  md:gap-2 ">
                <div className="md:w-[90%] ms-2 w-[100%] mx-auto max-h-[620px]  md:col-span-4  flex flex-col ">
                    <div className="flex items-center flex-wrap mt-2 gap-2 md:hidden ">
                        {tabs.map((data, index) => (
                            <Link
                                to={data.link}
                                key={index}
                                className={`px-3 py-1 cursor-pointer ${pathName == data.link?"bg-[#E1E1FB]":""}   text-nowrap border border-black duration-150 rounded-full  hover:bg-[#E1E1FB]`}
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
                <div className="md:w-[90%] w-[100%] ms-1  mx-auto min-h-[620px]  z-[-0]  md:col-span-8  flex justify-center items-center">
                    <Map  tollData={tollData}/>
                </div>
                
                
            </div>
        </>
    );
}

export default MainLayout;
