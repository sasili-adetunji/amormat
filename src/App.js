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
import Patient from './components/patients/Patient';
import Settings from './components/settings/Settings'
import store from './store';
import NavBar from './containers/NavBar';

function App(props) {
  useEffect(() => {
    const { currentUser } = props
    currentUser()
  }, [props]);

  return (
      <Router>
      <div className="App">
        <div className="container">
        <NavBar isAuthenticated={props.isAuthenticated}/>
          <Switch>
            <Route exact path="/" component={userIsAuthenticated(Dashboard)} />
            <Route exact path="/login" component={userIsNotAuthenticated(Login)} />
            <Route exact path="/patients" component={userIsAuthenticated(Patient)} />
            <Route exact path="/patients/add" component={userIsAuthenticated(Patient)} />
            <Route exact path="/settings" component={userIsAuthenticated(Settings)} />
          </Switch>
        </div>
      </div>
      </Router>
  );
}

App.propTypes = {
  currentUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.login.isAuthenticated
});

const ConnectedApp =  connect(mapStateToProps, { currentUser })(App);

export const Root = () =>
  <Provider store={store}><ConnectedApp/></Provider>
