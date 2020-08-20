import React, { useContext, useState, useEffect } from "react";
import MyMap from "./MyMap";
import RandomStreetview from "./RandomStreetview";
import MarkerCoordsContext from "./context/MarkerCoordsContext";
import StreetViewCoordsContext from "./context/StreetViewCoordsContext";
import { computeDistanceBetween } from "spherical-geometry-js";
import Modal from "react-modal";
import ModalMap from "./ModalMap";
import "../styles/GameScreen.css";

const GameScreen = () => {
  const { markerCoords } = useContext(MarkerCoordsContext);
  const { streetViewCoords } = useContext(StreetViewCoordsContext);
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
    },
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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
      setDistanceinKm(
        Math.floor(
          computeDistanceBetween(
            markerCoordsToLatLng,
            streetViewCoordsToLatLng
          ) / 1000
        )
      );

      distanceinKm <= 10000 ? setScore(10000 - distanceinKm) : setScore(0);
    }
  };
  useEffect(() => {
    calcScore();
  });

  return (
    <div>
      <div className="game-screen">
        <RandomStreetview />
        <div className="guessr-map">
          {streetViewCoords && <MyMap />}
          {markerCoords && streetViewCoords && (
            <div>
              <button
                className="gs-button"
                onClick={() => {
                  openModal();
                }}
              >
                Guess!
              </button>
              <Modal
                shouldCloseOnOverlayClick={false}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
              >
                <ModalMap
                  playerPosition={{
                    lat: streetViewCoords[0],
                    lng: streetViewCoords[1],
                  }}
                  locationPosition={{
                    lat: markerCoords[0].position.lat,
                    lng: markerCoords[0].position.lng,
                  }}
                  latLngLocationPosition={{
                    lat: streetViewCoords[0],
                    lng: streetViewCoords[1],
                  }}
                  latLngPlayerPosition={{
                    lat: markerCoords[0].position.lat,
                    lng: markerCoords[0].position.lng,
                  }}
                  score={score}
                  distanceInKm={distanceinKm}
                ></ModalMap>
              </Modal>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
