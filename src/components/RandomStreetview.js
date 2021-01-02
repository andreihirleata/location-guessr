import {randomLocation} from "../locations/location"
import React, { useState, useEffect, useContext } from "react";
import Streetview from "react-google-streetview";
import StreetViewCoordsContext from "./context/StreetViewCoordsContext";

const RandomStreetview = () => {
  const googleMapsApiKey = "AIzaSyCdtPEreWplsxM-Ir6nnyNOgrTJSZURJO4";

  const [coord, setCoord] = useState();
  const { setStreetViewCoords } = useContext(StreetViewCoordsContext);
  
  useEffect(() => {
    const location = new randomLocation()
    console.log(location);
          setCoord({
            position: { lat: location.lat, lng: location.lng },
            pov: { heading: 100, pitch: 0 },
            addressControl: false,
            showRoadLabels: false,
            zoomControl: false,
            panControl: false,
          });
          setStreetViewCoords([location.lat,location.lng])
    // getCoords();
  }, []);

 if(!coord) {return(<div>Loading...</div>)}
 else
 {return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#eeeeee",
      }}
    >
      
        <Streetview
          apiKey={googleMapsApiKey}
          streetViewPanoramaOptions={coord}
          
        />
  
    </div>
  );
};}


export default RandomStreetview;
