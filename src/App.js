import React, { useEffect, useState } from "react";
import './App.css';

import Sidebar from './components/sidebar/Sidebar.js';
import Delegations from './components/delegations/Delegations.js';
import Editor from './components/editor/Editor.js';
import Inbox from './components/inbox/Inbox.js';
import History from './components/history/History.js';

import { appContext } from './Context.js';

function App() {
  const [page, setPage] = useState("delegations");
  const [UI, setUI] = useState(<Delegations/>);

  useEffect(() => {
    setUI(() => {
      switch (page) {
        case "delegations": return <Delegations/>
        case "editor": return <Editor/>
        case "inbox": return <Inbox/>
        case "history": return <History/>
        case "statistics": return <h1>Statistics</h1>
        case "notes": return <h1>Notes</h1>
        case "settings": return <h1>Settings</h1>
        default: return <Delegations/>
      }
    })
  }, [page])

  return (
    <appContext.Provider value={{page, setPage}}>
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
