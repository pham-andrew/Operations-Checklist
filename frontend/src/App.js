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
import { makeStyles } from '@material-ui/core';
import { flexbox } from '@material-ui/system';
import { createTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core';
import AssignRole from './Components/AssignRole'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Completed from './Components/Completed';

const isAuth = {
  isAuthenticated: false,
}

// let loggedElement = <a id="login" href="/login">Login </a>
let loggedElement =  <Tab label="Login" id="login" href="/login" />
let loggedRoute =  <Route path="/login"><Login /></Route>
let createElement = ''
let createRoute = <Route path="/create"><CreateChecklist /></Route>
let assignElement = ''
let assignRoute = <Route path="/assign"><AssignRole/></Route>
let completedElement = ''
let completedRoute = <Route path="/completed"><Completed/></Route>
let showName = ''

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 1000,
    display: 'inline-flex'
  },
  typo: {
    alignSelf: 'center'
  },
  tabs:{
    width: '10%',
    maxWidth: 50,
    color: '#FFFFFF'
  },

});


const theme = createTheme({
    palette: {
      primary: {
        main: '#35c1f1',
      },
      secondary: {
        main: '#e64a19',
      },
    }, 
});


function App() {
  const classes = useStyles();
  console.log(showName)
  const setAuth=()=>{
    if(Cookies.get('username')){
      isAuth.isAuthenticated = true
      //loggedElement = <a id="logout" href="/logout"><Typography variant="subtitle2" color="inherit" className={classes.typo}>Logout</Typography> </a>
      loggedElement = <Tab label="Logout" id="logout" href="/logout" className={classes.tabs}/>
      loggedRoute =  <Route path="/logout"><Logout /></Route>
      showName = <Typography>{`Signed in as ${Cookies.get('username')}`}</Typography> 

      createElement = <Tab label="Create a CheckList" id="create" href="/create" className={classes.tabs}/>
      assignElement = <Tab label="Assign" id="assign" href="/assign" className={classes.tabs}/>
      completedElement = <Tab label="Completed" id="completed" href="/completed" className={classes.tabs}/>
    } else {
      isAuth.isAuthenticated = false
      // loggedElement = <a id="login" href="/login"><Typography variant="subtitle2" color="inherit" className={classes.typo}>Login </Typography></a>
      loggedElement = <Tab label="Login" id="login" href="/login" className={classes.tabs}/>
      loggedRoute =  <Route path="/login"><Login /></Route>
    }
  }
  
  setAuth()
  return (
    <Container maxWidth="md">
      <Paper variant="outlined" square>
        <Router>
        <MuiThemeProvider theme = { theme }>
          <img src={process.env.PUBLIC_URL + "/design4.png"}  alt="a cool image"/>
          <AppBar position="sticky" style={{marginTop: -4}}>
          <Toolbar variant="dense">
            <div className={classes.root}>
                <Tabs >
                  <Tab className={classes.tabs} label="Home" id="home" href="/" className={classes.tabs}/>
                  {loggedElement}
                  {createElement}
                  {assignElement}
                  {completedElement}
                  {/* {showName} */}
                </Tabs>
            </div>
            </Toolbar>
          </AppBar>
          <Switch>
            <PrivateRoute exact path="/" isAuth={isAuth}>
              <View/>
            </PrivateRoute>
            {/* <PrivateRoute path="/create" isAuth={isAuth}>
              <CreateChecklist />
            </PrivateRoute> */}
            {loggedRoute}
            {createRoute}
            {assignRoute}
            {completedRoute}
            <Route path="/signup">
              <CreateUser />
            </Route>
            <Route exact path="/checklist/:id">
              <Checklist />
            </Route>
          </Switch>
          </MuiThemeProvider>
        </Router>
      </Paper>
    </Container>
  );
}

export default App;
