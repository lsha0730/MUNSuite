import React, { useEffect, useState } from "react";
import './App.css';
import Delegations from './components/delegations/Delegations.js';
import Sidebar from './components/sidebar/Sidebar.js';
import { appContext } from './Context.js';

function App() {
  const [page, setPage] = useState("delegations");
  const [UI, setUI] = useState(<Delegations/>);

  useEffect(() => {
    setUI(() => {
      switch (page) {
        case "delegations": return <Delegations/>
        case "editor": return <h1>Editor</h1>
        case "inbox": return <h1>Inbox</h1>
        case "history": return <h1>History</h1>
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
        {UI}
      </div>
    </appContext.Provider>
  )
}

export default App;
