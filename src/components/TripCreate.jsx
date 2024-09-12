import React from 'react';

const TripDetailsCard = () => {
  return (
    <div className="bg-white shadow rounded-md mt-2">
     
     

     
      <div className="grid grid-cols-12 gap-1 items-center text-sm bg-gray-50 p-2 rounded-b-md shadow">
        
        <div className="col-span-1 text-blue-500 cursor-pointer">#27896478</div>
        <div className="col-span-1 text-gray-600">27 Aug 2024<br />8:00 AM</div>

        
        <div className="col-span-1 ">
          <div className="text-gray-700 font-medium">Delhi, Plant 1</div>
          <div className="text-gray-500 text-xs">XYZ Warehouse<br />Gurgaon, Haryana<br />(123456)</div>
        </div>

    
        <div className="col-span-2 ml-10">
          <div className="text-gray-700 font-medium">Kolkata, West Bengal</div>
          <div className="text-gray-500 text-xs">PQR Warehouse<br />Gurgaon, Haryana<br />(123457)</div>
        </div>

       
        <div className="col-span-1">
          <div className="text-gray-700 font-medium">HR CYV 3456</div>
          <div className="text-blue-500 text-xs cursor-pointer">Vehicle Type 3</div>
        </div>

       
        <div className="col-span-1">
          <div className="text-gray-700 font-medium">INV5678904</div>
          <div className="text-blue-500 text-xs cursor-pointer">Edit</div>
        </div>
        <div className="col-span-1">
          <div className="text-gray-700 font-medium">INV5678904</div>
          <div className="text-blue-500 text-xs cursor-pointer">Edit</div>
        </div>

        
        <div className="col-span-1">
          <div className="text-gray-700 font-medium">Kolkata, West Bengal</div>
          <div className="text-gray-500 text-xs">PQR Warehouse<br />Gurgaon, Haryana<br />(123457)</div>
        </div>

       
        <div className="col-span-1">
          <div className="bg-pink-100 text-pink-600 text-xs font-semibold px-2 py-1 rounded-md">In Transit</div>
          <div className="text-gray-500 text-xs">27 Aug 2024<br />8:00 AM</div>
        </div>

        
        <div className="col-span-12 text-gray-500 text-xs  pt-2 mt-2 grid grid-cols-12 gap-1">
          <div className="col-span-2">
            <span className="font-semibold text-blue-500">Reference ID:</span> 45867<br />
            <span className="font-semibold text-blue-500">Product:</span> Boxes
          </div>
          <div className="col-span-2">
            <span className="font-semibold text-blue-500">Driver:</span> Ravi Kumar<br />
            <span className="font-semibold text-blue-500">E-way Bill:</span> 23432489
          </div>
          <div className="col-span-2">
            <span className="font-semibold text-blue-500">Driver No.:</span> 9415413752<br />
            <span className="font-semibold text-blue-500">Distance:</span> 529km
          </div>
          <div className="col-span-2">
            <span className="font-semibold text-blue-500">E-way Bill Expiry:</span> 7<br />
            <span className="font-semibold text-blue-500">TAT:</span> 2 Days
            <div className="flex items-center absolute ml-40 mt-[-40px]">
             
              <img src="https://play-lh.googleusercontent.com/PxLpEIenBKcfZ1ZvCipf4L-ywZZpgD4I30GXnGpKGbprH-b-TKPxKPQatpWXb3EPsTM" alt="FASTag Logo" className="w-14 h-14 ml-2" />
            </div>
          </div>
          <div className="col-span-4 flex justify-end space-x-2">
            <button className="bg-blue-500 p-1 rounded text-white px-6">Start</button>
          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default TripDetailsCard;
