import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { verifyApplicationAlertsRegistered, resendApplicationAlertsRegistered } from '../../actions/applicationActions';

import TextFieldGroup from '../application/common/textFieldGroup';
import Footer from '../application/layout/footer'

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
      this.props.verifyApplicationAlertsRegistered(this.props.match.params.key);
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email
    };

    this.props.resendApplicationAlertsRegistered(userData, this.props.history);
  }

  render() {

    const { errors } = this.state;
    const { verify } = this.props.application;

    const success =
      <div>
        <h1 className="display-4 text-center">Verified</h1>
        <p className="lead text-center">
          Thank you for signing up!
        </p>
        <Link to="/login" className="btn btn-block btn-info">
          Sign In
        </Link>
      </div>
    ;

    const expired =
      <div>
        <h1 className="display-4 text-center">Resend</h1>
        <p className="lead text-center">
          Sorry, but we couldn't find your validation token. Please enter your email below to resend your confirmation email.
        </p>
        <form noValidate onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="Email Address"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          />
          <input value="Submit" type="submit" className="btn btn-info btn-block" />
        </form>
        <Link to="/register" className="btn-block mt-5 text-center text-info">
          Or Sign Up
        </Link>
      </div>
    ;

    return (
      <div>
        <div className="body scroll-container pt-3 pb-3">
          <div className="container pt-4">
            <div className="row">
              <div className="col-md-8 m-auto">
              {verify.success ? success : null}
              {verify.expired ? expired : null}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Confirm.propTypes = {
  verifyApplicationAlertsRegistered: PropTypes.func.isRequired,
  resendApplicationAlertsRegistered: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
});

export default connect(mapStateToProps, { verifyApplicationAlertsRegistered, resendApplicationAlertsRegistered })(withRouter(Confirm));
