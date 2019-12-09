import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';

import Div from '../../common/styled/div'
import Button from '../../common/styled/button'
import Dropdown from '../../common/styled/dropdownold'

class AppMenu extends Component {
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
        listOpen: false,
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

  toggleSettings(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen,
      outsideClicked: false,
    }));
    this.props.overlayStatus(true);
  }

  render(){
    const { listOpen } = this.state
    const { application } = this.props;

    let about;
    let contact;
    let donate;

    if (application.language === 'es') {

      about = 'sobre'
      contact = 'contacta'
      donate = 'dona'

    } else {

      about = 'about'
      contact = 'contact'
      donate = 'donate'

    }

    return(
      <div className="position-absolute left-0 pl-10px d-flex flex-direction-column justify-content-right">
        <Button  onClick={() => this.toggleList()} className="h-40px w-40px border-1 clickable" transitionStyled={`${application.settings.appTransition}`} backgroundStyled={`${application.settings.themeTransparent}`} backgroundHoverStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} paddingStyled={`${application.settings.appPadding}`} radiusStyled={`${application.settings.appRadius}`}>
          <i className="fas fa-bars"></i>
        </Button>
        {listOpen && 
          <Dropdown ref={this.setWrapperRef} className="z-1005 d-flex flex-direction-column outer-shadow outer-box-shadow-menu" transitionStyled={`${application.transitions.general}`} backgroundStyled={application.mode.primary} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadius}`}>
            <Link to={`/`} className="noUnderline" onClick={() => this.toggleListLink()}>
              <Div className="p-10px top-border-radius" transitionStyled={application.transitions.general} backgroundStyled={application.mode.primary} backgroundHoverStyled={application.theme.primaryQuarter}>
                <i className="fal fa-home mr-5px"></i>
                <span className="pr-2">
                  <FormattedMessage
                    id="navigation.home"
                    defaultMessage="Home"
                  />
                </span>
              </Div>
            </Link>

            <Div className="h-0 m-pt25em0em overflow-hidden border-top-1" backgroundStyled={application.mode.primary}/>

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

            <Div className="h-0 m-pt25em0em overflow-hidden border-top-1" backgroundStyled={application.mode.primary}/>

            <Button className="bottom-border-radius p-10px clickable" onClick={() => this.toggleSettings()} transitionStyled={application.transitions.general} backgroundStyled={application.mode.primary} backgroundHoverStyled={application.theme.primaryQuarter}>
              <i className="fal fa-cog mr-5px"></i>
              <span>
                <FormattedMessage
                  id="navigation.settings"
                  defaultMessage="Settings"
                />
              </span>
            </Button>
          </Dropdown>
        }
      </div>
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