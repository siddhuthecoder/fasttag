import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import axios from 'axios';
import car1 from '../../assets/car1.png';

const Sarathi = () => {
  const [dlNumber, setDlNumber] = useState('');
  const [dob, setDob] = useState('');
  const [vehicleData, setVehicleData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.post('https://freighteg.in/freightapi/ULLIPtracking', {
        company_id: '665580f353ccced94082681b',
        tracking_For: 'SARATHI',
        parameters: {
          dlnumber: dlNumber,
          dob: dob
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxaWtfdXNyIiwiaWF0IjoxNzIxODQwMDI0LCJhcHBzIjoiZGF0YXB1c2gifQ.seQnFT3tjqPfsEPo34eSP-HQi4W8vGvPAwFuW910Y3Sw1mlbgMnLp89VKL9xB9coX2Yf8GvPYmvtjwSPkLx9GQ'
        }
      });
      setVehicleData(response.data.response[0].response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col mt-3">
        <input
          type="text"
          className="w-full px-3 min-h-[52px] rounded-md border"
          placeholder="Enter Driving License Number"
          value={dlNumber}
          onChange={(e) => setDlNumber(e.target.value)}
        />
        <div className="flex w-full mx-auto items-center mt-3 relative">
          <input
            type="text"
            className="w-full px-3 h-[52px] rounded-md border"
            placeholder="Enter Date of Birth as per driving license"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <div
            className="absolute right-0 w-[50px] z-[2] h-[50px] bg-[#5E81F4] rounded-tr-md rounded-tb-md rounded-br-md flex justify-center items-center cursor-pointer"
            onClick={handleSearch}
          >
            <IoSearchOutline className="text-white text-2xl" />
          </div>
        </div>
        <div className="mt-3 w-full bg-white rounded-md h-[450px] overflow-y-scroll flex flex-col ps-3">
          {vehicleData ? (
            <>
              <div className="w-full flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="text-zinc-400 text-sm">DL Number</div>
                  <div className="font-semi-bold text-lg">
                    {vehicleData.licenseNumber} <span className="text-green-500">({vehicleData.licenseInformation.status})</span>
                  </div>
                </div>
                <img src={car1} alt="" className="m-2" />
              </div>
              <hr className="mx-3 my-1" />
              <div className="text-2xl font-semibold text-[#5E81F4]">Personal Information</div>
              <div className="flex flex-col ps-2">
                <div className="text-zinc-400">Name</div>
                <div className="text-lg">{vehicleData.personalInformation.name}</div>
                <div className="text-zinc-400">Father's Name</div>
                <div className="text-lg">{vehicleData.personalInformation.fatherName}</div>
                <div className="text-zinc-400">Date of Birth</div>
                <div className="text-lg">{vehicleData.personalInformation.dateOfBirth.replace(/\*/g, '')}</div>
                <div className="text-zinc-400">Aadhaar Number</div>
                <div className="text-lg">{vehicleData.personalInformation.aadhaarNumber}</div>
                <div className="text-zinc-400">Address</div>
                <div className="text-lg">{vehicleData.personalInformation.address.replace(/\*/g, '')}</div>
                <div className="text-zinc-400">Blood Group</div>
                <div className="text-lg">{vehicleData.personalInformation.bloodGroup}</div>
                <div className="text-zinc-400">Mobile Number</div>
                <div className="text-lg">{vehicleData.personalInformation.mobileNumber.replace(/\*/g, '')}</div>
                <div className="text-zinc-400">Gender</div>
                <div className="text-lg">{vehicleData.personalInformation.gender}</div>
                <div className="text-zinc-400">Qualification</div>
                <div className="text-lg">{vehicleData.personalInformation.qualification}</div>
              </div>
              <hr className="mx-3 my-1" />
              <div className="text-2xl font-semibold text-[#5E81F4]">License Information</div>
              <div className="flex flex-col ps-2">
                <div className="text-zinc-400">License Number</div>
                <div className="text-lg">{vehicleData.licenseNumber}</div>
                <div className="text-zinc-400">Issued Authority</div>
                <div className="text-lg">{vehicleData.licenseInformation.issuedAuthority}</div>
                <div className="text-zinc-400">Issued Date</div>
                <div className="text-lg">{vehicleData.licenseInformation.issuedDate}</div>
                <div className="text-zinc-400">Validity (Non-Transport)</div>
                <div className="text-lg">{vehicleData.licenseInformation.validity.nonTransport}</div>
                <div className="text-zinc-400">Validity (Transport)</div>
                <div className="text-lg">{vehicleData.licenseInformation.validity.transport}</div>
              </div>
              <hr className="mx-3 my-1" />
              <div className="text-2xl font-semibold text-[#5E81F4]">Driving Classes</div>
              <div className="flex flex-col ps-2">
                {vehicleData.drivingClasses.map((drivingClass, index) => (
                  <div key={index} className="mb-2">
                    <div className="font-semibold text-lg">{drivingClass.class} <span className="text-green-600">({drivingClass.status})</span></div>
                    <div className="text-zinc-400">Issued: {drivingClass.issued}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-full">No data available</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sarathi;
