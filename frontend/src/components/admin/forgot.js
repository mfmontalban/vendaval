import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { sendApplicationAlertsForgot } from '../../actions/applicationActions';
import { FormattedMessage } from 'react-intl';


import Div from '../application/common/styled/div';
import H1 from '../application/common/styled/h1';
import H2 from '../application/common/styled/h2';
import Input from '../application/common/styled/input';

class Forgot extends Component {
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
      <div>
        <H1 
          className="m-0 p-10px pt-20px text-center border-bottom-1 outer-shadow-primary font-weight-normal"
          backgroundStyled={application.theme.primaryQuarter}
          fontSizeStyled={application.text.heading}
        >
          <FormattedMessage
            id="forgot.Main"
            defaultMessage="Forgot"
          />
        </H1>
        
        <H2 
          className="p-10px text-center font-weight-normal"
          fontSizeStyled={application.text.description}
        >
          <FormattedMessage
            id="forgot.Secondary"
            defaultMessage="Enter your email below to reset your password"
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
          <div>
            <ul>
              {errors.data.email ? 
                <li>{errors.data.email}</li> : ``
              }
            </ul>
          </div>
        </form>
      </div>
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
