import React from "react";
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Navbar from "./components/navbar/Navbar.js";
import Footer from "./components/footer/Footer.js";
import Home from "./components/home/Home.js";
import Register from "./components/register/Register.js";
import Login from "./components/login/Login.js";
import Options from "./components/options/Options.js";

function App() {
  return (
    <div className="App-container">
      <Navbar key="navbar"/>
      <div className="UI-container">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/options" component={Options}/>
          </Switch>
      </div>
      <Footer key="footer"/>
    </div>
  );
}

export default App;
