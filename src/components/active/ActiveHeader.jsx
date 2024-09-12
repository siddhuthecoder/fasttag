import React from "react";

const ActiveHeader = () => {
  return (
    <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700 bg-gray-100 p-2 rounded-t-md">
      <div className="col-span-1 text-center">ID</div>
      <div className="col-span-2 text-center">Date</div>
      <div className="col-span-2 text-center">Loading Point</div>
      <div className="col-span-2 text-center">Unloading Point</div>
      <div className="col-span-1 text-center">Vehicle</div>
      <div className="col-span-1 text-center">LR No.</div>
      <div className="col-span-1 text-center">Location</div>
      <div className="col-span-1 text-center">Status</div>
    </div>
  );
};

export default ActiveHeader;
