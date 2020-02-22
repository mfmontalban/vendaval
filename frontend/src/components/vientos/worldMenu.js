import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setCenteredMap } from '../../actions/applicationActions';

import A from '../application/main/common/styled/a'
import Button from '../application/main/common/styled/button'
import Dropdown from '../application/main/common/styled/dropdownold'

class WorldMenu extends Component {
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

  flyTo = (lat, lon) => {
    let obj;
    obj = {
      lat: lat,
      lon: lon,
    }
    this.props.setCenteredMap(obj);
  }

  render(){
    const { listOpen } = this.state
    const { application } = this.props;

    return(
      <div ref={this.setWrapperRef} className="mt-neg43px">
        <Button onClick={() => this.toggleList()} className="border-0 text-right border-1" transitionStyled={`${application.settings.appTransition}`} backgroundStyled={`${application.transparent}`} backgroundHoverStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} paddingStyled={`${application.settings.appPadding}`} radiusStyled={`${application.settings.appRadius}`}>
          <i className="fas fa-globe-americas"></i>
        </Button>
        {listOpen && 
          <Dropdown ref={this.setWrapperRef} className="ml-worldMenu m-10px position-absolute z-1005 d-flex flex-direction-row text-left outer-shadow-primary border-1" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadius}`}>
            <A className="p-10px" href="#Africa" onClick={(e) => this.flyTo(8.7832, 34.5085)} backgroundHoverStyled={application.theme.primaryQuarter}>Africa</A>
            <A className="p-10px" href="#Asia" onClick={(e) => this.flyTo(100.6197, 34.0479)} backgroundHoverStyled={application.theme.primaryQuarter}>Asia</A>
            <A className="p-10px" href="#Europe" onClick={(e) => this.flyTo(54.5260, 15.2551)} backgroundHoverStyled={application.theme.primaryQuarter}>Europe</A>
            <A className="p-10px" href="#NorthAmerica" onClick={(e) => this.flyTo(-90, 45)} backgroundHoverStyled={application.theme.primaryQuarter}>N. America</A>
            <A className="p-10px" href="#SouthAmerica" onClick={(e) => this.flyTo(-65, -20)} backgroundHoverStyled={application.theme.primaryQuarter}>S. America</A>
          </Dropdown>
        }
      </div>
    )
  }
}

WorldMenu.propTypes = {
  setCenteredMAp: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  application: state.application
});

export default connect(mapStateToProps, {setCenteredMap})(WorldMenu);