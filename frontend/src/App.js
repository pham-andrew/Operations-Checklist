import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CreateUser from './Components/CreateUser'
import Login from './Components/Login';
import Logout from './Components/Logout';
import CreateChecklist from './Components/CreateChecklist';
import Checklist from './Components/Checklist';
import View from './Components/View';
import Cookies from 'js-cookie'
import PrivateRoute from './Components/PrivateRoute'


const isAuth = {
  isAuthenticated: false,
}

let loggedElement = <a id="login" href="/login">Login </a>
let loggedRoute =  <Route path="/login"><Login /></Route>

const setAuth=()=>{
  if(Cookies.get('username')){
    isAuth.isAuthenticated = true
    loggedElement = <a id="logout" href="/logout">Logout </a>
    loggedRoute =  <Route path="/logout"><Logout /></Route>
  } else {
    isAuth.isAuthenticated = false
    loggedElement = <a id="login" href="/login">Login </a>
    loggedRoute =  <Route path="/login"><Login /></Route>
  }
}

setAuth()

function App() {
  return (
    <Router>
      <div>
          <a id="home" href="/">Home </a>
          {loggedElement}
          <a id="create" href="/create">Create a checklist</a>
      </div>
      <Switch>
        <PrivateRoute exact path="/" isAuth={isAuth}>
          <View/>
        </PrivateRoute>
        <PrivateRoute path="/create" isAuth={isAuth}>
          <CreateChecklist />
        </PrivateRoute>
        {loggedRoute}
        <Route path="/signup">
          <CreateUser />
        </Route>
        <Route exact path="/checklist/:id">
          <Checklist />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
