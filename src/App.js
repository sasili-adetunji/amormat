import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Provider } from 'react-redux';
import './App.css';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import {userIsAuthenticated, userIsNotAuthenticated} from './helpers/auth';
import { currentUser } from "./actions/loginActions";

import store from './store';

function App(props) {
  useEffect(() => {
    const { currentUser } = props
    currentUser()
  }, [props]);

  return (
      <Router>
      <div className="App">
        <div className="container">
          <Switch>
            <Route exact path="/" component={userIsAuthenticated(Dashboard)} />
            <Route exact path="/login" component={userIsNotAuthenticated(Login)} />
          </Switch>
        </div>
      </div>
      </Router>
  );
}

App.propTypes = {
  currentUser: PropTypes.func.isRequired,
}

const ConnectedApp =  connect(null, { currentUser })(App);

export const Root = () =>
  <Provider store={store}><ConnectedApp/></Provider>
