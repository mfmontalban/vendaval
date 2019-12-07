import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { sendApplicationAlertsForgot } from '../../actions/applicationActions';
import { FormattedMessage } from 'react-intl';


import Div from '../application/main/common/styled/div';
import H1 from '../application/main/common/styled/h1';
import H2 from '../application/main/common/styled/h2';
import Input from '../application/main/common/styled/input';

import TextFieldGroup from '../application/main/common/textFieldGroup';


class Forgot extends Component {
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

    const user = {
      email: this.state.email,
    };

    this.props.sendApplicationAlertsForgot(user, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { application } = this.props;

    let placeEmail;
    let placeEmailLabel;
    let placeSubmit;

    if (application.language === 'es') {
      placeEmail = 'E-correo personal'
      placeEmailLabel = 'Campo para e-correo personal'

      placeSubmit = 'Envia'

    } else {
      placeEmail = 'Email'
      placeEmailLabel = 'Field for email'

      placeSubmit = 'Submit'
    }

    return (
      <Div className="scroll-container bottom-outer-shadow ml-10px mr-10px pl-10px pr-10px pt-70px" heightStyled={`${application.settings.heightHero}`} backgroundStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadiusBottom}`} colorStyled={`${application.theme.primary}`}>
        <H1 className="text-center">
          <FormattedMessage
            id="forgot.Main"
            defaultMessage="Forgot"
          />
        </H1>
        <H2 className="text-center">
          <FormattedMessage
            id="forgot.Secondary"
            defaultMessage="Enter your email below to reset your password"
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

Forgot.propTypes = {
  sendApplicationAlertsForgot: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application
});

export default connect(mapStateToProps, { sendApplicationAlertsForgot })(withRouter(Forgot));
