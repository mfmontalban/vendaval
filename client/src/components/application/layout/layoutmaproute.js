import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 

import LayoutMap from './layoutmap';

const LayoutMapRoute = ({ component: Component, admin, ...rest }) => (
  <Route {...rest} render={props => (
    <LayoutMap>
      <Component {...props} />
    </LayoutMap>
  )} />
);

LayoutMapRoute.propTypes = {
  admin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(mapStateToProps)(LayoutMapRoute);
