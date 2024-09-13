
import React from 'react';

const OpenHeader = () => {
  return (
    <div className="grid w-full min-w-[1200px] grid-cols-12 gap-1 text-sm font-semibold text-gray-700 bg-gray-100 p-2 rounded-t-md mt-4">
      <div className="col-span-1">ID</div>
      <div className="col-span-1">Date</div>
      <div className="col-span-1">Loading Point</div>
      <div className="col-span-2 ml-10">Unloading Point</div>
      <div className="col-span-1">Vehicle</div>
      <div className="col-span-1">Invoice</div>
      <div className="col-span-1">LR No.</div>
      <div className="col-span-2">Location</div>
      <div className="col-span-1">Status</div>
    </div>
  );
};

export default OpenHeader;