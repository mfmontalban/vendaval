import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { verifyApplicationAlertsUpdated } from '../../actions/applicationActions';

class Confirm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.admin.isAuthenticated) {
      this.props.history.push('/vientos');
    }

    if (this.props.match.params.key) {
      this.props.verifyApplicationAlertsUpdated(this.props.match.params.key);
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    let { admin, application } = this.props;

    const loggedIn = (
      <Link to="/vientos" className="btn btn-block btn-info">
        Explore New Vientos
      </Link>
    );

    const loggedOut = (
      <Link to="/login" className="btn btn-block btn-info">
        Sign In
      </Link>
    );

    const success =
      <div>
        <h1 className="display-4 text-center">Verified</h1>
        <p className="lead text-center">
          Thank you for updating your email address!
        </p>
        {admin.id ? loggedIn : loggedOut}
      </div>
    ;

    const expired =
      <div>
        <h1 className="display-4 text-center">Resend</h1>
        <p className="lead text-center">
          Sorry, but we couldn't find your update email validation token.
        </p>
        <p className="display-6 text-center">
          If you continue to encounter this error, please email us at contacto@vendaval.space
        </p>
        <Link to="/login" className="btn-block mt-5 text-center text-info">
          Sign In
        </Link>
      </div>
    ;

    return (
      <div className="body scroll-container pt-3 pb-3">
        <div className="container pt-4">
          <div className="row">
            <div className="col-md-8 m-auto">
            {application.verify.success ? success : null}
            {application.verify.expired ? expired : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Confirm.propTypes = {
  verifyApplicationAlertsUpdated: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application
});

export default connect(mapStateToProps, { verifyApplicationAlertsUpdated })(withRouter(Confirm));
