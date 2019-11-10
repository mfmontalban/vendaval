import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { deleteReply } from '../../actions/vientosActions';

import {FormattedMessage, FormattedRelative} from 'react-intl';

import Div from '../application/main/common/styled/div';
import Dropdown from '../application/main/common/styled/dropdown';
import Button from '../application/main/common/styled/button';

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

  onDeleteClick = (vientoID, commentID, replyID) => {
    this.props.deleteReply(vientoID, commentID, replyID);
  }

  render() {
    const { listOpen } = this.state;
    const { application, vientoID, commentID, replyID } = this.props;

    return (
      <div className="d-flex flex-direction-column justify-content-right">
        <Button onClick={() => this.toggleList()} className="border-0 text-right clickable" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.settings.themeTransparent}`} colorStyled={`${application.theme.primaryThree}`} colorHoverStyled={`${application.theme.primary}`} paddingStyled={`${application.settings.appPadding}`} radiusStyled={`${application.settings.appRadius}`}>
          <i className="fas fa-ellipsis-v clickable" />
        </Button>
        {listOpen && 
          <Dropdown ref={this.setWrapperRef} className="position-absolute z-1005 d-flex flex-direction-column text-right outer-shadow reply-positioning" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadius}`}>
            <Button
              onClick={() => this.onDeleteClick(vientoID, commentID, replyID)}
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
  deleteReply: PropTypes.func.isRequired,
  vientoID: PropTypes.string.isRequired,
  commentID: PropTypes.string.isRequired,
  replyID: PropTypes.string.isRequired,
  application: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  application: state.application
});

export default connect(mapStateToProps, { deleteReply })(ReplyButton);