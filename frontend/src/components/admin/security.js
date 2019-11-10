import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { readAccountInfo } from '../../actions/adminActions';
import { sendApplicationAlertsUpdated } from '../../actions/applicationActions';

import Spinner from '../application/main/common/spinner.js'
import TextFieldGroup from '../application/main/common/textFieldGroup';
import Div from '../application/main/common/styled/div';
import H1 from '../application/main/common/styled/h1';
import H2 from '../application/main/common/styled/h2';
import Input from '../application/main/common/styled/input';
import Button from '../application/main/common/styled/button';

class Security extends Component {
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
    this.props.readAccountInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.application.errors!==prevProps.application.errors){
      //Perform some operation here
      this.setState({errors: this.props.application.errors});
    }

    if(this.props.admin!==prevProps.admin){

      const { admin } = this.props;

      // Set component fields state
      this.setState({
        name: admin.name,
        email: admin.email
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  canBeSubmitted() {
    const x = this.state.password2===this.state.password;
    const y = this.state.password2.length > 2;
    const z = x && y;
    return this.state.name!==this.props.admin.name || this.state.email!==this.props.admin.email || z===true;
  }

  onSubmit = (e) => {
    e.preventDefault();

    const accountData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.sendApplicationAlertsUpdated(accountData, this.props.history);
  }

  render() {
    let content;
    const { errors } = this.state;
    const { admin, application } = this.props;
    const isEnabled = this.canBeSubmitted();

    if (admin.loading) {
      content = (
        <Spinner />
      );
    } else {
      content = (
        <form className="w-80pc ml-auto mr-auto d-flex flex-direction-column text-center" noValidate onSubmit={this.onSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            aria-label="Field for updating your full name"
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
            type="text"
            name="email"
            placeholder="Email Address"
            aria-label="Field for updating your email address"
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
            placeholder="Password"
            aria-label="Field for updating your password"
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
            placeholder="Confirm Password"
            aria-label="Required Field for confirming your password"
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
            value="Submit"
            className={(isEnabled !== true ? `disabled` : `clickable`) + ` mt-10px mb-20px`}
            disabled={!isEnabled}
            transitionStyled={application.transitions.general}
            backgroundStyled={application.theme.primaryQuarter}
            backgroundHoverStyled={(isEnabled !== true ? application.theme.primaryQuarter : application.theme.primary)}
            colorStyled={application.mode.primary}
            fontSizeStyled={application.text.heading}
            borderStyled={application.mode.primary}
            radiusStyled={application.settings.appRadius}
          />
        </form>
      );
    }

    return (
      <Div className="scroll-container bottom-outer-shadow ml-10px mr-10px pl-10px pr-10px pt-70px" heightStyled={`${application.settings.heightHero}`} backgroundStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadiusBottom}`} colorStyled={`${application.theme.primary}`}>
        <H1 className="text-center">Account</H1>
        <H2 className="text-center">
          Update your information
        </H2>
        {content}
      </Div>
    );
  }
}

Security.propTypes = {
  readAccountInfo: PropTypes.func.isRequired,
  sendApplicationAlertsUpdated: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
});

export default connect(mapStateToProps, { readAccountInfo, sendApplicationAlertsUpdated })(withRouter(Security));
