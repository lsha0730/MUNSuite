import React, { useEffect, useState, useRef, useContext } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import './StaffApp.scoped.css';
import defaultFormData from "./components/editor/defaultFormData.js";

import Sidebar from './components/sidebar/Sidebar.js';
import Delegations from './components/delegations/Delegations.js';
import Editor from './components/editor/Editor.js';
import Inbox from './components/inbox/Inbox.js';
import History from './components/history/History.js';
import Statistics from './components/statistics/Statistics.js';
import Notes from './components/notes/Notes.js';
import Settings from './components/settings/Settings.js';

import { appContext } from './staffContext.js';
import { siteContext } from "../Context.js";

function App() {
  const [page, setPage] = useState("delegations");
  const [UI, setUI] = useState(<Delegations key="delegations"/>);

  const [delegations, setDelegations] = useState([]);
  const [form, setForm] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [processed, setProcessed] = useState([]);
  const [notes, setNotes] = useState({ individual: [], quick: "" });
  const [settings, setSettings] = useState({});

  // Firebase Setup
  const {app} = useContext(siteContext);
  const database = getDatabase(app);
  const auth = getAuth();
  const userID = auth.currentUser.uid;

  // Firebase: Reading
  useEffect(() => {
    onValue(ref(database, `appdata/${userID}/livedata/delegations`), (snapshot) => {
      let node = snapshot.val();
      // console.log(node)
      if (!node) {
        console.log("Node is null")
        setDelegations([]);
      } else {
        let tempArr = node;
        for (let i=0; i<tempArr.length; i++) {
          if (!tempArr[i]) tempArr.splice(i, 1);
        }
        console.log(tempArr)
        setDelegations(tempArr);
      }
    })

    onValue(ref(database, `appdata/${userID}/livedata/form`), (snapshot) => {
      let node = snapshot.val();
      if (!node) {
        setForm(defaultFormData);
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

    onValue(ref(database, `appdata/${userID}/livedata/pendings`), (snapshot) => {
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

    onValue(ref(database, `appdata/${userID}/livedata/processed`), (snapshot) => {
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

    onValue(ref(database, `appdata/${userID}/livedata/notes`), (snapshot) => {
      let node = snapshot.val();
      if (!node) {
        setNotes({
          individual: [],
          quick: ""
        });
      } else if (!node.individual) {
        setNotes({
          individual: [],
          quick: node.quick
        });
      } else if (!node.quick) {
        setNotes({
          individual: node.individual,
          quick: ""
        });
      } else {
        setNotes(node);
      }
    })

    onValue(ref(database, `appdata/${userID}/livedata/settings`), (snapshot) => {
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
    console.log(target)
    if (["delegations", "form", "pendings", "processed", "notes", "settings"].includes(target)) {
      set(ref(database, `appdata/${userID}/livedata/${target}`), content);
    }
  }

  // App UI
  useEffect(() => {
    setUI(() => {
      switch (page) {
        case "delegations": return <Delegations key="delegations"/>
        case "editor": return <Editor key="editor"/>
        case "inbox": return <Inbox key="inbox"/>
        case "history": return <History key="history"/>
        case "statistics": return <Statistics key="statistics"/>
        case "notes": return <Notes key="notes"/>
        case "settings": return <Settings key="settings"/>
        default: return <Delegations key="delegations"/>
      }
    })
  }, [page])

  return (
    <appContext.Provider value={{userID, page, setPage, writeToFirebase, delegations, form, pendings, processed, notes, settings}}>
      <div className="App-container">
        <Sidebar/>
        <div className="UI-container">
          {UI}
        </div>
      </div>
    </appContext.Provider>
  )
}

export default App;
