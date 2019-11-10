import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';

import { logoutAccount } from '../../../../../actions/adminActions';

import Button from '../../common/styled/button'
import Div from '../../common/styled/div'
import Dropdown from '../../common/styled/dropdown'

class UserMenu extends Component {
  constructor(props){
    super(props)
    this.state = {
      outsideClicked: false,
      listOpen: false,
    }
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  
  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        listOpen: false
      });
      setTimeout(() => {
        this.setState({ outsideClicked: false });
      }, 250);
    }
  }

  toggleList(){
    if (this.state.outsideClicked === false) {
      this.setState(prevState => ({
        listOpen: !prevState.listOpen,
        outsideClicked: true,
      }))
    }
  }

  toggleListLink(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen,
      outsideClicked: false,
    }))
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutAccount(this.props.history);
  }

  render(){
    const { listOpen } = this.state
    const { admin, application } = this.props;
    const { language, settings } = this.props.application;

    let login;
    let register;
    let forgot;

    let alerts;
    let favorites;
    let security;

    let staff;
    let dashboard;
    let profile;
    let community;
    let createProf;

    if (language === 'es') {

      login = 'iniciar'
      register = 'registrar'
      forgot = 'olvidó'

      alerts = 'alertas'
      favorites = 'historia'
      security = 'seguridad'
      
      staff = 'personal'
      dashboard = 'tablero'
      profile = 'perfil'
      community = 'communidad'
      createProf = 'crear'

    } else {
      login = 'login'
      register = 'register'
      forgot = 'forgot'

      alerts = 'alerts'
      favorites = 'history'
      security = 'security'

      staff = 'staff'
      dashboard = 'dashboard'
      profile = 'profile'
      community = 'community'
      createProf = 'create'
    }

    let profileLink;
    let profileLinks;
    let securityLink;
    let avatarImage;

    profileLinks = (
      <div>
        <Link to={`/${profile}/${alerts}`} onClick={() => this.toggleListLink()}>
          <Div className="p-10px text-right" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`}>        
            <FormattedMessage
              id="navigation.alerts"
              defaultMessage="Alerts"
            />
            <i className="fal fa-bell ml-5px"></i>
          </Div>
        </Link>
        <Link to={`/${profile}/${favorites}`} onClick={() => this.toggleListLink()}>
          <Div className="p-10px text-right" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`}>        
            <FormattedMessage
              id="navigation.favorites"
              defaultMessage="History"
            />
            <i className="fal fa-history ml-5px"></i>
          </Div>
        </Link>
      </div>
    );

    securityLink = (
      <Link to={`/${security}`} onClick={() => this.toggleListLink()}>
        <Div className="p-10px text-right" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`}>        
          <FormattedMessage
            id="navigation.security"
            defaultMessage="Security"
          />
          <i className="fal fa-wrench ml-5px"></i>
        </Div>
      </Link>
    );

    if (admin.handle === null || '') {
      if (admin.staff === null || '') {
        profileLink =
        <Link to={`/${profile}/${createProf}`} onClick={() => this.toggleListLink()} className={(admin.staff === "" ? "top-border-radius " :  "") + "text-right"}>
          <Div className="p-10px text-right top-border-radius" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`}>
            <FormattedMessage
              id="navigation.profile"
              defaultMessage="Profile"
            />
            <i className="fal fa-id-badge ml-5px"></i>
          </Div>
        </Link>

      } else {
        profileLink =
        <Link to={`/${profile}/${createProf}`} onClick={() => this.toggleListLink()} className={(admin.staff === "" ? "top-border-radius " :  "") + "text-right"}>
          <Div className="p-10px text-right" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`}>
            <FormattedMessage
              id="navigation.profile"
              defaultMessage="Profile"
            />
            <i className="fal fa-id-badge ml-5px"></i>
          </Div>
        </Link>
      }
    } else {
      if (admin.staff === null || '') {
        profileLink =
          <Link to={`/${community}/${admin.handle}`} onClick={() => this.toggleListLink()} className={(admin.staff === "" ? "top-border-radius " : "") + "text-right"}>
            <Div className="p-10px text-right top-border-radius" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`}>          
              <FormattedMessage
                id="navigation.profile"
                defaultMessage="Profile"
              />
              <i className="fal fa-id-badge ml-5px"></i>
            </Div>
          </Link>
      } else {
        profileLink =
          <Link to={`/${community}/${admin.handle}`} onClick={() => this.toggleListLink()} className={(admin.staff === "" ? "top-border-radius " : "") + "text-right"}>
            <Div className="p-10px text-right" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`}>          
              <FormattedMessage
                id="navigation.profile"
                defaultMessage="Profile"
              />
              <i className="fal fa-id-badge ml-5px"></i>
            </Div>
          </Link>
      }
    }


    if (admin.avatarSm === null || '') {
      avatarImage =
        <div>
          <i className="fas fa-user"></i>
        </div>
    } else {
      avatarImage =
        <img
          className="object-fit-cover h-100 w-100 border-radius-8px"
          src={`/api/users/files/${admin.avatarSm}`}
          alt="Account"
          style={{ width: '25px' }}
        />
    }

    const staffMenu = (
      <Div className="d-flex flex-direction-column" backgroundStyled={application.mode.primary} radiusStyled={application.settings.appRadius}>
        <Link to={`/${staff}/${dashboard}`} onClick={() => this.toggleListLink()}>
          <Div className="p-10px text-right top-border-radius" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`}>        
            <FormattedMessage
              id="navigation.staff"
              defaultMessage="Staff"
            />
            <i className="fal fa-tachometer-alt ml-5px"></i>
          </Div>
        </Link>
        <Div className="h-0 m-pt25em0em overflow-hidden border-top-1" colorStyled={`${application.theme.primary}`}/>
        {profileLink}
      </Div>
    )

    const userMenu = (
      <Div className="d-flex flex-direction-column" backgroundStyled={application.mode.primary} radiusStyled={application.settings.appRadius}>
        {profileLink}
        <Div className="h-0 m-pt25em0em overflow-hidden border-top-1" colorStyled={`${application.theme.primary}`}/>
      </Div>
    )

    const adminLinks = (
      <nav>
        <Button onClick={() => this.toggleList()} className="userMenuContainer h-40px w-40px border-1 clickable" transitionStyled={`${settings.appTransition}`} backgroundStyled={`${application.transparent}`} backgroundHoverStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} paddingStyled={`${settings.appPadding2}`} radiusStyled={`${settings.appRadius}`}>
          {avatarImage}
        </Button>
        {listOpen && 
          <Dropdown ref={this.setWrapperRef} className="z-1050 d-flex flex-direction-column text-right outer-shadow" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${settings.appRadius}`}>
            {admin.staff ? staffMenu : userMenu}
            {profileLinks}
            {securityLink}
            <Div className="h-0 m-pt25em0em overflow-hidden border-top-1" colorStyled={`${application.theme.primary}`}/>
            <Link
              to={`/${login}`}
              onClick={(e) => {this.onLogoutClick(e); this.toggleListLink()}}
            >
              <Div className="p-10px text-right clickable bottom-border-radius" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`}>  
                <FormattedMessage
                  id="navigation.logout"
                  defaultMessage="Logout"
                />
                <i className="fal fa-sign-out-alt ml-5px"></i>
              </Div>
            </Link>
          </Dropdown>
        }
      </nav>
    );
    

    const guestLinks = (
      <nav >
        <Button onClick={() => this.toggleList()} className="userMenuContainer h-40px w-40px border-1 clickable" transitionStyled={`${settings.appTransition}`} backgroundStyled={`${application.transparent}`} backgroundHoverStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} paddingStyled={`${settings.appPadding}`} radiusStyled={`${settings.appRadius}`}>
          <div>
            <i className="fas fa-user"></i>
          </div>
        </Button>
        {listOpen && 
          <Dropdown ref={this.setWrapperRef} className="z-1050 d-flex flex-direction-column text-right outer-shadow" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${settings.appRadius}`}>
            <Link to={`/${login}`} onClick={(e) => {this.toggleListLink()}}>
              <Div className="p-10px top-border-radius text-right" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`}>
                <FormattedMessage
                  id="navigation.login"
                  defaultMessage="Login"
                />
                <i className="fal fa-sign-in ml-5px"></i>
              </Div>
            </Link>
            <Link to={`/${register}`} onClick={(e) => {this.toggleListLink()}}>
              <Div className="p-10px text-right" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`}>
                <FormattedMessage
                  id="navigation.register"
                  defaultMessage="register"
                />
                <i className="fal fa-user-plus ml-5px"></i>
              </Div>
            </Link>
            <Link to={`/${forgot}`} onClick={(e) => {this.toggleListLink()}}>
              <Div className="p-10px bottom-border-radius text-right" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`}>
                <FormattedMessage
                  id="navigation.forgot"
                  defaultMessage="forgot"
                />
                <i className="fal fa-question-square ml-5px"></i>
              </Div>
            </Link>
          </Dropdown>
        }
      </nav>
    );

    return(
      <div className="position-absolute right-0 pr-10px d-flex flex-direction-column justify-content-right">
        {admin.isAuthenticated ? adminLinks : guestLinks}
      </div>
    )
  }
}

UserMenu.propTypes = {
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  logoutAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
  users: state.users,
});

export default connect(mapStateToProps, { logoutAccount })(withRouter(UserMenu));