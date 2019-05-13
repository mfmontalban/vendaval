import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setAccountID, setAccountInfo, setAccountHandle, logoutAccount } from './actions/adminActions';

import { IntlProvider, addLocaleData } from 'react-intl';
import messages from "./components/application/common/messages";
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import store from './store';

import LayoutRoute from './components/application/layout/layoutroute';
import LayoutMapRoute from './components/application/layout/layoutmaproute';
import LayoutUserRoute from './components/application/layout/layoutuserroute';
import LayoutStaffRoute from './components/application/layout/layoutstaffroute';

import Landing from './components/application/landing/index';

import Register from './components/admin/register';
import Login from './components/admin/login';
import Forgot from './components/admin/forgot';

import Verify from './components/admin/verify';
import Reset from './components/admin/reset';

import Security from './components/admin/security';
import Update from './components/admin/update';

import Vientos from './components/vientos/vientos';
import ViewViento from './components/vientos/viewViento';

import Dashboard from './components/staff/dashboard';
import CreateContribution from './components/staff/createContribution';
import ReadContribution from './components/staff/readContribution';
import EditContribution from './components/staff/editContribution';

import CreateProfile from './components/users/createProfile';
import ReadProfile from './components/users/readProfile';
import EditProfile from './components/users/editProfile';

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
          <Switch>
            <LayoutRoute exact path="/" component={Landing} />



            <LayoutRoute exact path="/register" component={Register} />
            <LayoutRoute exact path="/registrar" component={Register} />

            <LayoutRoute exact path="/login" component={Login} />
            <LayoutRoute exact path="/iniciar" component={Login} />

            <LayoutRoute exact path="/forgot" component={Forgot} />
            <LayoutRoute exact path="/olvidó" component={Forgot} />

            <LayoutRoute exact path="/verify/:key" component={Verify} />
            <LayoutRoute exact path="/verificar/:key" component={Verify} />

            <LayoutRoute exact path="/reset/:key" component={Reset} />
            <LayoutRoute exact path="/reiniciar/:key" component={Reset} />

            <LayoutRoute exact path="/update/:key" component={Update} />
            <LayoutRoute exact path="/actualización/:key" component={Update} />



            <LayoutMapRoute exact path="/winds" component={Vientos} />
            <LayoutMapRoute exact path="/vientos" component={Vientos} />

            <LayoutMapRoute exact path="/winds/:id" component={ViewViento} />
            <LayoutMapRoute exact path="/vientos/:id" component={ViewViento} />



            <LayoutUserRoute exact path="/profile/create" component={CreateProfile} />
            <LayoutUserRoute exact path="/perfil/create" component={CreateProfile} />

            <LayoutUserRoute exact path="/community/:handle" component={ReadProfile} />
            <LayoutUserRoute exact path="/communidad/:handle" component={ReadProfile} />
            
            <LayoutUserRoute exact path="/profile/edit" component={EditProfile} />
            <LayoutUserRoute exact path="/perfil/edit" component={EditProfile} />

            <LayoutUserRoute exact path="/security" component={Security} />
            <LayoutUserRoute exact path="/seguridad" component={Security} />



            <LayoutStaffRoute exact path="/staff/dashboard" component={Dashboard} />
            <LayoutStaffRoute exact path="/personal/dashboard" component={Dashboard} />
            
            <LayoutStaffRoute exact path="/staff/contribute" component={CreateContribution} />
            <LayoutStaffRoute exact path="/personal/contribuir" component={CreateContribution} />

            <LayoutStaffRoute exact path="/staff/contribution/view/:id" component={ReadContribution} />
            <LayoutStaffRoute exact path="/personal/contribución/ver/:id" component={ReadContribution} />

            <LayoutStaffRoute exact path="/staff/contribution/edit/:id" component={EditContribution} />
            <LayoutStaffRoute exact path="/personal/contribución/editar/:id" component={EditContribution} />

          </Switch>

        </div>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application
});

export default connect(mapStateToProps, {})(App);
