import React, { Component } from "react";
import "../styles/MyMap.css"
import {
  Map,
  Marker,
  GoogleApiWrapper,
} from "google-maps-react";


export class MyMap extends Component {
  render() {
    
    return (
      <div>
        <div className="mapStyles">
        <Map
        google={this.props.google}
        zoom={2}
        center={{ lat: 52.374490, lng: -0.713289}}
        onClick={this.onMapClicked}
        >
      <Marker position={{ lat: 53.479489, lng: -2.2451148}} />
        </Map>
      </div>
      </div>
      
      
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (""),
})(MyMap);
