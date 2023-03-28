import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "./App.scoped.css";
import { siteContext } from "./Context";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useMediaQuery } from "react-responsive";

import Navbar from "./product-site/navbar/Navbar.js";
import Footer from "./product-site/footer/Footer.js";
import Home from "./product-site/home/Home.js";
import Register from "./product-site/register/Register.js";
import Login from "./product-site/login/Login.js";
import Forgot from "./product-site/forgot/Forgot.js";
import Plans from "./product-site/plans/Plans.js";
import Prepayment from "./product-site/plans/Prepayment";
import Eula from "./product-site/eula/Eula";

import StaffApp from "./staff-side/StaffApp.js";
import DelegateApp from "./delegate-side/DelegateApp.js";

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
    measurementId: "G-41D98K4YRG",
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        console.log(`Signout error (${error.code}): ${error.message}`);
      });
  };

  const [currentUser, setCurrentUser] = useState(
    auth.currentUser ? auth.currentUser.uid : null
  );
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setCurrentUser(user.uid);
        if (
          window.location.pathname == "/login" ||
          window.location.pathname == "/register"
        ) {
          navigate(`/app/${auth.currentUser.uid}`);
        }
      } else {
        // User is signed out
        setCurrentUser(null);
      }
    });
  }, []);

  useEffect(() => {
    if (
      auth.currentUser &&
      (window.location.pathname == "/login" ||
        window.location.pathname == "/register")
    ) {
      navigate(`/app/${auth.currentUser.uid}`);
    }
  }, [window.location.pathname]);

  const isPortrait = useMediaQuery({ query: "(max-width: 641px)" });

  return (
    <siteContext.Provider
      value={{ currentUser, setCurrentUser, app, handleSignout, isPortrait }}
    >
      <div
        className="App-container"
        style={
          ["/register", "/login", "/forgot", "/prepayment"].includes(
            window.location.pathname
          )
            ? { backgroundColor: "#F7F7F7" }
            : {}
        }
      >
        <Navbar />
        <div className="UI-container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/forgot" element={<Forgot />} />
            <Route exact path="/plans" element={<Plans />} />
            <Route exact path="/prepayment" element={<Prepayment />} />
            <Route exact path="/eula" element={<Eula />} />
            <Route
              exact
              path="/app/*"
              element={
                auth.currentUser ? <StaffApp /> : <Navigate to="/login" />
              }
            />
            <Route exact path="/form/*" element={<DelegateApp />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </siteContext.Provider>
  );
}

export default App;
