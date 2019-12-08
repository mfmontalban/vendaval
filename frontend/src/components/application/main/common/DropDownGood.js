import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {FormattedMessage} from 'react-intl';

import Button from '../application/main/common/styled/button'
import Dropdown from '../application/main/common/styled/dropdown'

class SearchCategory extends Component {
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

  render(){
    const { application } = this.props
    const { listOpen } = this.state

    let selectionDropdown;

      selectionDropdown = (
        <Button onClick={() => this.toggleList()} className="max-w-content p-10px" transitionStyled={application.transitions.general} backgroundStyled={application.transparent} colorStyled={application.theme.primary} radiusStyled={`${application.settings.appRadius}`}>
          Title
        </Button>
        )


    return(
      <div className="min-w-200px d-flex justify-content-center">
        {selectionDropdown}
        {listOpen && 
          <Dropdown ref={this.setWrapperRef} className="mt-40px position-absolute z-1005 d-flex flex-direction-column text-left outer-shadow" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadius}`}>
            <Button transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.mode.primaryHover}`} onClick={(e) => {this.toggleList();}} className="p-10px top-border-radius text-left" type="button">1</Button>
            <Button transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.mode.primaryHover}`} onClick={(e) => {this.toggleList();}} className="p-10px bottom-border-radius text-left" type="button">2</Button>
          </Dropdown>
        }
      </div>
    )
  }
}

SearchCategory.propTypes = {
  application: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  application: state.application,
});

export default connect(mapStateToProps, {})(withRouter(SearchCategory));
