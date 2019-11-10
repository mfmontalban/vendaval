import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Layout from './components/application/layout';

const Director = ({ level: Level, template: Template, component: Component, admin, ...rest}) => (
  <Route {...rest} render={props => ( 
    Template === 'Map' ? (
      <Layout header={'transparent'}>
        <Component {...props} />
      </Layout>
    ) : (
      Level === 'public' ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        Level === 'user' ? (
          admin.isAuthenticated !== '' ? (
            <Layout>
              <Component {...props} />
            </Layout>
          ) : (
            <Redirect to="/login" />
          )
        ) : (
          admin.staff !== '' ? (
            <Layout>
              <Component {...props} />
            </Layout>
          ) : (
            <Redirect to="/login" />
          )
        )
      )
    )
  )} />
);

Director.propTypes = {
  admin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(mapStateToProps)(Director);
