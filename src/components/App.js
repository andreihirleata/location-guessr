import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


//import WorldMap from "./WorldMap"
import MyMap from './MyMap';
// import SimpleMap from './SimpleMap';
import '../styles/App.css';


function App()  {
  
    return (
      <div>
        <MyMap  />
      </div>
    )
      
}

export default App;
