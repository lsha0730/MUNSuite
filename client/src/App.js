import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "./App.scoped.css";
import { siteContext } from "./Context";
import { onAuthStateChanged } from "firebase/auth";
import { useMediaQuery } from "react-responsive";

import {
  Login,
  Register,
  Eula,
  Footer,
  Forgot,
  Home,
  Navbar,
  Plans,
  OrderInstructions,
} from "./product_site";
import StaffApp from "./staff_side/StaffApp.js";
import DelegateApp from "./delegate_side/DelegateApp.js";
import { configureFirebase, logOut } from "./common/utils/firebase";

function App() {
  const { app, auth } = configureFirebase();
  const navigate = useNavigate();
  const signOut = () => {
    logOut(auth, navigate);
  };
  const isPortrait = useMediaQuery({ query: "(max-width: 641px)" });
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user && ["/login", "/register"].includes(window.location.pathname)) {
        navigate(`/app/${user.uid}`);
      }
    });
  }, []);

  useEffect(() => {
    if (user && ["/login", "/register"].includes(window.location.pathname)) {
      navigate(`/app/${user.uid}`);
    }
  }, [window.location.pathname]);

  return (
    <siteContext.Provider value={{ app, auth, user, signOut, isPortrait }}>
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
            <Route exact path="/prepayment" element={<OrderInstructions />} />
            <Route exact path="/eula" element={<Eula />} />
            <Route
              exact
              path="/app/*"
              element={user ? <StaffApp /> : <Navigate to="/login" />}
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
