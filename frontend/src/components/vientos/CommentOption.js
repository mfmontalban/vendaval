import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { deleteComment } from '../../actions/vientosActions';

import {FormattedMessage, FormattedRelative} from 'react-intl';

import Div from '../application/common/styled/div';
import Dropdown from '../application/common/styled/dropdown';
import Button from '../application/common/styled/button';

class ReplyButton extends Component {
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      outsideClicked: false,
    }
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        listOpen: false,
      });
      setTimeout(() => {
        this.setState({ outsideClicked: false });
      }, 250);
    }
  }

  toggleList(){
    if (this.state.outsideClicked === false) {
      this.setState(prevState => ({
        listOpen: !prevState.listOpen,
        outsideClicked: true,
      }))
    }
  }

  onDeleteClick(vientoId, commentId) {
    this.props.deleteComment(vientoId, commentId);
  }

  render() {
    const { listOpen } = this.state;
    const { application, commentID, vientoID } = this.props;

    return (
      <div className="d-flex flex-direction-column justify-content-right">
        <Button onClick={() => this.toggleList()} className="border-0 text-right clickable" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.settings.themeTransparent}`} colorStyled={`${application.theme.primaryThree}`} colorHoverStyled={`${application.theme.primary}`} paddingStyled={`${application.settings.appPadding}`} radiusStyled={`${application.settings.appRadius}`}>
          <i className="fas fa-ellipsis-v clickable" />
        </Button>
        {listOpen &&
          <Dropdown ref={this.setWrapperRef} className="position-absolute z-1005 d-flex flex-direction-column text-right outer-shadow comment-positioning" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadius}`}>
              <Button
                onClick={this.onDeleteClick.bind(this, vientoID, commentID)}
                type="button"
                className="h-max-content p-10px clickable"
                transitionStyled={application.transitions.general}
                backgroundStyled={application.mode.primary}
                backgroundHoverStyled={application.theme.primaryQuarter}
                colorStyled={application.theme.primaryThree}
                colorHoverStyled={application.theme.primary}
                radiusStyled={application.settings.appRadius}
              >
                <i className="fas fa-times" /> Delete
              </Button>
          </Dropdown>
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