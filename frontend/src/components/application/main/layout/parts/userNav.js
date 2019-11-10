import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import NavBackground from '../../common/styled/navbackground';
import Nav from '../../common/styled/nav';
import AppMenu from './appMenu';
import Button from '../../common/styled/button';
import UserMenu from './userMenu';

class UserNav extends Component {

  toggleOverlay = (e) => {
    this.props.setOverlay(e);
  }

  render() {
    const { application, header } = this.props;
    const { settings } = this.props.application;
    const setLanguage = this.props.application.language;

    let winds;

    if (setLanguage === 'es') {
      winds = 'vientos'
    } else {
      winds = 'winds'
    }

    return (
      <NavBackground className="z-1050 position-fixed d-flex justify-content-between pt-10px pl-10px pr-10px" navWidth={`${settings.widthUserNavBackground}`} navHeight={`${settings.heightUserNav2}`}  navBackground={header === 'transparent' ? `${application.transparent}`: `${application.mode.primaryBackground}`}>
        <Nav className="z-1050 position-fixed d-flex justify-content-center p-10px top-outer-shadow" navWidth={`${settings.widthUserNav}`} navHeight={`${settings.heightUserNav}`}  navBackground={header === 'transparent' ? `${application.transparent}`: `${application.mode.primary}`} navRadius={`${settings.appRadiusTop}`}>
          <AppMenu overlayStatus={this.toggleOverlay} />

          <Button className="h-40px w-52px border-1" transitionStyled={`${settings.appTransition}`} backgroundStyled={`${settings.themeTransparent}`} backgroundHoverStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} paddingStyled={`${settings.appPaddingHalf}`} radiusStyled={`${settings.appRadius}`}>
            <Link className="btn btn-outline-info text-white rounded" to={`/${winds}`}><img alt="Vendaval favicon" className="vientos" src="/favicon.ico" /></Link>
          </Button>

          <UserMenu />
        </Nav>
      </NavBackground>
    )
  }
}

const mapStateToProps = state => ({
  application: state.application
});

export default connect(mapStateToProps, {})(UserNav);