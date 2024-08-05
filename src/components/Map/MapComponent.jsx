import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyDRsQkxX8q_oHmm5V8Mz2tjeuurOQpfbN0";

const containerStyle = {
  width: "100%",
  height: "80vh",
};

// eslint-disable-next-line
const MapComponent = ({ data }) => {
  const [center, setCenter] = useState({ lat: 25.490249, lng: 81.996729 });
  const [zoom, setZoom] = useState(8);

  useEffect(() => {
    // eslint-disable-next-line
    if (data && data.length > 0) {
      // eslint-disable-next-line
      const latitudes = data.map((plaza) =>
        parseFloat(plaza.tollPlazaGeocode.split(",")[0])
      );
      // eslint-disable-next-line
      const longitudes = data.map((plaza) =>
        parseFloat(plaza.tollPlazaGeocode.split(",")[1])
      );

      const latCenter = (Math.max(...latitudes) + Math.min(...latitudes)) / 2;
      const lngCenter = (Math.max(...longitudes) + Math.min(...longitudes)) / 2;

      setCenter({ lat: latCenter, lng: lngCenter });

      const latDiff = Math.max(...latitudes) - Math.min(...latitudes);
      const lngDiff = Math.max(...longitudes) - Math.min(...longitudes);
      setZoom(Math.max(7, 20 - Math.max(latDiff, lngDiff) * 10));
    }
  }, [data]);

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
        {data &&
          // eslint-disable-next-line
          data.map((plaza, index) => {
            const [lat, lng] = plaza.tollPlazaGeocode.split(",").map(Number);
            return (
              <Marker
                key={index}
                position={{ lat, lng }}
                label={plaza.tollPlazaName}
              />
            );
          })}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
