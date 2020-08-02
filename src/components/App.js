import React from "react";
import "../styles/App.css";
import HomeScreen from './HomeScreen';
import RandomStreetView from "./RandomStreetView"
import MyMap from './MyMap';



function App() {
  return (
    <div>
      <HomeScreen  />
      <RandomStreetView />
      <MyMap />
    </div>
  );
}
export default App;
