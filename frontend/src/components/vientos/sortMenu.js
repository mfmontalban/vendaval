import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setSortsAuthorUp, setSortsAuthorDown, setSortsTitleUp, setSortsTitleDown, setSortsRecentNewest, setSortsRecentOldest } from '../../actions/applicationActions';


import Button from '../application/main/common/styled/button'
import Div from '../application/main/common/styled/div'

class SortMenu extends Component {
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

    let recent;
    let older;
    let authorUp;
    let authorDown;
    let titleUp;
    let titleDown;


    if (application.language == "es") {
      recent = "Subido: Recente"
      older = "Subido: Viejo"
      authorUp = "Autor: A-Z"
      authorDown = "Autor: Z-A"
      titleUp = "Titulo: A-Z"
      titleDown = "Titulo: Z-A"

    } else {
      recent = "Uploaded: Recent"
      older = "Uploaded: Oldest"
      authorUp = "Author: A-Z"
      authorDown = "Author: Z-A"
      titleUp = "Title: A-Z"
      titleDown = "Title: Z-A"
    }

    return(
      <div ref={this.setWrapperRef} className="mt-neg43px">
        <Button onClick={() => this.toggleList()} className="border-0 text-right border-1" transitionStyled={`${application.settings.appTransition}`} backgroundStyled={`${application.transparent}`} backgroundHoverStyled={`${application.theme.primary}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} paddingStyled={`${application.settings.appPadding}`} radiusStyled={`${application.settings.appRadius}`}>
          <i className="fas fa-sort"></i>
        </Button>
        {listOpen && 
          <Div className="position-absolute z-1005 d-flex flex-direction-column text-right outer-shadow outer-box-shadow-menu ml-neg107px" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.mode.primaryHover}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadius}`}>
            <Button onClick={(e) => {this.props.setSortsAuthorUp(e); this.toggleList();}} className="p-10px top-border-radius text-right" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.mode.primaryHover}`} colorStyled={`${application.theme.primary}`} type="Button">{authorUp}</Button>
            <Button onClick={(e) => {this.props.setSortsAuthorDown(e); this.toggleList();}} className="p-10px text-right" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.mode.primaryHover}`} colorStyled={`${application.theme.primary}`} type="Button">{authorDown}</Button>
            <Button onClick={(e) => {this.props.setSortsTitleUp(e); this.toggleList();}} className="p-10px top-border-radius text-right" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.mode.primaryHover}`} colorStyled={`${application.theme.primary}`} type="Button">{titleUp}</Button>
            <Button onClick={(e) => {this.props.setSortsTitleDown(e); this.toggleList();}} className="p-10px text-right" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.mode.primaryHover}`} colorStyled={`${application.theme.primary}`} type="Button">{titleDown}</Button>
            <Button onClick={(e) => {this.props.setSortsRecentNewest(e); this.toggleList();}} className="p-10px text-right" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.mode.primaryHover}`} colorStyled={`${application.theme.primary}`} type="Button">{recent}</Button>
            <Button onClick={(e) => {this.props.setSortsRecentOldest(e); this.toggleList();}} className="p-10px bottom-border-radius text-right" backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.mode.primaryHover}`} colorStyled={`${application.theme.primary}`} type="Button">{older}</Button>
          </Div>
        }
      </div>
    )
  }
}

SortMenu.propTypes = {
  setSortsAuthorUp: PropTypes.func.isRequired,
  setSortsAuthorDown: PropTypes.func.isRequired,
  setSortsTitleUp: PropTypes.func.isRequired,
  setSortsTitleDown: PropTypes.func.isRequired,
  setSortsRecentNewest: PropTypes.func.isRequired,
  setSortsRecentOldest: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  application: state.application
});

export default connect(mapStateToProps, { setSortsAuthorUp, setSortsAuthorDown, setSortsTitleUp, setSortsTitleDown, setSortsRecentNewest, setSortsRecentOldest })(SortMenu);