import React, { useEffect } from "react";
import { Router, Switch, Route} from 'react-router-dom'
import { Provider } from 'react-redux';
import './App.css';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import {userIsAuthenticated, userIsNotAuthenticated} from './helpers/auth';
import { currentUser } from "./actions/loginActions";
import { fetchPatients } from "./actions/patientActions";
import Patient from './components/patients/Patients';
import Settings from './components/settings/Settings'
import store from './store';
import NavBar from './containers/NavBar';
import AddPatient from './components/patients/AddPatient';
import SinglePatient from './components/patients/EditPatient';
import history from './history'


function App(props) {
  const { currentUser, fetchPatients } = props
  useEffect(() => {
    currentUser()
  }, [currentUser]);

  useEffect(() => {
      fetchPatients()
    }, [fetchPatients]);
  return (
      <Router history={history}>
      <div className="App">
        <div className="container">
        <NavBar isAuthenticated={props.isAuthenticated}/>
          <Switch>
            <Route exact path="/" component={userIsAuthenticated(Dashboard)} />
            <Route exact path="/login" component={userIsNotAuthenticated(Login)} />
            <Route exact path="/patients" component={userIsAuthenticated(Patient)} />
            <Route exact path="/patient/add" component={userIsAuthenticated(AddPatient)} />
            <Route exact path="/patient/:id" component={userIsAuthenticated(SinglePatient)} />
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

const ConnectedApp =  connect(mapStateToProps, { currentUser, fetchPatients })(App);

export const Root = () =>
  <Provider store={store}><ConnectedApp/></Provider>
