import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setFiltersText } from '../../actions/applicationActions';

import SearchCategory from "./searchCategory"

import Div from '../application/common/styled/div'
import Input from '../application/common/styled/input'
import Button from '../application/common/styled/button'
import Dropdown from '../application/common/dropdown'
import Item from './item'


class FilterMenu extends Component {
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      filteringFor: "reviewer",
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

  filterItems = (filterObject) => {
    this.props.setFiltersText({"topic": filterObject.topic, "phrase": filterObject.phrase});
  }

  render(){
    return(
        <Dropdown
          alignEdge="left"
          icon="filter"
        >
          <Item application={this.props.application} onFilterItems={this.filterItems} onSetFilter={this.setFilter} filteringFor={this.state.filteringFor} />
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