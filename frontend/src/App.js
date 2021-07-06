import './App.css';
import CreateUser from './Components/CreateUser'
import Login from './Components/Login';
import CreateChecklist from './Components/CreateChecklist';

function App() {
  return (
    <div className="App">
      <CreateUser />
      <Login />
      <CreateChecklist />
    </div>
  );
}

export default App;
