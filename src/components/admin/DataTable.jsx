import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const TableWithPagination = ({ data = [], rowsPerPage }) => {
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
      <div className="overflow-x-auto w-[97%] ma-auto rounded-lg md:w-full">
        <table className="min-w-full border border-gray-200">
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
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr key={item.id} className="border-b bg-[#F2F5FA]">
                  <td className="py-2 px-4 text-center text-nowrap">
                    {index + 1 + (currentPage - 1) * rowsPerPage}
                  </td>
                  <td className="py-2 px-4 text-center text-nowrap">
                    {item.companyName}
                  </td>
                  <td className="py-2 px-4 text-center text-nowrap">
                    <div
                      className={`rounded w-[100px] mx-auto text-sm items-center ${
                        item.planType === 'Basic'
                          ? 'bg-[#C2E8E7] text-[#F2A735]'
                          : item.planType === 'Premium'
                          ? 'bg-[#F2E5D3] text-[#6226EF]'
                          : 'bg-[#D6CCF8] text-[#00B69B]'
                      } px-3 py-1`}
                    >
                      {item.planType}
                    </div>
                  </td>
                  <td className="py-2 px-4 text-center text-green-600 text-nowrap font-semibold">
                    {item.amount}
                  </td>
                  <td className="py-2 px-4 text-center font-semibold text-red-600 text-nowrap">
                    {item.commission}
                  </td>
                  <td className="py-2 px-4 text-nowrap flex flex-col text-right pr-1">
                    <div>{item.date.slice(0, 10)}</div>
                    <div>{item.date.slice(11)}</div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-2 px-4 text-center">
                  No payments found for the selected time period
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex w-full justify-between mt-4">
        <button
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
          className="mx-2 py-1 mb-3 px-3 bg-white flex items-center rounded-md border text-gray-700 disabled:opacity-50"
        >
          <FaAngleLeft />
          <div className="pl-2">Prev</div>
        </button>
        <button
          onClick={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
          className="mx-2 py-1 mb-3 px-3 bg-white rounded-md border text-gray-700 flex items-center disabled:opacity-50"
        >
          <div className="pr-2">Next</div>
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

const DataTable = ({ dataForTable }) => {
  if (!dataForTable || dataForTable.length === 0) {
    return <div>No data available</div>;
  }

  return <TableWithPagination data={dataForTable} rowsPerPage={5} />;
};

export default DataTable;
