import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';

import Div from '../../../common/styled/div'
import Button from '../../../common/styled/button'
import Dropdown from '../../../common/styled/dropdownold'
import SearchWinds from '../../../head/searchWinds'
import UpdateLanguage from '../../../head/updateLanguage'

class AppMenu extends Component {
  constructor(props){
    super(props)
    this.state = {
      outsideClicked: false,
      listOpen: false,
      width: 0,
      height: 0,
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
        listOpen: false,
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

  toggleSettings(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen,
      outsideClicked: false,
    }));
    this.props.overlayStatus(true);
  }

  render(){
    const { listOpen, settingsMenu, width } = this.state
    const { application } = this.props;

    let about;
    let contact;
    let donate;

    let appMenuGroup;

    if (application.language === 'es') {
      about = 'sobre'
      contact = 'contacta'
      donate = 'dona'
    } else {
      about = 'about'
      contact = 'contact'
      donate = 'donate'
    }

    if (width > 1150) {
      appMenuGroup = (
        <div>
          <Button className="smBtn border-1" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.settings.themeTransparent}`} backgroundHoverStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} paddingStyled={`${application.settings.appPadding}`} radiusStyled={`${application.settings.appRadius}`}>
            <i className="fas fa-bars"></i>
          </Button>
          <Dropdown className={' min-w-20-sidebars h-100-sidebars top-0 left-0 position-absolute d-flex flex-direction-column outer-shadow-primary border-1 p-10px mt-70px'} transitionStyled={application.transitions.general} backgroundStyled={application.mode.primary} colorStyled={`${application.theme.primary}`} radiusStyled={application.settings.appRadius}>
            <Div className="z-1250 d-flex flex-direction-row justify-content-space-between">
              <SearchWinds />
              <UpdateLanguage />
            </Div>

            <Link to={`/`} className="noUnderline" onClick={() => this.toggleListLink()}>
              <Div className="p-10px" transitionStyled={application.transitions.general} backgroundStyled={application.mode.primary} backgroundHoverStyled={application.theme.primaryQuarter}>
                <i className="fal fa-home mr-5px"></i>
                <span>
                  <FormattedMessage
                    id="navigation.home"
                    defaultMessage="Home"
                  />
                </span>
              </Div>
            </Link>

            <Div className="overflow-hidden border-top-1" backgroundStyled={application.mode.primary}/>

            <Link to={`/${about}`} className="noUnderline" onClick={() => this.toggleListLink()}>
              <Div className="p-10px" transitionStyled={application.transitions.general} backgroundStyled={application.mode.primary} backgroundHoverStyled={application.theme.primaryQuarter}>
                <i className="fal fa-users mr-5px"></i>
                <span>
                  <FormattedMessage
                    id="navigation.about"
                    defaultMessage="Our Story"
                  />
                </span>
              </Div>
            </Link>
            <Link to={`/${contact}`} onClick={() => this.toggleListLink()}>
              <Div className="p-10px" transitionStyled={application.transitions.general} backgroundStyled={application.mode.primary} backgroundHoverStyled={application.theme.primaryQuarter}>
                <i className="fal fa-comments-alt mr-5px"></i>
                <span>
                  <FormattedMessage
                    id="navigation.contact"
                    defaultMessage="Contact"
                  />
                </span>
              </Div>
            </Link>
            <Link to={`/${donate}`} onClick={() => this.toggleListLink()}>
              <Div className="p-10px" transitionStyled={application.transitions.general} backgroundStyled={application.mode.primary} backgroundHoverStyled={application.theme.primaryQuarter}>
                <i className="fal fa-heart mr-5px"></i>
                <span>
                  <FormattedMessage
                    id="navigation.donate"
                    defaultMessage="Donate"
                  />
                </span>
              </Div>
            </Link>

            <Div className="overflow-hidden border-top-1" backgroundStyled={application.mode.primary}/>

            <Button className="p-10px clickable" onClick={() => this.toggleSettings()} transitionStyled={application.transitions.general} backgroundStyled={application.mode.primary} backgroundHoverStyled={application.theme.primaryQuarter}>
              <i className="fal fa-cog mr-5px"></i>
              <span>
                <FormattedMessage
                  id="navigation.settings"
                  defaultMessage="Settings"
                />
              </span>
            </Button>
          </Dropdown>
        </div>
      )
    } else {
      appMenuGroup = (
        <div>
          <Button  onClick={() => this.toggleList('open')} className="smBtn border-1 clickable" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.settings.themeTransparent}`} backgroundHoverStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} paddingStyled={`${application.settings.appPadding}`} radiusStyled={`${application.settings.appRadius}`}>
            <i className="fas fa-bars"></i>
          </Button>
          <Dropdown ref={this.setWrapperRef} className={(listOpen === true ? 'z-1500 visible appMenu' : 'z-neg1 invisible') + ' menus ml-neg45vw z-1005 top-0 left-0 position-absolute d-flex flex-direction-column outer-shadow-primary border-1 p-10px'} transitionStyled={settingsMenu === true ? `${application.transitions.appMenuIn}`: `${application.transitions.appMenuOut}`} backgroundStyled={application.mode.primary} colorStyled={`${application.theme.primary}`}>
            
            <Button  onClick={() => this.toggleList('close')} className="smBtn border-1 clickable m-10px" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.settings.themeTransparent}`} backgroundHoverStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} paddingStyled={`${application.settings.appPadding}`} radiusStyled={`${application.settings.appRadius}`}>
              <i className="fas fa-bars"></i>
            </Button>

            <Div className="z-1250 d-flex flex-direction-row justify-content-space-between">
              <SearchWinds />
              <UpdateLanguage />
            </Div>

            <Link to={`/`} className="noUnderline" onClick={() => this.toggleListLink()}>
              <Div className="p-10px" transitionStyled={application.transitions.general} backgroundStyled={application.mode.primary} backgroundHoverStyled={application.theme.primaryQuarter}>
                <i className="fal fa-home mr-5px"></i>
                <span>
                  <FormattedMessage
                    id="navigation.home"
                    defaultMessage="Home"
                  />
                </span>
              </Div>
            </Link>

            <Div className="overflow-hidden border-top-1" backgroundStyled={application.mode.primary}/>

            <Link to={`/${about}`} className="noUnderline" onClick={() => this.toggleListLink()}>
              <Div className="p-10px" transitionStyled={application.transitions.general} backgroundStyled={application.mode.primary} backgroundHoverStyled={application.theme.primaryQuarter}>
                <i className="fal fa-users mr-5px"></i>
                <span>
                  <FormattedMessage
                    id="navigation.about"
                    defaultMessage="Our Story"
                  />
                </span>
              </Div>
            </Link>
            <Link to={`/${contact}`} onClick={() => this.toggleListLink()}>
              <Div className="p-10px" transitionStyled={application.transitions.general} backgroundStyled={application.mode.primary} backgroundHoverStyled={application.theme.primaryQuarter}>
                <i className="fal fa-comments-alt mr-5px"></i>
                <span>
                  <FormattedMessage
                    id="navigation.contact"
                    defaultMessage="Contact"
                  />
                </span>
              </Div>
            </Link>
            <Link to={`/${donate}`} onClick={() => this.toggleListLink()}>
              <Div className="p-10px" transitionStyled={application.transitions.general} backgroundStyled={application.mode.primary} backgroundHoverStyled={application.theme.primaryQuarter}>
                <i className="fal fa-heart mr-5px"></i>
                <span>
                  <FormattedMessage
                    id="navigation.donate"
                    defaultMessage="Donate"
                  />
                </span>
              </Div>
            </Link>

            <Div className="overflow-hidden border-top-1" backgroundStyled={application.mode.primary}/>

            <Button className="p-10px clickable" onClick={() => this.toggleSettings()} transitionStyled={application.transitions.general} backgroundStyled={application.mode.primary} backgroundHoverStyled={application.theme.primaryQuarter}>
              <i className="fal fa-cog mr-5px"></i>
              <span>
                <FormattedMessage
                  id="navigation.settings"
                  defaultMessage="Settings"
                />
              </span>
            </Button>
          </Dropdown>
        </div>
      )
    }

    return(
      <Div className="d-flex flex-direction-column" transitionStyled={`${application.transitions.general}`}>
        {appMenuGroup}
      </Div>
    )
  }
}

AppMenu.propTypes = {
  application: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  application: state.application
});

export default connect(mapStateToProps, {})(AppMenu);