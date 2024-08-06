import React, { useState } from 'react';
import axios from 'axios';
import { IoSearchOutline } from "react-icons/io5";
import truck from '../../assets/truck.png';

const Vahan = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleData, setVehicleData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.post('https://freighteg.in/freightapi/ULLIPtracking', {
        company_id: "665580f353ccced94082681b",
        tracking_For: "VAHAN",
        parameters: {
          vehiclenumber: vehicleNumber
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer your_token_here' // Update with correct token if needed
        }
      });
  
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data.response[0].response, "text/xml");
      
      // Extract data from XML
      const data = {
        vehicleNumber: xmlDoc.getElementsByTagName('rc_regn_no')[0]?.textContent || 'N/A',
        registrationDate: xmlDoc.getElementsByTagName('rc_regn_dt')[0]?.textContent || 'N/A',
        registrationUpto: xmlDoc.getElementsByTagName('rc_regn_upto')[0]?.textContent || 'N/A',
        purchaseDate: xmlDoc.getElementsByTagName('rc_purchase_dt')[0]?.textContent || 'N/A',
        ownerName: xmlDoc.getElementsByTagName('rc_owner_name')[0]?.textContent || 'N/A',
        fatherName: xmlDoc.getElementsByTagName('rc_f_name')[0]?.textContent || 'N/A',
        presentAddress: xmlDoc.getElementsByTagName('rc_present_address')[0]?.textContent || 'N/A',
        permanentAddress: xmlDoc.getElementsByTagName('rc_permanent_address')[0]?.textContent || 'N/A',
        mobileNo: xmlDoc.getElementsByTagName('rc_mobile_no')[0]?.textContent || 'N/A',
        vehicleCategory: xmlDoc.getElementsByTagName('rc_vch_catg')[0]?.textContent || 'N/A',
        vehicleClassDesc: xmlDoc.getElementsByTagName('rc_vh_class_desc')[0]?.textContent || 'N/A',
        chassisNo: xmlDoc.getElementsByTagName('rc_chasi_no')[0]?.textContent || 'N/A',
        engineNo: xmlDoc.getElementsByTagName('rc_eng_no')[0]?.textContent || 'N/A',
        makerDesc: xmlDoc.getElementsByTagName('rc_maker_desc')[0]?.textContent || 'N/A',
        makerModel: xmlDoc.getElementsByTagName('rc_maker_model')[0]?.textContent || 'N/A',
        bodyTypeDesc: xmlDoc.getElementsByTagName('rc_body_type_desc')[0]?.textContent || 'N/A',
        fuelDesc: xmlDoc.getElementsByTagName('rc_fuel_desc')[0]?.textContent || 'N/A',
        color: xmlDoc.getElementsByTagName('rc_color')[0]?.textContent || 'N/A',
        normsDesc: xmlDoc.getElementsByTagName('rc_norms_desc')[0]?.textContent || 'N/A',
        fitUpto: xmlDoc.getElementsByTagName('rc_fit_upto')[0]?.textContent || 'N/A',
        npUpto: xmlDoc.getElementsByTagName('rc_np_upto')[0]?.textContent || 'N/A',
        npIssuedBy: xmlDoc.getElementsByTagName('rc_np_issued_by')[0]?.textContent || 'N/A',
        taxUpto: xmlDoc.getElementsByTagName('rc_tax_upto')[0]?.textContent || 'N/A',
        financer: xmlDoc.getElementsByTagName('rc_financer')[0]?.textContent || 'N/A',
        insuranceComp: xmlDoc.getElementsByTagName('rc_insurance_comp')[0]?.textContent || 'N/A',
        insurancePolicyNo: xmlDoc.getElementsByTagName('rc_insurance_policy_no')[0]?.textContent || 'N/A',
        insuranceUpto: xmlDoc.getElementsByTagName('rc_insurance_upto')[0]?.textContent || 'N/A',
        manuMonthYr: xmlDoc.getElementsByTagName('rc_manu_month_yr')[0]?.textContent || 'N/A',
        unldWt: xmlDoc.getElementsByTagName('rc_unld_wt')[0]?.textContent || 'N/A',
        gvw: xmlDoc.getElementsByTagName('rc_gvw')[0]?.textContent || 'N/A',
        noCyl: xmlDoc.getElementsByTagName('rc_no_cyl')[0]?.textContent || 'N/A',
        cubicCap: xmlDoc.getElementsByTagName('rc_cubic_cap')[0]?.textContent || 'N/A',
        seatCap: xmlDoc.getElementsByTagName('rc_seat_cap')[0]?.textContent || 'N/A',
        sleeperCap: xmlDoc.getElementsByTagName('rc_sleeper_cap')[0]?.textContent || 'N/A',
        standCap: xmlDoc.getElementsByTagName('rc_stand_cap')[0]?.textContent || 'N/A',
        wheelbase: xmlDoc.getElementsByTagName('rc_wheelbase')[0]?.textContent || 'N/A',
        registeredAt: xmlDoc.getElementsByTagName('rc_registered_at')[0]?.textContent || 'N/A',
        statusAsOn: xmlDoc.getElementsByTagName('rc_status_as_on')[0]?.textContent || 'N/A',
        puccUpto: xmlDoc.getElementsByTagName('rc_pucc_upto')[0]?.textContent || 'N/A',
        puccNo: xmlDoc.getElementsByTagName('rc_pucc_no')[0]?.textContent || 'N/A',
        permitNo: xmlDoc.getElementsByTagName('rc_permit_no')[0]?.textContent || 'N/A',
        permitIssueDt: xmlDoc.getElementsByTagName('rc_permit_issue_dt')[0]?.textContent || 'N/A',
        permitValidFrom: xmlDoc.getElementsByTagName('rc_permit_valid_from')[0]?.textContent || 'N/A',
        permitValidUpto: xmlDoc.getElementsByTagName('rc_permit_valid_upto')[0]?.textContent || 'N/A',
        permitType: xmlDoc.getElementsByTagName('rc_permit_type')[0]?.textContent || 'N/A',
        permitCode: xmlDoc.getElementsByTagName('rc_permit_code')[0]?.textContent || 'N/A',
      };
      console.log(data)
      setVehicleData(data);
      setError('');
    } catch (error) {
      console.error('Error fetching vehicle data:', error.message);
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      console.error('Response headers:', error.response?.headers);
      setError('Error fetching vehicle data. Please check the console for more details.');
    }
  };
  

  return (
    <>
      <div className="w-full flex flex-col ">
        <div className="flex w-full mx-auto items-center mt-3 relative">
          <input
            type="text"
            className="w-full px-3 h-[52px] rounded-md border"
            placeholder="Enter Vehicle Number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
          />
          <div
            className="absolute right-0 w-[50px] z-[2] h-[50px] bg-[#5E81F4] rounded-tr-md rounded-tb-md rounded-br-md flex justify-center items-center cursor-pointer"
            onClick={handleSearch}
          >
            <IoSearchOutline className="text-white text-2xl" />
          </div>
        </div>
        <div className="flex flex-col w-full rounded-md bg-white h-[70vh] overflow-y-auto mt-3 ps-3">
          {error && (
            <div className="flex justify-center items-center h-full text-red-500">{error}</div>
          )}
          {vehicleData ? (
            <>
              <div className="w-full flex items-center justify-between">
                <div className="flex flex-col ps-2 my-1">
                  <div className="text-zinc-400">Vehicle Number</div>
                  <div className="font-semibold text-lg">{vehicleData.vehicleNumber} <span className="text-green-600">(Active)</span></div>
                </div>
                <img src={truck} className='m-2' alt="" />
              </div>
              <div className="w-full flex flex-col">
                <div className="text-zinc-400">Registration Date: </div>
                <div className="font-semibold">{vehicleData.registrationDate}</div>
              </div>
              <hr className="mx-3 my-1" />
              <div className="text-2xl font-semi-bold text-[#5E81F4]">Vehicle Info</div>
              <div className="flex flex-col ps-2">
                <div className="text-zinc-400">Owner Name</div>
                <div className="text-lg">{vehicleData.ownerName}</div>
              </div>
              <div className="w-full grid grid-cols-1 mt-2 gap-2 md:grid-cols-2">
                <div className="flex flex-col ps-2">
                  <div className="text-zinc-400">Vehicle Class</div>
                  <div className="font-semibold">{vehicleData.vehicleClass}</div>
                </div>
                <div className="flex flex-col ps-2">
                  <div className="text-zinc-400">Fuel</div>
                  <div className="font-semibold">{vehicleData.fuel}</div>
                </div>
                <div className="flex flex-col ps-2">
                  <div className="text-zinc-400">Emission Norms</div>
                  <div className="font-semibold">{vehicleData.emissionNorms}</div>
                </div>
              </div>
              {/* Add more fields as needed */}
            </>
          ) : (
            <div className="flex justify-center items-center h-full">Enter the Vechile Number</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Vahan;
