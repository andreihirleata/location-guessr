import React, { useContext } from "react";
import MyMap from "./MyMap";
import RandomStreetview from "./RandomStreetview";
import MarkerCoordsContext from "./context/MarkerCoordsContext";
import StreetViewCoordsContext from "./context/StreetViewCoordsContext";
import { computeDistanceBetween } from "spherical-geometry-js";

import '../styles/GameScreen.css';

const GameScreen = () => {
  const { markerCoords } = useContext(MarkerCoordsContext);
  const { streetViewCoords } = useContext(StreetViewCoordsContext);

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
      <div className="guessr-map">
      <MyMap />
      {markerCoords && streetViewCoords && (
        <button className="gs-button"
          onClick={calcScore}
        >
          Guess!
        </button>
      )}
      </div>
      
    </div>
  );
};

export default GameScreen;
