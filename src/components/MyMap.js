import React, { Component } from "react";
import "../styles/MyMap.css";

import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
} from "google-maps-react";

export class MyMap extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
      <div>
        <div className="mapStyles">
          <Map
            google={this.props.google}
            zoom={2}
            initialCenter={{ lat: 52.37449, lng: -0.713289 }}
            // onClick={this.onMapClicked}
          >
            <Marker
              onClick={this.onMarkerClick}
              name={`current marker position`}
            />
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div><h4>{this.state.selectedPlace.name}</h4></div>
              </InfoWindow>

    
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCgwPU15UpBtYMixR4ux1F79JVIG6s6yFU",
})(MyMap);