import React, {Component, createRef } from 'react'
import MarkerCoordsContext from "./context/MarkerCoordsContext";
import { randomLocation } from "../locations/location"

let markers = [];
const location = new randomLocation();


class WorldMap extends Component {
    static contextType = MarkerCoordsContext;
      
    get googleMapDiv() {
        return document.getElementById("google-map")
    }

    componentDidMount() {
        const googleMapScript = document.createElement("script");
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCdtPEreWplsxM-Ir6nnyNOgrTJSZURJO4&libraries=places&v=weekly`;
        window.document.body.appendChild(googleMapScript);
        googleMapScript.addEventListener("load", () => {
        this.googleMap = this.createGoogleMap();
        this.streetView = this.createStreetview();
        });
        }

    googleMapRef = createRef()
    googleStreetviewRef = createRef()

    createGoogleMap = () => {
        const { setMarkerCoords } = this.context;
     
        
           const map = new window.google.maps.Map(this.googleMapRef.current, {
                zoom: 1,
                disableDefaultUI: true,
                center: { lat: 33, lng: -40 },
            })
   
            map.addListener('click', function(e) {
                addMarker(e.latLng, map); 
                console.log(markers[0])
                setMarkerCoords({markerLat: markers[0].getPosition().lat(), markerLng: markers[0].getPosition().lng(),
                locationLat: location.lat, locationLng: location.lng})
                console.log(this.state)
  
            });

            function addMarker(location) {
                if(markers.length !== 0) deleteMarkers()
                let marker = new window.google.maps.Marker({
                  position: location,
                  map: map,
                });
                markers.push(marker);
                
            } 
              
              
              // Sets the map on all markers in the array.
              function setMapOnAll(map) {
                for (let i = 0; i < markers.length; i++) {
                  markers[i].setMap(map);
                }
              }
              
              // Removes the markers from the map, but keeps them in the array.
              function clearMarkers() {
                setMapOnAll(null);
              }
              
              // Deletes all markers in the array by removing references to them.
              function deleteMarkers() {
                clearMarkers();
                markers = [];
              }

              
        }
    
        createStreetview = () => {
             new window.google.maps.StreetViewPanorama(this.googleStreetviewRef.current,
                {
                  position: { lat: location.lat, lng: location.lng },
                  pov: {
                    heading: 34,
                    pitch: 10,
                  },addressControl: false,
                  showRoadLabels: false,
                  zoomControl: false,
                  panControl: false,
                }
              );
    
        }
        



    render() {
        return (
            <div>
        <div id="google-map"
        ref={this.googleMapRef}
        style={{ width: '25%',height: '25%', position: 'absolute', right: '0', bottom: '0', zIndex: '1'}}
        />
        <div id="streetview" ref={this.googleStreetviewRef} style={{height: "100vh", width:"100vw", zIndex: "0"}}></div>
        </div>
        )
        
    }
}

export default WorldMap;