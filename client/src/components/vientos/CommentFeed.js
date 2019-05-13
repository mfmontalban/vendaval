import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

class CommentFeed extends Component {
  render() {
    const { comments, vientoId } = this.props;

    return (
        vientoId ? comments.map(comment => (
        <CommentItem key={comment._id} comment={comment} vientoId={vientoId} />
        )) : ''
    );
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  vientoId: PropTypes.string.isRequired
};

export default CommentFeed;