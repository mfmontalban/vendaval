import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 

import Layout from './layout';

const LayoutStaffRoute = ({ component: Component, admin, ...rest }) => (
  <Route {...rest} render={props =>
      admin.isAuthenticated !== '' ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

LayoutStaffRoute.propTypes = {
  admin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(mapStateToProps)(LayoutStaffRoute);
