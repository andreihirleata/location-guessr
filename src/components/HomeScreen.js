import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomeScreen.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

const HomeScreen = () => {

  const handleLinkClick = () => {
    alert(
      "Your goal is to guess where the location currently is. \nOnce you are ready to take a guess, pin the map and find out how close you are."
    );
  };

  return (
    <div className="homescreen">
      <div className="homescreen-logo">
        <img className="logo" src="map.png" alt="map" />
      </div>
      <div className="homescreen-title">
        <h1 className="title">Location Guessr</h1>
      </div>
      <div className="homescreen-button">
       <Link to="/game"> <button className="button" type="button" >
          Play! 
          <FontAwesomeIcon icon={faGamepad} size="lg" />
        </button> </Link>
      </div>
      <div className="howto">
        <button
          className="instructions"
          type="button"
          onClick={handleLinkClick}
        >
          How to Play
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
