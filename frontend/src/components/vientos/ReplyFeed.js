import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReplyItem from './ReplyItem';

class RepliesFeed extends Component {
  render() {
    const { replies, commentID, vientoID } = this.props;

    return (
        commentID ? replies.sort((reply1, reply2) => 
          reply1.createdAt < reply2.createdAt ? 1 : -1
        ).map(reply => (
        <ReplyItem key={reply._id} vientoID={vientoID} commentID={commentID} reply={reply} />
        )) : ''
    );
  }
}

RepliesFeed.propTypes = {
  replies: PropTypes.array.isRequired,
  commentID: PropTypes.string.isRequired,
  vientoID: PropTypes.string.isRequired
};

export default RepliesFeed;