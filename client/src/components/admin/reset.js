import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { verifyApplicationAlertsForgot, resendApplicationAlertsForgot, resetAccountPassword } from '../../actions/applicationActions';

import TextFieldGroup from '../application/common/textFieldGroup';
import Footer from '../application/layout/footer'

class Reset extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      password2: '',
      success: '',
      expired: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.admin.isAuthenticated) {
      this.props.history.push('/vientos');
    }

    if (this.props.match.params.key) {
      this.props.verifyApplicationAlertsForgot(this.props.match.params.key);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitResend = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email
    };

    this.props.resendApplicationAlertsForgot(userData, this.props.history);
  }

  onSubmitReset = (e) => {
    e.preventDefault();

    const userData = {
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.resetAccountPassword(this.props.match.params.key, userData, this.props.history);
  }

  render() {

    const { errors } = this.state;
    const { verify } = this.props.application;

    const expired =
      <div>
        <h1 className="display-4 text-center">Expired</h1>
        <p className="lead text-center">
          Sorry, but it appears your forgot password token doesn't exist or has expired.
        </p>
        <form noValidate onSubmit={this.onSubmitResend}>
          <TextFieldGroup
            placeholder="Email Address"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          />
          <input value="Resend" type="submit" className="btn btn-info btn-block" />
        </form>
        <Link to="/login" className="btn-block mt-5 text-center text-info">
          Or try signing in if you're feeling confident...
        </Link>
      </div>
    ;

    const success =
      <div>
        <h1 className="display-4 text-center">Reset</h1>
        <p className="lead text-center">
          Please use the below form to reset your password:
        </p>
        <form noValidate onSubmit={this.onSubmitReset}>
          <TextFieldGroup
            placeholder="New password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
          />
          <TextFieldGroup
            placeholder="Confirm Password"
            name="password2"
            type="password"
            value={this.state.password2}
            onChange={this.onChange}
            error={errors.password2}
          />
          <input value="Reset" type="submit" className="btn btn-info btn-block" />
        </form>
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

Reset.propTypes = {
  verifyApplicationAlertsForgot: PropTypes.func.isRequired,
  resendApplicationAlertsForgot: PropTypes.func.isRequired,
  resetAccountPassword: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application
});

export default connect(mapStateToProps, { verifyApplicationAlertsForgot, resendApplicationAlertsForgot, resetAccountPassword })(withRouter(Reset));
