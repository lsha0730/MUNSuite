import React, { useEffect, useState, useRef, useContext } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import './StaffApp.scoped.css';

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

  const delegationsMounted = useRef(false);
  const formMounted = useRef(false);
  const pendingsMounted = useRef(false);
  const processedMounted = useRef(false);
  const notesMounted = useRef(false);
  const settingsMounted = useRef(false);

  // Firebase Setup
  const {app} = useContext(siteContext);
  const database = getDatabase(app);
  const auth = getAuth();
  const userID = auth.currentUser.uid;

  // Firebase: Reading
  useEffect(() => {
    onValue(ref(database, `appdata/${userID}/livedata/delegations`), (snapshot) => {
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

    onValue(ref(database, `appdata/${userID}/livedata/form`), (snapshot) => {
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
  useEffect(() => {
    if (delegationsMounted.current) {
      set(ref(database, `appdata/${userID}/livedata/delegations`), delegations);
    } else {
      delegationsMounted.current = true;
    }
  }, [delegations])

  useEffect(() => {
    if (formMounted.current) {
      set(ref(database, `appdata/${userID}/livedata/form`), form);
    } else {
      formMounted.current = true;
    }
  }, [form])

  useEffect(() => {
    if (pendingsMounted.current) {
      set(ref(database, `appdata/${userID}/livedata/pendings`), pendings);
    } else {
      pendingsMounted.current = true;
    }
  }, [pendings])

  useEffect(() => {
    if (processedMounted.current) {
      set(ref(database, `appdata/${userID}/livedata/processed`), processed);
    } else {
      processedMounted.current = true;
    }
  }, [processed])

  useEffect(() => {
    if (notesMounted.current) {
      set(ref(database, `appdata/${userID}/livedata/notes`), notes);
    } else {
      notesMounted.current = true;
    }
  }, [notes])

  useEffect(() => {
    if (settingsMounted.current) {
      set(ref(database, `appdata/${userID}/livedata/settings`), settings);
    } else {
      settingsMounted.current = true;
    }
  }, [settings])

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
    <appContext.Provider value={{userID, page, setPage, delegations, setDelegations, form, setForm, pendings, setPendings, processed, setProcessed, notes, setNotes, settings, setSettings}}>
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
