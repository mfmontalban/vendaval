import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setFiltersText } from '../../actions/applicationActions';

import SearchCategory from "./searchCategory"

import Div from '../application/common/styled/div'
import Input from '../application/common/styled/input'
import Button from '../application/common/styled/button'
import Dropdown from '../application/common/dropdown'


class FilterMenu extends Component {
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

    this.props.setFiltersText({"topic": topic, "phrase": phrase});
    this.setState({filteringFor: topic});
  }

  render(){
    const { application } = this.props;
    return(
        <Dropdown
          alignEdge="left"
          icon="filter"
        >
          <Div className="w-max-content pt-10px pl-10px" backgroundStyled={application.mode.primary} colorStyled={application.theme.primary} radiusStyled={application.settings.appRadiusTop}>
            <SearchCategory 
              filterState={this.state.filteringFor}
              onFilterItems={this.setFilter}
            />
          </Div>
          <Div className="d-flex flex-direction-row pb-10px pl-10px bottom-border-radius text-right" backgroundStyled={application.mode.primary} colorStyled={application.theme.primary} radiusStyled={application.settings.appRadiusBottom}>
            <Input className="max-w-filterMenuInput border-0-right pl-10px pr-10px m-0" type="text" name="filteringPhrase" value={this.state.filteringPhrase} onChange={this.onChange} backgroundStyled={application.mode.primary} colorStyled={application.theme.primary} radiusStyled={application.settings.appRadiusLeft} borderStyled={application.theme.primary}>
            </Input>
            <Button onClick={() => {this.filterItems()}} className="text-right border-1" transitionStyled={application.settings.appTransition} backgroundStyled={application.transparent} backgroundHoverStyled={application.theme.primary} colorStyled={application.theme.primary} colorHoverStyled={application.mode.primary} paddingStyled={application.settings.appPadding} radiusStyled={application.settings.appRadiusRight}>
              <i className="fas fa-arrow-alt-right"></i>
            </Button>
          </Div>
        </Dropdown>
    )
  }
}

FilterMenu.propTypes = {
  setFiltersText: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  application: state.application
});

export default connect(mapStateToProps, {setFiltersText})(FilterMenu);