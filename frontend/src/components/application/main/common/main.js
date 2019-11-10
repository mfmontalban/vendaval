import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { updateTheme, updateMode } from '../../../actions/applicationActions';

import Body from '../common/styled/body';
import UserNav from '../common/userNav';
import Overlay from '../common/styled/overlay';
import Settings from '../common/styled/settings';
import ModalHeader from '../common/styled/modalHeader';
import ModalBody from '../common/styled/modalBody';
import ModalOptions from '../common/styled/modalOptions';
import Dropdown from '../common/styled/dropdown';
import ModalFooter from '../common/styled/modalFooter';
import Button from '../common/styled/button';

import { SketchPicker } from 'react-color'

class Main extends Component{
	constructor(props){
    super(props)
    this.state = {
      settingsMenu: false,
      themePicker: false,
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
        listOpen: false
      })
    }
  }

  toggleSettingsMenu = () => {
    this.setState(prevState => ({
      settingsMenu: !prevState.settingsMenu,
      themePicker: false,
    }))
  }

  toggleThemePicker = () => {
    this.setState(prevState => ({
      themePicker: !prevState.themePicker
    }))
  }
  
  toggleModePicker = () => {
    this.setState(prevState => ({
      modePicker: !prevState.modePicker
    }))
  }

  updateTheme = (a, b, c, d) => {
    this.props.updateTheme(a, b, c, d);
  }

  updateMode = (a, b, c, d) => {
    this.props.updateMode(a, b, c, d);
  }
  
  render(){
    const { application } = this.props;
    const { settingsMenu, themePicker, modePicker } = this.state;
    const { settings } = this.props.application;
		return (
        <Body id="start" className="body z-1000 scroll-container w-100" colorStyled={`${application.theme.primary}`} heightStyled={`${settings.heightBody}`}>
          <Overlay onClick={() => this.toggleSettingsMenu()} className={'position-absolute top-0 left-0 h-100vh w-100vw overlay ' + (settingsMenu === true ? 'visible z-1250' : 'invisible z-neg1')} transitionStyled={settingsMenu === true ? `${application.transitions.settingsIn}`: `${application.transitions.settingsOut}`} />

          <Settings className={'position-absolute bottom-0 ' + (settingsMenu === true ? 'visible z-1500' : 'invisible z-neg1')} transitionStyled={settingsMenu === true ? `${application.transitions.settingsIn}`: `${application.transitions.settingsOut}`} activeStyled={this.state.settingsMenu} heightStyled={`${settings.heightSettings}`} widthStyled={`${settings.widthSettings}`} marginLeftStyled={`${settings.marginLeftSettings}`} marginRightStyled={`${settings.marginRightSettings}`} radiusStyled={`${settings.appRadius}`}>
            <ModalHeader className="h-20 d-flex align-items-center top-border-radius" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.theme.primary}`} colorStyled={`${application.mode.primary}`} borderBottomStyled={`${application.mode.primary}`}>
              <div className="ml-10px text-x-large">
                Settings
              </div>
            </ModalHeader>

            <ModalBody className="h-60" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`}>
              <ModalOptions className="p-10px text-medium" transitionStyled={`${settings.appTransition}`} backgroundStyled={`${application.mode.primary}`}>
                <div className="d-flex justify-content-space-evenly align-items-center p-10px">
                  <div>
                    Mode:
                  </div>
                  <div className="" onClick={() => this.toggleModePicker()}>
                    {application.mode.name}
                  </div>
                  {modePicker && 
                    <Dropdown ref={this.setWrapperRef} className="position-absolute right-0 mt-50px mr-25pc z-1005 d-flex flex-direction-column text-right outer-shadow" backgroundStyled={`${application.mode.primary}`} backgroundHvrStyled={`${application.mode.primaryHover}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${settings.appRadius}`}>
                      <button onClick={(e) => {this.updateMode('223', '223', '223', 'Light'); this.toggleModePicker()}} className="p-10px top-border-radius text-right" type="button">Light</button>
                      <button onClick={(e) => {this.updateMode('43', '43', '43', 'Dark'); this.toggleModePicker()}} className="p-10px bottom-border-radius text-right" type="button">Dark</button>
                    </Dropdown>
                  }
                </div>

                <div className="d-flex justify-content-space-evenly align-items-center p-10px">
                  <div>
                    Theme:
                  </div>
                  <div className="" onClick={() => this.toggleThemePicker()}>
                    {application.theme.name}
                  </div>
                  {themePicker && 
                    <Dropdown ref={this.setWrapperRef} className="position-absolute right-0 mt-100px mr-25pc z-1005 d-flex flex-direction-column text-right outer-shadow" backgroundStyled={`${application.mode.primary}`} backgroundHvrStyled={`${application.mode.primaryHover}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${settings.appRadius}`}>
                      <button onClick={(e) => {this.updateTheme('23', '162', '184', 'Aqua'); this.toggleThemePicker()}} className="p-10px top-border-radius text-right text-aqua" type="button">Aqua</button>
                      <button onClick={(e) => {this.updateTheme('184', '23', '23', 'Fire'); this.toggleThemePicker()}} className="p-10px text-right text-fire" type="button">Fire</button>
                      <button onClick={(e) => {this.updateTheme('184', '172', '23', 'Sun'); this.toggleThemePicker()}} className="p-10px text-right text-sun" type="button">Sun</button>
                      <button onClick={(e) => {this.updateTheme('55', '184', '23', 'Earth'); this.toggleThemePicker()}} className="p-10px bottom-border-radius text-right text-earth" type="button">Earth</button>
                    </Dropdown>
                  }
                </div>
              </ModalOptions>
            </ModalBody>

            <ModalFooter className="h-20 d-flex justify-content-center align-items-center bottom-border-radius" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.theme.primary}`} colorStyled={`${application.mode.primary}`} borderTopStyled={`${application.mode.primary}`}>
              <Button onClick={() => this.toggleSettingsMenu()} className="h-40px p-10px clickable text-bold text-large" backgroundStyled={`${application.mode.primary}`} backgroundHvrStyled={`${application.mode.primaryHover}`} colorStyled={`${application.theme.primary}`} colorHvrStyled={`${application.theme.primary}`} radiusStyled={`${settings.appRadius}`}>Close</Button>
            </ModalFooter>
          </Settings>

          <UserNav header={this.props.header} setOverlay={this.toggleSettingsMenu} /> 
          
          {this.props.content}
        </Body>
    )
  }
}

const mapStateToProps = state => ({
  application: state.application,
  updateTheme: PropTypes.func.isRequired,
  updateMode: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { updateTheme, updateMode })(Main);