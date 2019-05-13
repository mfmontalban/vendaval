import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const StaffRoute = ({ component: Component, admin, ...rest }) => (
  <Route {...rest} render={props =>
      admin.staff !== '' ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

StaffRoute.propTypes = {
  admin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(mapStateToProps)(StaffRoute);
