import React, { useEffect, useState, useRef } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { isEmpty } from "@firebase/util";
import './App.css';

import Sidebar from './components/sidebar/Sidebar.js';
import Delegations from './components/delegations/Delegations.js';
import Editor from './components/editor/Editor.js';
import Inbox from './components/inbox/Inbox.js';
import History from './components/history/History.js';
import Statistics from './components/statistics/Statistics.js';
import Notes from './components/notes/Notes.js';
import Settings from './components/settings/Settings.js';

import { appContext } from './Context.js';

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
      if (!snapshot.val()) {
        setDelegations([]);
      } else {
        let tempArr = snapshot.val();
        for (let i=0; i<tempArr.length; i++) {
          if (!tempArr[i]) tempArr.splice(i, 1);
        }
        setDelegations(tempArr);
      }
    })

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

    onValue(ref(database, 'test/processed'), (snapshot) => {
      if (!snapshot.val()) {
        setProcessed([]);
      } else {
        let tempArr = snapshot.val();
        for (let i=0; i<tempArr.length; i++) {
            if (!tempArr[i]) tempArr.splice(i, 1);
        }
        setProcessed(tempArr);
      }
    })

    onValue(ref(database, 'test/notes'), (snapshot) => {
      if (!snapshot.val()) {
        setNotes({
          individual: [],
          quick: ""
        });
      } else if (!snapshot.val().individual) {
        setNotes({
          individual: [],
          quick: snapshot.val().quick
        });
      } else if (!snapshot.val().quick) {
        setNotes({
          individual: snapshot.val().individual,
          quick: ""
        });
      } else {
        setNotes(snapshot.val());
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
    if (delegationsMounted.current) {
      set(ref(database, 'test/delegations'), delegations);
    } else {
      delegationsMounted.current = true;
    }
  }, [delegations])

  useEffect(() => {
    if (formMounted.current) {
      set(ref(database, 'test/form'), form);
    } else {
      formMounted.current = true;
    }
  }, [form])

  useEffect(() => {
    if (pendingsMounted.current) {
      set(ref(database, 'test/pendings'), pendings);
    } else {
      pendingsMounted.current = true;
    }
  }, [pendings])

  useEffect(() => {
    if (processedMounted.current) {
      set(ref(database, 'test/processed'), processed);
    } else {
      processedMounted.current = true;
    }
  }, [processed])

  useEffect(() => {
    if (notesMounted.current) {
      set(ref(database, 'test/notes'), notes);
    } else {
      notesMounted.current = true;
    }
  }, [notes])

  useEffect(() => {
    if (settingsMounted.current) {
      set(ref(database, 'test/settings'), settings);
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
    <appContext.Provider value={{page, setPage, delegations, setDelegations, form, setForm, pendings, setPendings, processed, setProcessed, notes, setNotes, settings, setSettings}}>
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
