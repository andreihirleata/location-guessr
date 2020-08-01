import React from "react";
import ReactDOM from "react-dom";

export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);

    // state
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng,
      },
    };
  }

  // checking if map is loaded, if browsers location is provided and recenter to it
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) this.loadMap();
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  // recenterMap() will get called when the currentLocation in the component’s state is updated
  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panto(center); // .panTo() method on the google.maps.Map instance to change the center of the map.
    }
  }

  // handling when the map is loaded
  // navigator is a read-only property that returns a Geolocation object that gives Web content access to the location of the device.
  componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        this.setState({
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude,
          },
        });
      });
    }
    this.loadMap();
  }

  // defining loadMap(), called after the component has been rendered and grabs a reference to the DOM component to where the map is to be placed.
  loadMap() {
    // checks if google is available
    if (this.props && this.props.google) {
      // then;
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom,
        }
      );

      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
    }
  }

  // to make previous Marker picks the browsers current location by making use of Parent-Child concept through the renderChildren() method which will be responsible for calling the method on the child component.

  
}

export default CurrentLocation;

// default props for CurrentLocation component, since we’ll need to set the map with a center incase the current location is not provided.This is handled by the boolean prop centerAroundCurrentLocation.
CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: 52.37449,
    lng: -0.713289,
  },
  centerAroundCurrentLocation: false,
  visible: true,
};
