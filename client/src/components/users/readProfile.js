import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProfileByHandle } from '../../actions/usersActions';

import Spinner from '../application/common/spinner.js'
import ProfileHeader from './profileHeader';
import ProfileAbout from './profileAbout';
import Footer from '../application/layout/footer'

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

    const id = this.props.admin.id;
    const { profile, loading } = this.props.users;

    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {

      profileContent =
      <div>
        <ProfileHeader profile={profile} id={id} />
        <ProfileAbout profile={profile} />
      </div>;
    }

    return (
      <div>
        <div className="body scroll-container p-3">
          {profileContent}
        </div>
        <Footer />
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  users: state.users
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
