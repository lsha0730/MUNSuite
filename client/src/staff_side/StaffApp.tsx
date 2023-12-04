import React, { useEffect, useState, useContext } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";
import axios from "axios";
import { getAuth } from "firebase/auth";
import "./StaffApp.scoped.css";

import Sidebar from "./sidebar/Sidebar.js";
import Delegations from "./delegations/Delegations.js";
import Editor from "./editor/Editor.js";
import Inbox from "./inbox/Inbox.js";
import History from "./history/History.js";
import Statistics from "./statistics/Statistics.js";
import Notes from "./notes/Notes.js";
import Plan from "./plan/Plan";
import Settings from "./settings/Settings.js";

import { appContext, staffContext } from "../common/Context";
import Banner from "./plan/banner/Banner";
import { setUpFirebaseListeners } from "../common/utils/firebase";
import { AccountType, AppDataTarget, oneArgFn } from "../common/types/types";
import { getHostAccountInfo } from "../common/utils/http";

export type StaffAccountInfo = {
  type: AccountType;
  expiration: "Error" | string;
};

function App() {
  const [page, setPage] = useState("delegations");
  const [UI, setUI] = useState(<Delegations key="delegations" />);

  const [delegations, setDelegations] = useState([]);
  const [form, setForm] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [processed, setProcessed] = useState([]);
  const [notes, setNotes] = useState({ individual: [], quick: "" });
  const [settings, setSettings] = useState({});
  const [accountInfo, setAccountInfo] = useState<StaffAccountInfo>({
    type: AccountType.Starter,
    expiration: "Error",
  });

  // Firebase Setup
  const { app } = useContext(appContext);
  const database = getDatabase(app);
  const auth = getAuth();
  const userID = auth.currentUser?.uid;

  useEffect(() => {
    if (userID) getHostAccountInfo(userID, setAccountInfo)

    setUpFirebaseListeners(database, `appdata/${userID}/livedata`, [
      { target: AppDataTarget.Delegations, onValue: setDelegations as oneArgFn },
      { target: AppDataTarget.Form, onValue: setForm as oneArgFn },
      { target: AppDataTarget.Pendings, onValue: setPendings as oneArgFn },
      { target: AppDataTarget.Processed, onValue: setProcessed as oneArgFn },
      { target: AppDataTarget.Notes, onValue: setNotes as oneArgFn },
      { target: AppDataTarget.Settings, onValue: setSettings as oneArgFn },
    ]);
  }, []);

  // Firebase: Writing
  function writeToFirebase(target: any, content: any) {
    if (
      [
        "delegations",
        "form",
        "pendings",
        "processed",
        "notes",
        "settings",
      ].includes(target)
    ) {
      set(ref(database, `appdata/${userID}/livedata/${target}`), content);
    }
  }

  // App UI
  useEffect(() => {
    setUI(() => {
      switch (page) {
        case "delegations":
          return <Delegations key="delegations" />;
        case "editor":
          return <Editor key="editor" />;
        case "inbox":
          return <Inbox key="inbox" />;
        case "history":
          return <History key="history" />;
        case "statistics":
          return <Statistics key="statistics" />;
        case "notes":
          return <Notes key="notes" />;
        case "plan":
          return <Plan key="plan" />;
        case "settings":
          return <Settings key="settings" />;
        default:
          return <Delegations key="delegations" />;
      }
    });
  }, [page]);

  return (
    <staffContext.Provider
      value={{
        userID,
        page,
        setPage,
        writeToFirebase,
        delegations,
        form,
        pendings,
        processed,
        notes,
        settings,
        accountInfo,
        setAccountInfo,
      }}
    >
      <div className="App-container">
        <Sidebar />
        <div className="UI-container">
          {accountInfo.type !== "Premium" && (
            <Banner
              totalSubmissions={pendings.length + processed.length}
              page={"staff"}
            />
          )}
          <div className="page-container">{UI}</div>
        </div>
      </div>
    </staffContext.Provider>
  );
}

export default App;
