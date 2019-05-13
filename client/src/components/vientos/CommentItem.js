import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { deleteComment } from '../../actions/vientosActions';

import {FormattedMessage, FormattedRelative} from 'react-intl';

class CommentItem extends Component {
  onDeleteClick(vientoId, commentId) {
    this.props.deleteComment(vientoId, commentId);
  }

  render() {
    const { comment, vientoId, admin, application } = this.props;

    let community;

    if (application.language === 'es') {
        community = 'communidad';
    } else {
        community = 'community';
    }

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="mb-0">{comment.name}</p>
            <p>{community}/ <Link className="text-info" to={`/${community}/${comment.handle}`}>{comment.handle}</Link></p>
            <FormattedMessage
                    id="viento.time_since_created"
                    defaultMessage={`{formattedLastLoginTime}`}
                    values={{
                        formattedLastLoginTime: (
                            <FormattedRelative value={comment.date} />
                        ),
                    }}
                />
            <br />
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === admin.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, vientoId, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
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

export default connect(mapStateToProps, { deleteComment })(CommentItem);