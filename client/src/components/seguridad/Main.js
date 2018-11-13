import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCurrentSeguridad, editAccount } from '../../actions/seguridadActions';
import TextFieldGroup from '../common/TextFieldGroup';
import isEmpty from '../../validation/is-empty';

class Seguridad extends Component {
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
    this.props.getCurrentSeguridad();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.seguridad.account) {
      const account = nextProps.seguridad.account;

      // If profile field doesnt exist, make empty string
      account.name = !isEmpty(account.name) ? account.name : '';
      account.email = !isEmpty(account.email) ? account.email : '';
      account.password = '';

      // Set component fields state
      this.setState({
        name: account.name,
        email: account.email,
        password: account.password
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const accountData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.editAccount(accountData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="body scroll-container pt-3 pb-3">
      <div className="container pt-4">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Account</h1>
            <p className="lead text-center">
              Update your information
            </p>
            <form noValidate onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="Full Name"
                name="name"
                type="emnameail"
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
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

Seguridad.propTypes = {
  getCurrentSeguridad: PropTypes.func.isRequired,
  editAccount: PropTypes.func.isRequired,
  seguridad: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  seguridad: state.seguridad,
  errors: state.errors
});

export default connect(mapStateToProps, { getCurrentSeguridad, editAccount })(withRouter(Seguridad));
