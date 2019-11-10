import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setAuthToken from './actions/utils/setAuthToken';
import { setAccountID, setAccountInfo, setAccountHandle, logoutAccount } from './actions/adminActions';
import { updateThemeLocalStorage, updateModeLocalStorage, updateLanguage } from './actions/applicationActions';

import store from './store';

import { IntlProvider, addLocaleData } from 'react-intl';
import messages from "./components/application/main/common/messages";
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import Director from './director';

  import './App.css';
  import Landing from './components/application/main/landing/index';

  import Register from './components/admin/register';
  import Login from './components/admin/login';
  import Forgot from './components/admin/forgot';

  import Verify from './components/admin/verify';
  import Reset from './components/admin/reset';
  import Update from './components/admin/update';

  import Security from './components/admin/security';

  import Vientos from './components/vientos/vientos';
  import ViewViento from './components/vientos/viewViento';

  import Dashboard from './components/staff/dashboard';
  import CreateContribution from './components/staff/createContribution';
  import ReadContribution from './components/staff/readContribution';
  import EditContribution from './components/staff/editContribution';

  import CreateProfile from './components/users/createProfile';
  import ReadProfile from './components/users/readProfile';
  import EditProfile from './components/users/editProfile';

  import ProfileAlerts from './components/users/profileAlerts';
  import ProfileHistory from './components/users/profileHistory';

addLocaleData(en); 
addLocaleData(es);

if (localStorage.theme) {
  store.dispatch(updateThemeLocalStorage(localStorage.theme));
}

if (localStorage.mode) {
  store.dispatch(updateModeLocalStorage(localStorage.mode));
}

if (localStorage.language) {
  store.dispatch(updateLanguage(localStorage.language));
} else {
  const lang = navigator.language.split('-')[0];
  store.dispatch(updateLanguage(lang));
}

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set account isAuthenticated
  store.dispatch(setAccountID(decoded.id));
  // // Set account user
  store.dispatch(setAccountInfo(decoded.id));
  // // Set account profile
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
        <Switch>
          <Director exact path="/" level={'public'} component={Landing} />



          <Director exact path="/register" level={'public'} component={Register} />
          <Director exact path="/registrar" level={'public'} component={Register} />

          <Director exact path="/login" level={'public'} component={Login} />
          <Director exact path="/iniciar" level={'public'} component={Login} />

          <Director exact path="/forgot" level={'public'} component={Forgot} />
          <Director exact path="/olvidó" level={'public'} component={Forgot} />

          <Director exact path="/verify/:key" level={'public'} component={Verify} />
          <Director exact path="/verificar/:key" level={'public'} component={Verify} />

          <Director exact path="/reset/:key" level={'public'} component={Reset} />
          <Director exact path="/reiniciar/:key" level={'public'} component={Reset} />

          <Director exact path="/update/:key" level={'public'} component={Update} />
          <Director exact path="/actualización/:key" level={'public'} component={Update} />



          <Director exact path="/security" level={'user'} component={Security} />
          <Director exact path="/seguridad" level={'user'} component={Security} />



          <Director exact path="/winds" level={'public'} template={'Map'} component={Vientos} />
          <Director exact path="/vientos" level={'public'} template={'Map'} component={Vientos} />

          <Director exact path="/winds/:id" level={'public'} component={ViewViento} />
          <Director exact path="/vientos/:id" level={'public'} component={ViewViento} />



          <Director exact path="/staff/dashboard" level={'staff'} component={Dashboard} />
          <Director exact path="/personal/tablero" level={'staff'} component={Dashboard} />
          
          <Director exact path="/staff/contribute" level={'staff'} component={CreateContribution} />
          <Director exact path="/personal/contribuir" level={'staff'} component={CreateContribution} />

          <Director exact path="/staff/contribution/view/:id" level={'staff'} component={ReadContribution} />
          <Director exact path="/personal/contribución/ver/:id" level={'staff'} component={ReadContribution} />

          <Director exact path="/staff/contribution/edit/:id" level={'staff'} component={EditContribution} />
          <Director exact path="/personal/contribución/editar/:id" level={'staff'} component={EditContribution} />



          <Director exact path="/profile/create" level={'user'} component={CreateProfile} />
          <Director exact path="/perfil/crear" level={'user'} component={CreateProfile} />

          <Director exact path="/community/:handle" level={'public'} component={ReadProfile} />
          <Director exact path="/communidad/:handle" level={'public'} component={ReadProfile} />
          
          <Director exact path="/profile/edit" level={'user'} component={EditProfile} />
          <Director exact path="/perfil/editar" level={'user'} component={EditProfile} />

          <Director exact path="/profile/alerts" level={'user'} component={ProfileAlerts} />
          <Director exact path="/perfil/alertas" level={'user'} component={ProfileAlerts} />

          <Director exact path="/profile/history" level={'user'} component={ProfileHistory} />
          <Director exact path="/perfil/historia" level={'user'} component={ProfileHistory} />

        </Switch>
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
