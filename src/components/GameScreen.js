import React, { useContext, useEffect } from "react";
import MyMap from "./MyMap";
import RandomStreetview from "./RandomStreetview";
import MarkerCoordsContext from "./context/MarkerCoordsContext";
import StreetViewCoordsContext from "./context/StreetViewCoordsContext";
import { computeDistanceBetween } from "spherical-geometry-js";

const GameScreen = () => {
  // const [score, setScore] = useState(0);
  const { markerCoords } = useContext(MarkerCoordsContext);
  const { streetViewCoords } = useContext(StreetViewCoordsContext);

  // useEffect(() => {
  //   console.log(markerCoords, streetViewCoords);
  //   if (markerCoords && streetViewCoords) {
  //     const markerCoordsToLatLng = {
  //       lat: markerCoords[0],
  //       lng: markerCoords[1],
  //     };
  //     const streetViewCoordsToLatLng = {
  //       lat: streetViewCoords[0].position.lat,
  //       lng: streetViewCoords[0].position.lng,
  //     };

  //     console.log(
  //       computeDistanceBetween(markerCoordsToLatLng, streetViewCoordsToLatLng)
  //     );
  //   }
  // }, [markerCoords]);

  const calcScore = () => {
    if (markerCoords && streetViewCoords) {
      const markerCoordsToLatLng = {
        lat: streetViewCoords[0],
        lng: streetViewCoords[1],
      };
      const streetViewCoordsToLatLng = {
        lat: markerCoords[0].position.lat,
        lng: markerCoords[0].position.lng,
      };
      const distanceinKm = Math.floor(
        computeDistanceBetween(markerCoordsToLatLng, streetViewCoordsToLatLng) /
          1000
      );
      let score;
      distanceinKm <= 2000 ? (score = 10000 - distanceinKm * 5) : (score = 0);
      alert(
        `You have scored ${score} points \nThe distance was ${distanceinKm}Km`
      );
    }
  };
  return (
    <div className="game-screen">
      <RandomStreetview />
      <MyMap />
      {markerCoords && streetViewCoords && (
        <button
          onClick={calcScore}
          style={{ zIndex: "100", position: "absolute", right: "0" }}
        >
          Click
        </button>
      )}
    </div>
  );
};

export default GameScreen;
