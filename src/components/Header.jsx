import React, { useState } from 'react';
import logo from '../assets/logo2.png';
import text from "../assets/fastagtracking.png"
import { TiThMenu } from "react-icons/ti";
import { FaPhoneAlt } from "react-icons/fa";
import per from '../assets/person.png';
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import Fastag from '../components/layerComponents/Fastag'
import Vahan from '../components/layerComponents/Vahan'
import Sarathi from '../components/layerComponents/Sarathi'
import MyVehicle from '../components/layerComponents/MyVehicle'
// import Dashboard from '../components/Layout'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signOut } from '../store/authSlice';
import Layout from './Dashboard/Layout';
import Home from '../pages/Home';
import HomePage from '../pages/HomePage';
import Trip from '../pages/Trip';


const Header = () => {
  const user = useSelector((state) => state.auth.user)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation()
  const pathName = location.pathname.split("/")
  console.log(pathName)

  
  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('plan')
    localStorage.removeItem('userID') // Remove the 'role' from localStorage
    dispatch(signOut()); // Dispatch the signOut action
    navigate('/'); // Redirect to the login page after logout
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  const tabs = [
    
  //   {
  //     name: "Home",
  //     component: <HomePage />,
  //     link: "/home"
  // },
    {
      name: "Dashboard",
      component: <Layout />,
      link: "dashboard"
  },
    {
        name: "Fastag",
        component: <Fastag />,
        link: "fastag"
    },
    {
        name: "Vahan",
        component: <Vahan />,
        link: "vahan"
    },
    {
        name: "Sarathi",
        component: <Sarathi />,
        link: "sarathi"
    },
    {
        name: "My Vehicles",
        component: <MyVehicle />,
        link: "MyVehicles"
    },
    {
      name: "Trip",
      component: <Trip/>,
      link: "trip",
    }
];

  return (
    <>
      <div className="w-full border flex items-center shadow fixed top-0 z-[3] justify-between bg-white h-[60px]">
        <div className="flex items-center">
          <TiThMenu 
            className='text-2xl  cursor-pointer mx-2 md:hidden'  
            onClick={toggleMenu} 
          />
         <Link to='/' className="flex items-center space-x-2 ">
<img src={logo} alt="Logo" className="cursor-pointer" width={40} height={40} />
<img src={text} alt="Logo" className="cursor-pointer pt-1" width={80} height={80} />
</Link>

        {/* <Link to='/'> <img src={logo} alt="Logo" className="mx-3 cursor-pointer" width={40} height={40} /></Link> */}
        {/* <Link to='/'> <img src={logo} alt="Logo" className="mx-3 cursor-pointer" width={40} height={40} /></Link> */}
        {/* <Link to='/'>   <h5 className='text-lg font-semibold ' >Faastagtracking.com</h5></Link> */}
          
        </div>
        <div className="md:flex items-center   md:gap-2 hidden ">
          {tabs.map((data, index) => (
              <Link
                  to={data.link}
                  key={index}
                  className={`px-3 py-1 md:text-[12px] lg:text-[15px] cursor-pointer ${pathName.includes(data.link)?"bg-[#E1E1FB]":""}  text-nowrap  border-black duration-150 rounded-full  hover:bg-[#E1E1FB]`}
                  // onClick={() => setTab(data.name)}
              >
                  {data.name}
              </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="md:flex hidden items-center mx-2 group relative">

            <div className="absolute top-[100%] right-[5%] rounded-md bg-white hidden group-hover:flex overflow-hidden flex-col w-[230px] shadow-lg border z-[3]" style={{ zIndex: "100" }}>
              <div className="flex flex-col divide-y gap-1 w-full">
                <div className="w-full px-2  text-lg hover:bg-[#5E81F4] hover:text-white  cursor-pointer">Terms and Conditions</div>
                <div className="w-full px-2  text-lg hover:bg-[#5E81F4] hover:text-white  cursor-pointer">Privacy Policy</div>
                <div className="w-full px-2  text-lg hover:bg-[#5E81F4] hover:text-white  cursor-pointer">About Us</div>
              </div>
            </div>
          </div>
          <div className="flex items-center cursor-pointer group relative">
            <div className="absolute top-[100%] right-[5%] rounded-md bg-white hidden group-hover:flex flex-col w-[180px]  shadow-lg border z-[3]" style={{ zIndex: "100" }}>
              <div className="text-center font-semibold md:hidden block pt-2 text-lg   text-[]">{user.name}</div>
              <div className="w-full flex items-center justify-center mt-4 gap-2">
                <div className="flex flex-col text-center mx-2">
                  <div className="text-[#5E81F4] font-semibold">Api Hits</div>
                  <div className="font-semibold">{user.apiHit}</div>
                </div>
                <div className="flex flex-col text-center mx-2">
                  <div className="text-[#5E81F4] font-semibold">Max Hits</div>
                  <div className="font-semibold">{user.maxApiHit}</div>
                </div>
              </div>
              <div className="w-[75%] mx-auto mt-3">
                <button className="w-full bg-[#EDEDED] py-1 border border-black rounded-md font-semibold" onClick={() => navigate("/pricing")}>{localStorage.getItem('plan')}</button>
              </div>
              <div className="w-[75%] mx-auto mt-3">
                <button className="w-full bg-[#5E81F4] text-white py-1 rounded-md font-semibold mb-2" onClick={handleLogout}>Log Out</button>
              </div>
            </div>
          <button className="px-3 mx-2 py-1 rounded-md bg-[#5E81F4] text-white font-semibold" onClick={() => navigate("/pricing")}>Upgrade</button>
            
            <div className="w-[30px] h-[30px] md:hidden mx-2 bg-blue-200 rounded-full overflow-hidden flex justify-center items-center ">
              <div className="font-bold text-lg">{user.name[0]}</div>
            </div>
            
            <div className="flex-col ps-2 mx-2 hidden md:flex">
              <div className="font-semibold flex items-center">
                <div className="font-semibold text-[#5E81F4] hidden md:block text-1xl">{user.name}</div>
              </div>
              
            </div>
            <FaChevronDown className="me-1" /> 
          </div>
        </div>
        
      </div>
      {/* Side Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-0 bg-black bg-opacity-50 z-[1000]">
          <div className="absolute flex  flex-col top-0 left-0 w-full max-w-[270px] h-[100vh]  z-[1000] bg-white shadow-md">
              <div className="w-full flex items-center mb-4 justify-between">
                <div className="flex mt-2 items-center">
                  <img src={logo} alt="Logo" className=" scale-[0.6] cursor-pointer " width={80} />
                  {/* <div className=" font-semibold text-[#5E81F4]   text-1xl">{user.name}</div> */}
                </div>
                <MdOutlineClose className="text-5xl m-2 text-red-500" onClick={toggleMenu} />
              </div>
              <div className="flex w-[70%] flex-col ps-2 divide-y">
                {
                  tabs.map((data) => (
                    <Link to={data.link} className="font-semibold mt-2 p-3  ps-3 hover:text-[#5E81F4]" onClick={toggleMenu}>{data.name}</Link>
                  ))
                }
                {/* <div className="font-semibold mt-2 ps-3 hover:text-[#5E81F4]" onClick={toggleMenu}> <Link to='Privacy' >Privacy Policy </Link></div>
                <div className="font-semibold mt-2 ps-3 hover:text-[#5E81F4]" onClick={toggleMenu}><Link to='Terms' >Terms and Conditions</Link></div>
                <div className="font-semibold mt-2 ps-3 hover:text-[#5E81F4]" onClick={toggleMenu}><Link to='Contact' >About Us</Link></div> */}

              </div>
              <div className="w-full flex flex-col">

              </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
