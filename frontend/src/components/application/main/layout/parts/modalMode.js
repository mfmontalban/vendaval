import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 

import { updateMode } from '../../../../../actions/applicationActions';

import { FormattedMessage } from 'react-intl';

import Div from '../../common/styled/div'
import Dropdown from '../../common/styled/dropdown'
import Button from '../../common/styled/button'

class ModalMode extends Component {
  constructor(props){
    super(props)
    this.state = {
      outsideClicked: false,
      modePicker: false,
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
        modePicker: false
      });
      setTimeout(() => {
        this.setState({ outsideClicked: false });
      }, 250);
    }
  }

  toggleModePicker(){
    if (this.state.outsideClicked === false) {
      this.setState(prevState => ({
        modePicker: !prevState.modePicker,
        outsideClicked: true,
      }))
    }
  }

  updateMode = (a, b, c, d) => {
    this.props.updateMode(a, b, c, d);
  }

  render(){
    const { modePicker } = this.state
    const { application } = this.props;

    return(
      <Div className="d-flex flex-direction-row text-center align-items-center p-10px" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.transparent}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`}>
        <div className="min-w-50-app p-10px">
          <FormattedMessage
            id="settings.mode"
            defaultMessage="Mode:"
          />
        </div>
        <div className="d-flex justify-content-center min-w-50-app p-10px">
          <div className="clickable" onClick={() => this.toggleModePicker()}>
            <FormattedMessage
              id={('settings.' + `${application.mode.name}`)}
            />
          </div>
          {modePicker && 
            <Dropdown ref={this.setWrapperRef} className="mt-25px position-absolute z-1005 d-flex flex-direction-column text-right outer-shadow-primary border-1" transitionStyled={`${application.transitions.general}`}  backgroundStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadius}`}>
              <Button onClick={(e) => {this.updateMode('240', '240', '240', 'Light'); this.toggleModePicker()}} className="p-10px text-right" transitionStyled={`${application.transitions.general}`}  backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadiusTop}`} type="button">
                <FormattedMessage
                  id="settings.Light"
                  defaultMessage="Light"
                />
              </Button>
              <Button onClick={(e) => {this.updateMode('43', '43', '43', 'Dark'); this.toggleModePicker()}} className="p-10px text-right" transitionStyled={`${application.transitions.general}`}  backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadiusBottom}`} type="button">
                <FormattedMessage
                  id="settings.Dark"
                  defaultMessage="Dark"
                />
              </Button>
            </Dropdown>
          }
        </div>
      </Div>
    )
  }
}

ModalMode.propTypes = {
  application: PropTypes.object.isRequired,
  updateMode: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  application: state.application
});

export default connect(mapStateToProps, { updateMode })(ModalMode);