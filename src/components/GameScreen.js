import React, { useContext, useState } from "react";
import MyMap from "./MyMap";
import RandomStreetview from "./RandomStreetview";
import MarkerCoordsContext from "./context/MarkerCoordsContext";
import StreetViewCoordsContext from "./context/StreetViewCoordsContext";
import { computeDistanceBetween } from "spherical-geometry-js";
import Modal from "react-modal";
import ModalMap from "./ModalMap"

import "../styles/GameScreen.css";

const GameScreen = () => {
  const { markerCoords } = useContext(MarkerCoordsContext);
  const { streetViewCoords } = useContext(StreetViewCoordsContext);
  const [distanceinKm, setDistanceinKm] = useState(0);
  const [score, setScore] = useState(0);
  

  let [modal, setModal] = useState(false);
  let [modalContent, setModalContent] = useState("");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    subtitle.style.color = "#f00";
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

      let handleModalOpen = (content = false) => {
        setModal(!modal);
        if (content) {
          setModalContent(content);
        }
      };

       setDistanceinKm(
        Math.floor(
          computeDistanceBetween(
            markerCoordsToLatLng,
            streetViewCoordsToLatLng
          ) / 1000
        )
      );

      distanceinKm <= 2000 ? setScore(10000 - distanceinKm * 5) : setScore(0);
      /*alert(
        `You have scored ${score} points \nThe distance was ${distanceinKm}Km`
      ); */
    }
  };
  return (
    <div>
      <div className="game-screen">
        <RandomStreetview />
        <div className="guessr-map">
          <MyMap />
          {markerCoords && streetViewCoords && (
            <div>
              <button
                className="gs-button"
                onClick={() => {
                  openModal();
                  calcScore();
                }}
              >
                Guess!
              </button>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
              >
                <h2 ref={_subtitle => (subtitle = _subtitle)}>You have scored {score} points. The distance was {distanceinKm} Km</h2>
                <button onClick={closeModal}>close</button>
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
