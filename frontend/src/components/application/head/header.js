import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './header.css';


import TopNav from '../common/styled/topnav'
import NavContainer from '../common/styled/navcontainer'

import SearchWinds from './searchWinds'
import UpdateLanguage from './updateLanguage'



class Header extends Component {
  render() {
    const { application } = this.props;
    return (
      <TopNav id="header" className="header w-100vw" heightStyled={`${application.settings.heightHeader}`} backgroundStyled={`${application.mode.primaryBackground}`}>

        <NavContainer className="z-1250 position-fixed top-0 d-flex justify-content-space-between" widthStyled={`${application.settings.widthHeader}`} backgroundStyled={`${application.mode.primaryBackground}`} paddingTopStyled={`${application.settings.paddingTopHeader}`} paddingLeftStyled={`${application.settings.paddingLeftHeader}`} paddingRightStyled={`${application.settings.paddingRightHeader}`}>
          
          <SearchWinds />
          <UpdateLanguage />

        </NavContainer>

      </TopNav>
    );
  }
}

Header.propTypes = {
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
});

export default connect(mapStateToProps, {})(Header);
