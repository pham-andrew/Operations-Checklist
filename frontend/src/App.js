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
import purple from '@material-ui/core/colors/purple';
import { MuiThemeProvider } from '@material-ui/core';


const isAuth = {
  isAuthenticated: false,
}

let loggedElement = <a id="login" href="/login">Login </a>
let loggedRoute =  <Route path="/login"><Login /></Route>

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
    display: 'inline-flex'
  },
  typo: {
    alignSelf: 'center'
  }
});


const theme = createTheme({
    palette: {
      primary: {
        main: '#01579b',
      },
      secondary: {
        main: '#e64a19',
      },
    }, 
});


function App() {
  const classes = useStyles();
  
  const setAuth=()=>{
    if(Cookies.get('username')){
      isAuth.isAuthenticated = true
      loggedElement = <a id="logout" href="/logout"><Typography variant="subtitle2" color="inherit" className={classes.typo}>Logout</Typography> </a>
      loggedRoute =  <Route path="/logout"><Logout /></Route>
    } else {
      isAuth.isAuthenticated = false
      loggedElement = <a id="login" href="/login"><Typography variant="subtitle2" color="inherit" className={classes.typo}>Login </Typography></a>
      loggedRoute =  <Route path="/login"><Login /></Route>
    }
  }
  
  setAuth()
  return (
    <Container maxWidth="sm">
      <Paper variant="outlined" square>
        <Router>
        <MuiThemeProvider theme = { theme }>
          <AppBar position="sticky">
          <Toolbar variant="dense">
            <div className={classes.root}>
                <a id="home" href="/"><Typography variant="subtitle2" color="inherit" className={classes.typo}>Home</Typography> </a>
                {loggedElement}
                <a id="create" href="/create"><Typography variant="subtitle2" color="inherit" className={classes.typo}>Create a checklist</Typography></a>
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
          </MuiThemeProvider>
        </Router>
      </Paper>
    </Container>
  );
}

export default App;
