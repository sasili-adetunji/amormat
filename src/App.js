import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Provider } from 'react-redux';
import './App.css';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import {userIsAuthenticated, userIsNotAuthenticated} from './helpers/auth';
import { Auth } from "aws-amplify";

import store from './store';

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    const user = await Auth.currentSession();
    setCurrentUser(user);
  }
  return (
    <Provider store={store}>
      <Router>
      <div className="App">
        <div className="container">
          <Switch>
            <Route exact path="/login" component={userIsNotAuthenticated(Login)} currentUser={currentUser} />
            <Route exact path="/" component={userIsAuthenticated(Dashboard)} currentUser={currentUser} />
          </Switch>
        </div>
      </div>
      </Router>
     </Provider>
  );
}

export default App;
