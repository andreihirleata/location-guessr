import randomStreetView from 'random-streetview';
import React, { useState, useEffect } from "react";
import ReactStreetview from "react-streetview";

const RandomStreetview = () => {
  const googleMapsApiKey = "AIzaSyCdtPEreWplsxM-Ir6nnyNOgrTJSZURJO4";

  const [coord, setCoord] = useState("");

  useEffect(() => {
    const getCoords = async () => {
      const data = await randomStreetView.getRandomLocation();
      setCoord({
        position: { lat: data[0], lng: data[1] },
        pov: { heading: 100, pitch: 0 },
        addressControl: false,
        showRoadLabels: false,
        zoomControl: false,
        panControl: false,
      });
    };
    getCoords();
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#eeeeee",
      }}
    >
      {coord && (
        <ReactStreetview
          apiKey={googleMapsApiKey}
          streetViewPanoramaOptions={coord}
        />
      )}
    </div>
  );
};

export default RandomStreetview;