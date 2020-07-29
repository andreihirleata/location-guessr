import React from "react";
import { compose, withProps } from "recompose";
import {
  Map,
  GoogleMap,
  withGoogleMap,
  Marker,
  GoogleApiWrapper,
  withScriptjs,
} from "google-maps-react";
import "../styles/WorldMap.css";

const MapComponent = withScriptjs(withGoogleMap((props) => (
  <div className="mapStyles">
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
      {props.isMarkerShown && (
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
      )}
    </GoogleMap>

    <MapComponent isMarkerShown googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places" loadingElement={<div style={{ height: `100%` }}></div>}
    containerElement={<div style={ {height: `100%`} }></div>}
    mapElement={<div style={ {height: `100%`} }></div>}
    />
  </div>
)))

class WorldMap extends React.PureComponent {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }
  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <MapComponent isMarkerShown={this.state.isMarkerShown} onMarkererClick={this.handleMarkerClick}/>
    )
  }
}



export default GoogleApiWrapper({
  apiKey: ""
})(WorldMap)
