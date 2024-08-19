import React from "react";
import logo from "../assets/logo2.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const tabs = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Privacy Policy",
      link: "/privacy",
    },
    {
      name: "Terms and Conditions",
      link: "/Terms",
    },
    {
      name: "About Us",
      link: "/contact",
    },
  ];

  return (
    <div className="flex flex-col w-full bg-blue-900 md:fixed md:bottom-0 text-white py-6">
      <div className="flex flex-col items-center justify-center mb-4">
        <img src={logo} alt="Logo" className="mb-3" width={50} height={50} />
        <div className="flex flex-col items-center space-y-2">
          {tabs.map((data, index) => (
            <Link
              to={data.link}
              key={index}
              className="text-zinc-400 hover:text-white"
            >
              {data.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-zinc-400 text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
