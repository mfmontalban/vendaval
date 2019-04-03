import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { sendApplicationAlertsRegistered } from '../../actions/applicationActions';
import { FormattedMessage } from 'react-intl';

import TextFieldGroup from '../application/common/textFieldGroup';

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
      password2: this.state.password2
    };

    this.props.sendApplicationAlertsRegistered(newUser, this.props.history);
  }

  render() {

    const setLanguage = this.props.application.language;

    let placeName;
    let placeEmail;
    let emailInfo;

    let placePass;
    let placePass2;

    let placeSubmit;

    if (setLanguage === 'es') {
      placeName = 'Nombre'

      placeEmail = 'E-correo'
      emailInfo = 'Registra su e-correo con Gravatar para usar un imagen en su perfil'

      placePass = 'Contraseña'
      placePass2 = 'Confirmar Contraseña'

      placeSubmit = 'Entra'

    } else {
      placeName = 'Name'

      placeEmail = 'Email'
      emailInfo = 'Register this email with Gravatar to use a profile image'

      placePass = 'Password'
      placePass2 = 'Confirm Password'

      placeSubmit = 'Enter'
    }

    const { errors } = this.state;

    return (
      <div className="body scroll-container pt-3 pb-3">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">
            <FormattedMessage
              id="register.Main"
              defaultMessage="Sign Up"
            />
          </h1>
          <p className="lead text-center">
            <FormattedMessage
              id="register.Secondary"
              defaultMessage="Create your Vendaval account"
            />
          </p>
          <form noValidate onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder={`${placeName}`}
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextFieldGroup
              placeholder={`${placeEmail}`}
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
              info={`${emailInfo}`}
            />
            <TextFieldGroup
              placeholder={`${placePass}`}
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
            <TextFieldGroup
              placeholder={`${placePass2}`}
              name="password2"
              type="password"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
            />
            <input type="submit" value={`${placeSubmit}`} className="btn btn-info btn-block mt-4" />
          </form>
          <Link to="/verify/resend" className="btn-block mt-5 text-center text-info">
            <FormattedMessage
              id="register.forgotLink"
              defaultMessage="Didn't get your code? Follow this link to resend it"
            />
          </Link>
        </div>
      </div>
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
