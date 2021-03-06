import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateTheme } from '../../../../../actions/applicationActions';

import { FormattedMessage } from 'react-intl';

import Div from '../../../common/styled/div'
import Dropdown from '../../../common/styled/dropdown'
import Button from '../../../common/styled/button'

class ModalTheme extends Component {
  constructor(props){
    super(props)
    this.state = {
      outsideClicked: false,
      themePicker: false,
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
        themePicker: false
      });
      setTimeout(() => {
        this.setState({ outsideClicked: false });
      }, 250);
    }
  }

  toggleThemePicker(){
    if (this.state.outsideClicked === false) {
      this.setState(prevState => ({
        themePicker: !prevState.themePicker,
        outsideClicked: true,
      }))
    }
  }

  updateTheme = (a, b, c, d) => {
    this.props.updateTheme(a, b, c, d);
  }

  render(){
    const { themePicker } = this.state
    const { application } = this.props;

    return(
      <Div className="d-flex flex-direction-row text-center align-items-center p-10px" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.transparent}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`}>
        <div className="min-w-50-app p-10px">
          <FormattedMessage
            id="settings.theme"
            defaultMessage="Theme:"
          />
        </div>
        <div className="d-flex justify-content-center min-w-50-app p-10px">
          <div className="clickable" onClick={() => this.toggleThemePicker()}>
            <FormattedMessage
              id={('settings.' + `${application.theme.name}`)}
            />
          </div>
          {themePicker && 
            <Dropdown ref={this.setWrapperRef} className="mt-25px position-absolute z-1005 d-flex flex-direction-column text-right outer-shadow-primary border-1" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadius}`}>
              <Button onClick={(e) => {this.updateTheme('23', '162', '184', 'Aqua'); this.toggleThemePicker()}} className="p-10px text-right" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.Aqua}`} radiusStyled={`${application.settings.appRadiusTop}`} type="button">
                <FormattedMessage
                  id="settings.Aqua"
                  defaultMessage="Aqua"
                />
              </Button>
              <Button onClick={(e) => {this.updateTheme('184', '23', '23', 'Fire'); this.toggleThemePicker()}} className="p-10px text-right" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.Fire}`} type="button">
                <FormattedMessage
                  id="settings.Fire"
                  defaultMessage="Fire"
                />
              </Button>
              <Button onClick={(e) => {this.updateTheme('195', '200', '42', 'Sun'); this.toggleThemePicker()}} className="p-10px text-right" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.Sun}`} type="button">
                <FormattedMessage
                  id="settings.Sun"
                  defaultMessage="Sun"
                />
              </Button>
              <Button onClick={(e) => {this.updateTheme('55', '184', '23', 'Earth'); this.toggleThemePicker()}} className="p-10px text-right" transitionStyled={`${application.transitions.general}`}  backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.Earth}`} radiusStyled={`${application.settings.appRadiusBottom}`} type="button">
                <FormattedMessage
                  id="settings.Earth"
                  defaultMessage="Earth"
                />
              </Button>
            </Dropdown>
          }
        </div>
      </Div>
    )
  }
}

ModalTheme.propTypes = {
  application: PropTypes.object.isRequired,
  updateTheme: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  application: state.application
});

export default connect(mapStateToProps, { updateTheme })(ModalTheme);