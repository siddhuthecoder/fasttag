import { FaLocationArrow } from "react-icons/fa";
import { FaDotCircle } from "react-icons/fa";

// eslint-disable-next-line
const MapInformation = ({ data }) => {
  return (
    <div className="p-2 rounded-md border-purple-600 border">
      <h6 className="text-[0.7rem] text-gray-400">Vehichle Number</h6>
      {/* eslint-disable-next-line */}
      <h4 className="font-semibold mb-1">{data && data[0].vehicleRegNo}</h4>
      {/* eslint-disable-next-line */}
      {data.map((places, index) => (
        <div key={index}>
          <div className="mx-1">
            <hr />
          </div>
          <div className="flex items-center justify-between my-2">
            <div className="flex gap-2 items-center">
              {/* eslint-disable-next-line */}
              {index === 0 ? (
                <FaDotCircle size={12} />
              ) : (
                <FaLocationArrow size={12} />
              )}
              <h1 className="text-sm font-semibold">{places.tollPlazaName}</h1>
            </div>
            <div className="flex flex-col items-end">
              <h1 className="text-sm">{places.readerReadTime.slice(0, 10)}</h1>
              <h1 className="text-sm">{places.readerReadTime.slice(12, 16)}</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MapInformation;
