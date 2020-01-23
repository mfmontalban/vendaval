import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateLanguage } from '../../../actions/applicationActions';

import Button from '../main/common/styled/button'
import Dropdown from '../main/common/styled/dropdown'

class UpdateLanguage extends Component {
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

  componentDidMount() {

    if (localStorage.language) {
      let language = localStorage.language;
      this.setState({
        language: language
      });
    }
    else {
      let language1 = (navigator.languages && navigator.languages[0]) || navigator.userLanguage;
      let language = language1.substring(0, 2);
      this.setState({
        language: language
      });
    }
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

  updateLanguage = (e) => {
    this.setState({
      language: e
    });
    this.props.updateLanguage(e);
  }

  render(){
    const { listOpen } = this.state
    const { application } = this.props;
    return(
      <div ref={this.setWrapperRef} className="d-flex flex-direction-column justify-content-right">
      <Button onClick={() => this.toggleList()} className="text-right clickable outer-shadow white-space-nowrap p-11px5px" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadius}`}>
          <span className="p-5px">{application.language}</span>
        </Button>
        {listOpen && 
          <Dropdown className="mt-43px ml-neg40px position-absolute z-1005 d-flex flex-direction-column text-right outer-shadow-primary border-1" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} colorStyled={`${application.theme.primary}`} borderStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadius}`}>
            <Button transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} onClick={(e) => {this.updateLanguage('es'); this.toggleList()}} className="p-10px top-border-radius text-right" type="button">Espanol</Button>
            <Button transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} onClick={(e) => {this.updateLanguage('en'); this.toggleList()}} className="p-10px bottom-border-radius text-right" type="button">English</Button>
          </Dropdown>
        }
      </div>
    )
  }
}

UpdateLanguage.propTypes = {
  application: PropTypes.object.isRequired,
  updateLanguage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  application: state.application
});

export default connect(mapStateToProps, { updateLanguage })(UpdateLanguage);