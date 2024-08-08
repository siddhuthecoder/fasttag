import React from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import mod1 from '../../assets/mod1.png';
import mod2 from '../../assets/mod2.png';
import { MdAddCard } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import  Map  from '../openstreetMap/Map';

const VehicleCard = ({ vehicleNumber }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/fastag/${vehicleNumber}`); // Redirect to fastag page with vehicleNumber
  };

  const handleImageClick = (e) => {
    e.stopPropagation(); // Prevent card click event
    navigate(`/vahan/${vehicleNumber}`); // Redirect to Vahan page with vehicleNumber
  };

  const tabs = [
    {
        name: "Fastag",
        // component: <Fastag />,
        link: "/fastag"
    },
    {
        name: "Vahan",
        // component: <Vahan />,
        link: "/vahan"
    },
    {
        name: "Sarathi",
        // component: <Sarathi />,
        link: "/sarathi"
    },
    {
        name: "My Vehicles",
        // component: <MyVehicle />,
        link: "/MyVehicles"
    }
];
  return (
    <div
      className="w-full bg-white rounded-md mt-3 justify-between flex-wrap flex items-center cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex w-full justify-between md:justify-start md:w-auto items-center gap-1">
        <div className="flex flex-col ps-2 my-2">
          <div className="font-semibold text-lg">Vehicle Number</div>
          <div className="text-zinc-400">{vehicleNumber}</div>
        </div>
        <div className="flex items-center">
          <RiDeleteBinLine className="text-2xl ms-3 text-red-500 mx-3" />
          <FiEdit className='text-2xl ms-3 text-blue-500 mx-3' />
        </div>
      </div>
      <div className="flex items-center m-2 gap-3">
        <div className="w-[70px] cursor-pointer h-[30px] flex justify-center items-center rounded-full border border-black bg-[#EDEDED]">
          <img src={mod1} className='w scale-[0.8]' alt="" />
        </div>
        <div
          className="w-[70px] h-[30px] cursor-pointer flex justify-center mx-2 items-center rounded-full border border-black bg-[#EDEDED]"
          onClick={handleImageClick}
        >
          <img src={mod2} className='scale-[0.8]' alt="" />
        </div>
      </div>
    </div>
  );
};

const MyVehicle = () => {
  const tabs = [
    {
        name: "Fastag",
        // component: <Fastag />,
        link: "/fastag"
    },
    {
        name: "Vahan",
        // component: <Vahan />,
        link: "/vahan"
    },
    {
        name: "Sarathi",
        // component: <Sarathi />,
        link: "/sarathi"
    },
    {
        name: "My Vehicles",
        // component: <MyVehicle />,
        link: "/MyVehicles"
    }
];
  const location = useLocation()
  const pathName = location.pathname
  const vehicles = [
    "HR55AQ5884",
    "HR56AQ5885",
    "HR57AQ5886",
    "HR57AQ5887",
    "HR57AQ5888",
    // Add more vehicle numbers here
  ];
  

  return (
    <>
       <div className="w-full grid grid-cols-1 mt-[80px] md:grid-cols-12 gap-5  md:gap-2 ">
            <div className="md:w-[90%] ms-2 w-[100%] mx-auto max-h-[620px]  md:col-span-4  flex flex-col ">
                <div className="flex items-center flex-wrap mt-2 gap-2 md:hidden ">
                    {tabs?.map((data, index) => (
                        <Link
                            to={data?.link}
                            key={index}
                            className={`px-3 py-1 cursor-pointer ${pathName == data?.link?"bg-[#E1E1FB]":""}   text-nowrap border border-black duration-150 rounded-full  hover:bg-[#E1E1FB]`}
                            // onClick={() => setTab(data.name)}
                        >
                            {data?.name}
                        </Link>
                    ))}
                </div>
                <div className="w-full flex flex-col">
                <div className="w-full flex flex-col">
        <div className="w-full grid grid-cols-12 gap-1">
          <div className="flex w-full col-span-9 md:col-span-8 mx-auto items-center mt-3 relative">
            <input type="text" className="w-full px-3 h-[52px] rounded-md border" placeholder="Enter Vehicle Number" />
            <div className="absolute right-0 w-[50px] z-[2] h-[50px] bg-[#5E81F4] rounded-tr-md rounded-tb-md rounded-br-md flex justify-center items-center">
              <IoSearchOutline className="text-white text-2xl" />
            </div>
          </div>
          <div className="col-span-3 md:col-span-4 flex justify-center mt-3 items-center">
            <button className="w-full flex justify-center items-center rounded-md h-[50px] text-white text-lg font-semibold bg-[#5E81F4]">
              <span className="hidden md:block">Add Vehicle</span>
              <MdAddCard />
            </button>
          </div>
        </div>
        <div className="w-full flex-col h-[550px] mt-3 overflow-y-auto">
          {vehicles.map((vehicleNumber, index) => (
            <VehicleCard key={index} vehicleNumber={vehicleNumber} />
          ))}
        </div>
      </div>
                </div>
            </div>
            <div className="md:w-[90%] w-[100%] hidden md:flex ms-1  mx-auto min-h-[620px]  z-[-0]  md:col-span-8   justify-center items-center">
                <Map  tollData={[]}/>
            </div>
            
            
        </div>
      {/* child */}
     
    </>
  );
};

export default MyVehicle;
