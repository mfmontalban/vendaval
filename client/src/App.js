import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, setUserProfile, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import UserRoute from './components/common/UserRoute';
import StaffRoute from './components/common/StaffRoute';

import Navigation from './components/layout/Navigation';

import Landing from './components/home/Landing';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Forgot from './components/auth/Forgot';

import Verify from './components/auth/Verify';
import Reset from './components/auth/Reset';
import Update from './components/auth/Update';

import Vientos from './components/main/Vientos';
import ViewViento from './components/main/ViewViento';
import Pensar from './components/main/Pensar';
import Educar from './components/main/Educar';
import Crear from './components/main/Crear';

import Dashboard from './components/staff/Dashboard';
import Contribute from './components/staff/Contribute';
import ViewContribution from './components/staff/ViewContribution';
import EditContribution from './components/staff/EditContribution';

import Profile from './components/profile/View';
import CreateProfile from './components/profile/Create';
import EditProfile from './components/profile/Edit';

import Seguridad from './components/seguridad/Main';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Set user profile
  store.dispatch(setUserProfile(decoded.id));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>

            <Switch>
              <Route exact path="/" component={Landing} />
              <Route component={Navigation} />
            </Switch>

            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgot" component={Forgot} />

            <Route exact path="/verify/:key" component={Verify} />
            <Route exact path="/reset/:key" component={Reset} />
            <Route exact path="/update/:key" component={Update} />

            <Route exact path="/vientos" component={Vientos} />
            <Route exact path="/vientos/:id" component={ViewViento} />
            <Route exact path="/pensar" component={Pensar} />
            <Route exact path="/educar" component={Educar} />
            <Route exact path="/crear" component={Crear} />

            <Switch>
              <StaffRoute exact path="/staff/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <StaffRoute exact path="/staff/contribute" component={Contribute} />
            </Switch>
            <Switch>
              <StaffRoute exact path="/staff/contribution/view/:id" component={ViewContribution} />
            </Switch>
            <Switch>
              <StaffRoute exact path="/staff/contribution/edit/:id" component={EditContribution} />
            </Switch>

            <Switch>
              <UserRoute exact path="/profile/create" component={CreateProfile} />
            </Switch>
            <Switch>
              <UserRoute exact path="/communidad/:handle" component={Profile} />
            </Switch>
            <Switch>
              <UserRoute exact path="/profile/edit" component={EditProfile} />
            </Switch>

            <Switch>
              <UserRoute exact path="/seguridad" component={Seguridad} />
            </Switch>

          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
