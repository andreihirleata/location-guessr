import randomStreetView from "random-streetview";
import React, { useState, useEffect, useContext } from "react";
import ReactStreetview from "react-streetview";
import StreetViewCoordsContext from "./context/StreetViewCoordsContext";

const RandomStreetview = () => {
  const googleMapsApiKey = "AIzaSyCgwPU15UpBtYMixR4ux1F79JVIG6s6yFU";

  const [coord, setCoord] = useState("");
  const { setStreetViewCoords } = useContext(StreetViewCoordsContext);

  useEffect(() => {
    const getCoords = async () => {
      let isValid = false;
      let attempts = 0;
      while (!isValid && attempts <= 3) {
        try {
          const data = await randomStreetView.getRandomLocation();
          setCoord({
            position: { lat: data[0], lng: data[1] },
            pov: { heading: 100, pitch: 0 },
            addressControl: false,
            showRoadLabels: false,
            zoomControl: false,
            panControl: false,
          });
          setStreetViewCoords([data[0], data[1]]);
          isValid = true;
        } catch (err) {
          console.log(err);
          attempts += 1;
        }
      }
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
