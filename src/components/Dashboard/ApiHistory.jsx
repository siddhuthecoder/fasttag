import React, { useState ,useEffect} from 'react';
import { LuArrowUpDown } from "react-icons/lu";
import { CiFilter } from "react-icons/ci";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";



// const data = [
//   { id: 1, type: 'VAHAN', vehicle: 'HR55AQ5994', date: '2024-08-08', time: '03:45' },
//   { id: 2, type: 'SARATHI', vehicle: 'HR55AQ5994', date: '2024-08-08', time: '03:45' },
//   { id: 3, type: 'FASTSG', vehicle: 'HR55AQ5994', date: '2024-08-08', time: '03:45' },
//   { id: 4, type: 'VAHAN', vehicle: 'HR55AQ5994', date: '2024-08-08', time: '03:45' },
//   { id: 5, type: 'SARATHI', vehicle: 'HR55AQ5994', date: '2024-08-08', time: '03:45' },
//   { id: 6, type: 'FASTSG', vehicle: 'HR55AQ5994', date: '2024-08-08', time: '03:45' },
//   { id: 7, type: 'VAHAN', vehicle: 'HR55AQ5994', date: '2024-08-08', time: '03:45' },
//   { id: 8, type: 'SARATHI', vehicle: 'HR55AQ5994', date: '2024-08-08', time: '03:45' },
//   { id: 9, type: 'FASTSG', vehicle: 'HR55AQ5994', date: '2024-08-08', time: '03:45' },
//   { id: 10, type: 'VAHAN', vehicle: 'HR55AQ5994', date: '2024-08-08', time: '03:45' },
//   { id: 11, type: 'SARATHI', vehicle: 'HR55AQ5994', date: '2024-08-08', time: '03:45' },
//   { id: 12, type: 'FASTSG', vehicle: 'HR55AQ5994', date: '2024-08-08', time: '03:45' },
//   { id: 13, type: 'VAHAN', vehicle: 'HR55AQ5994', date: '2024-08-08', time: '03:45' },
//   { id: 14, type: 'SARATHI', vehicle: 'HR55AQ5994', date: '2024-08-08', time: '03:45' },
//   { id: 15, type: 'FASTSG', vehicle: 'HR55AQ5994', date: '2024-08-08', time: '03:45' },
//   // Add more data as needed
// ];

const ITEMS_PER_PAGE = 5;

const ApiHistory = () => {
  const [data,setData] = useState([])
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

  const fetchData = async () => {
    const company_id=localStorage.getItem('userID')
    setLoading(true)
    try {
      const response = await fetch('https://fastagtracking.com/customulip/historybyid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyId: company_id,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setData(result); // Assuming result is an array of history data
      
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };
  // console.log(index != currentData.length )

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <div className="w-full flex flex-col ps-2  mt-4 mb-4">
        <div className="w-full flex items-center justify-between">
          <div className="text-[#5E81F4] text-2xl font-bold">Search history</div>
          {/* <div className="flex items-center gap-2">
            <button className="bg-white rounded-md mx-2 shadow-xl py-1 px-4 text-zinc-500 flex items-center">
              <LuArrowUpDown />
              <span className="ps-2 font-semibold">Sort</span>
            </button>
            <button className="bg-white rounded-md mx-2 shadow-xl py-1 px-4 text-zinc-500 flex items-center">
              <CiFilter />
              <div className="ps-2 flex font-semibold items-center"><span className="hidden md:block pe-2">Add</span> <span> Filter</span></div>
            </button>
          </div> */}
        </div>

        <div className="w-full flex bg-[#F2F5FA] mt-5 flex-col  rounded-tr-lg rounded-tl-lg rounded-lg overflow-auto">
          <div className="w-full flex sticky top-0 bg-white items-center font-semibold text-lg justify-around">
            <div className="px-3 py-2 min-w-[30px] max-w-[30px] text-sm  text-center">S.No</div>
            <div className="px-3 py-2 min-w-[100px] text-sm  text-center">Search type</div>
            <div className="px-3 py-2 min-w-[100px] text-sm  text-center">Vehicle Number</div>
            <div className="px-3 py-2 min-w-[100px] text-sm  text-center">Created At</div>
          </div>

          {currentData.map((item, index) => (
            <>
              <div key={item.id} className={`w-full flex items-center    text-lg bg-[#F2F5FA]  justify-around`}>
                <div className="px-3 py-2 min-w-[30px] max-w-[30px] text-sm  text-center">
                  {startIndex + index + 1}
                </div>
                <div className="px-3 py-2 min-w-[100px] text-sm  flex justify-center items-center">
                  <div className={`rounded flex justify-center text-sm items-center-md ${item.ulipApi === 'VAHAN' ? 'bg-[#C2E8E7]' : item.ulipApi === 'SARATHI' ? 'bg-[#F2E5D3] ' : 'bg-[#D6CCF8]'} px-3 py-1 text-${item.ulipApi === 'VAHAN' ? '[#00B69B]' : item.type === 'SARATHI' ? '[#F2A735]' : '[#6226EF]'}`}>
                    <div className="">{item.ulipApi}</div>
                  </div>
                </div>
                <div className="px-3 py-2 min-w-[100px] max-w-[100px] text-wrap text-sm  text-center">{truncateText(item.vehicleNumber,9)}</div>
                <div className="px-3 py-2 min-w-[100px] text-sm  flex flex-col text-right pe-2">
                  <div className="">{item.createdAt.slice(0,10)}</div>
                  <div className="">{item.createdAt.slice(11,19)}</div>
                </div>
                
              </div>
              <hr className={`${index === currentData.length-1 ? "hidden":""}`} />
            </>
          ))}
          <div className="w-[80%] mx-auto my-2 flex bg-[#F2F5FA] justify-between    ">
          <button
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-2 py-1 px-3 bg-white rounded-md border text-gray-700 flex items-center rounded disabled:opacity-50"
          >
            <FaAngleLeft className="me-1" />
            <span>Prev Date</span>
          </button>
          {/* <div className="mx-2 py-1 px-3 text-gray-700">{`Page ${currentPage} of ${totalPages}`}</div> */}
          <button
            onClick={() => handleChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="mx-2 py-1 px-3 flex items-center bg-white rounded-md border text-gray-700  disabled:opacity-50"
          >
            <span>Next Date</span>
            <FaAngleRight className="ms-1"/>
          </button>
        </div>
        </div>

        
      </div>
    </>
  );
};

export default ApiHistory;
