import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper, Polyline } from "google-maps-react";
import "../styles/ModalMap.css";

class ModalMap extends Component {
  render() {
    return (
      <div style={{ height: "50vh", width: "50vw" }}>
        <Map
          style={{
            height: "70%",
            width: "100%",
          }}
          google={this.props.google}
          zoom={2}
          disableDefaultUI={true}
        >
          <Marker
            icon={"https://img.icons8.com/ios-filled/24/000000/marker.png"}
            position={this.props.playerPosition}
          />
          <Marker
            icon={
              "https://img.icons8.com/ios-glyphs/24/000000/user-location.png"
            }
            position={this.props.locationPosition}
          />
          <Polyline
            path={[
              this.props.latLngPlayerPosition,
              this.props.latLngLocationPosition,
            ]}
            options={{
              strokeColor: "#000",
              strokeOpacity: 1,
              strokeWeight: 1,
              icons: [
                {
                  icon: "hello",
                  offset: "1",
                  repeat: "10px",
                },
              ],
            }}
          />
        </Map>

        <div className="modal-content">
          <p className="modal-score">
            Your score is <strong>{this.props.score}</strong>. You were{" "}
            <strong>{this.props.distanceInKm} </strong>
            km ({Math.floor(this.props.distanceInKm * 0.621371)} miles) away.
          </p>
          <button
            className="button"
            type="button"
            onClick={() => window.location.reload(false)}
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCdtPEreWplsxM-Ir6nnyNOgrTJSZURJO4",
})(ModalMap);
