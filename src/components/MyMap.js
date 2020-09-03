import React, { Component } from "react";
import "../styles/MyMap.css";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import MarkerCoordsContext from "./context/MarkerCoordsContext";

class MyMap extends Component {
  static contextType = MarkerCoordsContext;
  constructor(props) {
    super(props);
    this.state = {
      markers: [
        {
          position: {},
        },
      ],
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(t, map, coord) {
    const { setMarkerCoords } = this.context;
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState(() => {
      return {
        markers: [
          {
            position: { lat, lng },
          },
        ],
      };
    });
    setMarkerCoords(this.state.markers);
  }

  render() {
    return (
      <div className="mapStyles">
        <Map
          google={this.props.google}
          zoom={1}
          onClick={this.onClick}
          disableDefaultUI={true}
          initialCenter={{ lat: 33, lng: -40 }}
        >
          {this.state.markers.map((marker, index) => (
            <Marker key={index} position={marker.position} />
          ))}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCgwPU15UpBtYMixR4ux1F79JVIG6s6yFU",
})(MyMap);
