import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { sendApplicationAlertsRegistered } from '../../actions/applicationActions';
import { FormattedMessage } from 'react-intl';

import Div from '../application/main/common/styled/div';
import H1 from '../application/main/common/styled/h1';
import H2 from '../application/main/common/styled/h2';
import Input from '../application/main/common/styled/input';
import TextFieldGroup from '../application/main/common/textFieldGroup';


class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
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

    const newUser = {
      language: this.props.application.language,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.sendApplicationAlertsRegistered(newUser, this.props.history);
  } 

  render() {

    const {application} = this.props;
    
    const setLanguage = this.props.application.language;

    let placeName;
    let placeNameLabel;

    let placeEmail;
    let placeEmailLabel;

    let placePass;
    let placePassLabel;

    let placePass2;
    let placePass2Label;

    let placeSubmit;

    if (setLanguage === 'es') {
      placeName = 'Nombre completo'
      placeNameLabel = 'Campo para nombre completo'

      placeEmail = 'E-correo personal'
      placeEmailLabel = 'Campo para e-correo personal'

      placePass = 'Contraseña'
      placePassLabel = 'Campo para contraseña'

      placePass2 = 'Confirmar Contraseña'
      placePass2Label = 'Campo para confirmar contraseña'

      placeSubmit = 'Envia'

    } else {
      placeName = 'Full Name'
      placeNameLabel = 'Field for full name'

      placeEmail = 'Email'
      placeEmailLabel = 'Field for email'

      placePass = 'Password'
      placePassLabel = 'Field for password'

      placePass2 = 'Confirm Password'
      placePass2Label = 'Field for confirming password'

      placeSubmit = 'Submit'
    }

    const { errors } = this.state;

    return (
      <Div className="scroll-container bottom-outer-shadow ml-10px mr-10px pl-10px pr-10px pt-70px" heightStyled={`${application.settings.heightHero}`} backgroundStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadiusBottom}`} colorStyled={`${application.theme.primary}`}>
        <H1 className="text-center">
          <FormattedMessage
            id="register.Main"
            defaultMessage="Sign Up"
          />
        </H1>
        <H2 className="text-center">
          <FormattedMessage
            id="register.Secondary"
            defaultMessage="Create your Vendaval account"
          />
        </H2>
        <form className="max-w-750px w-80pc ml-auto mr-auto d-flex flex-direction-column text-center" noValidate onSubmit={this.onSubmit}>

          <Input
            type="name"
            name="name"
            placeholder={`${placeName}`}
            aria-label={`${placeNameLabel}`}
            className="box-shadow-none border-1 pl-10px pr-10px pt-5px pb-5px mb-10px"
            backgroundStyled={errors.name ? `${application.theme.primary}`: `${application.transparent}`}
            colorStyled={errors.name ? `${application.mode.primary}`: `${application.theme.primary}`}
            placeholderStyled={errors.name ? `${application.mode.primary}`: `${application.theme.primary}`}
            fontSizeStyled={application.text.primary}
            borderStyled={application.theme.primary}
            radiusStyled={application.settings.appRadius}
            value={this.state.name}
            onChange={this.onChange}
          />

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
        <Link to="/verify/resend" className="d-flex justify-content-center noUnderline">
          <Div className="w-max-content border-bottom-1" transitionStyled={application.transitions.general} colorStyled={application.theme.primary} borderBottomStyled={application.transparent} borderBottomHoverStyled={application.theme.primary}>
            <FormattedMessage
              id="register.forgotLink"
              defaultMessage="Didn't get your code? Follow this link to resend it"
            />
          </Div>
        </Link>
      </Div>
    );
  }
}

Register.propTypes = {
  sendApplicationAlertsRegistered: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application
});

export default connect(mapStateToProps, { sendApplicationAlertsRegistered })(withRouter(Register));
