import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Provider } from 'react-redux';
import './App.css';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
      <div className="App">
        <div className="container">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </div>
      </Router>
     </Provider>
  );
}

export default App;
