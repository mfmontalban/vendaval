import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { readAccountInfo } from '../../actions/adminActions';
import { sendApplicationAlertsUpdated } from '../../actions/applicationActions';

import Spinner from '../application/common/spinner.js'
import TextFieldGroup from '../application/common/textFieldGroup';
import Footer from '../application/layout/footer'

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
    const { loading } = this.props.admin;
    const isEnabled = this.canBeSubmitted();

    if (loading) {
      content = (
        <Spinner />
      );
    } else {
      content = (
        <form noValidate onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="Full Name"
            name="name"
            type="name"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
          />
          <TextFieldGroup
            placeholder="Email Address"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
            info="Please register this email address with Gravatar to use a profile picture"
          />

          <TextFieldGroup
            placeholder="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
          />
          <TextFieldGroup
            placeholder="Confirm Password"
            name="password2"
            type="password"
            value={this.state.password2}
            onChange={this.onChange}
            error={errors.password2}
          />
          <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" disabled={!isEnabled}/>
        </form>
      );
    }

    return (
      <div>
        <div className="body scroll-container p-3">
          <div className="container pt-4">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Account</h1>
                <p className="lead text-center">
                  Update your information
                </p>
                {content}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
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
