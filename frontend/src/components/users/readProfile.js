import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProfileByHandle } from '../../actions/usersActions';

import Spinner from '../application/main/common/spinner.js'
import Div from '../application/main/common/styled/div.js'
import ProfileHeader from './profileHeader';
import ProfileAbout from './profileAbout';

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
    const { application } = this.props;
    const { settings } = this.props.application;

    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {

      profileContent =
      <div>
        <ProfileHeader application={application} profile={profile} id={id} />
        <ProfileAbout application={application} profile={profile} />
      </div>;
    }

    return (
      <Div className="scroll-container bottom-outer-shadow ml-10px mr-10px pt-70px" heightStyled={`${settings.heightHero}`} backgroundStyled={`${application.mode.primary}`} radiusStyled={`${settings.appRadiusBottom}`} colorStyled={`${application.theme.primary}`}>
        {profileContent}
      </Div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
  users: state.users
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
