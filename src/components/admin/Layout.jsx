import React,{useState} from 'react'
import img1 from '../../assets/sales.png'
import Graph from './Graph'
import DataTable from './DataTable'


const Layout = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  return (
    <>
      <div className="w-full md:w-[80%] mx-auto mt-[70px]  my-2 flex justify-end">
        <select
          id="month"
          value={selectedMonth}
          onChange={handleChange}
          className=" p-2 border border-gray-300 rounded-md s mx-2 hadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="" disabled>Select a month</option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full md:w-[80%] mx-auto">
            <div className="w-full grid grid-cols-1 md:grid-cols-12">
                <div className="flex flex-col justify-center  ps-1 md:ps-3 md:col-span-4 grid-item-bottom">
                    <div className="w-full text-lg font-bold  md:text-4xl">
                        Hello , Name Here 👋
                    </div>
                    <div className="text-zinc-500  font-semibold pt-1">Commission Percentage : 5%</div>
                    <div className="w-full flex items-center md:gap-5  mt-3 gap-1">
                      <div className="w-[170px] h-[170px] rounded-md bg-[#FFE2E5] flex flex-col ps-2">
                        <div className="w-[40px] h-[40px] mt-2  rounded-full bg-[#FA5A7D] flex justify-center items-center">
                          <img src={img1} alt="" />
                        </div>
                        <div className="pt-1 font-bold  text-2xl">$2k</div>
                        <div className="text-zinc-500 py-1 font-semibold">Total Balance</div>
                        <div className="text-blue-600 pt-1">+8% from Last Month</div>
                      </div>
                      <div className="w-[170px] h-[170px] rounded-md bg-[#FFF4DE] flex flex-col ps-2">
                        <div className="w-[40px] h-[40px] mt-2  rounded-full bg-[#FA5A7D] flex justify-center items-center">
                          <img src={img1} alt="" />
                        </div>
                        <div className="pt-1 font-bold  text-2xl">$2k</div>
                        <div className="text-zinc-500 py-1 font-semibold">Total Balance</div>
                        <div className="text-blue-600 pt-1">+8% from Last Month</div>
                      </div>
                    </div>
                </div>
                <div className="flex flex-col md:col-span-8  ">
                  {/* <div className="w-full flex items-center"></div> */}
                  <div className="md:w-[90%] w-[100%] mx-auto ">
                    <Graph />
                  </div>
                </div>
            </div>
            <DataTable />
      </div>

    </>
  )
}

export default Layout
