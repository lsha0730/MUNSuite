import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
  const [notes, setNotes] = useState({});
  const [settings, setSettings] = useState({});

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

  // Firebase: Reading
  useEffect(() => {
    onValue(ref(database, 'test/delegations'), (snapshot) => {
      if (snapshot.val() == null) {
          setDelegations([]);
      } else {
          let tempArr = snapshot.val();
          for (let i=0; i<tempArr.length; i++) {
              if (Object.keys(tempArr[i]).length === 0) tempArr.splice(i, 1);
          }
          setDelegations(tempArr);
      }
    })

    onValue(ref(database, 'test/form'), (snapshot) => {
      if (snapshot.val() == null) {
          setForm([]);
      } else {
          let tempArr = snapshot.val();
          for (let i=0; i<tempArr.length; i++) {
              if (Object.keys(tempArr[i]).length === 0) tempArr.splice(i, 1);
          }
          for (let j=0; j<tempArr.length; j++) {
              tempArr[j].id = j;
          }
          setForm(tempArr);
      }
    })

    onValue(ref(database, 'test/pendings'), (snapshot) => {
      if (snapshot.val() == null) {
          setPendings([]);
      } else {
          let tempArr = snapshot.val();
          for (let i=0; i<tempArr.length; i++) {
              if (Object.keys(tempArr[i]).length === 0) tempArr.splice(i, 1);
          }
          setPendings(tempArr);
      }
    })

    onValue(ref(database, 'test/processed'), (snapshot) => {
      if (snapshot.val() == null) {
          setProcessed([]);
      } else {
          let tempArr = snapshot.val();
          for (let i=0; i<tempArr.length; i++) {
              if (Object.keys(tempArr[i]).length === 0) tempArr.splice(i, 1);
          }
          setProcessed(tempArr);
      }
    })

    onValue(ref(database, 'test/notes'), (snapshot) => {
      if (snapshot.val() == null || Object.keys(snapshot.val()).length === 0) {
        setNotes({
          individual: [],
          quick: ""
        });
      } else if (snapshot.val().individual == null) {
        setNotes({
          individual: [],
          quick: snapshot.val().quick
        });
      } else if (snapshot.val().quick == null) {
        setNotes({
          individual: [],
          quick: snapshot.val().quick
        });
      } else {
        setNotes(snapshot.val());
      }
    })

    onValue(ref(database, 'test/settings'), (snapshot) => {
      if (snapshot.val() == null || Object.keys(snapshot.val()).length === 0) {
          setSettings({conference: "MUNSuite", committee: "Committee"});
      } else {
          setSettings(snapshot.val());
      }
    })
  }, [])

  // Firebase: Writing
  useEffect(() => {
    set(ref(database, 'test/delegations'), delegations);
  }, [delegations])

  useEffect(() => {
    set(ref(database, 'test/form'), form);
  }, [form])

  useEffect(() => {
    set(ref(database, 'test/pendings'), pendings);
  }, [pendings])

  useEffect(() => {
    set(ref(database, 'test/processed'), processed);
  }, [processed])

  useEffect(() => {
    set(ref(database, 'test/notes'), notes);
  }, [notes])

  useEffect(() => {
    set(ref(database, 'test/settings'), settings);
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
