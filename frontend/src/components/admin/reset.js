import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { verifyApplicationAlertsForgot, resendApplicationAlertsForgot, resetAccountPassword } from '../../actions/applicationActions';
import { FormattedMessage } from 'react-intl';

import Div from '../application/common/styled/div';
import H1 from '../application/common/styled/h1';
import H2 from '../application/common/styled/h2';
import Input from '../application/common/styled/input';

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
    const { application } = this.props;
    const setLanguage = this.props.application.language;

    let placeName;
    let placeNameLabel;

    let placeEmail;
    let placeEmailLabel;

    let placePass;
    let placePassLabel;

    let placePass2;
    let placePass2Label;

    let placeReset;
    let placeResend;

    if (setLanguage === 'es') {

      placeEmail = 'E-correo personal'
      placeEmailLabel = 'Campo para e-correo personal'

      placePass = 'Contraseña'
      placePassLabel = 'Campo para contraseña'

      placePass2 = 'Confirmar Contraseña'
      placePass2Label = 'Campo para confirmar contraseña'

      placeReset = 'Reiniciar'
      placeResend = 'Reenviar'

    } else {

      placeEmail = 'Email'
      placeEmailLabel = 'Field for email'

      placePass = 'Password'
      placePassLabel = 'Field for password'

      placePass2 = 'Confirm Password'
      placePass2Label = 'Field for confirming password'

      placeReset = 'Reset'
      placeResend = 'Resend'
    }

    const expired =
      <Div>
        <H1 className="text-center">
          <FormattedMessage
            id="reset.MainExpired"
            defaultMessage="Expired"
          />
        </H1>
        <H2 className="text-center">
          <FormattedMessage
            id="reset.SecondaryExpired"
            defaultMessage="Sorry, but it appears your forget password token doesn't exist or has expired."
          />
        </H2>
        <form noValidate onSubmit={this.onSubmitResend}>
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
            type="submit"
            value={`${placeResend}`}
            className={`clickable mt-10px mb-20px webkit-appearance-none`}
            transitionStyled={application.transitions.general}
            backgroundStyled={application.theme.primaryQuarter}
            backgroundHoverStyled={application.theme.primary}
            colorStyled={application.mode.primary}
            fontSizeStyled={application.text.heading}
            borderStyled={application.mode.primary}
            radiusStyled={application.settings.appRadius}
          />
        </form>
        <Link to="/login" className="btn-block mt-5 text-center text-info">
          Or try signing in if you're feeling confident...
        </Link>
      </Div>
    ;

    const success =
      <Div>
        <h1 className="display-4 text-center">Reset</h1>
        <p className="lead text-center">
          Please use the below form to reset your password:
        </p>
        <form noValidate onSubmit={this.onSubmitReset}>
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
            type="password"
            name="password2"
            placeholder={`${placePass2}`}
            aria-label={`${placePass2Label}`}
            className="box-shadow-none border-1 pl-10px pr-10px pt-5px pb-5px mb-10px"
            backgroundStyled={errors.password2 ? `${application.theme.primary}`: `${application.transparent}`}
            colorStyled={errors.password2 ? `${application.mode.primary}`: `${application.theme.primary}`}
            placeholderStyled={errors.password2 ? `${application.mode.primary}`: `${application.theme.primary}`}
            fontSizeStyled={application.text.primary}
            borderStyled={application.theme.primary}
            radiusStyled={application.settings.appRadius}
            value={this.state.password2}
            onChange={this.onChange}
          />
          <Input
            type="submit"
            value={`${placeReset}`}
            className={`clickable mt-10px mb-20px webkit-appearance-none outer-shadow-primary border-1`}
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
    ;

    return (
      <div className="h-100 overflow-scroll scrollbar-width-none">
        {application.verify.success ? success : null}
        {application.verify.expired ? expired : null}
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
