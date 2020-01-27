import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {FormattedMessage} from 'react-intl';

import { updateReviewer } from '../../actions/staffActions';

import Div from '../application/main/common/styled/div'
import Button from '../application/main/common/styled/button'
import Dropdown from '../application/main/common/styled/dropdown'

class ReviewerDropDown extends Component {
  constructor(props){
    super(props)
    this.state = {
      outsideClicked: false,
      listOpen: false,
    }
  }
  
  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  componentDidMount = () => {
    let currentState;

    if (this.props.contribution.reviewer !== undefined || null || "") {
      this.setState({
        currentState: this.props.contribution.reviewer.name
      });
    } else {
      if (this.props.application.language == "es") {
        this.setState({
          currentState: "No Asignado"
        });
      } else {
        this.setState({
          currentState: "Not assigned"
        });
      }
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    let currentState;

    if (this.props.application.language !== prevProps.application.language) {
      if (this.props.contribution.reviewer !== undefined || null || "") {
        this.setState({
          currentState: this.props.contribution.reviewer.name,
        });
      } else {
        if (this.props.application.language == "es") {
          this.setState({
            currentState: "No Asignado"
          });
        } else {
          this.setState({
            currentState: "Not assigned"
          });
        }
      }
    }
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

  toggleList = () => {
    if (this.state.outsideClicked == false) {
      this.setState(prevState => ({
        listOpen: !prevState.listOpen,
        outsideClicked: true,
      }))
    } else {
      if (this.state.listOpen == true ) {
        this.setState({
          listOpen: false,
        });
        setTimeout(() => {
          this.setState({ outsideClicked: false });
        }, 250);
      }
    }
  }

  render(){
    const { admin, application, contribution } = this.props;
    const allReviewers = this.props.staff.reviewers;
    const { listOpen, currentState, draft, live } = this.state;

    let statusSection;
    let reviewersList;
    let reviewerContainer;

    if (admin.staff == "manager" || admin.staff == "webmaster") {
      statusSection = (
        <Button onClick={() => this.toggleList()} className="max-w-content p-10px d-flex justify-content-center overflow-hidden border-1" transitionStyled={application.transitions.general} backgroundStyled={application.transparent} colorStyled={application.theme.primary} backgroundHoverStyled={application.theme.primary} colorHoverStyled={application.mode.primary} radiusStyled={`${application.settings.appRadius}`}>
          {currentState}
        </Button>
        )
    } else {
      statusSection = (
        `${currentState}`
      )
    }

    if (allReviewers.length > 0) {
      reviewersList = allReviewers.sort((viento1, viento2) => {
        return viento1.name.toLowerCase() > viento2.name.toLowerCase() ? 1 : 0;
      }).map((reviewer, index) => {
        if (index == 0) {
          return (
            <Button
              key={reviewer._id} 
              transitionStyled={`${application.transitions.general}`} 
              backgroundStyled={`${application.mode.primary}`}
              colorStyled={application.theme.primary}
              colorHoverStyled={application.theme.primary}
              backgroundHoverStyled={`${application.theme.primaryQuarter}`} 
              onClick={(e) => {this.props.updateReviewer(contribution._id, {'reviewer': `${reviewer._id}`, 'staff': `${admin.staff}`}); this.toggleList();}} 
              className="p-10px z-1005 position-relative w-100 max-w-175px text-overflow-ellipsis text-center top-border-radius" 
              type="button">
                {reviewer.name}
            </Button>
          );
        } else if (allReviewers.length - index == 1) {
          return (
            <Button
              key={reviewer._id} 
              transitionStyled={`${application.transitions.general}`} 
              backgroundStyled={`${application.mode.primary}`}
              colorStyled={application.theme.primary}
              colorHoverStyled={application.theme.primary}
              backgroundHoverStyled={`${application.theme.primaryQuarter}`} 
              onClick={(e) => {this.props.updateReviewer(contribution._id, {'reviewer': `${reviewer._id}`, 'staff': `${admin.staff}`}); this.toggleList();}} 
              className="p-10px z-1005 position-relative w-100 max-w-175px text-overflow-ellipsis text-center bottom-border-radius" 
              type="button">
                {reviewer.name}
            </Button>
          );
        } else {
          return (
            <Button
              key={reviewer._id} 
              transitionStyled={`${application.transitions.general}`} 
              backgroundStyled={`${application.mode.primary}`}
              colorStyled={application.theme.primary}
              colorHoverStyled={application.theme.primary}
              backgroundHoverStyled={`${application.theme.primaryQuarter}`} 
              onClick={(e) => {this.props.updateReviewer(contribution._id, {'reviewer': `${reviewer._id}`, 'staff': `${admin.staff}`}); this.toggleList();}} 
              className="p-10px z-1005 position-relative w-100 max-w-175px text-overflow-ellipsis text-center" 
              type="button">
                {reviewer.name}
            </Button>
          );
        }
      });
    } else {
      reviewersList = (
        <Button 
        transitionStyled={`${application.transitions.general}`} 
        backgroundStyled={`${application.mode.primary}`}
        colorStyled={application.theme.primary}
        backgroundHoverStyled={`${application.theme.primaryQuarter}`} 
        colorHoverStyled={application.theme.primary}
        className="p-10px z-1005 position-relative top-border-radius text-left" 
        type="button">
          {currentState}
        </Button>
      )
    }

    return(
      <div className="min-w-25-app d-flex position-relative justify-content-center align-items-center p-10px">
        {statusSection}
        {listOpen &&
          <Dropdown
            ref={this.setWrapperRef}
            className="Clickable position-absolute max-h-100 mt-100px z-1005 d-flex flex-direction-column text-left"
            >
              <Div
                className="border-1 outer-shadow-primary"
                backgroundStyled={`${application.mode.primary}`}
                borderStyled={`${application.theme.primary}`}
                radiusStyled={`${application.settings.appRadius}`}
                >
                {reviewersList}
              </Div>
          </Dropdown>
        }
      </div>
    )
  }
}

ReviewerDropDown.propTypes = {
  updateReviewer: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  contribution: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
  staff: state.staff
});

export default connect(mapStateToProps, { updateReviewer })(withRouter(ReviewerDropDown));
