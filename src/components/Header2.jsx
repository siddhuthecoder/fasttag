import React, { useState } from "react";
import logo from "../assets/logo2.png";
import { TiThMenu } from "react-icons/ti";
import { FaPhoneAlt } from "react-icons/fa";
import per from "../assets/person.png";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import Fastag from "../components/layerComponents/Fastag";
import Vahan from "../components/layerComponents/Vahan";
import Sarathi from "../components/layerComponents/Sarathi";
import MyVehicle from "../components/layerComponents/MyVehicle";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signOut } from "../store/authSlice";

const Header2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  const handleLogout = () => {
    dispatch(signOut()); // Dispatch the signOut action
    navigate("/"); // Redirect to the login page after logout
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const tabs = [
    {
      name:"Home",
      link:"/"
    },
    {
      name: "Privacy Policy",
      // component: <Fastag />,
      link: "/privacy",
    },
    {
      name: "Terms and Conditions",
      // component: <Vahan />,
      link: "/Terms",
    },
    {
      name: "About Us",
      // component: <Vahan />,
      link: "/contact",
    },
  ];

  return (
    <>
      <div className="w-full border flex items-center shadow fixed top-0 z-[3]  justify-between bg-white h-[60px]">
      <div className="flex items-center justify-between w-full">
      <Link to='/'><img src={logo} alt="Logo" className="mx-3 cursor-pointer" width={40} height={40} /></Link> 
      {/* <h5 className='text-lg font-semibold ' >Faastagtracking.com</h5> */}
  <TiThMenu
    className="text-2xl cursor-pointer mx-2 md:hidden"
    onClick={toggleMenu}
  />
</div>


        <div className="hidden md:flex items-center gap-2">
          {tabs.map((data, index) => (
            <Link
              to={data.link}
              key={index}
              className={`px-3 py-1 cursor-pointer ${
                pathName == data.link ? "bg-[#E1E1FB]" : ""
              }  text-nowrap  border-black duration-150 rounded-full  hover:bg-[#E1E1FB]`}
              // onClick={() => setTab(data.name)}
            >
              {data.name}
            </Link>
          ))}
          <button
            className="px-3 mx-2 py-1 rounded-md bg-[#5E81F4] text-white font-semibold"
            onClick={() => navigate("/pricing")}
          >
            Pricing
          </button>
        </div>
      </div>
      {/* Side Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-0 bg-black bg-opacity-50 z-[1000]">
          <div className="absolute flex  flex-col top-0 left-0 w-full max-w-[270px] h-[100vh]  z-[1000] bg-white shadow-md">
            <div className="w-full flex items-center mb-4 justify-between">
              <div className="flex mt-2 items-center">
                <img
                  src={logo}
                  alt="Logo"
                  width={80}
                  className=" scale-[0.6] cursor-pointer"
                />
                <div className=" font-semibold text-[#5E81F4]   text-1xl"></div>
              </div>
              <MdOutlineClose
                className="text-5xl m-2 text-red-500"
                onClick={toggleMenu}
              />
            </div>
            <div className="flex w-[70%] flex-col ps-2 divide-y">
              {tabs.map((data) => (
                <Link
                  to={data.link}
                  className="font-semibold mt-2 ps-3 pt-5  pb-3 hover:text-[#5E81F4]"
                  onClick={toggleMenu}
                >{data.name}</Link>
              ))}
              {/* <div
                className="font-semibold mt-2 ps-3 hover:text-[#5E81F4]"
                onClick={toggleMenu}
              >
                Privacy Policy
              </div>
              <div
                className="font-semibold mt-2 ps-3 hover:text-[#5E81F4]"
                onClick={toggleMenu}
              >
                Terms and Conditions
              </div>
              <div
                className="font-semibold mt-2 ps-3 hover:text-[#5E81F4]"
                onClick={toggleMenu}
              >
                About Us
              </div> */}
            </div>
            <div className="w-full flex flex-col"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header2;