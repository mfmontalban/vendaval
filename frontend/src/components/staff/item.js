import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchCategory from "./searchCategory"

import Div from '../application/common/styled/div'
import Input from '../application/common/styled/input'
import Button from '../application/common/styled/button'

class FilterMenu extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      filteringFor: this.props.filteringFor,
      filteringPhrase: ""
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  setFilter = (filter) => {
    this.setState(() => ({
      filteringFor: filter
    }));
    this.props.onSetFilter(filter);
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
    return (
      <div>
        <Div className="w-max-content pt-10px pl-10px" backgroundStyled={this.props.application.mode.primary} colorStyled={this.props.application.theme.primary} radiusStyled={this.props.application.settings.appRadiusTop}>
          <SearchCategory 
            filterState={this.props.filteringFor}
            onFilterItems={this.setFilter}
          />
        </Div>
        <Div className="d-flex flex-direction-row pt-5px pb-10px pl-10px bottom-border-radius text-right" backgroundStyled={this.props.application.mode.primary} colorStyled={this.props.application.theme.primary} radiusStyled={this.props.application.settings.appRadiusBottom}>
          <Input className="max-w-filterMenuInput border-0-right pl-10px pr-10px m-0" type="text" name="filteringPhrase" value={this.state.filteringPhrase} onChange={this.onChange} backgroundStyled={this.props.application.mode.primary} colorStyled={this.props.application.theme.primary} radiusStyled={this.props.application.settings.appRadiusLeft} borderStyled={this.props.application.theme.primary}>
          </Input>
          <Button onClick={() => this.filterItems()} className="text-right border-1" transitionStyled={this.props.application.settings.appTransition} backgroundStyled={this.props.application.transparent} backgroundHoverStyled={this.props.application.theme.primary} colorStyled={this.props.application.theme.primary} colorHoverStyled={this.props.application.mode.primary} paddingStyled={this.props.application.settings.appPadding} radiusStyled={this.props.application.settings.appRadiusRight}>
            <i className="fas fa-arrow-alt-right"></i>
          </Button>
        </Div>
      </div>
    );

  }
}

FilterMenu.propTypes = {
  application: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  application: state.application,
});

export default connect(mapStateToProps, {})(FilterMenu);
