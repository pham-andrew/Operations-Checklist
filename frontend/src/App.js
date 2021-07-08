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
import Container from  '@material-ui/core/Container'
import { Paper, AppBar, Typography, Toolbar } from '@material-ui/core'


const isAuth = {
  isAuthenticated: false,
}

let loggedElement = <a id="login" href="/login">Login </a>
let loggedRoute =  <Route path="/login"><Login /></Route>

const setAuth=()=>{
  if(Cookies.get('username')){
    isAuth.isAuthenticated = true
    loggedElement = <a id="logout" href="/logout"><Typography variant="h8" color="inherit" >Logout</Typography> </a>
    loggedRoute =  <Route path="/logout"><Logout /></Route>
  } else {
    isAuth.isAuthenticated = false
    loggedElement = <a id="login" href="/login"><Typography variant="h8" color="inherit" >Login </Typography></a>
    loggedRoute =  <Route path="/login"><Login /></Route>
  }
}

setAuth()

function App() {
 
  return (
    <Container maxWidth="sm">
      <Paper variant="outlined" square>
        <Router>
          <AppBar position="sticky">
          <Toolbar variant="dense">
            <div>
                <a id="home" href="/"><Typography variant="h8" color="inherit" >Home</Typography> </a>
                {loggedElement}
                <a id="create" href="/create"><Typography variant="h8" color="inherit" >Create a checklist</Typography></a>
            </div>
            </Toolbar>
          </AppBar>
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
      </Paper>
    </Container>
  );
}

export default App;
