import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setFiltersText } from '../../actions/applicationActions';

import SearchCategory from "./searchCategory"

import Div from '../application/main/common/styled/div'
import Input from '../application/main/common/styled/input'
import Button from '../application/main/common/styled/button'
import Dropdown from '../application/main/common/styled/dropdownold'


class FilterMenu extends Component {
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      filteringFor: "Title",
      filteringPhrase: ""
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

    topic = this.state.filteringFor;
    phrase = this.state.filteringPhrase;

    this.props.setFiltersText({"topic": topic, "phrase": phrase});
    this.setState({filteringFor: "Title"});
  }

  render(){
    const { listOpen } = this.state
    const { application } = this.props;
    return(
      <div ref={this.setWrapperRef} className="mt-neg43px">
        <Button onClick={() => this.toggleList()} className="text-right border-1" transitionStyled={application.settings.appTransition} backgroundStyled={application.transparent} backgroundHoverStyled={application.theme.primary} colorStyled={application.theme.primary} colorHoverStyled={application.mode.primary} paddingStyled={application.settings.appPadding} radiusStyled={application.settings.appRadius}>
          <i className="fas fa-filter"></i>
        </Button>
        {listOpen && 
          <Dropdown className="position-absolute z-1005 d-flex flex-direction-column text-right outer-shadow">
            <Dropdown className="outer-box-shadow-menu" radiusStyled={application.settings.appRadius} boxShadowColorStyled={application.theme.primaryQuarter}>
              <Div className="pt-10px pl-10px top-border-radius text-right" backgroundStyled={application.mode.primary} colorStyled={application.theme.primary}>
                <SearchCategory onFilterItems={this.setFilter} />
              </Div>
              <Div className="d-flex flex-direction-row pb-10px pl-10px bottom-border-radius text-right" backgroundStyled={application.mode.primary} colorStyled={application.theme.primary}>
                <Input className="max-w-filterMenuInput border-1-left pl-10px pr-10px m-0" type="text" name="filteringPhrase" value={this.state.filteringPhrase} onChange={this.onChange} backgroundStyled={application.mode.primary} colorStyled={application.theme.primary} radiusStyled={application.settings.appRadiusLeft} borderStyled={application.theme.primary}>
                </Input>
                <Button onClick={() => {this.toggleList(); this.filterItems()}} className="text-right border-1" transitionStyled={application.settings.appTransition} backgroundStyled={application.transparent} backgroundHoverStyled={application.theme.primary} colorStyled={application.theme.primary} colorHoverStyled={application.mode.primary} paddingStyled={application.settings.appPadding} radiusStyled={application.settings.appRadiusRight}>
                  <i className="fas fa-arrow-alt-right"></i>
                </Button>
              </Div>
            </Dropdown>
          </Dropdown>
        }
      </div>
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