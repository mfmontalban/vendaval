import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileByHandle } from '../../actions/profileActions';
import Spinner from '../common/Spinner.js'
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';

class Profile extends Component {

  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params !== prevProps.match.params) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {

    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {

      profileContent =
      <div>
        <ProfileHeader profile={profile} user={user} />
        <ProfileAbout profile={profile} />
      </div>;
    }

    return (
      <div className="body scroll-container pt-3 pb-3">
        {profileContent}
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
