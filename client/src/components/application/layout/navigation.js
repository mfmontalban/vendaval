import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { readApplicationTitles, setLocale } from '../../../actions/applicationActions';
import { FormattedMessage } from 'react-intl';
import { logoutAccount } from '../../../actions/adminActions'; 

import './header.css';
import './footer.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      language: ''
    };
  }

  componentDidMount() {
    this.props.readApplicationTitles();

    if (localStorage.language) {
      let language = localStorage.language;
      this.setState({
        language: language
      });
    }
    else {
      let language1 = (navigator.languages && navigator.languages[0]) || navigator.userLanguage;
      let language = language1.substring(0, 2);
      this.setState({
        language: language
      });
      this.props.setLocale(language);
    }
  }

  updateSearch = (e) => {
    this.setState({
      search: e.target.value.substr(0, 20)
    });
  }

  updateLanguage = (e) => {
    this.setState({
      language: e
    });
    this.props.setLocale(e);
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutAccount();
    this.props.history.push('/login');
  }

  render() {
    const titlesContainer = this.props.application.titles;
    const setLanguage = this.props.application.language;

    let searchResults;
    let searchContainer;

    let language;

    let all;
    let think;
    let educate;
    let create;
    let experience;

    let winds;

    let login;
    let register;
    let forgot;

    let GravatarMessage;
    let alerts;
    let contribute;
    let favorites;
    let security;

    let profile;
    let community;
    let createProf;

    let enterName;

    if (setLanguage === 'es') {
      language = 'es'

      all = 'todo'
      think = 'pensar'
      educate = 'educar'
      create = 'crear'
      experience = 'experienciar'

      winds = 'vientos'

      login = 'iniciar'
      register = 'registrar'
      forgot = 'olvidó'

      GravatarMessage = 'Connecta Gravatar a su cuenta para mostrar una imagen'
      alerts = 'alertas'
      contribute = 'contribuir'
      favorites = 'favoritos'
      security = 'seguridad'
      
      profile = 'perfil'
      community = 'communidad'
      createProf = 'crear'

      enterName = 'Entra su nombre'

    } else {
      language = 'en'
      
      all = 'all'
      think = 'think'
      educate = 'educate'
      create = 'create'
      experience = 'experience'

      winds = 'winds'

      login = 'login'
      register = 'register'
      forgot = 'forgot'

      GravatarMessage = 'Connect Gravatar to your account to display an image'
      alerts = 'alerts'
      contribute = 'contribute'
      favorites = 'favorites'
      security = 'security'

      profile = 'profile'
      community = 'community'
      createProf = 'create'

      enterName = 'Enter your name'
    }

    if (titlesContainer !== null && this.state.search !== '') {
      const titles = titlesContainer.filter(
        (object) => {
          return object.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
      );

      searchResults = titles.map((title) => {
        return <Link to={`/vientos/${title._id}`} className="result" key={title._id} >{title.title}</Link>
      });


      if (titlesContainer.length > 0) {
        searchContainer =
          <div className="resultsContainer">
            {searchResults}
          </div>
      } else {
        searchContainer =
          <div className="resultsContainer">
            <FormattedMessage
              id="navigation.searchResults"
              defaultMessage="No search results"
            />
          </div>
      }
    }

    const { admin } = this.props;

    let profileLink;

    if (admin.handle === null || '') {
      profileLink =
        <div>
          <Link to={`/${profile}/${createProf}`} className="dropdown-item text-right">
            <span className="pr-2">
              <FormattedMessage
                id="navigation.profile"
                defaultMessage="Profile"
              />
            </span>
            <i className="fal fa-id-badge"></i>
          </Link>
        </div>
    } else {
      profileLink =
        <div>
          <Link to={`/${community}/${admin.handle}`} className="dropdown-item text-right">
            <span className="pr-2">
              <FormattedMessage
                id="navigation.profile"
                defaultMessage="Profile"
              />
            </span>
            <i className="fal fa-id-badge"></i>
          </Link>
        </div>
    }

    const staffMenu = (
      <div>
        <Link to="/staff/dashboard" className="dropdown-item text-right">
          <span className="pr-2">
            <FormattedMessage
              id="navigation.staff"
              defaultMessage="Staff"
            />
          </span>
          <i className="fal fa-tachometer-alt"></i>
        </Link>
        <div className="dropdown-divider"></div>
        {profileLink}
        <Link to={`/${alerts}`} className="dropdown-item text-right">
          <span className="pr-2">
            <FormattedMessage
              id="navigation.alerts"
              defaultMessage="Alerts"
            />
          </span>
          <i className="fal fa-bell"></i>
        </Link>
        <Link to={`/${contribute}`} className="dropdown-item text-right">
          <span className="pr-2">
            <FormattedMessage
              id="navigation.contribute"
              defaultMessage="Contribute"
            />
          </span>
          <i className="fal fa-hand-holding"></i>
        </Link>
        <Link to={`/${favorites}`} className="dropdown-item text-right">
          <span className="pr-2">
            <FormattedMessage
              id="navigation.favorites"
              defaultMessage="Favorites"
            />
          </span>
          <i className="fal fa-heart"></i>
        </Link>
        <Link to={`/${security}`} className="dropdown-item text-right">
          <span className="pr-2">
            <FormattedMessage
              id="navigation.security"
              defaultMessage="Security"
            />
          </span>
          <i className="fal fa-wrench"></i>
        </Link>
      </div>
    )

    const userMenu = (
      <div>
        {profileLink}
        <div className="dropdown-divider"></div>
        <Link to={`/${alerts}`} className="dropdown-item text-right">
          <span className="pr-2">
            <FormattedMessage
              id="navigation.alerts"
              defaultMessage="Alerts"
            />
          </span>
          <i className="fal fa-bell"></i>
        </Link>
        <Link to={`/${contribute}`} className="dropdown-item text-right">
          <span className="pr-2">
            <FormattedMessage
              id="navigation.contribute"
              defaultMessage="Contribute"
            />
          </span>
          <i className="fal fa-hand-holding"></i>
        </Link>
        <Link to={`/${favorites}`} className="dropdown-item text-right">
          <span className="pr-2">
            <FormattedMessage
              id="navigation.favorites"
              defaultMessage="Favorites"
            />
          </span>
          <i className="fal fa-heart"></i>
        </Link>
        <Link to={`/${security}`} className="dropdown-item text-right">
          <span className="pr-2">
            <FormattedMessage
              id="navigation.security"
              defaultMessage="Security"
            />
          </span>
          <i className="fal fa-wrench"></i>
        </Link>
      </div>
    )

    const adminLinks = (
      <nav>
        <button type="button" id="profile" className="btn btn-outline-info text-white rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img
            className="rounded-circle"
            src={admin.avatar}
            alt="Account"
            style={{ width: '25px' }}
            title={`${GravatarMessage}`}
          />
        </button>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="profile">
          {admin.staff ? staffMenu : userMenu}
          <div className="dropdown-divider"></div>
          <Link
            to="/login"
            onClick={this.onLogoutClick.bind(this)}
            className="dropdown-item text-right"
          >
            <span className="pr-2">
              <FormattedMessage
                id="navigation.logout"
                defaultMessage="Logout"
              />
            </span>
            <i className="fal fa-sign-out-alt"></i>
          </Link>
        </div>
      </nav>
    );

    const guestLinks = (
      <div>
        <button type="button" id="profile" className="btn btn-outline-info text-white rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img alt="" /><i className="fal fa-user"></i></button>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="profile">
          <Link to={`/${login}`} className="dropdown-item text-right">
            <span className="pr-2">
              <FormattedMessage
                id="navigation.login"
                defaultMessage="Login"
              />
            </span>
            <i className="fal fa-sign-in"></i>
          </Link>
          <Link to={`/${register}`} className="dropdown-item text-right">
            <span className="pr-2">
              <FormattedMessage
                id="navigation.register"
                defaultMessage="register"
              />
            </span>
            <i className="fal fa-user-plus"></i>
          </Link>
          <Link to={`/${forgot}`} className="dropdown-item text-right">
            <span className="pr-2">
              <FormattedMessage
                id="navigation.forgot"
                defaultMessage="forgot"
              />
            </span>
            <i className="fal fa-question-square"></i>
          </Link>
        </div>
      </div>
    );

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-info fixed-top flex-row justify-content-between p-0 top-nav-height z-1035">
          <div className="navbar-nav flex-row">
            <div className="input-group ml-2">
              <div className="top-nav-item input-group-prepend">
                <button type="button" className="btn bg-transparent border-opaque nav-item nav-link top-nav-component-height search-padding"><i className="fal fa-search"></i></button>
              </div>
              <input
                type="text"
                value={this.state.search}
                onChange={this.updateSearch}
                className="top-nav-item form-control top-nav-component-height"
                aria-label="Text input with segmented dropdown button"
              >
              </input>
            </div>
          </div>
          {searchContainer}
          <div className="navbar-nav flex-row">
            <div className="btn-group dropdown">
              <button type="button" id="changeLanguage" className="btn dropdown-toggle bg-transparent nav-item nav-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {language}
              </button>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="changeLanguage">
                <button onClick={(e) => this.updateLanguage('es')} className="dropdown-item text-right" type="button">Espanol</button>
                <button onClick={(e) => this.updateLanguage('en')} className="dropdown-item text-right" type="button">English</button>
              </div>
            </div>
          </div>
        </nav>
        <nav className="navbar navbar-expand navbar-dark bg-info fixed-top-2nd">
        </nav>
        <nav className="navbar navbar-expand navbar-dark bg-silvero fixed-top-2nd header-nav-shadow top-radius-rounded d-none d-flex flex-row justify-content-between">
          <div className="item">
            <div className="btn-group dropdown">
              <button type="button" id="profile" className="btn btn-outline-info rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-bars"></i></button>
              <div className="dropdown-menu" aria-labelledby="profile">
                <Link to={`/${all}`} className="dropdown-item">
                  <span className="pr-2">
                    <FormattedMessage
                      id="navigation.all"
                      defaultMessage="All"
                    />
                  </span>
                </Link>
                <div className="dropdown-divider"></div>
                <Link to={`/${think}`} className="dropdown-item"><i className="fal fa-lightbulb mr-2"></i>
                  <span className="pr-2">
                    <FormattedMessage
                      id="navigation.think"
                      defaultMessage="Think"
                    />
                  </span>
                </Link>
                <Link to={`/${educate}`} className="dropdown-item"><i className="fal fa-hands-helping mr-2"></i>
                  <span className="pr-2">
                    <FormattedMessage
                      id="navigation.unite"
                      defaultMessage="Unite"
                    />
                  </span>
                </Link>
                <Link to={`/${create}`} className="dropdown-item"><i className="fal fa-pencil mr-2"></i>
                  <span className="pr-2">
                    <FormattedMessage
                      id="navigation.create"
                      defaultMessage="Create"
                    />
                  </span>
                </Link>
                <Link to={`/${experience}`} className="dropdown-item"><i className="fal fa-compass mr-2"></i>
                  <span className="pr-2">
                    <FormattedMessage
                      id="navigation.experience"
                      defaultMessage="Experience"
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="item">
            <Link to={`/${winds}`} className="bg-transparent"><img alt="Vendaval favicon" className="vientos" src="/favicon.ico" /></Link>
          </div>

          <div className="navbar-nav flex-row">
            <div className="btn-group dropdown">
              {admin.isAuthenticated ? adminLinks : guestLinks}
            </div>
          </div>
        </nav>
        <nav className="navbar navbar-expand navbar-dark bg-silvero fixed-top-2nd header-nav-shadow top-radius-rounded d-none d-xl-flex d-lg-flex d-md-flex flex-row flex-row justify-content-between">
          <Link className="navbar-brand mr-0 btn btn-outline-info text-white" to={`/${winds}`}>Vendaval</Link>
          <div className="navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link ml-3" to={`/${think}`}>
                  <FormattedMessage
                    id="navigation.think"
                    defaultMessage="Think"
                  />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ml-3" to={`/${educate}`}>
                  <FormattedMessage
                    id="navigation.educate"
                    defaultMessage="Educate"
                  />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ml-3" to={`/${create}`}>
                  <FormattedMessage
                    id="navigation.create"
                    defaultMessage="Create"
                  />
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar-nav flex-row">
            <div className="form-inline d-block ml-2">
              <div className="btn-group dropdown">
                {admin.isAuthenticated ? adminLinks : guestLinks}
              </div>
            </div>
          </div>
        </nav>

      </div>
    );
  }
}

Header.propTypes = {
  readApplicationTitles: PropTypes.func.isRequired,
  logoutAccount: PropTypes.func.isRequired,
  setLocale: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
});

export default connect(mapStateToProps, { readApplicationTitles, setLocale, logoutAccount })(Header);
