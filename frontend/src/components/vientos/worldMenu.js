import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../application/main/common/styled/button'
import Dropdown from '../application/main/common/styled/dropdown'

class WorldMenu extends Component {
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

    return(
      <div ref={this.setWrapperRef} className="mt-43">
        <Button onClick={() => this.toggleList()} className="border-0 text-right border-1" transitionStyled={`${application.settings.appTransition}`} backgroundStyled={`${application.transparent}`} backgroundHvrStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`} colorHvrStyled={`${application.mode.primary}`} paddingStyled={`${application.settings.appPadding}`} radiusStyled={`${application.settings.appRadius}`}>
          <i className="fas fa-globe-americas"></i>
        </Button>
        {listOpen && 
          <Dropdown className="position-absolute z-1005 d-flex flex-direction-column text-right outer-shadow" backgroundStyled={`${application.mode.primary}`} backgroundHvrStyled={`${application.mode.primaryHover}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadius}`}>
            <button onClick={(e) => {this.toggleList()}} className="p-10px top-border-radius text-right" type="button">Espanol</button>
            <button onClick={(e) => {this.toggleList()}} className="p-10px bottom-border-radius text-right" type="button">English</button>
          </Dropdown>
        }
      </div>
    )
  }
}

WorldMenu.propTypes = {
  application: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  application: state.application
});

export default connect(mapStateToProps, {})(WorldMenu);