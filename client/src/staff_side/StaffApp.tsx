import React, { useEffect, useState, useContext, Dispatch, SetStateAction } from "react";
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
import { AccountType, FirebaseData, FirebaseDataTarget, Delegate, Notes as NotesT, Settings as SettingsT, oneArgFn } from "../common/types/types";
import { getHostAccountInfo } from "../common/utils/http";
import { Question } from "../common/types/questionTypes";
import { Directive } from "../common/types/directiveTypes";
import { BLANK_DELEGATIONS, BLANK_FORM, BLANK_NOTES, BLANK_PENDINGS, BLANK_PROCESSED, BLANK_SETTINGS, BLANK_STAFF_ACCOUNT_INFO } from "../common/constants";

export type StaffAccountInfo = {
  type: AccountType;
  expiration: string | null;
  email: string | null;
};

export type PageKey = "delegations" | "editor" | "inbox" | "history" | "statistics" | "notes" | "plan" | "settings"
const PAGES = {
  delegations: <Delegations/>,
  editor: <Editor/>,
  inbox: <Inbox/>,
  history: <History/>,
  statistics: <Statistics />,
  notes: <Notes/>,
  plan: <Plan/>,
  settings:<Settings/>
} as Record<PageKey, JSX.Element>

export type StaffAPI = {
  userID: string | null;
  page: PageKey,
  setPage: Dispatch<SetStateAction<PageKey>>;
  accountInfo: StaffAccountInfo;
  setAccountInfo: Dispatch<SetStateAction<StaffAccountInfo>>
}

function App() {
  const { database, user } = useContext(appContext);
  const userID = user?.uid || null;

  const [page, setPage] = useState<PageKey>("delegations");
  const [accountInfo, setAccountInfo] = useState<StaffAccountInfo>(BLANK_STAFF_ACCOUNT_INFO);
  const staffAPI: StaffAPI = {userID, page, setPage, accountInfo, setAccountInfo}

  const [delegations, setDelegations] = useState<Delegate[]>(BLANK_DELEGATIONS);
  const [form, setForm] = useState<Question[]>(BLANK_FORM);
  const [pendings, setPendings] = useState<Directive[]>(BLANK_PENDINGS);
  const [processed, setProcessed] = useState<Directive[]>(BLANK_PROCESSED);
  const [notes, setNotes] = useState<NotesT>(BLANK_NOTES);
  const [settings, setSettings] = useState<SettingsT>(BLANK_SETTINGS);
  const firebaseData: FirebaseData = {delegations, form, pendings, processed, notes, settings}

  useEffect(() => {
    if (userID) getHostAccountInfo(userID, setAccountInfo)
  }, [userID]);

  useEffect(() => {
    if (database) setUpFirebaseListeners(database, `appdata/${userID}/livedata`, [
      { target: FirebaseDataTarget.Delegations, onValue: setDelegations as oneArgFn },
      { target: FirebaseDataTarget.Form, onValue: setForm as oneArgFn },
      { target: FirebaseDataTarget.Pendings, onValue: setPendings as oneArgFn },
      { target: FirebaseDataTarget.Processed, onValue: setProcessed as oneArgFn },
      { target: FirebaseDataTarget.Notes, onValue: setNotes as oneArgFn },
      { target: FirebaseDataTarget.Settings, onValue: setSettings as oneArgFn },
    ]);
  }, [database])

  return (
    <staffContext.Provider
      value={{ staffAPI, firebaseData }}
    >
      <div className="App-container">
        <Sidebar />
        <div className="UI-container">
          {accountInfo.type !== "Premium" && (
            <Banner
              totalSubmissions={pendings.length + processed.length}
              page="staff"
            />
          )}
          <div className="page-container">{PAGES[page]}</div>
        </div>
      </div>
    </staffContext.Provider>
  );
}

export default App;
