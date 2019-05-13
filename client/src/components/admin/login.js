import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginAccount } from '../../actions/adminActions';
import { FormattedMessage } from 'react-intl';

import TextFieldGroup from '../application/common/textFieldGroup';
import Footer from '../application/layout/footer'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      alerts: {},
      email: '',
      password: '',
      errors: {},
    };
  }

  componentDidMount() {
    if (this.props.admin.isAuthenticated) {
      this.props.history.push('/vientos');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.application.errors!==prevProps.application.errors){
      //Perform some operation here
      this.setState({errors: this.props.application.errors});
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      language: this.props.application.language,
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginAccount(userData, this.props.history);
  }

  render() {
    const setLanguage = this.props.application.language;

    let placeEmail;

    let placePass;

    let placeSubmit;

    if (setLanguage === 'es') {
      placeEmail = 'E-correo'

      placePass = 'Contraseña'

      placeSubmit = 'Entra'

    } else {
      placeEmail = 'Email'

      placePass = 'Password'

      placeSubmit = 'Enter'
    }

    const { errors } = this.state;
    const { alerts } = this.props.application;

    const registeredAlert = (
      <div className="fixed-top alert-margin ml-5 mr-5 alert alert-info alert-dismissible fade show" role="alert">
      Please confirm the email sent to: {alerts.registered} before continuing
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </div>
    );

    const forgotAlert = (
      <div className="fixed-top alert-margin ml-5 mr-5 alert alert-info alert-dismissible fade show" role="alert">
      Please reset password using the link sent to: {alerts.forgot} before continuing
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </div>
    );

    return (
      <div>
        <div className="body pt-3 pb-3">
          <div className="scroll-container">
            <div className="container pt-4">
              <div className="row">
                <div className="col-md-8 m-auto">
                  {alerts.registered ? registeredAlert : null}
                  {alerts.forgot ? forgotAlert : null}
                  <h1 className="display-4 text-center">
                    <FormattedMessage
                      id="login.Main"
                      defaultMessage="Sign In"
                    />
                  </h1>
                  <p className="lead text-center">
                    <FormattedMessage
                      id="login.Secondary"
                      defaultMessage="Welcome Back!"
                    />
                  </p>
                  <form noValidate onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      placeholder={`${placeEmail}`}
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                    />

                    <TextFieldGroup
                      placeholder={`${placePass}`}
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />
                    <input type="submit" value={`${placeSubmit}`} className="btn btn-info btn-block mt-4" />
                  </form>
                  
                  
                </div>
              </div>
              
            </div>
            
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Login.propTypes = {
  loginAccount: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application
});

export default connect(mapStateToProps, { loginAccount })(withRouter(Login));
