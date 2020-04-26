import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Div from './styled/div'
import Button from './styled/button'

class Dropdown extends Component {
  constructor(props){
    super(props)
    this.state = {
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
        listOpen: false
      })
    }
  }

  toggleList = () => {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render(){
    const { listOpen } = this.state
    const { application } = this.props;

    let fontIcon;

    if (this.props.icon) {
      if (this.props.phrase) {
        fontIcon = <i className={`mr-5px fas fa-${this.props.icon}`}></i>
      } else {
        fontIcon = <i className={`fas fa-${this.props.icon}`}></i>
      }
    } else {
      fontIcon = ''
    }

    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { toggleList: this.toggleList })
    );

    return(
      <div ref={this.setWrapperRef}
        className={(this.props.alignEdge === 'left' ? 'justify-content-flex-start' : (this.props.alignEdge === 'right') ? 'justify-content-flex-end' : 'justify-content-center') + ' d-flex'}
      >
        <Button 
          onClick={() => this.toggleList()} 
          className="w-min-content border-1 text-center" 
          transitionStyled={application.settings.appTransition} 
          backgroundStyled={application.transparent} 
          backgroundHoverStyled={application.theme.primary} 
          colorStyled={application.theme.primary} 
          colorHoverStyled={application.mode.primary} 
          paddingStyled={application.settings.appPadding} 
          radiusStyled={application.settings.appRadius}
        >
          {fontIcon}{this.props.phrase}
        </Button>
        {listOpen && 
          <Div 
            className="mt-45px w-max-content position-absolute z-1005 d-flex flex-direction-column outer-shadow-primary border-1"
            backgroundStyled={application.mode.primary}
            radiusStyled={application.settings.appRadius}
            borderStyled={`${application.theme.primary}`}
          >
            {children}
          </Div>
        }
      </div>
    )
  }
}

Dropdown.propTypes = {
  application: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  application: state.application
});

export default connect(mapStateToProps, {})(Dropdown);