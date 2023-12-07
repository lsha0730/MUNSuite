import { useEffect, useState, useContext } from "react";
import { get, getDatabase, onValue, ref, set } from "firebase/database";
import "./DelegateApp.scoped.css";
import {
  AccountType,
  FirebaseDataTarget,
  oneArgFn,
} from "../common/types/types";

import LoginPage from "./login_page/LoginPage";
import Dashboard from "./dashboard/Dashboard";
import InvalidLink from "./invalid_link/InvalidLink";

import { appContext, delegateContext } from "../common/Context";
import { getHostAccountInfo } from "../common/utils/http";
import { setUpFirebaseListeners } from "../common/utils/firebase";
import { useLocation } from "react-router-dom";

function App() {
  const [delegations, setDelegations] = useState<any>([]);
  const [form, setForm] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [processed, setProcessed] = useState([]);
  const [settings, setSettings] = useState({});

  const { pathname } = useLocation();
  const hostID = pathname.slice(6); // pathname is "/form/<uuid>"
  const [linkValidity, setValidLink] = useState("loading");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [accountInfo, setAccountInfo] = useState({
    type: AccountType.Premium,
  });

  // Firebase Setup
  const { database } = useContext(appContext);

  useEffect(() => {
    if (!hostID) return;
    getHostAccountInfo(hostID, setAccountInfo);
  }, [hostID]);

  useEffect(() => {
    if (!database) return;

    onValue(ref(database, `appdata/${hostID}/livedata/form`), (snapshot) => {
      setValidLink(snapshot.exists() ? "valid" : "invalid");
    });

    setUpFirebaseListeners(database, `appdata/${hostID}/livedata`, [
      {
        target: FirebaseDataTarget.Delegations,
        onValue: setDelegations as oneArgFn,
      },
      { target: FirebaseDataTarget.Form, onValue: setForm as oneArgFn },
      { target: FirebaseDataTarget.Pendings, onValue: setPendings as oneArgFn },
      {
        target: FirebaseDataTarget.Processed,
        onValue: setProcessed as oneArgFn,
      },
      { target: FirebaseDataTarget.Settings, onValue: setSettings as oneArgFn },
    ]);
  }, [database]);

  // Firebase: Writing
  function writeToFirebase(target: any, content: any) {
    if (database && ["pendings"].includes(target) && linkValidity) {
      // Delegate side only writes to pendings
      if (content.length > 0) {
        set(ref(database, `appdata/${hostID}/livedata/${target}`), content);
      }
    }
  }

  useEffect(() => {
    setLoggedIn(
      delegations
        .map((item: any) => item.code)
        .includes(sessionStorage.getItem("code"))
    );
    setUser(getDelFromCode(sessionStorage.getItem("code") as any));
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
      <div className="App-container">{(screens as any)[linkValidity]}</div>
    </delegateContext.Provider>
  );

  function delegateIsInDelegateList(user: any) {
    return delegations.map((del: any) => del.name).includes(user);
  }

  function attemptLogin(input: any) {
    for (let i = 0; i < delegations.length; i++) {
      if (delegations[i].code == input) {
        setLoggedIn(true);
        setUser(delegations[i].name);
        sessionStorage.setItem("code", delegations[i].code);
        break;
      }
    }
  }

  function getDelFromCode(code: string) {
    for (let i = 0; i < delegations.length; i++) {
      if (delegations[i].code == code) {
        return delegations[i].name;
      }
    }
    return null;
  }

  function submit(submissionObj: any) {
    if (!database) return;
    get(ref(database, `appdata/${hostID}/livedata/pendings`)).then(
      (snapshot) => {
        let currPendings = snapshot.exists() ? snapshot.val() : [];
        writeToFirebase("pendings", currPendings.concat(submissionObj));
      }
    );
  }
}

export default App;
