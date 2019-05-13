import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalFooter } from 'reactstrap';

import { readApplicationTitles, setLocale } from '../../../actions/applicationActions';
import { logoutAccount } from '../../../actions/adminActions'; 

import './header.css';
import './footer.css';

class HeaderMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      language: '',
      modal: false,
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

  toggle = (e) => {
      this.setState({
          modal: !this.state.modal
      });
  };

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
    let unite;
    let create;
    let experience;

    let home;
    let about;
    let mission;
    let contact;
    let donate;
    let settings;

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
      unite = 'unir'
      create = 'crear'
      experience = 'experienciar'

      home = 'casa'
      about = 'sobre'
      mission = 'mission'
      contact = 'contacta'
      donate = 'dona'
      settings = 'settings'

      winds = 'vientos'

      login = 'iniciar'
      register = 'registrar'
      forgot = 'olvidó'

      GravatarMessage = 'Connecta Gravatar a su cuenta para mostrar una imagen'
      alerts = 'alertas'
      contribute = 'contribuir'
      favorites = 'historia'
      security = 'seguridad'
      
      profile = 'perfil'
      community = 'communidad'
      createProf = 'crear'

      enterName = 'Entra su nombre'

    } else {
      language = 'en'
      
      all = 'all'
      think = 'think'
      unite = 'unite'
      create = 'create'
      experience = 'experience'

      home = 'home'
      about = 'about'
      mission = 'mission'
      contact = 'contact'
      donate = 'donate'
      settings = 'settings'

      winds = 'winds'

      login = 'login'
      register = 'register'
      forgot = 'forgot'

      GravatarMessage = 'Connect Gravatar to your account to display an image'
      alerts = 'alerts'
      contribute = 'contribute'
      favorites = 'history'
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
          <Link to={`/${profile}/${createProf}`} className="dropdown-item text-right text-info">
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
          <Link to={`/${community}/${admin.handle}`} className="dropdown-item text-right text-info">
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
        <Link to="/staff/dashboard" className="dropdown-item text-right text-info">
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
        <Link to={`/${alerts}`} className="dropdown-item text-right text-info">
          <span className="pr-2">
            <FormattedMessage
              id="navigation.alerts"
              defaultMessage="Alerts"
            />
          </span>
          <i className="fal fa-bell"></i>
        </Link>
        {/* <Link to={`/${contribute}`} className="dropdown-item text-right text-info">
          <span className="pr-2">
            <FormattedMessage
              id="navigation.contribute"
              defaultMessage="Contribute"
            />
          </span>
          <i className="fal fa-hand-holding"></i>
        </Link> */}
        <Link to={`/${favorites}`} className="dropdown-item text-right text-info">
          <span className="pr-2">
            <FormattedMessage
              id="navigation.favorites"
              defaultMessage="History"
            />
          </span>
          <i className="fal fa-history"></i>
        </Link>
        <Link to={`/${security}`} className="dropdown-item text-right text-info">
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
        <Link to={`/${alerts}`} className="dropdown-item text-right text-info">
          <span className="pr-2">
            <FormattedMessage
              id="navigation.alerts"
              defaultMessage="Alerts"
            />
          </span>
          <i className="fal fa-bell"></i>
        </Link>
        {/* <Link to={`/${contribute}`} className="dropdown-item text-right text-info">
          <span className="pr-2">
            <FormattedMessage
              id="navigation.contribute"
              defaultMessage="Contribute"
            />
          </span>
          <i className="fal fa-hand-holding"></i>
        </Link> */}
        <Link to={`/${favorites}`} className="dropdown-item text-right text-info">
          <span className="pr-2">
            <FormattedMessage
              id="navigation.favorites"
              defaultMessage="History"
            />
          </span>
          <i className="fal fa-history"></i>
        </Link>
        <Link to={`/${security}`} className="dropdown-item text-right text-info">
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
        <button type="button" id="profile" className="btn btn-outline-info text-white rounded profilePic" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
            className="dropdown-item text-right text-info"
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
          <Link to={`/${login}`} className="dropdown-item text-right text-info">
            <span className="pr-2">
              <FormattedMessage
                id="navigation.login"
                defaultMessage="Login"
              />
            </span>
            <i className="fal fa-sign-in"></i>
          </Link>
          <Link to={`/${register}`} className="dropdown-item text-right text-info">
            <span className="pr-2">
              <FormattedMessage
                id="navigation.register"
                defaultMessage="register"
              />
            </span>
            <i className="fal fa-user-plus"></i>
          </Link>
          <Link to={`/${forgot}`} className="dropdown-item text-right text-info">
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
      <div className="h-105px top-nav-margin">
        <Modal
        className="mt-5"
        isOpen={this.state.modal}
        toggle={this.toggle}
        >
        <div className="modal-header">
            <h5 className="modal-title text-center w-100">
                <FormattedMessage
                id="navigation.aboutHeader"
                defaultMessage="Our Story"
                />
            </h5>
        </div>
        <div className="modal-body">
            <p>Uniting the world against all odds..</p>
        </div>
        <ModalFooter
        className="justify-content-center"
        >
            <Button
            className="m-0"
            color="danger"
            onClick={this.toggle}
            >
            <i className="fas fa-heart mr-2"></i>
            <FormattedMessage
                id="navigation.aboutOptionsDonate"
                defaultMessage="Donate"
            />
            </Button>
        </ModalFooter>
        </Modal>

        <nav className="fixed-to-top navbar navbar-expand navbar-dark bg-info flex-row justify-content-between top-nav-height z-1035 tempcss">
          <div className="navbar-nav flex-row">
            <div className="input-group">
              <div className="top-nav-item input-group-prepend">
                <button type="button" className="btn bg-silvero btn-outline-info border-opaque top-nav-component-height search-padding"><i className="fal fa-search"></i></button>
              </div>
              <input
                type="text"
                value={this.state.search}
                onChange={this.updateSearch}
                className="top-nav-item bg-vientosBox form-control top-nav-component-height"
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
                <button onClick={(e) => this.updateLanguage('es')} className="dropdown-item text-right text-info" type="button">Espanol</button>
                <button onClick={(e) => this.updateLanguage('en')} className="dropdown-item text-right text-info" type="button">English</button>
              </div>
            </div>
          </div>
        </nav>

        <nav className="navbar navbar-expand navbar-dark fixed-top-2nd header-nav-shadow top-radius-rounded d-flex flex-row justify-content-between">
          <div className="item">
            <div className="btn-group dropdown">
              <button type="button" id="profile" className="btn btn-outline-info rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-bars"></i></button>
              <div className="dropdown-menu" aria-labelledby="profile">
                <Link to={`/`} className="dropdown-item text-info"><i className="fal fa-home mr-2"></i>
                  <span className="pr-2">
                    <FormattedMessage
                      id="navigation.home"
                      defaultMessage="Home"
                    />
                  </span>
                </Link>
                <div className="dropdown-divider"></div>
                <Link to={`/${about}`} className="dropdown-item text-info"><i className="fal fa-users mr-2"></i>
                  <span className="pr-2">
                    <FormattedMessage
                      id="navigation.about"
                      defaultMessage="Our Story"
                    />
                  </span>
                </Link>
                <Link to={`/${contact}`} className="dropdown-item text-info"><i className="fal fa-comments-alt mr-2"></i>
                  <span className="pr-2">
                    <FormattedMessage
                      id="navigation.contact"
                      defaultMessage="Contact"
                    />
                  </span>
                </Link>
                <Link to={`/${donate}`} className="dropdown-item text-info">
                <i className="fal fa-heart mr-2"></i>
                  <span className="pr-2">
                    <FormattedMessage
                      id="navigation.donate"
                      defaultMessage="Donate"
                    />
                  </span>
                </Link>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item text-info"  onClick={this.toggle}>
                  <i className="fal fa-cog mr-2"></i>
                  <span className="pr-2">
                    <FormattedMessage
                      id="navigation.settings"
                      defaultMessage="Settings"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="navbar-nav flex-row">
            <div className="btn-group dropdown">
              <Link className="btn btn-outline-info text-white rounded" to={`/${winds}`}><img alt="Vendaval favicon" className="vientos" src="/favicon.ico" /></Link>
              {/* <div className="dropdown-menu" aria-labelledby="profile">
                <Link to={`/${all}`} className="dropdown-item text-info">
                  <span className="pr-2">
                    <FormattedMessage
                      id="navigation.all"
                      defaultMessage="All"
                    />
                  </span>
                </Link>
                <div className="dropdown-divider"></div>
                <Link to={`/${think}`} className="dropdown-item text-info"><i className="fal fa-lightbulb mr-2"></i>
                  <span className="pr-2">
                    <FormattedMessage
                      id="navigation.think"
                      defaultMessage="Think"
                    />
                  </span>
                </Link>
                <Link to={`/${unite}`} className="dropdown-item text-info"><i className="fal fa-hands-helping mr-2"></i>
                  <span className="pr-2">
                    <FormattedMessage
                      id="navigation.unite"
                      defaultMessage="Unite"
                    />
                  </span>
                </Link>
                <Link to={`/${create}`} className="dropdown-item text-info"><i className="fal fa-pencil mr-2"></i>
                  <span className="pr-2">
                    <FormattedMessage
                      id="navigation.create"
                      defaultMessage="Create"
                    />
                  </span>
                </Link>
                <Link to={`/${experience}`} className="dropdown-item text-info"><i className="fal fa-compass mr-2"></i>
                  <span className="pr-2">
                    <FormattedMessage
                      id="navigation.experience"
                      defaultMessage="Experience"
                    />
                  </span>
                </Link>
              </div> */}
            </div>
          </div>

          <div className="navbar-nav flex-row">
            <div className="btn-group dropdown">
              {admin.isAuthenticated ? adminLinks : guestLinks}
            </div>
          </div>
        </nav>

      </div>
    );
  }
}

HeaderMap.propTypes = {
  readApplicationTitles: PropTypes.func.isRequired,
  logoutAccount: PropTypes.func.isRequired,
  setLocale: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
});

export default connect(mapStateToProps, { readApplicationTitles, setLocale, logoutAccount })(HeaderMap);
