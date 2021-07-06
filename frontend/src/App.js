import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CreateUser from './Components/CreateUser'
import Login from './Components/Login';

import Checklist from './Components/Checklist';

function App() {
  return (
    <Router>
      <div>
          <a href="/">Home </a>
          <a href="/login">Login </a>
      </div>
      <Switch>
        {/* <Route path="/">
          <Checklist />
        </Route> */}
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
