import React, { useState } from "react";
import HomeScreen from "./HomeScreen";
import "../styles/App.css";
import { Route, Switch } from "react-router-dom";
import GameScreen from "./GameScreen";
import MarkerCoordsContext from "./context/MarkerCoordsContext";
import StreetViewCoordsContext from "./context/StreetViewCoordsContext";

function App() {
  const [streetViewCoords, setStreetViewCoords] = useState(null);
  const [markerCoords, setMarkerCoords] = useState(null);

  return (
    <StreetViewCoordsContext.Provider
      value={{ streetViewCoords, setStreetViewCoords }}
    >
      <MarkerCoordsContext.Provider value={{ markerCoords, setMarkerCoords }}>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/game" component={GameScreen} />
        </Switch>
      </MarkerCoordsContext.Provider>
    </StreetViewCoordsContext.Provider>
  );
}

export default App;
