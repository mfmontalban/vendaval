import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { deleteComment } from '../../actions/vientosActions';

import {FormattedMessage, FormattedRelative} from 'react-intl';

import ReplyForm from './ReplyForm';

import Div from '../application/main/common/styled/div';
import Dropdown from '../application/main/common/styled/dropdown';
import Button from '../application/main/common/styled/button';

class ReplyButton extends Component {
  constructor(props){
    super(props)
    this.state = {
      replyOpen: false,
    }
  }

  toggleReply(){
    this.setState(prevState => ({
      replyOpen: !prevState.replyOpen,
    }))
  }

  render() {
    const { replyOpen } = this.state;
    const { application, vientoID, commentID } = this.props;

    return (
      <div className="d-flex w-max-content justify-content-space-between">
        <Button
          onClick={() => this.toggleReply()}
          type="button"
          className="h-max-content border-1 p-10px clickable"
          transitionStyled={application.transitions.general}
          backgroundStyled={application.mode.primary}
          backgroundHoverStyled={application.theme.primaryQuarter}
          colorStyled={application.theme.primaryThree}
          colorHoverStyled={application.theme.primary}
          radiusStyled={application.settings.appRadius}
        >
          <i className="fas fa-comment-dots" /> Reply
        </Button>
        {replyOpen &&
          <div>
            <ReplyForm vientoID={vientoID} commentID={commentID} closeReply={() => this.toggleReply()} />
          </div>
        }
      </div>
    );
  }
}

ReplyButton.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  vientoID: PropTypes.string.isRequired,
  commentID: PropTypes.string.isRequired,
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application
});

export default connect(mapStateToProps, { deleteComment })(ReplyButton);