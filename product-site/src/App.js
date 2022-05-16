import React, { useEffect, useState } from "react";
import './App.css';
import { appContext } from './Context.js';

import Navbar from "./components/navbar/Navbar.js"
import Home from "./components/home/Home.js";

function App() {
  const [page, setPage] = useState("home");
  const [UI, setUI] = useState(<Home key="home"/>);

  useEffect(() => {
    setUI(() => {
      switch (page) {
        case "home": return <Home key="home"/>
        default: return <Home key="home"/>
      }
    })
  }, [page])

  return (
    <appContext.Provider value={{page, setPage}}>
      <div className="App-container">
        <Navbar key="navbar"/>
        <div className="UI-container">
          {UI}
        </div>
      </div>
    </appContext.Provider>
  );
}

export default App;
