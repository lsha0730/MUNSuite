import React, { useEffect, useState, useRef } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import LoginPage from "./components/loginpage/LoginPage.js";
import Dashboard from "./components/dashboard/Dashboard.js";
import './App.css';

import { appContext } from './Context.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();

  const [form, setForm] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [settings, setSettings] = useState({});

  const pendingsMounted = useRef(false);
  const settingsMounted = useRef(false);

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
  const database = getDatabase(app);
  const storage = getStorage();

  // Firebase: Reading
  useEffect(() => {
    onValue(ref(database, 'test/form'), (snapshot) => {
      if (!snapshot.val()) {
        setForm([]);
      } else {
        let tempArr = snapshot.val();
        for (let i=0; i<tempArr.length; i++) {
            if (!tempArr[i]) tempArr.splice(i, 1);
        }
        for (let j=0; j<tempArr.length; j++) {
            tempArr[j].id = j;
        }
        setForm(tempArr);
      }
    })

    onValue(ref(database, 'test/pendings'), (snapshot) => {
      if (!snapshot.val()) {
        setPendings([]);
      } else {
        let tempArr = snapshot.val();
        for (let i=0; i<tempArr.length; i++) {
            if (!tempArr[i]) tempArr.splice(i, 1);
        }
        setPendings(tempArr);
      }
    })

    onValue(ref(database, 'test/settings'), (snapshot) => {
      if (!snapshot.val()) {
        setSettings({conference: "MUNSuite", committee: "Committee"});
      } else {
        setSettings(snapshot.val());
      }
    })
  }, [])

  // Firebase: Writing
  useEffect(() => {
    if (pendingsMounted.current) {
      set(ref(database, 'test/pendings'), pendings);
    } else {
      pendingsMounted.current = true;
    }
  }, [pendings])

  return (
    <appContext.Provider value={{form, settings, user}}>
      <div className="App-container">
        {loggedIn? <Dashboard submit={submit} submissionID={pendings.length}/>:<LoginPage attemptLogin={attemptLogin}/>}
      </div>
    </appContext.Provider>
  );

  function attemptLogin(input) {
    if (input) {
      setLoggedIn(true);
      setUser(input); //!!!
    }
  }

  function submit(submissionObj) {
    setPendings(pendings.concat(submissionObj));
  }
}

export default App;
