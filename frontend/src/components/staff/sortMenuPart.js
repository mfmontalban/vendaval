import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setSortsAuthorUp, setSortsAuthorDown, setSortsReviewerUp, setSortsReviewerDown, setSortsTitleUp, setSortsTitleDown, setSortsStatusUp, setSortsStatusDown } from '../../actions/applicationActions';

import Button from '../application/common/styled/button'

class SortMenuPart extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      filteringFor: "Reviewer",
      filteringPhrase: ""
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  setFilter = (filter) => {
    this.setState(() => ({
      filteringFor: filter
    }))
  }

  filterItems = () => {
    let topic;
    let phrase;

    if (this.state.filteringFor.length < 1) {
      topic = "Reviewer";
    } else {
      topic = this.state.filteringFor;
    }

    phrase = this.state.filteringPhrase;

    const filterObject = {
      topic: topic,
      phrase: phrase
    }

    this.props.toggleList();
    this.props.onFilterItems(filterObject);
    this.setState({filteringFor: topic});
  }
  
  render() {
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
    return (
      <div className="d-flex flex-direction-column">
        <Button onClick={(e) => {this.props.setSortsReviewerUp(e); this.props.toggleList();}} className="p-10px text-right" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadiusTop}`} type="Button">{reviewerUp}</Button>
        <Button onClick={(e) => {this.props.setSortsReviewerDown(e); this.props.toggleList();}} className="p-10px text-right" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`} type="Button">{reviewerDown}</Button>
        <Button onClick={(e) => {this.props.setSortsAuthorUp(e); this.props.toggleList();}} className="p-10px top-border-radius text-right" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`} type="Button">{authorUp}</Button>
        <Button onClick={(e) => {this.props.setSortsAuthorDown(e); this.props.toggleList();}} className="p-10px text-right" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`} type="Button">{authorDown}</Button>
        <Button onClick={(e) => {this.props.setSortsStatusUp(e); this.props.toggleList();}} className="p-10px text-right" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`} type="Button">{statusUp}</Button>
        <Button onClick={(e) => {this.props.setSortsStatusDown(e); this.props.toggleList();}} className="p-10px bottom-border-radius text-right" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`} type="Button">{statusDown}</Button>
        <Button onClick={(e) => {this.props.setSortsTitleUp(e); this.props.toggleList();}} className="p-10px text-right" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`} type="Button">{titleUp}</Button>
        <Button onClick={(e) => {this.props.setSortsTitleDown(e); this.props.toggleList();}} className="p-10px text-right" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadiusBottom}`} type="Button">{titleDown}</Button>
      </div>
    );
  }

}

SortMenuPart.propTypes = {
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

export default connect(mapStateToProps, { setSortsAuthorUp, setSortsAuthorDown, setSortsReviewerUp, setSortsReviewerDown, setSortsTitleUp, setSortsTitleDown, setSortsStatusUp, setSortsStatusDown })(SortMenuPart);