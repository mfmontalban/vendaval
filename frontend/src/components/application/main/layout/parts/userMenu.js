import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';

import { logoutAccount } from '../../../../../actions/adminActions';

import Button from '../../../common/styled/button'
import Div from '../../../common/styled/div'
import Dropdown from '../../../common/styled/dropdown'
import Img from '../../../common/styled/img'

class UserMenu extends Component {
  constructor(props){
    super(props)
    this.state = {
      outsideClicked: false,
      listOpen: false,
      settingsMenu: false,
      width: 0
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.width != prevState.width) {
      if (this.state.width > 1032) {
        this.setState({
          listOpen: true
        })
      }
    }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
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

  toggleList(check){
    if ((this.state.outsideClicked === false) && (check === 'open')) {
      this.setState(prevState => ({
        listOpen: !prevState.listOpen,
        outsideClicked: true,
      }))
    } else {
        if (check === 'close') {
          this.setState(prevState => ({
            listOpen: !prevState.listOpen,
            outsideClicked: false,
          }))
        }
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
    const { listOpen, settingsMenu, width } = this.state
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
    let adminLinks;
    let guestLinks;

    profileLinks = (
      <div>
        {/* <Link to={`/${profile}/${alerts}`} onClick={() => this.toggleListLink()}>
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
        </Link> */}
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
          <Div className="p-10px text-right" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`}>
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
            <Div className="p-10px text-right" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`}>          
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
        <Img
          className="object-fit-cover h-100 w-25px"
          radiusStyled={application.settings.appRadius}
          src={`/api/users/files/${admin.avatarSm}`}
          alt="Account"
        />
    }

    const staffMenu = (
      <Div className="d-flex flex-direction-column" backgroundStyled={application.mode.primary} radiusStyled={application.settings.appRadius}>
        <Link to={`/${staff}/${dashboard}`} onClick={() => this.toggleListLink()}>
          <Div className="p-10px text-right" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`}>        
            <FormattedMessage
              id="navigation.staff"
              defaultMessage="Staff"
            />
            <i className="fal fa-tachometer-alt ml-5px"></i>
          </Div>
        </Link>
        <Div className="overflow-hidden border-top-1" colorStyled={`${application.theme.primary}`}/>
        {profileLink}
      </Div>
    )

    const userMenu = (
      <Div className="d-flex flex-direction-column" backgroundStyled={application.mode.primary} radiusStyled={application.settings.appRadius}>
        {profileLink}
        <Div className="overflow-hidden border-top-1" colorStyled={`${application.theme.primary}`}/>
      </Div>
    )

    if (width > 1150) {
      adminLinks = (
        <nav>
          <Button className="smBtn border-1" transitionStyled={`${settings.appTransition}`} backgroundStyled={`${application.transparent}`} backgroundHoverStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} paddingStyled={`${settings.appPadding2}`} radiusStyled={`${settings.appRadius}`}>
            {avatarImage}
          </Button>
  
          <Dropdown className={' z-1500 visible min-w-20-sidebars h-100-sidebars top-0 right-0 position-absolute d-flex flex-direction-column outer-shadow-primary border-1 p-10px mt-70px'} transitionStyled={application.transitions.general} backgroundStyled={application.mode.primary} colorStyled={`${application.theme.primary}`} radiusStyled={application.settings.appRadius}>
            {admin.staff ? staffMenu : userMenu}
            {profileLinks}
            {securityLink}
            <Div className="overflow-hidden border-top-1" colorStyled={`${application.theme.primary}`}/>
            <Link
              to={`/${login}`}
              onClick={(e) => {this.onLogoutClick(e); this.toggleListLink()}}
            >
              <Div className="p-10px text-right clickable" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`}>  
                <FormattedMessage
                  id="navigation.logout"
                  defaultMessage="Logout"
                />
                <i className="fal fa-sign-out-alt ml-5px"></i>
              </Div>
            </Link>
          </Dropdown>
        </nav>
      );
      
  
      guestLinks = (
        <nav>
          <Button className="smBtn border-1" transitionStyled={`${settings.appTransition}`} backgroundStyled={`${application.transparent}`} backgroundHoverStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} paddingStyled={`${settings.appPadding}`} radiusStyled={`${settings.appRadius}`}>
            <div>
              <i className="fas fa-user"></i>
            </div>
          </Button>
  
          <Dropdown className={' z-1500 visible min-w-20-sidebars h-100-sidebars top-0 right-0 position-absolute d-flex flex-direction-column outer-shadow-primary border-1 p-10px mt-70px'} transitionStyled={application.transitions.general} backgroundStyled={application.mode.primary} colorStyled={`${application.theme.primary}`} radiusStyled={application.settings.appRadius}>
            <Link to={`/${login}`} onClick={(e) => {this.toggleListLink()}}>
              <Div className="p-10px text-right" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`}>
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
              <Div className="p-10px text-right" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`}>
                <FormattedMessage
                  id="navigation.forgot"
                  defaultMessage="forgot"
                />
                <i className="fal fa-question-square ml-5px"></i>
              </Div>
            </Link>
          </Dropdown>
  
        </nav>
      );
    } else {
      adminLinks = (
        <nav>
          <Button onClick={() => this.toggleList('open')} className="smBtn border-1 clickable" transitionStyled={`${settings.appTransition}`} backgroundStyled={`${application.transparent}`} backgroundHoverStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} paddingStyled={`${settings.appPadding2}`} radiusStyled={`${settings.appRadius}`}>
            {avatarImage}
          </Button>
  
          <Dropdown className={(listOpen === true ? 'z-1500 visible userMenu' : 'z-neg1 invisible') + ' menus mr-neg45vw z-1005 top-0 right-0 position-absolute d-flex flex-direction-column outer-shadow-primary border-1 p-10px'} transitionStyled={settingsMenu === true ? `${application.transitions.appMenuIn}`: `${application.transitions.appMenuOut}`} backgroundStyled={application.mode.primary} colorStyled={`${application.theme.primary}`}>  
            <Button onClick={() => this.toggleList('close')} className="userMenuButton smBtn border-1 clickable m-10px" transitionStyled={`${settings.appTransition}`} backgroundStyled={`${application.transparent}`} backgroundHoverStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} paddingStyled={`${settings.appPadding2}`} radiusStyled={`${settings.appRadius}`}>
              {avatarImage}
            </Button>
            {admin.staff ? staffMenu : userMenu}
            {profileLinks}
            {securityLink}
            <Div className="overflow-hidden border-top-1" colorStyled={`${application.theme.primary}`}/>
            <Link
              to={`/${login}`}
              onClick={(e) => {this.onLogoutClick(e); this.toggleListLink()}}
            >
              <Div className="p-10px text-right clickable" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`}>  
                <FormattedMessage
                  id="navigation.logout"
                  defaultMessage="Logout"
                />
                <i className="fal fa-sign-out-alt ml-5px"></i>
              </Div>
            </Link>
          </Dropdown>
        </nav>
      );
      
  
      guestLinks = (
        <nav>
          <Button onClick={() => this.toggleList('open')} className="smBtn border-1 clickable" transitionStyled={`${settings.appTransition}`} backgroundStyled={`${application.transparent}`} backgroundHoverStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} paddingStyled={`${settings.appPadding}`} radiusStyled={`${settings.appRadius}`}>
            <div>
              <i className="fas fa-user"></i>
            </div>
          </Button>
  
          <Dropdown className={(listOpen === true ? 'z-1500 visible userMenu' : 'z-neg1 invisible') + ' menus mr-neg45vw z-1005 top-0 right-0 position-absolute d-flex flex-direction-column outer-shadow-primary border-1 p-10px'} transitionStyled={settingsMenu === true ? `${application.transitions.appMenuIn}`: `${application.transitions.appMenuOut}`} backgroundStyled={application.mode.primary} colorStyled={`${application.theme.primary}`}>
            
            <Button onClick={() => this.toggleList('close')} className="userMenuButton smBtn border-1 clickable p-10px m-10px" transitionStyled={`${settings.appTransition}`} backgroundStyled={`${application.transparent}`} backgroundHoverStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} paddingStyled={`${settings.appPadding}`} radiusStyled={`${settings.appRadius}`}>
              <div>
                <i className="fas fa-user"></i>
              </div>
            </Button>
  
            <Link to={`/${login}`} onClick={(e) => {this.toggleListLink()}}>
              <Div className="p-10px text-right" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`}>
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
              <Div className="p-10px text-right" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`}>
                <FormattedMessage
                  id="navigation.forgot"
                  defaultMessage="forgot"
                />
                <i className="fal fa-question-square ml-5px"></i>
              </Div>
            </Link>
          </Dropdown>
  
        </nav>
      );
    }

    return(
      <div className="d-flex flex-direction-column">
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