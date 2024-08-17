import React, { useState } from 'react';

const TableWithPagination = ({ data, rowsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Get current page data
  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle page change
  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col bg-[#F2F5FA] my-3 items-center">
      <div className="overflow-x-auto w-[97%] ma-auto  rounded-lg md:w-full">
        <table className="min-w-full  border border-gray-200">
          <thead>
            <tr className="bg-[#FCFDFD] text-gray-700">
              <th className="py-2 px-4 border-b">S.no</th>
              <th className="py-2 px-4 border-b">Company Name</th>
              <th className="py-2 px-4 border-b">Plan Type</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Commission</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item,index) => (
              <tr key={item.id} className="border-b bg-[#F2F5FA]">
                <td className="py-2 px-4 text-center text-nowrap">{index+1}</td>
                <td className="py-2 px-4 text-center text-nowrap">{item.companyName}</td>
                <td className="py-2 px-4 text-center text-nowrap ">
                  <div className={`rounded  w-[100px] mx-auto text-sm items-center-md ${item.planType === 'basic' ? 'bg-[#C2E8E7]' : item.planType === 'premium' ? 'bg-[#F2E5D3] ' : 'bg-[#D6CCF8]'} px-3 py-1 text-${item.planType === 'standard' ? '[#00B69B]' : item.type === 'basic' ? '[#F2A735]' : '[#6226EF]'}`}>{item.planType}</div>
                </td>
                <td className="py-2 px-4 text-center text-green-600 text-nowrap font-semibold">${item.amount}</td>
                <td className="py-2 px-4 text-center font-semibold text-red-600 text-nowrap">${item.commission}</td>
                <td className="py-2 px-4  text-nowrap flex flex-col text-right pe-1">
                  <div className="">{item.date.slice(0,10)}</div>
                  <div className="">{item.date.slice(11)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex w-full justify-between mt-4">
        <button
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
          className="mx-2 py-1 mb-3 px-3 bg-white rounded-md border text-gray-700 flex items-center  disabled:opacity-50"
        >
          Prev Date
        </button>
        <button
          onClick={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
          className="mx-2 py-1 mb-3 px-3 bg-white rounded-md border text-gray-700 flex items-center  disabled:opacity-50"
        >
          Next Date
        </button>
      </div>
    </div>
  );
};

const data = [
  {
    companyName: "TechCorp Inc.",
    planType: "basic", // basic
    amount: "$100",
    commission: "10%",
    date: "2024-08-01T08:30:00",
  },
  {
    companyName: "Innovate Solutions",
    planType: "standard", // standard
    amount: "$250",
    commission: "15%",
    date: "2024-08-02T09:45:00",
  },
  {
    companyName: "Future Enterprises",
    planType: "premium", // premium
    amount: "$500",
    commission: "20%",
    date: "2024-08-03T11:15:00",
  },
  {
    companyName: "Global Tech",
    planType: "basic", // basic
    amount: "$120",
    commission: "10%",
    date: "2024-08-04T14:00:00",
  },
  {
    companyName: "Visionary Systems",
    planType: "standard", // standard
    amount: "$280",
    commission: "15%",
    date: "2024-08-05T10:20:00",
  },
  {
    companyName: "Pioneer Labs",
    planType: "premium", // premium
    amount: "$550",
    commission: "20%",
    date: "2024-08-06T12:45:00",
  },
  {
    companyName: "NextGen Software",
    planType: "basic", // basic
    amount: "$130",
    commission: "10%",
    date: "2024-08-07T15:30:00",
  },
  {
    companyName: "Advanced Technologies",
    planType: "standard", // standard
    amount: "$300",
    commission: "15%",
    date: "2024-08-08T17:10:00",
  },
  {
    companyName: "Innovators Hub",
    planType: "premium", // premium
    amount: "$600",
    commission: "20%",
    date: "2024-08-09T19:00:00",
  },
  {
    companyName: "TechFusion",
    planType: "basic", // basic
    amount: "$110",
    commission: "10%",
    date: "2024-08-10T08:45:00",
  },
  {
    companyName: "BrightFuture Inc.",
    planType: "standard", // standard
    amount: "$270",
    commission: "15%",
    date: "2024-08-11T09:55:00",
  },
  {
    companyName: "Eagle Enterprises",
    planType: "premium", // premium
    amount: "$520",
    commission: "20%",
    date: "2024-08-12T11:25:00",
  },
  {
    companyName: "Quantum Solutions",
    planType: "basic", // basic
    amount: "$140",
    commission: "10%",
    date: "2024-08-13T13:35:00",
  },
  {
    companyName: "Inspire Technologies",
    planType: "standard", // standard
    amount: "$290",
    commission: "15%",
    date: "2024-08-14T15:50:00",
  },
  {
    companyName: "Synergy Labs",
    planType: "premium", // premium
    amount: "$580",
    commission: "20%",
    date: "2024-08-15T17:20:00",
  },
  {
    companyName: "Vertex Innovations",
    planType: "basic", // basic
    amount: "$150",
    commission: "10%",
    date: "2024-08-16T18:45:00",
  },
  {
    companyName: "Apex Systems",
    planType: "standard", // standard
    amount: "$310",
    commission: "15%",
    date: "2024-08-17T19:55:00",
  },
  {
    companyName: "NexGen Tech",
    planType: "premium", // premium
    amount: "$590",
    commission: "20%",
    date: "2024-08-18T20:30:00",
  },
  {
    companyName: "Core Innovations",
    planType: "basic", // basic
    amount: "$160",
    commission: "10%",
    date: "2024-08-19T08:10:00",
  },
  {
    companyName: "Future Tech Solutions",
    planType: "standard", // standard
    amount: "$330",
    commission: "15%",
    date: "2024-08-20T09:25:00",
  },
  {
    companyName: "Pioneer Technologies",
    planType: "premium", // premium
    amount: "$600",
    commission: "20%",
    date: "2024-08-21T10:50:00",
  },
  {
    companyName: "TechAdvance",
    planType: "basic", // basic
    amount: "$170",
    commission: "10%",
    date: "2024-08-22T11:45:00",
  },
  {
    companyName: "Elite Innovations",
    planType: "standard", // standard
    amount: "$340",
    commission: "15%",
    date: "2024-08-23T13:30:00",
  },
  {
    companyName: "Global Vision",
    planType: "premium", // premium
    amount: "$610",
    commission: "20%",
    date: "2024-08-24T15:05:00",
  },
];



const DataTable = () => {
  return <TableWithPagination data={data} rowsPerPage={5} />;
};

export default DataTable;
