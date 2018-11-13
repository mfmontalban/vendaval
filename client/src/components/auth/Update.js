import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyUpdate } from '../../actions/authActions';
import { Link } from 'react-router-dom';

class Confirm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.match.params.key) {
      this.props.verifyUpdate(this.props.match.params.key);
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    let { verify } = this.props;
    let { auth } = this.props;

    const loggedIn = (
      <Link to="/vientos" className="btn btn-block btn-info">
        Explore New Vientos
      </Link>
    );

    const loggedOut = (
      <Link to="/login" className="btn btn-block btn-info">
        Sign In
      </Link>
    );

    const success =
      <div>
        <h1 className="display-4 text-center">Verified</h1>
        <p className="lead text-center">
          Thank you for updating your email address!
        </p>
        {auth ? loggedIn : loggedOut}
      </div>
    ;

    const expired =
      <div>
        <h1 className="display-4 text-center">Resend</h1>
        <p className="lead text-center">
          Sorry, but we couldn't find your update email validation token.
        </p>
        <p className="display-6 text-center">
          If you continue to encounter this error, please email us at contacto@vendaval.space
        </p>
        <Link to="/login" className="btn-block mt-5 text-center text-info">
          Sign In
        </Link>
      </div>
    ;

    return (
      <div className="body scroll-container pt-3 pb-3">
        <div className="container pt-4">
          <div className="row">
            <div className="col-md-8 m-auto">
            {verify.success ? success : null}
            {verify.expired ? expired : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Confirm.propTypes = {
  verifyUpdate: PropTypes.func.isRequired,
  alerts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  verify: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alerts,
  auth: state.auth,
  errors: state.errors,
  verify: state.verify
});

export default connect(mapStateToProps, { verifyUpdate })(withRouter(Confirm));
