import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CreateUser from './Components/CreateUser'
import Login from './Components/Login';
import CreateChecklist from './Components/CreateChecklist';
import Checklist from './Components/Checklist';

function App() {
  return (
    <Router>
      <div>
          <a href="/">Home </a>
          <a href="/login">Login </a>
          <a href="/create">Create a checklist</a>
      </div>
      <Switch>
        <Route path="/create">
          <CreateChecklist />
        </Route>
        <Route path="/login">
          <Login />  
        </Route>
        <Route path="/signup">
          <CreateUser />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
