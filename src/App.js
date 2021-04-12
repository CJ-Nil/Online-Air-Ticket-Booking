import React,{useState,useEffect} from 'react';
import Home from './components/Home';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import NavBar from './components/Navbar'
import Explore from './components/explore';
import "../src/style/sbar.css"
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
//import { createBrowserHistory } from "history";
import {getSessionCookie,SessionContext} from './components/Session'
function App(props) {
  const [session, setSession] = useState(getSessionCookie());
  useEffect(
    () => {
      setSession(getSessionCookie());
    },
    []
  );
  return (
    <SessionContext.Provider value={session}>
        <Router >
            <NavBar  history={props.history}/>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/explore' component={Explore} />
                <Route exact path='/Login' component={Login} />
                <Route exact path='/AdminPanel' component={AdminPanel} />
            </Switch>
        </Router>
    </SessionContext.Provider>
  );
}

export default App;
