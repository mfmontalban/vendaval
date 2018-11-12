import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyRegister, resendRegister } from '../../actions/authActions';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

class Confirm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/vientos');
    }

    if (this.props.match.params.key) {
      this.props.verifyRegister(this.props.match.params.key);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/vientos');
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

    this.props.resendRegister(userData, this.props.history);
  }

  render() {

    let { errors } = this.state;
    let { verify } = this.props;

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
    );
  }
}

Confirm.propTypes = {
  verifyRegister: PropTypes.func.isRequired,
  resendRegister: PropTypes.func.isRequired,
  alerts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  verify: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alerts,
  auth: state.auth,
  errors: state.errors,
  verify: state.verify
});

export default connect(mapStateToProps, { verifyRegister, resendRegister })(withRouter(Confirm));
