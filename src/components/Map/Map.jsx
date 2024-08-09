import { useState } from "react";
import SearchMap from "./SearchMap";
// import { toast } from "react-hot-toast";
// import axios from "axios";
import MapComponent from "./MapComponent";
import MapInformation from "./MapInformation";

const Map = () => {
  //   const [data, setData] = useState(null);
  const [search, setSearch] = useState("");

  // const data = null;
  const data = [
    {
      readerReadTime: "2024-08-03 09:55:13.000",
      tollPlazaName: "Itora Buzurg",
      tollPlazaGeocode: "25.999600,81.285787",
      vehicleType: "VC5",
      vehicleRegNo: "HR55AM4802",
    },
    {
      readerReadTime: "2024-08-03 08:09:43.000",
      tollPlazaName: "Andiyari",
      tollPlazaGeocode: "25.6123510,81.6420360",
      vehicleType: "VC5",
      vehicleRegNo: "HR55AM4802",
    },
    {
      readerReadTime: "2024-08-01 23:14:31.000",
      tollPlazaName: "SAHSON Toll Plaza",
      tollPlazaGeocode: "25.490249,81.996729",
      vehicleType: "VC5",
      vehicleRegNo: "HR55AM4802",
    },
    {
      readerReadTime: "2024-07-31 23:48:17.000",
      tollPlazaName: "Lalanagar Toll Plaza",
      tollPlazaGeocode: "25.266948,82.491513",
      vehicleType: "VC5",
      vehicleRegNo: "HR55AM4802",
    },
    {
      readerReadTime: "2024-07-31 22:24:52.000",
      tollPlazaName: "Daffi Toll Plaza",
      tollPlazaGeocode: "25.248275,82.994017",
      vehicleType: "VC5",
      vehicleRegNo: "HR55AM4802",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const token =
    // "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxaWtfdXNyIiwiaWF0IjoxNzIxODQwMDI0LCJhcHBzIjoiZGF0YXB1c2gifQ.seQnFT3tjqPfsEPo34eSP-HQi4W8vGvPAwFuW910Y3Sw1mlbgMnLp89VKL9xB9coX2Yf8GvPYmvtjwSPkLx9GQ";

    // try {
    //   const res = await axios.post(
    //     `https://freighteg.in/freightapi/ULLIPtracking`,
    //     {
    //       company_id: "665580f353ccced94082681b",
    //       tracking_For: "FASTAG",
    //       parameters: {
    //         vehiclenumber: search,
    //       },
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "Application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );

    //   console.log(res.data);
    //   setData(res.data.response);
    // } catch (error) {
    //   console.log(error);
    //   toast.error(error.message);
    // } finally {
    //   setSearch("");
    // }
  };

  return (
        <div className=" w-[100%] mx-auto overflow-hidden mt-3   rounded-lg " style={{
          height:"100%"
        }}>
          <MapComponent data={data} />
        </div>
  );
};

export default Map;
