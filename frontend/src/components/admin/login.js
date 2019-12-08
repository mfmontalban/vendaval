import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginAccount } from '../../actions/adminActions';
import { FormattedMessage } from 'react-intl';

import Div from '../application/main/common/styled/div';
import H1 from '../application/main/common/styled/h1';
import H2 from '../application/main/common/styled/h2';
import Input from '../application/main/common/styled/input';

import TextFieldGroup from '../application/main/common/textFieldGroup';

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
    let placeEmailLabel;
    let placePass;
    let placePassLabel;
    let placeSubmit;

    if (setLanguage === 'es') {
      placeEmail = 'E-correo'
      placeEmailLabel = 'Campo para E-correo'

      placePass = 'Contraseña'
      placePassLabel = 'Campo para Contraseña'

      placeSubmit = 'Entra'

    } else {
      placeEmail = 'Email'
      placeEmailLabel = 'Field for Email'

      placePass = 'Password'
      placePassLabel = 'Field for Password'

      placeSubmit = 'Enter'
    }

    const { errors } = this.state;
    const { application } = this.props;
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
      <Div className="scroll-container bottom-outer-shadow ml-10px mr-10px pl-10px pr-10px pt-70px scrollbar-width-none" heightStyled={`${application.settings.heightHero}`} backgroundStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadiusBottom}`} colorStyled={`${application.theme.primary}`}>
        {alerts.registered ? registeredAlert : null}
        {alerts.forgot ? forgotAlert : null}
        <H1 className="text-center">
          <FormattedMessage
            id="login.Main"
            defaultMessage="Sign In"
          />
        </H1>
        <H2 className="text-center">
          <FormattedMessage
            id="login.Secondary"
            defaultMessage="Welcome Back!"
          />
        </H2>
        <form className="max-w-750px w-80pc ml-auto mr-auto d-flex flex-direction-column text-center" noValidate onSubmit={this.onSubmit}>
          <Input
            type="email"
            name="email"
            placeholder={`${placeEmail}`}
            aria-label={`${placeEmailLabel}`}
            className="box-shadow-none border-1 pl-10px pr-10px pt-5px pb-5px mb-10px"
            backgroundStyled={errors.email ? `${application.theme.primary}`: `${application.transparent}`}
            colorStyled={errors.email ? `${application.mode.primary}`: `${application.theme.primary}`}
            placeholderStyled={errors.email ? `${application.mode.primary}`: `${application.theme.primary}`}
            fontSizeStyled={application.text.primary}
            borderStyled={application.theme.primary}
            radiusStyled={application.settings.appRadius}
            value={this.state.email}
            onChange={this.onChange}
          />

          <Input
            type="password"
            name="password"
            placeholder={`${placePass}`}
            aria-label={`${placePassLabel}`}
            className="box-shadow-none border-1 pl-10px pr-10px pt-5px pb-5px mb-10px"
            backgroundStyled={errors.password ? `${application.theme.primary}`: `${application.transparent}`}
            colorStyled={errors.password ? `${application.mode.primary}`: `${application.theme.primary}`}
            placeholderStyled={errors.password ? `${application.mode.primary}`: `${application.theme.primary}`}
            fontSizeStyled={application.text.primary}
            borderStyled={application.theme.primary}
            radiusStyled={application.settings.appRadius}
            value={this.state.password}
            onChange={this.onChange}
          />

          <Input
            type="submit"
            value={`${placeSubmit}`}
            className={`clickable mt-10px mb-20px`}
            transitionStyled={application.transitions.general}
            backgroundStyled={application.theme.primaryQuarter}
            backgroundHoverStyled={application.theme.primary}
            colorStyled={application.mode.primary}
            fontSizeStyled={application.text.heading}
            borderStyled={application.mode.primary}
            radiusStyled={application.settings.appRadius}
          />
        </form>
      </Div>
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
