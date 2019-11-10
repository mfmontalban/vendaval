import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { addReplyLike, deleteReply } from '../../actions/vientosActions';

import {FormattedRelative, intlShape, injectIntl} from 'react-intl';

import ReplyOption from './ReplyOption';

import Div from '../application/main/common/styled/div';
import Button from '../application/main/common/styled/button';

class CommentItem extends Component {

  addReplyLike(){
    const {vientoID, commentID, reply} = this.props;
    this.props.addReplyLike(vientoID, commentID, reply._id);
  }

  render() {
    const { reply, admin, application, intl, vientoID, commentID } = this.props;

    let likes;
    let community;
    let activeLike;

    if (application.language === 'es') {
        community = 'communidad';
    } else {
        community = 'community';
    }

    let title = intl.formatDate(reply.date) + ' ' + intl.formatTime(reply.date);

    if (reply.likes.length > 0 ) {
      likes = (
        <Div
          className="ml-10px p-1px5px border-radius-circle"
          backgroundStyled={application.theme.primary}
          colorStyled={application.mode.primary}
        >
          {reply.likes.length}
        </Div>
      );
      reply.likes.map(like => {
        if (like.user.toString() === this.props.admin.id) {
          activeLike = true
        }
      });
    } else {
      likes = '';
    }

    return (
      <Div key={reply._id} className="d-flex flex-direction-column outer-shadow p-10px mb-10px" backgroundStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadius}`}>
        <div className="d-flex flex-direction-row justify-content-space-between align-items-center">
          <Link className="d-flex flex-direction-row align-items-center noUnderline mb-10px w-max-content" to={`/${community}/${reply.user.profile.handle}`}>
            <div className="h-40px w-40px d-flex justify-content-center">
              <img
                className="h-100 w-100 outer-shadow-double border-radius-circle object-fit-cover"
                src={`/api/staff/files/${reply.user.profile.avatarSm}`}
                alt="Profile Picture"
              />
            </div>
            <Div className="ml-10px" transitionStyled={application.transitions.general} colorStyled={application.theme.primaryThree} colorHoverStyled={application.theme.primary}>{reply.user.name}</Div>
          </Link>
          {reply.user._id === admin.id ? (
            <ReplyOption vientoID={vientoID} commentID={commentID} replyID={reply._id} />
          ) : null}
        </div>
        <div title={title}>
          <FormattedRelative value={reply.date} />
        </div>
        <p>
          {reply.text}
        </p>
        <div className="d-flex flex-direction-row align-items-center mb-10px">
          <Button
            onClick={() => this.addReplyLike()}
            type="button"
            className="w-max-content border-1 p-10px clickable"
            transitionStyled={application.transitions.general}
            backgroundStyled={activeLike === true ? `${application.theme.primary}`: `${application.mode.primary}`}
            backgroundHoverStyled={application.theme.primaryQuarter}
            colorStyled={activeLike === true ? `${application.mode.primary}`: `${application.theme.primary}`}
            colorHoverStyled={application.theme.primary} 
            radiusStyled={application.settings.appRadius}
          >
            <i className="fas fa-thumbs-up" />
          </Button>
          {likes}
        </div>
      </Div>
    );
  }
}

CommentItem.propTypes = {
  intl: intlShape.isRequired,
  addReplyLike: PropTypes.func.isRequired,
  deleteReply: PropTypes.func.isRequired,
  reply: PropTypes.object.isRequired,
  commentID: PropTypes.string.isRequired,
  vientoID: PropTypes.string.isRequired,
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application
});

export default injectIntl(connect(mapStateToProps, { addReplyLike, deleteReply })(CommentItem));