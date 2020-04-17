import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginAccount } from '../../actions/adminActions';
import { FormattedMessage } from 'react-intl';

import PromptMessage from '../application/common/promptMessage';

import Div from '../application/common/styled/div';
import H1 from '../application/common/styled/h1';
import H2 from '../application/common/styled/h2';
import Input from '../application/common/styled/input';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      alerts: {},
      email: '',
      password: '',
      errors: {
        data: {
          email: '',
          password: '',
        }
      },
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
    const { errors } = this.state;
    const { application } = this.props;

    let placeEmail;
    let placeEmailLabel;
    let placePass;
    let placePassLabel;
    let placeSubmit;

    if (application.language === 'es') {
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

    const registeredAlert = (
      <Div 
        className="position-absolute fixed-top m-10px p-10px outer-shadow-primary border-1" 
        role="alert"
        backgroundStyled={application.theme.primary}
        colorStyled={application.mode.primary}
        radiusStyled={application.settings.appRadius}
        fontSizeStyled={application.text.primary}
      >
        Please confirm the email sent to: {application.alerts.registered} before continuing
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </Div>
    );

    const forgotAlert = (

      <PromptMessage
        application={application}
        alertTitle="alertTitle"
        alertDefaultTitle="Alert"
        alertMessage1="alertForgot1"
        alertDefaultMessage1="Please reset password using the link sent to: "
        alertMessage2="alertForgot2"
        alertDefaultMessage2=" before continuing"
      />

      // <Div 
      //   className="position-absolute fixed-top m-10px p-10px outer-shadow-primary border-1"
      //   role="alert"
      //   backgroundStyled={application.theme.primary}
      //   colorStyled={application.mode.primary}
      //   radiusStyled={application.settings.appRadius}
      //   fontSizeStyled={application.text.primary}
      // >
      //   Please reset password using the link sent to: {application.alerts.forgot} before continuing
      //   <button type="button" className="close" data-dismiss="alert" aria-label="Close">
      //     <span aria-hidden="true">&times;</span>
      //   </button>
      // </Div>
    );

    return (
      <div>
        {application.alerts.registered ? registeredAlert : null}
        {application.alerts.forgot ? forgotAlert : null}
        <H1 
          className="m-0 p-10px pt-20px text-center border-bottom-1 outer-shadow-primary font-weight-normal"
          backgroundStyled={application.theme.primaryQuarter}
          fontSizeStyled={application.text.heading}
        >
          <FormattedMessage
            id="login.Main"
            defaultMessage="Sign In"
          />
        </H1>
        <H2 
          className="p-10px text-center font-weight-normal"
          fontSizeStyled={application.text.description}
        >
          <FormattedMessage
            id="login.Secondary"
            defaultMessage="Welcome Back!"
          />
        </H2>
        <form className="form ml-auto mr-auto d-flex flex-direction-column text-center" noValidate onSubmit={this.onSubmit}>
          <Input
            type="email"
            name="email"
            placeholder={`${placeEmail}`}
            aria-label={`${placeEmailLabel}`}
            className="border-1 pl-10px pr-10px pt-5px pb-5px border-bottom-0 mb-0px"
            backgroundStyled={errors.data.email ? `${application.theme.primary}`: `${application.transparent}`}
            colorStyled={errors.data.email ? `${application.mode.primary}`: `${application.theme.primary}`}
            placeholderStyled={errors.data.email ? `${application.mode.primary}`: `${application.theme.primary}`}
            fontSizeStyled={application.text.primary}
            borderStyled={application.theme.primary}
            radiusStyled={application.settings.appRadiusTop}
            value={this.state.email}
            onChange={this.onChange}
          />

          <Input
            type="password"
            name="password"
            placeholder={`${placePass}`}
            aria-label={`${placePassLabel}`}
            className="border-1 pl-10px pr-10px pt-5px pb-5px mt-0px mb-10px"
            backgroundStyled={errors.data.password ? `${application.theme.primary}`: `${application.transparent}`}
            colorStyled={errors.data.password ? `${application.mode.primary}`: `${application.theme.primary}`}
            placeholderStyled={errors.data.password ? `${application.mode.primary}`: `${application.theme.primary}`}
            fontSizeStyled={application.text.primary}
            borderStyled={application.theme.primary}
            radiusStyled={application.settings.appRadiusBottom}
            value={this.state.password}
            onChange={this.onChange}
          />

          <Input
            type="submit"
            value={`${placeSubmit}`}
            className={`clickable mt-10px p-5px mb-20px webkit-appearance-none outer-shadow-primary border-1`}
            transitionStyled={application.transitions.general}
            backgroundStyled={application.theme.primaryQuarter}
            backgroundHoverStyled={application.theme.primary}
            colorStyled={application.mode.primary}
            fontSizeStyled={application.text.important}
            borderStyled={application.mode.primary}
            radiusStyled={application.settings.appRadius}
          />

          <div>
            <ul>
              {errors.data.email ? 
                <li>{errors.data.email}</li> : ``
              }
              {errors.data.password ? 
                <li>{errors.data.password}</li> : ``
              }
            </ul>
          </div>
        </form>
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
