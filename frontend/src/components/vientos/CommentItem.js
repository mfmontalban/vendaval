import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { addCommentLike, deleteComment } from '../../actions/vientosActions';

import {FormattedRelative, intlShape, injectIntl} from 'react-intl';

import ReplyFeed from './ReplyFeed';
import ReplyButton from './ReplyButton';
import CommentOption from './CommentOption';

import Div from '../application/main/common/styled/div';
import Button from '../application/main/common/styled/button';

class CommentItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      outsideClicked: false,
      repliesOpen: false,
      repliesMessage: 'Show Replies',
    }
  }

  showReplies(){
    if (this.state.repliesOpen === false) {
      this.setState(prevState => ({
        repliesOpen: true,
        repliesMessage: 'Hide Replies',
      }))
    } else {
      this.setState(prevState => ({
        repliesOpen: false,
        repliesMessage: 'Show Replies',
      }))
    }
  }

  addCommentLike(){
    const {vientoId, comment} = this.props;
    this.props.addCommentLike(vientoId, comment._id);
  }

  onDeleteClick(vientoId, commentId) {
    this.props.deleteComment(vientoId, commentId);
  }

  render() {
    const { repliesOpen, repliesMessage } = this.state;
    const { comment, admin, application, vientoId, intl } = this.props;

    let likes;
    let community;
    let activeLike;

    if (application.language === 'es') {
        community = 'communidad';
    } else {
        community = 'community';
    }

    let title = intl.formatDate(comment.date) + ' ' + intl.formatTime(comment.date); 

    if (comment.likes.length > 0 ) {
      likes = (
        <Div 
          className="ml-10px p-1px5px border-radius-circle"
          backgroundStyled={application.theme.primary}
          colorStyled={application.mode.primary}
        >
          {comment.likes.length}
        </Div>
      );
      comment.likes.map(like => {
        if (like.user.toString() === this.props.admin.id) {
          activeLike = true
        }
      });
    } else {
      likes = '';
    }

    return (
      <Div 
        className="m-10px p-10px border-1 outer-shadow"
        radiusStyled={application.settings.appRadius}
        transitionStyled={application.transitions.general}
        backgroundStyled={application.mode.primaryQuarter}
        backgroundHoverStyled={application.mode.primary}
      >
        <div className="d-flex flex-direction-row justify-content-space-between align-items-center">
          <Link className="d-flex flex-direction-row align-items-center noUnderline mb-10px w-max-content" to={`/${community}/${comment.user.profile.handle}`}>
            <div className="h-40px w-40px d-flex justify-content-center">
              <img
                className="h-100 w-100 outer-shadow-double border-radius-circle object-fit-cover"
                src={`/api/staff/files/${comment.user.profile.avatarSm}`}
                alt="Profile Picture"
              />
            </div>
            <Div className="ml-10px" transitionStyled={application.transitions.general} colorStyled={application.theme.primaryThree} colorHoverStyled={application.theme.primary}>{comment.user.name}</Div>
          </Link>

          {comment.user._id === admin.id ? (
          <CommentOption vientoID={vientoId} commentID={comment._id} />
          ) : null}
        </div>

        
        <div title={title}>
          <FormattedRelative value={comment.date} />
        </div>

        <p className="lead">{comment.text}</p>
        <div className="d-flex flex-direction-row align-items-center mb-10px">
          <Button
            onClick={() => this.addCommentLike()}
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
        {comment.replies.length > 0 ? 
          <Div 
            onClick={() => this.showReplies()}
            className="mb-10px clickable w-max-content border-radius-circle border-1 p-10px"
            transitionStyled={application.transitions.general}
            backgroundStyled={application.mode.primary}
            backgroundHoverStyled={application.theme.primaryQuarter}
            colorStyled={application.theme.primaryThree}
            colorHoverStyled={application.theme.primary} 
          >
            {repliesMessage} ({comment.replies.length})
          </Div>
          :
          ('')
        }

        {repliesOpen &&
          <ReplyFeed vientoID={vientoId} commentID={comment._id} replies={comment.replies} />
        }
        <ReplyButton vientoID={vientoId} commentID={comment._id} />
      </Div>
    );
  }
}

CommentItem.propTypes = {
  intl: intlShape.isRequired,
  addCommentLike: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  vientoId: PropTypes.string.isRequired,
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application
});

export default injectIntl(connect(mapStateToProps, { addCommentLike, deleteComment })(CommentItem));