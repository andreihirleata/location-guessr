import { randomLocation } from "../locations/location"
import React, {Component} from "react";
import ReactStreetview from "react-streetview";

class RandomStreetview extends Component {


  constructor(props) {
    super(props);
    const location = new randomLocation();
    this.state = {
      googleMapsApiKey :"AIzaSyCdtPEreWplsxM-Ir6nnyNOgrTJSZURJO4",
      coord: {
        position: { lat: location.lat, lng: location.lng },
        pov: { heading: 100, pitch: 0 },
        addressControl: false,
        showRoadLabels: false,
        zoomControl: false,
        panControl: false,
      }
  }
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

  componentDidMount() {
    const { setStreetViewCoords } = this.context;
    setStreetViewCoords([this.state.coord.position.lat, this.state.coord.position.lng]);
   
  }

  componentDidCatch(error, errorInfo) {
    console.log(error,errorInfo);
    window.location.reload(false);
  }


render() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#eeeeee",
      }}
    >

      <ReactStreetview
        apiKey={this.state.googleMapsApiKey}
        streetViewPanoramaOptions={this.state.coord}
        googleMaps={this.props.google}
      />

    </div>
  );
}

}


export default RandomStreetview;
