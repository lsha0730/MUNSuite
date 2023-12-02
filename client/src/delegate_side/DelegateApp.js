import React, { useEffect, useState, useContext } from "react";
import { get, getDatabase, onValue, ref, set } from "firebase/database";
import axios from "axios";

import LoginPage from "./login_page/LoginPage.js";
import Dashboard from "./dashboard/Dashboard.js";
import InvalidLink from "./invalid_link/InvalidLink.js";
import "./DelegateApp.scoped.css";

import { appContext, delegateContext } from "../common/Context";

function App() {
  const [delegations, setDelegations] = useState([]);
  const [form, setForm] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [processed, setProcessed] = useState([]);
  const [settings, setSettings] = useState({});

  const userID = window.location.pathname.slice(6); // window.location.pathname is "/form/<uuid>"
  const [linkValidity, setValidLink] = useState("loading");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [appRender, setAppRender] = useState();
  const [accountInfo, setAccountInfo] = useState({
    type: "Error",
    expiration: "Error",
  });

  // Firebase Setup
  const { app } = useContext(appContext);
  const database = getDatabase(app);

  useEffect(() => {
    // Get user account info
    axios
      .post("https://munsuite-backend.onrender.com/account/info", {
        uid: userID,
      })
      .then((response) => {
        const result = response.data;
        setAccountInfo(result);
      });

    // Firebase: Reading
    onValue(ref(database, `appdata/${userID}/livedata/form`), (snapshot) => {
      // Check if the link is valid
      setValidLink(snapshot.exists() ? "valid" : "invalid");
    });

    onValue(
      ref(database, `appdata/${userID}/livedata/delegations`),
      (snapshot) => {
        let node = snapshot.val();
        if (!node) {
          setDelegations([]);
        } else {
          let tempArr = node;
          for (let i = 0; i < tempArr.length; i++) {
            if (!tempArr[i]) tempArr.splice(i, 1);
          }
          setDelegations(tempArr);
        }
      }
    );

    onValue(ref(database, `appdata/${userID}/livedata/form`), (snapshot) => {
      let node = snapshot.val();
      if (!node) {
        setForm([]);
      } else {
        let tempArr = node;
        for (let i = 0; i < tempArr.length; i++) {
          if (!tempArr[i]) tempArr.splice(i, 1);
        }
        for (let j = 0; j < tempArr.length; j++) {
          tempArr[j].id = j;
        }
        setForm(tempArr);
      }
    });

    onValue(
      ref(database, `appdata/${userID}/livedata/pendings`),
      (snapshot) => {
        let node = snapshot.val();
        if (!node) {
          setPendings([]);
        } else {
          let tempArr = node;
          for (let i = 0; i < tempArr.length; i++) {
            if (!tempArr[i]) tempArr.splice(i, 1);
          }
          setPendings(tempArr);
        }
      }
    );

    onValue(
      ref(database, `appdata/${userID}/livedata/processed`),
      (snapshot) => {
        let node = snapshot.val();
        if (!node) {
          setProcessed([]);
        } else {
          let tempArr = node;
          for (let i = 0; i < tempArr.length; i++) {
            if (!tempArr[i]) tempArr.splice(i, 1);
          }
          setProcessed(tempArr);
        }
      }
    );

    onValue(
      ref(database, `appdata/${userID}/livedata/settings`),
      (snapshot) => {
        let node = snapshot.val();
        if (!node) {
          setSettings({ conference: "MUNSuite", committee: "Committee" });
        } else {
          setSettings(node);
        }
      }
    );
  }, []);

  // Firebase: Writing
  function writeToFirebase(target, content) {
    if (["pendings"].includes(target) && linkValidity) {
      // Delegate side only writes to pendings
      if (content.length > 0) {
        set(ref(database, `appdata/${userID}/livedata/${target}`), content);
      }
    }
  }

  useEffect(() => {
    setLoggedIn(
      delegations
        .map((item) => item.code)
        .includes(sessionStorage.getItem("code"))
    );
    setUser(getDelFromCode(sessionStorage.getItem("code")));
  }, [delegations]);

  const screens = {
    loading: <div />,
    valid:
      loggedIn && delegateIsInDelegateList(user) ? (
        <Dashboard key="dashboard" submit={submit} />
      ) : (
        <LoginPage attemptLogin={attemptLogin} />
      ),
    invalid: <InvalidLink />,
  };

  return (
    <delegateContext.Provider
      value={{
        delegations,
        form,
        settings,
        user,
        setUser,
        setLoggedIn,
        processed,
        pendings,
        accountInfo,
      }}
    >
      <div className="App-container">{screens[linkValidity]}</div>
    </delegateContext.Provider>
  );

  function delegateIsInDelegateList(user) {
    return delegations.map((del) => del.name).includes(user);
  }

  function attemptLogin(input) {
    for (let i = 0; i < delegations.length; i++) {
      if (delegations[i].code == input) {
        setLoggedIn(true);
        setUser(delegations[i].name);
        sessionStorage.setItem("code", delegations[i].code);
        break;
      }
    }
  }

  function getDelFromCode(code) {
    for (let i = 0; i < delegations.length; i++) {
      if (delegations[i].code == code) {
        return delegations[i].name;
      }
    }
    return null;
  }

  function submit(submissionObj) {
    get(ref(database, `appdata/${userID}/livedata/pendings`)).then(
      (snapshot) => {
        let currPendings = snapshot.exists() ? snapshot.val() : [];
        writeToFirebase("pendings", currPendings.concat(submissionObj));
      }
    );
  }
}

export default App;
