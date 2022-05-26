import React, { useEffect, useState, useRef, useContext } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";

import LoginPage from "./components/loginpage/LoginPage.js";
import Dashboard from "./components/dashboard/Dashboard.js";
import InvalidLink from "./components/invalid-link/InvalidLink.js";
import './DelegateApp.scoped.css';

import { delContext } from './DelegateContext.js';
import { siteContext } from "../Context.js";

function App() {
  const userUID = window.location.pathname.slice(6); // window.location.pathname is "/form/<uuid>"
  const [validLink, setValidLink] = useState("loading");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();

  const [delegations, setDelegations] = useState([]);
  const [form, setForm] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [processed, setProcessed] = useState([]);
  const [settings, setSettings] = useState({});

  // Firebase Setup
  const {app} = useContext(siteContext);
  const pendingsMounted = useRef(false);
  const database = getDatabase(app);

  // Firebase: Reading
  useEffect(() => {
    onValue(ref(database, `appdata/${userUID}/livedata`), (snapshot) => {
      // Check if the link is valid
      setValidLink(snapshot.exists()? "valid":"invalid");
    })

    onValue(ref(database, `appdata/${userUID}/livedata/delegations`), (snapshot) => {
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

    onValue(ref(database, `appdata/${userUID}/livedata/form`), (snapshot) => {
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

    onValue(ref(database, `appdata/${userUID}/livedata/pendings`), (snapshot) => {
      let node = snapshot.val();
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

    onValue(ref(database, `appdata/${userUID}/livedata/processed`), (snapshot) => {
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

    onValue(ref(database, `appdata/${userUID}/livedata/settings`), (snapshot) => {
      let node = snapshot.val();
      if (!node) {
        setSettings({conference: "MUNSuite", committee: "Committee"});
      } else {
        setSettings(node);
      }
    })
  }, [])

  // Firebase: Writing
  function writeToFirebase(target, content) {
    if (["pendings"].includes(target) && validLink) { // Delegate side only writes to pendings
      if (content.length > 0) {
        set(ref(database, `appdata/${userUID}/livedata/${target}`), content);
      }
    }
  }

  return (
    <delContext.Provider value={{delegations, form, settings, user, processed, pendings}}>
        <div className="App-container">
          {getAppRender()}
        </div>
    </delContext.Provider>
  );

  function getAppRender() {
    switch(validLink) {
      case "loading":
        return <div></div>
      case "valid":
        if (loggedIn) {
          return <Dashboard submit={submit}/>
        } else {
          return <LoginPage attemptLogin={attemptLogin}/>
        }
      case "invalid":
        return <InvalidLink/>
    }
  }

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
    writeToFirebase("pendings", pendings.concat(submissionObj));
  }
}

export default App;
