import './App.css';
import Delegations from './components/delegations/Delegations.js';
import Sidebar from './components/sidebar/Sidebar.js';

function App() {
  let Interface = <Delegations/>;

  return (
    <div className="App-container">
        <Sidebar/>
        {Interface}
    </div>
  )
}

export default App;
