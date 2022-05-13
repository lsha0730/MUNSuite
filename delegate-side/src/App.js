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

  const [delegations, setDelegations] = useState([]);
  const [form, setForm] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [processed, setProcessed] = useState([]);
  const [settings, setSettings] = useState({});

  const pendingsMounted = useRef(false);

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
    onValue(ref(database, 'test/delegations'), (snapshot) => {
      let node = snapshot.val();
      if (!node) {
        setDelegations([]);
      } else {
        let tempArr = node;
        for (let i=0; i<tempArr.length; i++) {
          if (!tempArr[i]) tempArr.splice(i, 1);
        }
        setDelegations(tempArr);
      }
    })

    onValue(ref(database, 'test/form'), (snapshot) => {
      let node = snapshot.val();
      if (!node) {
        setForm([]);
      } else {
        let tempArr = node;
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
      let node = snapshot.val();
      console.log(node)
      if (!node) {
        setPendings([]);
      } else {
        let tempArr = node;
        for (let i=0; i<tempArr.length; i++) {
            if (!tempArr[i]) tempArr.splice(i, 1);
        }
        setPendings(tempArr);
      }
    })

    onValue(ref(database, 'test/processed'), (snapshot) => {
      let node = snapshot.val();
      if (!node) {
        setProcessed([]);
      } else {
        let tempArr = node;
        for (let i=0; i<tempArr.length; i++) {
            if (!tempArr[i]) tempArr.splice(i, 1);
        }
        setProcessed(tempArr);
      }
    })

    onValue(ref(database, 'test/settings'), (snapshot) => {
      let node = snapshot.val();
      if (!node) {
        setSettings({conference: "MUNSuite", committee: "Committee"});
      } else {
        setSettings(node);
      }
    })
  }, [])

  // Firebase: Writing
  useEffect(() => {
    if (pendingsMounted.current) {
      console.log("Wrote to pendings")
      set(ref(database, 'test/pendings'), pendings);
    } else {
      pendingsMounted.current = true;
    }
  }, [pendings])

  return (
    <appContext.Provider value={{delegations, form, settings, user, processed, pendings}}>
      <div className="App-container">
        {loggedIn? <Dashboard submit={submit}/>:<LoginPage attemptLogin={attemptLogin}/>}
      </div>
    </appContext.Provider>
  );

  function attemptLogin(input) {
    for (let i=0; i<delegations.length; i++) {
      if (delegations[i].code == input) {
        setLoggedIn(true);
        setUser(delegations[i].name);
        break;
      }
    }
  }

  function submit(submissionObj) {
    setPendings(pendings.concat(submissionObj));
  }
}

export default App;
