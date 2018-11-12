import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentSeguridad } from '../../actions/seguridadActions';
import Spinner from '../common/Spinner.js'

class Seguridad extends Component {

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {

    const { user } = this.props.auth;

    const { profile, loading } = this.props.profile;

    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        profileContent = (
          <div>
            <h4>Display Profile</h4>
            <Link to="/profile/eidt" className="btn btn-light">
              <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
            </Link>
          </div>
        );
      } else {
        profileContent =
        <div>
          <p className="lead text-muted">Welcome { user.name }</p>
          <p>Please click the link below to create your profile.</p>
          <Link to="/profile/create" className="btn btn-lg btn-info">Create</Link>
        </div>
      }
    }

    return (
      <div className="body scroll-container pt-3 pb-3">
        {profileContent}
      </div>
    );
  }
}

Seguridad.propTypes = {
  getCurrentSeguridad: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentSeguridad })(Seguridad);
