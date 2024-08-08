import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { IoSearchOutline } from "react-icons/io5";
import truck from '../../assets/truck.png';
import { useParams } from 'react-router-dom';
const Vahan = () => {
    const { id } = useParams(); // Get vehicleNumber from URL parameters
  const [vehicleData, setVehicleData] = useState(null);
  const [error, setError] = useState('');

  
  useEffect(() => {
    const handleSearch = async () => {
        
      try {
        const response = await axios.post('https://fastagtracking.com/customulip/ulipApi', {
          company_id: "66b2f12abbef97c004389b88",
          tracking_For: "VAHAN",
          parameters: {
            vehiclenumber: id
          }
        }, {
          headers: {
            'Content-Type': 'application/json'
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
    handleSearch()
  }, [])
  

  return (
    <>
      <div className="w-full flex flex-col ">
        
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
              <div className="text-2xl font-semi-bold text-[#5E81F4]">Vehicle Details</div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Registration Up To:</div>
                <div className="font-semibold">{vehicleData.registrationUpto}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Purchase Date:</div>
                <div className="font-semibold">{vehicleData.purchaseDate}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Owner Name:</div>
                <div className="font-semibold">{vehicleData.ownerName}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Father's Name:</div>
                <div className="font-semibold">{vehicleData.fatherName}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Present Address:</div>
                <div className="font-semibold">{vehicleData.presentAddress}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Permanent Address:</div>
                <div className="font-semibold">{vehicleData.permanentAddress}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Mobile No:</div>
                <div className="font-semibold">{vehicleData.mobileNo}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Vehicle Category:</div>
                <div className="font-semibold">{vehicleData.vehicleCategory}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Vehicle Class Description:</div>
                <div className="font-semibold">{vehicleData.vehicleClassDesc}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Chassis No:</div>
                <div className="font-semibold">{vehicleData.chassisNo}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Engine No:</div>
                <div className="font-semibold">{vehicleData.engineNo}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Maker Description:</div>
                <div className="font-semibold">{vehicleData.makerDesc}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Maker Model:</div>
                <div className="font-semibold">{vehicleData.makerModel}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Body Type Description:</div>
                <div className="font-semibold">{vehicleData.bodyTypeDesc}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Fuel Description:</div>
                <div className="font-semibold">{vehicleData.fuelDesc}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Color:</div>
                <div className="font-semibold">{vehicleData.color}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Norms Description:</div>
                <div className="font-semibold">{vehicleData.normsDesc}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Fit Up To:</div>
                <div className="font-semibold">{vehicleData.fitUpto}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">NP Up To:</div>
                <div className="font-semibold">{vehicleData.npUpto}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">NP Issued By:</div>
                <div className="font-semibold">{vehicleData.npIssuedBy}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Tax Up To:</div>
                <div className="font-semibold">{vehicleData.taxUpto}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Financer:</div>
                <div className="font-semibold">{vehicleData.financer}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Insurance Company:</div>
                <div className="font-semibold">{vehicleData.insuranceComp}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Insurance Policy No:</div>
                <div className="font-semibold">{vehicleData.insurancePolicyNo}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Insurance Up To:</div>
                <div className="font-semibold">{vehicleData.insuranceUpto}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Manufacturing Month & Year:</div>
                <div className="font-semibold">{vehicleData.manuMonthYr}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Unladen Weight:</div>
                <div className="font-semibold">{vehicleData.unldWt}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">GVW:</div>
                <div className="font-semibold">{vehicleData.gvw}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Number of Cylinders:</div>
                <div className="font-semibold">{vehicleData.noCyl}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Cubic Capacity:</div>
                <div className="font-semibold">{vehicleData.cubicCap}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Seat Capacity:</div>
                <div className="font-semibold">{vehicleData.seatCap}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Sleeper Capacity:</div>
                <div className="font-semibold">{vehicleData.sleeperCap}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Standing Capacity:</div>
                <div className="font-semibold">{vehicleData.standCap}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Wheelbase:</div>
                <div className="font-semibold">{vehicleData.wheelbase}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Registered At:</div>
                <div className="font-semibold">{vehicleData.registeredAt}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Status As On:</div>
                <div className="font-semibold">{vehicleData.statusAsOn}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">PUCC Up To:</div>
                <div className="font-semibold">{vehicleData.puccUpto}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">PUCC No:</div>
                <div className="font-semibold">{vehicleData.puccNo}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Fitness Certificate No:</div>
                <div className="font-semibold">{vehicleData.fitCertNo}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Fitness Certificate Upto:</div>
                <div className="font-semibold">{vehicleData.fitCertUpto}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Permit No:</div>
                <div className="font-semibold">{vehicleData.permitNo}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Permit Upto:</div>
                <div className="font-semibold">{vehicleData.permitUpto}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Permit Issued By:</div>
                <div className="font-semibold">{vehicleData.permitIssuedBy}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Body Style Description:</div>
                <div className="font-semibold">{vehicleData.bodyStyleDesc}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">City:</div>
                <div className="font-semibold">{vehicleData.city}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">District:</div>
                <div className="font-semibold">{vehicleData.district}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">State:</div>
                <div className="font-semibold">{vehicleData.state}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Pin Code:</div>
                <div className="font-semibold">{vehicleData.pinCode}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">RTO Office:</div>
                <div className="font-semibold">{vehicleData.rtoOffice}</div>
              </div>
              <div className="w-full flex flex-col mt-1">
                <div className="text-zinc-400">Sub RTO Office:</div>
                <div className="font-semibold">{vehicleData.subRtoOffice}</div>
              </div>
         
         
        
            </>
          ) : (
            <div className="flex justify-center items-center h-full">Please Data is fetching</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Vahan;
