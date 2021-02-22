import React, { useContext, useState, useEffect } from "react";
import WorldMap from "./WorldMap";
import MarkerCoordsContext from "./context/MarkerCoordsContext";
import { computeDistanceBetween } from "spherical-geometry-js";
import Modal from "react-modal";
import ModalMap from "./ModalMap";
import "../styles/GameScreen.css";

const GameScreen = () => {
  const { markerCoords } = useContext(MarkerCoordsContext);
  const [distanceinKm, setDistanceinKm] = useState(0);
  const [score, setScore] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);

  const customStyles = {
    content: {
      height: "65%",
      width: "65%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflow: "hidden",
      padding: "0",
    },
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const calcScore = () => {
    if (markerCoords && modalIsOpen) {
      const markerCoordsToLatLng = {
        lat: markerCoords.markerLat,
        lng: markerCoords.markerLng,
      };
      const streetViewCoordsToLatLng = {
        lat: markerCoords.locationLat,
        lng:  markerCoords.locationLng,
      };
      setDistanceinKm(
        Math.floor(
          computeDistanceBetween(
            markerCoordsToLatLng,
            streetViewCoordsToLatLng
          ) / 1000
        )
      );

      distanceinKm <= 5000 ? setScore(10000 - distanceinKm * 2) : setScore(0);
    }
  };
  useEffect(() => {
    calcScore();
    console.log(markerCoords)
  });

  return (
    <div className="game-screen">
      {/* <RandomStreetview /> */}
      <div className="guessr-map">  <WorldMap /></div>
  
      {markerCoords && (
        <div>
          <div>
            <button
              className="gs-button"
              onClick={() => {
                openModal();
              }}
            >
              Guess!
            </button>
          </div>

          <Modal
            shouldCloseOnOverlayClick={false}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
          >
            <ModalMap
              playerPosition={{
                lat: markerCoords.markerLat,
                lng: markerCoords.markerLng,
              }}
              locationPosition={{
                lat: markerCoords.locationLat,
                lng: markerCoords.locationLng,
              }}
              latLngLocationPosition={{
                lat: markerCoords.locationLat,
                lng: markerCoords.locationLng,
              }}
              latLngPlayerPosition={{
                lat: markerCoords.markerLat,
                lng: markerCoords.markerLng,
              }}
              score={score}
              distanceInKm={distanceinKm}
            ></ModalMap>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
