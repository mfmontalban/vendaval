import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Nav from '../../../common/styled/nav';
import Div from '../../../common/styled/div';
import AppMenu from './appMenu';
import Button from '../../../common/styled/button';
import UserMenu from './userMenu';

import './userNav.css';

class UserNav extends Component {

  toggleOverlay = (e) => {
    this.props.setOverlay(e);
  }

  render() {
    const { application } = this.props;
    const setLanguage = this.props.application.language;

    let winds;

    if (setLanguage === 'es') {
      winds = 'vientos'
    } else {
      winds = 'winds'
    }

    return (
      <Nav className="widthPositioning z-1050 d-flex position-relative p-10px justify-content-center align-items-center outer-shadow-primary border-1" backgroundStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadius}`} colorStyled={`${application.theme.primary}`}>
        <div className="w-33 d-flex justify-content-flex-start">
          <AppMenu overlayStatus={this.toggleOverlay} />
        </div>

        <div className="w-33 d-flex justify-content-center">
          <Button className="smBtn border-1" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.settings.themeTransparent}`} backgroundHoverStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} paddingStyled={`${application.settings.appPaddingHalf}`} radiusStyled={`${application.settings.appRadius}`}>
            <Link to={`/${winds}`}>
              <img alt="Vendaval favicon" className="h-100" src="/favicon.ico" />
            </Link>
          </Button>
        </div>

        <div className="w-33 d-flex justify-content-flex-end">
          <UserMenu />
        </div>

      </Nav>
    )
  }
}

const mapStateToProps = state => ({
  application: state.application
});

export default connect(mapStateToProps, {})(UserNav);