import React, { useState } from "react";
import Modal from 'react-modal';
import RandomStreetview from "./RandomStreetView";


    const Main = (props) => {

      const initialState = {
        center: {
          lat: 52.37449,
          lng: -0.713289
        },
        markers: [],
        place: {
          city: "",
          country: "",
          link: "",
          imgUrl: "",
          lat: "",
          lng: ""
        },
        maxZoom: 10,
        gestureHandling: "",
        hints: [],
        userPoints: 1200,
        gameFinished: false
      }
      
      const [state, setState] = useState(false);
      const [center, setCenter] = useState(initialState.center);
      const [markers, setMarkers] = useState(initialState.markers);
      const [place, setPlace] = useState(initialState.place);
      const [gestureHandling, setGestureHandling] = useState(initialState.gestureHandling);
      const [gameFinished, setGameFinished] = useState(initialState.gameFinished);

      const pinMarkerOnClick = (nextState) => {
        setState(nextState)
      }

      const handleSubmitClick = () => {
        if (!state.markers.length) {
          // Toast message here
          alert('Try pinnning your guess on the map!');
        }
        else {
          const lat1 = state.place.lat
          const lng1 = state.place.lng;
          const lat2 = state.markers[0].lat;
          const lng2 = state.markers[0].lng;
          const distance = calcCrow(lat1, lng1, lat2, lng2);
          const answer = state.place
          const nextState = state;
    
          nextState.gameFinished = true;
          nextState.markers.push(answer);
          nextState.userPoints += calculateBonus(distance);
          nextState.userPoints = Math.ceil(nextState.userPoints);
    
          this.setState(nextState);
        }
      }


      return (
        <div>
          
        <div className="Main-SV-Container">
          <RandomStreetview
            place={state.place}
          />
        </div>
      </div>

      )
    }


  