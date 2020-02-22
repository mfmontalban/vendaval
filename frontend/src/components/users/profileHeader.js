import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import isEmpty from '../../reducers/validation/is-empty';

import Div from '../application/main/common/styled/div'
import LinkContainer from '../application/main/common/styled/linkContainer';

class ProfileHeader extends Component {
  render() {
    const { id, profile, application } = this.props;

    let profileLink;
    let edit;

    if (application.language === 'es') {
      profileLink = 'perfil';
      edit = 'editar';
    } else {
      profileLink = 'profile';
      edit = 'edit';
    }

    let editContent;
    let profilePicture;

    if (id === profile.user._id) {
      editContent =
      <div className="d-flex flex-row-reverse">
        <Link to={`/${profileLink}/${edit}`} className="mt-10px ml-10px p-10px">
          <LinkContainer transitionStyled={application.transitions.general} backgroundStyled={application.transparent} colorStyled={application.theme.primaryQuarter} colorHoverStyled={application.theme.primary}>
            <i className="fas fa-pencil text-light fa-2x" />
          </LinkContainer>
        </Link>
      </div>
    }

    if (profile.avatar) {
      profilePicture =
      <img
        className="outer-shadow-double border-radius-circle h-200px w-200px object-fit-cover"
        src={`/api/users/files/${profile.avatarLg}`}
        alt="Profile Picture"
      />
    } else {
      profilePicture = 
      <i className="fas fa-user fa-5x h-200px w-200px" />
    }

    return (
      <div className="row">
        <Div className="ml-10px mr-10px">
          <div className="card card-body bg-info text-white mb-3">
            {editContent}
            <div className="d-flex flex-direction-column justify-content-center ml-auto mr-auto">
              <Div className="z-900 d-flex justify-content-center overflow-hidden p-10px">
                {profilePicture}
              </Div>
              <h1 className="text-center mt-10px mb-0px">{profile.user.name}</h1>
              {isEmpty(profile.location) ? null : <p className="text-center m-0">{profile.location}</p>}
              <div className="d-flex flex-direction-row justify-content-center m-0">
                {isEmpty(profile.website) ? null : (
                  <a
                    href={"http://"+profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Div className="p-10px" transitionStyled={application.transitions.general} colorStyled={application.theme.primaryQuarter} colorHoverStyled={application.theme.primary}>
                      <i className="fas fa-globe fa-2x" />
                    </Div>
                  </a>
                )}

                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    href={"http://"+profile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Div className="p-10px" transitionStyled={application.transitions.general} colorStyled={application.theme.primaryQuarter} colorHoverStyled={application.theme.primary}>
                      <i className="fab fa-twitter fa-2x" />
                    </Div>
                  </a>
                )}

                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    href={"http://"+profile.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Div className="p-10px" transitionStyled={application.transitions.general} colorStyled={application.theme.primaryQuarter} colorHoverStyled={application.theme.primary}>
                      <i className="fab fa-facebook fa-2x" />
                    </Div>
                  </a>
                )}

                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a
                    href={"http://"+profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Div className="p-10px" transitionStyled={application.transitions.general} colorStyled={application.theme.primaryQuarter} colorHoverStyled={application.theme.primary}>
                      <i className="fab fa-linkedin fa-2x" />
                    </Div>
                  </a>
                )}

                {isEmpty(profile.social && profile.social.youtube) ? null : (
                  <a
                    href={"http://"+profile.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Div className="p-10px" transitionStyled={application.transitions.general} colorStyled={application.theme.primaryQuarter} colorHoverStyled={application.theme.primary}>
                      <i className="fab fa-youtube fa-2x" />
                    </Div>
                  </a>
                )}

                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a
                    href={"http://"+profile.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Div className="p-10px" transitionStyled={application.transitions.general} colorStyled={application.theme.primaryQuarter} colorHoverStyled={application.theme.primary}>
                      <i className="fab fa-instagram fa-2x" />
                    </Div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </Div>
      </div>
    );
  }
}

export default ProfileHeader;
