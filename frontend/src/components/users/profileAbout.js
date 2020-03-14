import React, { Component } from 'react';
import PropTypes from 'prop-types';

import isEmpty from '../../reducers/validation/is-empty';
import { FormattedMessage } from 'react-intl';

import Div from '../application/common/styled/div'

class ProfileAbout extends Component {
  render() {
    const { profile, application } = this.props;

    // Get first name
    const firstName = profile.user.name.trim().split(' ')[0];

    // Skill List
    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));

    return (
      <div className="row max-w-750px ml-auto mr-auto">
        <Div className="m-10px p-10px" backgroundStyled={application.theme.primaryQuarter} radiusStyled={application.settings.appRadius}>
          <h3 className="text-center text-info mt-10px mb-10px">
            <FormattedMessage
              id="profile.aboutTitle"
              defaultMessage="About"
            />
          </h3>
          <p className="text-center">
            {isEmpty(profile.bio) ? (
              <div className="d-flex flex-direction-row justify-content-center align-items-center">
                <p className="mr-5px">{firstName}</p>
                <FormattedMessage
                  id="profile.emptyBio"
                  defaultMessage=" does not have a bio"
                />
              </div>
            ) : (
              <p>{profile.bio}</p>
            )}
          </p>
          <Div className="h-0 m-pt25em0em overflow-hidden border-top-1" colorStyled={`${application.theme.primary}`}/>
          <h3 className="text-center text-info mt-10px mb-10px">
            <FormattedMessage
              id="profile.talentsTitle"
              defaultMessage="Talents"
            />
          </h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {skills}
            </div>
          </div>
        </Div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  application: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
