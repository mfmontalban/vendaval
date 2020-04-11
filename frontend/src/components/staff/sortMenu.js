import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dropdown from '../application/common/dropdown'
import SortMenuPart from './sortMenuPart'

class SortMenu extends Component {
  constructor(props){
    super(props)
    this.state = {
      language: '',
    }
  }

  render(){
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
      <Dropdown
        alignEdge="right"
        icon="sort"
      >
        <SortMenuPart application={this.props.application} onFilterItems={this.filterItems} />
      </Dropdown>
    )
  }
} 

SortMenu.propTypes = {
  application: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  application: state.application
});

export default connect(mapStateToProps, {})(SortMenu);