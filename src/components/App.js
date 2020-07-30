import React from "react";
import HomeScreen from './HomeScreen';
import "../styles/App.css";
import { Route } from 'react-router-dom';

function App() {
  return (
    <Route exact path="/" component={HomeScreen}
    />
  )
};

export default App;
