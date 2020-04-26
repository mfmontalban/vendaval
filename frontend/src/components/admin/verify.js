import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { verifyApplicationAlertsRegistered, resendApplicationAlertsRegistered } from '../../actions/applicationActions';

import { FormattedMessage } from 'react-intl';

import TextFieldGroup from '../application/common/textFieldGroup';
import Div from '../application/common/styled/div';
import H1 from '../application/common/styled/h1';
import H2 from '../application/common/styled/h2';
import Input from '../application/common/styled/input';

class Confirm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      errors: {
        data: {
          email: ''
        }
      }
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
      email: this.state.email
    };

    this.props.resendApplicationAlertsRegistered(userData, this.props.history);
  }

  render() {

    const { errors } = this.state;
    const { application } = this.props;
    const { verify } = this.props.application;

    let placeEmail;
    let placeEmailLabel;
    let placeSubmit;
    let register;
    let login;

    if (application.language === 'es') {
      placeEmail = 'E-correo personal'
      placeEmailLabel = 'Campo para e-correo personal'
      placeSubmit = 'Enviar'
      register = 'registrar'
      login = 'iniciar'

    } else {
      placeEmail = 'Email'
      placeEmailLabel = 'Field for email'
      placeSubmit = 'Submit'
      register = 'register'
      login = 'login'
    }

    const success =
      <div>
       <H1 
          className="m-0 p-10px pt-20px text-center border-bottom-1 outer-shadow-primary font-weight-normal"
          backgroundStyled={application.theme.primaryQuarter}
          fontSizeStyled={application.text.heading}
        >
          <FormattedMessage
            id="verify.Main"
            defaultMessage="Verify"
          />
        </H1>
        <H2 
          className="p-10px text-center font-weight-normal"
          fontSizeStyled={application.text.description}
        >
          <FormattedMessage
            id="verify.SecondarySuccess"
            defaultMessage="Thanks for signing up!"
          />
        </H2>

        <Link to={`/${login}`} className="d-flex justify-content-center noUnderline">
          <Div 
            className="w-max-content border-bottom-1 m-20px text-center" 
            transitionStyled={application.transitions.general} 
            colorStyled={application.theme.primary} 
            borderBottomStyled={application.transparent} 
            borderBottomHoverStyled={application.theme.primary}>
            <FormattedMessage
              id="navigation.login"
              defaultMessage="Login"
            />
          </Div>
        </Link>
      </div>
    ;

    const expired =
      <div>
        <H1 
          className="m-0 p-10px pt-20px text-center border-bottom-1 outer-shadow-primary font-weight-normal"
          backgroundStyled={application.theme.primaryQuarter}
          fontSizeStyled={application.text.heading}
        >
          <FormattedMessage
            id="verify.Main"
            defaultMessage="Verify"
          />
        </H1>
        <H2 
          className="p-10px text-center font-weight-normal"
          fontSizeStyled={application.text.description}
        >
          <FormattedMessage
            id="verify.SecondaryFail"
            defaultMessage="Welcome Back!"
          />
        </H2>
        <form className="form ml-auto mr-auto d-flex flex-direction-column text-center" noValidate onSubmit={this.onSubmit}>
        <Input
            type="email"
            name="email"
            placeholder={`${placeEmail}`}
            aria-label={`${placeEmailLabel}`}
            className="box-shadow-none border-1 pl-10px pr-10px pt-5px pb-5px mb-10px"
            backgroundStyled={errors.data.email ? `${application.theme.primary}`: `${application.transparent}`}
            colorStyled={errors.data.email ? `${application.mode.primary}`: `${application.theme.primary}`}
            placeholderStyled={errors.data.email ? `${application.mode.primary}`: `${application.theme.primary}`}
            fontSizeStyled={application.text.primary}
            borderStyled={application.theme.primary}
            radiusStyled={application.settings.appRadius}
            value={this.state.email}
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
        </form>
        <Link to={`/${register}`} className="d-flex justify-content-center noUnderline">
          <Div 
            className="w-max-content border-bottom-1 m-20px text-center" 
            transitionStyled={application.transitions.general} 
            colorStyled={application.theme.primary} 
            borderBottomStyled={application.transparent} 
            borderBottomHoverStyled={application.theme.primary}>
            <FormattedMessage
              id="verify.signUp"
              defaultMessage="Or, Sign Up"
            />
          </Div>
        </Link>
      </div>
    ;

    return (
      <div>
        <div>
          {verify.success ? success : null}
          {verify.expired ? expired : null}
        </div>
        <div className="d-flex justify-content-center">
          <ul>
            {errors.data.email ? 
              <li>{errors.data.email}</li> : ``
            }
          </ul>
        </div>
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
