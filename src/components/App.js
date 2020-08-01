import React from "react";
import HomeScreen from './HomeScreen';
import "../styles/App.css";
import { Route, Switch } from 'react-router-dom';
import GameScreen from "./GameScreen";

function App() {
  return (
    <Switch>
    <Route exact path="/" component={HomeScreen}
    />
    <Route exact path="/game" component={GameScreen}
    />
    </Switch>
  )
};

export default App;
