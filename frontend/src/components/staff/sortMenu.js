import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setSortsAuthorUp, setSortsAuthorDown, setSortsReviewerUp, setSortsReviewerDown, setSortsTitleUp, setSortsTitleDown, setSortsStatusUp, setSortsStatusDown } from '../../actions/applicationActions';


import Button from '../application/main/common/styled/button'
import Div from '../application/main/common/styled/div'

class SortMenu extends Component {
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      language: '',
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
        listOpen: false
      })
    }
  }

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render(){
    const { listOpen } = this.state
    const { application } = this.props;

    let statusUp;
    let statusDown;
    let authorUp;
    let authorDown;
    let reviewerUp;
    let reviewerDown;
    let titleUp;
    let titleDown;


    if (application.language == "es") {
      statusUp = "Estado: A-Z"
      statusDown = "Estado: Z-A"
      authorUp = "Autor: A-Z"
      authorDown = "Autor: Z-A"
      reviewerUp = "Crítico: A-Z"
      reviewerDown = "Crítico: Z-A"
      titleUp = "Titulo: A-Z"
      titleDown = "Titulo: Z-A"

    } else {
      statusUp = "Status: A-Z"
      statusDown = "Status: Z-A"
      authorUp = "Author: A-Z"
      authorDown = "Author: Z-A"
      reviewerUp = "Reviewer: A-Z"
      reviewerDown = "Reviewer: Z-A"
      titleUp = "Title: A-Z"
      titleDown = "Title: Z-A"
    }

    return(
      <div ref={this.setWrapperRef}>
        <Button onClick={() => this.toggleList()} className="border-0 text-right border-1" transitionStyled={`${application.settings.appTransition}`} backgroundStyled={`${application.transparent}`} backgroundHoverStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} paddingStyled={`${application.settings.appPadding}`} radiusStyled={`${application.settings.appRadius}`}>
          <i className="fas fa-sort"></i>
        </Button>
        {listOpen && 
          <Div className="position-absolute z-1005 d-flex flex-direction-column text-right outer-shadow-primary ml-neg107px border-1" backgroundStyled={`${application.mode.primary}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadius}`} borderStyled={`${application.theme.primary}`}>
            <Button onClick={(e) => {this.props.setSortsReviewerUp(e); this.toggleList();}} className="p-10px text-right" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadiusTop}`} type="Button">{reviewerUp}</Button>
            <Button onClick={(e) => {this.props.setSortsReviewerDown(e); this.toggleList();}} className="p-10px text-right" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`} type="Button">{reviewerDown}</Button>
            <Button onClick={(e) => {this.props.setSortsAuthorUp(e); this.toggleList();}} className="p-10px top-border-radius text-right" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`} type="Button">{authorUp}</Button>
            <Button onClick={(e) => {this.props.setSortsAuthorDown(e); this.toggleList();}} className="p-10px text-right" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`} type="Button">{authorDown}</Button>
            <Button onClick={(e) => {this.props.setSortsStatusUp(e); this.toggleList();}} className="p-10px text-right" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`} type="Button">{statusUp}</Button>
            <Button onClick={(e) => {this.props.setSortsStatusDown(e); this.toggleList();}} className="p-10px bottom-border-radius text-right" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`} type="Button">{statusDown}</Button>
            <Button onClick={(e) => {this.props.setSortsTitleUp(e); this.toggleList();}} className="p-10px text-right" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`} type="Button">{titleUp}</Button>
            <Button onClick={(e) => {this.props.setSortsTitleDown(e); this.toggleList();}} className="p-10px text-right" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadiusBottom}`} type="Button">{titleDown}</Button>
          </Div>
        }
      </div>
    )
  }
}

SortMenu.propTypes = {
  setSortsAuthorUp: PropTypes.func.isRequired,
  setSortsAuthorDown: PropTypes.func.isRequired,
  setSortsReviewerUp: PropTypes.func.isRequired,
  setSortsReviewerDown: PropTypes.func.isRequired,
  setSortsTitleUp: PropTypes.func.isRequired,
  setSortsTitleDown: PropTypes.func.isRequired,
  setSortsStatusUp: PropTypes.func.isRequired,
  setSortsStatusDown: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  application: state.application
});

export default connect(mapStateToProps, { setSortsAuthorUp, setSortsAuthorDown, setSortsReviewerUp, setSortsReviewerDown, setSortsTitleUp, setSortsTitleDown, setSortsStatusUp, setSortsStatusDown })(SortMenu);