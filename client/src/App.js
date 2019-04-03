import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setAccountID, setAccountInfo, setAccountHandle, logoutAccount } from './actions/adminActions';

import { IntlProvider, addLocaleData } from 'react-intl';
import messages from "./components/application/common/messages"
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import store from './store';

import UserRoute from './components/application/common/userRoute';
import StaffRoute from './components/application/common/staffRoute';

import Landing from './components/application/landing/index';
import Navigation from './components/application/layout/navigation';

import Register from './components/admin/register';
import Login from './components/admin/login';
import Forgot from './components/admin/forgot';

import Verify from './components/admin/verify';
import Reset from './components/admin/reset';

import Vientos from './components/vientos/vientos';
import ViewViento from './components/vientos/viewViento';
import Pensar from './components/vientos/pensar';
import Educar from './components/vientos/educar';
import Crear from './components/vientos/crear';

import Dashboard from './components/staff/dashboard';
import CreateContribution from './components/staff/createContribution';
import ReadContribution from './components/staff/readContribution';
import EditContribution from './components/staff/editContribution';

import CreateProfile from './components/users/createProfile';
import ReadProfile from './components/users/readProfile';
import EditProfile from './components/users/editProfile';

import Security from './components/admin/security';
import Update from './components/admin/update';

import './App.css';

addLocaleData(en);
addLocaleData(es);

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set account isAuthenticated
  store.dispatch(setAccountID(decoded));
  // Set account user
  store.dispatch(setAccountInfo(decoded.id));
  // Set account profile
  store.dispatch(setAccountHandle(decoded.id));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutAccount());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {

  render() {
    const { language } = this.props.application;

    return (
      <IntlProvider locale={language} messages={messages[language]}>
        <div>

          <Route component={Navigation} />
          <Route exact path="/" component={Landing} />

          <Route exact path="/register" component={Register} />
          <Route exact path="/registrar" component={Register} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/iniciar" component={Login} />

          <Route exact path="/forgot" component={Forgot} />
          <Route exact path="/olvidó" component={Forgot} />

          <Route exact path="/verify/:key" component={Verify} />
          <Route exact path="/verificar/:key" component={Verify} />

          <Route exact path="/reset/:key" component={Reset} />
          <Route exact path="/reiniciar/:key" component={Reset} />

          <Route exact path="/update/:key" component={Update} />
          <Route exact path="/actualización/:key" component={Update} />

          <Route exact path="/winds" component={Vientos} />
          <Route exact path="/vientos" component={Vientos} />

          <Route exact path="/winds/:id" component={ViewViento} />
          <Route exact path="/vientos/:id" component={ViewViento} />

          <Route exact path="/pensar" component={Pensar} />
          <Route exact path="/think" component={Pensar} />

          <Route exact path="/educar" component={Educar} />
          <Route exact path="/educate" component={Educar} />

          <Route exact path="/crear" component={Crear} />
          <Route exact path="/create" component={Crear} />

          <Switch>
            <StaffRoute exact path="/staff/dashboard" component={Dashboard} />
            <StaffRoute exact path="/personal/dashboard" component={Dashboard} />
          </Switch>
          <Switch>
            <StaffRoute exact path="/staff/contribute" component={CreateContribution} />
            <StaffRoute exact path="/personal/contribuir" component={CreateContribution} />
          </Switch>
          <Switch>
            <StaffRoute exact path="/staff/contribution/view/:id" component={ReadContribution} />
            <StaffRoute exact path="/personal/contribución/ver/:id" component={ReadContribution} />
          </Switch>
          <Switch>
            <StaffRoute exact path="/staff/contribution/edit/:id" component={EditContribution} />
            <StaffRoute exact path="/personal/contribución/editar/:id" component={ReadContribution} />
          </Switch>

          <Switch>
            <UserRoute exact path="/profile/create" component={CreateProfile} />
            <UserRoute exact path="/perfil/create" component={CreateProfile} />
          </Switch>
          <Switch>
            <UserRoute exact path="/community/:handle" component={ReadProfile} />
            <UserRoute exact path="/communidad/:handle" component={ReadProfile} />
          </Switch>
          <Switch>
            <UserRoute exact path="/profile/edit" component={EditProfile} />
            <UserRoute exact path="/perfil/edit" component={EditProfile} />
          </Switch>

          <Switch>
            <UserRoute exact path="/security" component={Security} />
            <UserRoute exact path="/seguridad" component={Security} />
          </Switch>

        </div>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  application: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  application: state.application
});

export default connect(mapStateToProps, {})(App);
