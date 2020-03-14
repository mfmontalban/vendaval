import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import {FormattedMessage} from 'react-intl';

import Div from './styled/div';
import Button from './styled/button';

class PromptMessage extends React.Component {

  constructor() {
    super();
    this.state = {
      settingsMenu: false,
    };
  }

  componentDidMount(prevProps, prevState) {
    if (this.props.application) {
      setTimeout(() => {
        this.setState({ 
          settingsMenu: true,
        });
      }, 250);
    }
  }

  closeSettingsMenu = () => {
    this.setState(prevState => ({
      settingsMenu: false,
    }))
  }

  render() {

    const { settingsMenu } = this.state;

    return (
      <div>
        <Div onClick={() => this.closeSettingsMenu()} className={(settingsMenu === true ? 'z-1250 visible' : 'z-neg1 invisible') + ' position-fixed h-100vh w-100vw bottom-0 left-0 overlay'} transitionStyled={settingsMenu === true ? `${this.props.application.transitions.settingsIn}`: `${this.props.application.transitions.settingsOut}`} />
        <Div className={(settingsMenu === true ? 'z-1500 visible modal2' : 'z-neg1 invisible') + ' position-fixed bottom-0 outer-shadow-primary border-1'} transitionStyled={settingsMenu === true ? `${this.props.application.transitions.settingsIn}`: `${this.props.application.transitions.settingsOut}`} activeStyled={this.state.settingsMenu} heightStyled={`${this.props.application.settings.heightDeleteModal}`} backgroundStyled={`${this.props.application.mode.primary}`} widthStyled={`${this.props.application.settings.widthSettings}`} marginLeftStyled={`${this.props.application.settings.marginLeftSettings}`} marginRightStyled={`${this.props.application.settings.marginRightSettings}`} radiusStyled={`${this.props.application.settings.appRadius}`}>
          <Div className="h-20 d-flex align-items-center border-bottom-1" transitionStyled={`${this.props.application.transitions.general}`} backgroundStyled={`${this.props.application.theme.primaryQuarter}`} colorStyled={`${this.props.application.theme.primary}`} borderBottomStyled={`${this.props.application.theme.primary}`} radiusStyled={`${this.props.application.settings.appRadiusTop}`}>
            <div className="ml-10px text-x-large w-50 text-left">
              <FormattedMessage
                id={`modal.${this.props.alertTitle}`}
                defaultMessage={this.props.alertDefaultTitle}
              />
            </div>
            <div className="h-40px w-50 d-flex align-items-center justify-content-flex-end">
              <Button onClick={() => this.closeSettingsMenu()} className="mr-10px" transitionStyled={`${this.props.application.transitions.general}`} backgroundStyled={`${this.props.application.transparent}`} colorStyled={`${this.props.application.mode.primaryThree}`} colorHoverStyled={`${this.props.application.mode.primary}`}>
                <i className="fas fa-times fa-2x clickable" />
              </Button>
            </div>
          </Div>

          <Div className="h-50" transitionStyled={`${this.props.application.transitions.general}`} backgroundStyled={`${this.props.application.mode.primary}`}>
            <Div className="p-10px text-medium" transitionStyled={`${this.props.application.settings.appTransition}`} backgroundStyled={`${this.props.application.mode.primary}`}>
              <FormattedMessage
                id={`modal.${this.props.alertMessage1}`}
                defaultMessage={this.props.alertDefaultMessage1}
              />
              {this.props.application.alerts.forgot}
              <FormattedMessage
                id={`modal.${this.props.alertMessage2}`}
                defaultMessage={this.props.alertDefaultMessage2}
              />
            </Div>
          </Div>

          <Div className="h-30 d-flex justify-content-center align-items-center bottom-border-radius border-top-1" transitionStyled={`${this.props.application.transitions.general}`}  backgroundStyled={`${this.props.application.theme.primaryQuarter}`} colorStyled={`${this.props.application.theme.primary}`} borderTopStyled={`${this.props.application.mode.primary}`} radiusStyled={`${this.props.application.settings.appRadiusBottom}`}>
            <Button onClick={() => {this.closeSettingsMenu()}} className="h-40px p-10px mr-10px clickable text-bold text-large" transitionStyled={`${this.props.application.transitions.general}`} backgroundStyled={`${this.props.application.mode.primary}`} backgroundHoverStyled={`${this.props.application.mode.primaryHover}`} colorStyled={`${this.props.application.theme.primary}`} colorHoverStyled={`${this.props.application.theme.primary}`} radiusStyled={`${this.props.application.settings.appRadius}`}>
              <FormattedMessage
                id="modal.close"
                defaultMessage="Close"
              />
            </Button>
          </Div>
        </Div>
      </div>
    );
  }
};

PromptMessage.propTypes = {
  alertTitle: PropTypes.string.isRequired,
  alertMessage: PropTypes.string.isRequired,
};

PromptMessage.defaultProps = {
  alertTitle: 'text',
  alertMessage: 'text'
};

export default PromptMessage;
