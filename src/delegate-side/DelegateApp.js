import React, { useEffect, useState, useContext } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";

import LoginPage from "./components/loginpage/LoginPage.js";
import Dashboard from "./components/dashboard/Dashboard.js";
import InvalidLink from "./components/invalid-link/InvalidLink.js";
import './DelegateApp.scoped.css';

import { delContext } from './DelegateContext.js';
import { siteContext } from "../Context.js";

function App() {
  const [delegations, setDelegations] = useState([]);
  const [form, setForm] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [processed, setProcessed] = useState([]);
  const [settings, setSettings] = useState({});

  const userUID = window.location.pathname.slice(6); // window.location.pathname is "/form/<uuid>"
  const [validLink, setValidLink] = useState("loading");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [appRender, setAppRender] = useState();

  // Firebase Setup
  const {app} = useContext(siteContext);
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

  useEffect(() => {
    setLoggedIn(delegations.map(item => item.code).includes(sessionStorage.getItem("code")))
    setUser(getDelFromCode(sessionStorage.getItem("code")))
  }, [delegations])

  useEffect(() => {
    switch(validLink) {
      case "loading":
        setAppRender(<div></div>)
        break;
      case "valid":
        if (loggedIn && delegations.map(del => del.name).includes(user)) {
          setAppRender(<Dashboard submit={submit}/>)
        } else {
          setAppRender(<LoginPage attemptLogin={attemptLogin}/>)
        }
        break;
      case "invalid":
        setAppRender(<InvalidLink/>)
        break;
    }
  }, [validLink, delegations, loggedIn])

  return (
    <delContext.Provider value={{delegations, form, settings, user, setUser, setLoggedIn, processed, pendings}}>
        <div className="App-container">
          {appRender}
        </div>
    </delContext.Provider>
  );

  function attemptLogin(input) {
    for (let i=0; i<delegations.length; i++) {
      if (delegations[i].code == input) {
        setLoggedIn(true);
        setUser(delegations[i].name);
        sessionStorage.setItem("code", delegations[i].code)
        break;
      }
    }
  }

  function getDelFromCode(code) {
    for (let i=0; i<delegations.length; i++) {
      if (delegations[i].code == code) {
        return delegations[i].name;
      }
    }
    return null;
  }

  function submit(submissionObj) {
    writeToFirebase("pendings", pendings.concat(submissionObj));
  }
}

export default App;
