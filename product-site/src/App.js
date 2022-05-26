import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate, Router, useNavigate } from 'react-router-dom';

import './App.css';
import { siteContext } from "./Context";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Navbar from "./components/navbar/Navbar.js";
import Footer from "./components/footer/Footer.js";
import Home from "./components/home/Home.js";
import Register from "./components/register/Register.js";
import Login from "./components/login/Login.js";
import Options from "./components/options/Options.js";
import Dashboard from "./components/dashboard/Dashboard";
import NavbarDashboard from "./components/navbar/NavbarDashboard";

function App() {
  // Configuring Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDlwJk3ZyuuQEz9xH71E16luTakuOBCfzg",
    authDomain: "munsuite-d1d0c.firebaseapp.com",
    databaseURL: "https://munsuite-d1d0c-default-rtdb.firebaseio.com",
    projectId: "munsuite-d1d0c",
    storageBucket: "munsuite-d1d0c.appspot.com",
    messagingSenderId: "679459991121",
    appId: "1:679459991121:web:dc8aadabadab0e13309270",
    measurementId: "G-41D98K4YRG"
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();

  const [currentUser, setCurrentUser] = useState(auth.currentUser? auth.currentUser.uid : null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
          // User is signed in
          setCurrentUser(user.uid);
          console.log(user.uid);
          if (window.location.pathname == "/login" || window.location.pathname == "/register") {
            navigate("/dashboard")
          }
      } else {
          // User is signed out
          setCurrentUser(null);
          console.log("Signed out")
      }
    })
  }, [])

  useEffect(() => {
    if (auth.currentUser && (window.location.pathname == "/login" || window.location.pathname == "/register")) {
      navigate("/dashboard")
    }
  }, [window.location.pathname])

  return (
    <siteContext.Provider value={{currentUser, setCurrentUser}}>
      <div className="App-container" style={window.location.pathname == "/dashboard"? {overflowY: "hidden"}:{}}>
        {window.location.pathname == "/dashboard"? <NavbarDashboard key="navbar-dashboard"/>:<Navbar key="navbar"/>}
        <div className="UI-container">
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/register" element={<Register/>}/>
              <Route exact path="/login" element={<Login/>}/>
              <Route exact path="/options" element={<Options/>}/>
              <Route exact path="/dashboard" element={auth.currentUser? <Dashboard/>:<Navigate to="/login"/>}/>
              <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </div>
        {window.location.pathname == "/dashboard"? <div></div>:<Footer key="footer"/>}
      </div>
    </siteContext.Provider>
  );
}

export default App;
