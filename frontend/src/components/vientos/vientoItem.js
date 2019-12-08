import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { sendVoteUp, sendVoteDown } from '../../actions/vientosActions';

import {FormattedMessage, FormattedRelative} from 'react-intl';

import Div from '../application/main/common/styled/div';
import LinkContainer from '../application/main/common/styled/linkContainer';

class VientoItem extends Component {

  voteUp = (category, id, e) => {
    let packet = {};
    packet.category = category;
    packet.id = id;
    
    this.props.sendVoteUp(packet);
  }

  voteDown = (category, id, e) => {
    let packet = {};
    packet.category = category;
    packet.id = id;
    
    this.props.sendVoteDown(packet);
  }

  render() {
    const { admin, application, viento } = this.props;
    const setLanguage = this.props.application.language;
    const { settings } = this.props.application;
    
    let community;
    let commentsActivity;
    let likesActivity;
    let positiveVote;
    let negativeVote;

    if (setLanguage === 'es') {
      community = 'communidad';
    } else {
      community = 'community';
    }

    if (viento.likesUp.length > 0) {
      if (viento.likesUp.filter(like => like.user.toString() === admin.id)) {
        positiveVote = <LinkContainer transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.theme.primary}`}><i className='mr-5px clickable fas fa-arrow-alt-up'></i></LinkContainer>;
      }
    } else {
      positiveVote = <LinkContainer transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primaryHalf}`} colorHoverStyled={`${application.theme.primary}`}><i className='mr-5px clickable fas fa-arrow-alt-up'></i></LinkContainer>;
    }

    if (viento.likesDown.length > 0) {
      if (viento.likesDown.filter(like => like.user.toString() === admin.id)) {
        negativeVote = <LinkContainer transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.theme.primary}`}><i className='clickable fas fa-arrow-alt-down'></i></LinkContainer>
      }
    } else {
      negativeVote = <LinkContainer transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primaryHalf}`} colorHoverStyled={`${application.theme.primary}`}><i className='clickable fas fa-arrow-alt-down'></i></LinkContainer>
    }

    if (viento.likesUp || viento.likesDown) {
      if (admin.handle) {
        likesActivity = (
          <div className="post-time-heading d-flex p-5px">
            <div onClick={(e) => this.voteUp('likesUp', viento._id, e)}>
              {positiveVote}
            </div>
    
            <div className='mr-5px'>{viento.likesUp.length - viento.likesDown.length}</div>
    
            <div onClick={(e) => this.voteDown('likesDown', viento._id, e)}>
              {negativeVote}
            </div>
          </div>
        );
      } else {
        likesActivity = (
          <div className="post-time-heading d-flex p-5px">
            <div title="Please create an account to like a contribution">
              {positiveVote}
            </div>
    
            <div className='mr-5px'>{viento.likesUp.length - viento.likesDown.length}</div>
    
            <div title="Please create an account to like a contribution">
              {negativeVote}
            </div>
          </div>
        );
      }
    } else {
      if (admin.handle) {
        likesActivity = (
          <div className="post-time-heading d-flex p-5px">
            <div onClick={(e) => this.voteUp('likesUp', viento._id, e)}>
              {positiveVote}
            </div>
    
            <div className='mr-5px'>0</div>
    
            <div onClick={(e) => this.voteDown('likesDown', viento._id, e)}>
              {negativeVote}
            </div>
          </div>
        );
      } else {
        likesActivity = (
          <div className="post-time-heading d-flex p-5px">
            <div title="Please create an account to like a contribution">
              {positiveVote}
            </div>
    
            <div className='mr-5px'>0</div>
    
            <div title="Please create an account to like a contribution">
              {negativeVote}
            </div>
          </div>
        );
      }
    }

    let publicLength;

      publicLength = (
        viento.comments.filter(comment => {
          if (comment !== '' || null ) {
            let commentMatch = comment.category.includes('public');
            return commentMatch;
          }
          return comment;
        })
      );

    if (viento.comments.length > 0) {

      commentsActivity = (
        <Link className="noUnderline" to={`/vientos/${viento._id}`}>
          <LinkContainer className="p-5px clickable post-time-heading noUnderline"  transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primaryHalf}`} colorHoverStyled={`${application.theme.primary}`}>
            {publicLength.length}
            <i className="ml-5px fal fa-comment-alt"></i>
          </LinkContainer>
        </Link>
      );
    } else {
      commentsActivity = (
        <Link className="noUnderline" to={`/vientos/${viento._id}`}>
          <LinkContainer className="p-5px clickable post-time-heading noUnderline" transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primaryHalf}`} colorHoverStyled={`${application.theme.primary}`}>
            0 <i className="ml-5px fal fa-comment-alt"></i>
          </LinkContainer>
        </Link>
      );
    }

    return (
      <Div className="viento-container mt-10px ml-auto mr-auto" backgroundStyled={`${application.mode.primary}`} colorStyled={`${application.theme.primary}`} borderStyled={`${application.settings.appRadius}`} radiusStyled={`${application.settings.appRadius}`}>
          <div className="w-100 d-flex flex-row justify-content-space-between align-items-end">
            <div className="p-5px text-left">
              {/* <div className="post-section-heading">{viento.type}: {viento.topic}</div> */}
              <div className="post-section-heading">
              
                <Link className="noUnderline" to={`/${community}/${viento.profile.handle}`}>
                  <Div className="noUnderline border-bottom-1" transitionStyled={`${settings.appTransition}`} colorStyled={`${application.theme.primary}`} borderBottomHoverStyled={`${application.theme.primary}`}>
                    {viento.user.name}
                  </Div>
                </Link>

              </div>
            </div>
            <div className="p-5px text-right">
              <div className="post-time-heading">
                <FormattedMessage
                    id="viento.time_since_created"
                    defaultMessage={`{formattedLastLoginTime}`}
                    values={{
                        formattedLastLoginTime: (
                            <FormattedRelative value={viento.createdAt} />
                        ),
                    }}
                />
              </div>
            </div>
          </div>
          <div className="w-100 d-flex flex-wrap justify-content-space-between z-99 position-relative">
            <Link className="w-100 h-150px noUnderline" to={`/vientos/${viento._id}`}>
              <img className="h-150px w-100 banner ml-auto mr-auto" alt="banner" src={`/api/staff/files/${viento.bannerSm}`} />
            </Link>
          </div>
          <div className="w-max-content justify-content-between text-left mt-neg140px ml-10px z-100 position-relative">
            <Link className="w-100 h-150px noUnderline" to={`/vientos/${viento._id}`}>
              <Div className="w-max-content p-5px noUnderline" transitionStyled={`${settings.appTransition}`} backgroundStyled={`${application.mode.primaryThree}`} backgroundHoverStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadius}`}>
                {viento.title}
              </Div>
              <br />
              <Div className="w-max-content p-5px noUnderline" transitionStyled={`${settings.appTransition}`} backgroundStyled={`${application.mode.primaryThree}`} backgroundHoverStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadius}`}>
                {viento.description}
              </Div>
            </Link>
          </div>
          <div className="w-100 d-flex flex-row justify-content-space-between align-items-end mt-64px">
            <div className="d-flex flex-wrap justify-content-space-between w-100">
              {likesActivity}
              <div className="post-time-heading">
                <Link className="noUnderline" to={`/vientos/${viento._id}`}>
                  <Div className="text-info noUnderline" transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primaryHalf}`} colorHoverStyled={`${application.theme.primary}`}>
                    <i className="p-5px clickable fal fa-share-square"></i>
                  </Div>
                </Link>
              </div>
              {commentsActivity}
            </div>
          </div>
      </Div>
    );
  }
}

VientoItem.propTypes = {
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  viento: PropTypes.object.isRequired,
  sendVoteUp: PropTypes.func.isRequired,
  sendVoteDown: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
  vientos: state.viento
});

export default connect(mapStateToProps, { sendVoteUp, sendVoteDown })(VientoItem);
