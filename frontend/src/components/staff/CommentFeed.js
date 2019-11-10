import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentItem from '../vientos/CommentItem';

class CommentFeed extends Component {
  render() {
    const { comments, vientoId } = this.props;

    return (
        vientoId ? comments.filter(comment => {
          if (comment !== '' || null ) {
            let commentMatch = comment.category.includes('review');
            return commentMatch;
          }
          return comment;
        }).map(comment => (
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