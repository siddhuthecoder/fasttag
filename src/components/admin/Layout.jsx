import React, { useState, useEffect } from "react";
import img1 from "../../assets/sales.png";
import Graph from "./Graph";
import DataTable from "./DataTable";
import AdminHeader from "./AdminHeader";

const Layout = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [userData, setUserData] = useState({});
  const [data, setData] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalCommission, setTotalCommission] = useState(0);
  const [noDataMessage, setNoDataMessage] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    // Set default month to the current month
    const currentMonth = new Date().toLocaleString("default", { month: "long" });
    setSelectedMonth(currentMonth);

    // Retrieve userData from localStorage and parse it
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      const monthIndex = months.indexOf(selectedMonth) + 1;
      const year = new Date().getFullYear();
      const fromDate = `${year}-${String(monthIndex).padStart(2, "0")}-01`;
      const toDate = `${year}-${String(monthIndex).padStart(2, "0")}-31`;

      fetch(
        `https://fastagtracking.com/customulip/agents/commissions?agentId=${userData.agentId}&fromDate=${fromDate}&toDate=${toDate}`
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.length > 0) {
            setData(result);
            const totalBal = result.reduce((sum, item) => sum + item.balance, 0);
            const totalComm = result.reduce((sum, item) => sum + item.commission, 0);
            setTotalBalance(totalBal);
            setTotalCommission(totalComm);
          } else {
            setNoDataMessage("No payments found for the selected time period");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [selectedMonth, userData]);

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
    setNoDataMessage("");
  };

  return (
    <>
      <AdminHeader />
      <div className="w-full md:w-[80%] mx-auto mt-[70px] my-2 flex justify-end">
        <select
          id="month"
          value={selectedMonth}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="" disabled>
            Select a month
          </option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full md:w-[80%] mx-auto">
        <div className="w-full grid grid-cols-1 md:grid-cols-12">
          <div className="flex flex-col justify-center ps-1 md:ps-3 sm:col-span-6 md:col-span-4 grid-item-bottom">
            <div className="w-full text-lg font-bold md:text-4xl">
              Hello, {userData.name} 👋
            </div>
            <div className="text-zinc-500 font-semibold md:py-5 py-3">
             Your Commission Percentage: {userData.commission}%
            </div>
            <div className="w-full flex items-center md:gap-5 mt-3">
              <div className="w-[170px] h-[170px] mx-1 rounded-md bg-[#FFE2E5] flex flex-col ps-2">
                <div className="w-[40px] h-[40px] mt-2 rounded-full bg-[#FA5A7D] flex justify-center items-center">
                  <img src={img1} alt="" />
                </div>
                <div className="pt-1 font-bold text-lg md:text-2xl">${totalBalance}</div>
                <div className="text-zinc-500 py-1 font-semibold">Total Balance</div>
                {/* <div className="text-blue-600 pt-1 text-sm">+8% from Last Month</div> */}
              </div>
              <div className="w-[170px] h-[170px] mx-1 rounded-md bg-[#FFF4DE] flex flex-col ps-2">
                <div className="w-[40px] h-[40px] mt-2 rounded-full bg-[#FA5A7D] flex justify-center items-center">
                  <img src={img1} alt="" />
                </div>
                <div className="pt-1 font-bold text-lg md:text-2xl">${totalCommission}</div>
                <div className="text-zinc-500 py-1 font-semibold">Total Commission</div>
                {/* <div className="text-blue-600 pt-1 text-sm">+8% from Last Month</div> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:col-span-6 md:col-span-8">
            <div className="md:w-[90%] w-[100%] mx-auto">
            {noDataMessage ? (
              <div className="text-center text-red-500 mt-5">{noDataMessage}</div>
            ) : (
          <Graph data={data} />
          
        )}
            </div>
          </div>
        </div>
        {noDataMessage ? (
          <div className="text-center text-red-500 mt-5">{noDataMessage}</div>
        ) : (
          <DataTable data={data} />
        )}
      </div>
    </>
  );
};

export default Layout;
