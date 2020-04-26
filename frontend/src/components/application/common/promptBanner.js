import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import {FormattedMessage} from 'react-intl';

import Div from './styled/div';
import Button from './styled/button';

class PromptBanner extends React.Component {

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
      <Div className={(settingsMenu === true ? 'z-1500 visible modal3' : 'z-neg1 invisible') + ' d-flex justify-content-center w-100 position-absolute top-0'} transitionStyled={settingsMenu === true ? `${this.props.application.transitions.settingsIn}`: `${this.props.application.transitions.settingsOut}`} activeStyled={this.state.settingsMenu} backgroundStyled={`${this.props.application.mode.primary}`} radiusStyled={`${this.props.application.settings.appRadius}`}>
        <Div
          className="d-flex w-min-content ml-auto mr-auto flex-direction-row position-absolute fixed-top outer-shadow-primary border-1 align-items-center" 
          role="alert"
          backgroundStyled={`${this.props.application.theme.primary}`}
          colorStyled={this.props.application.theme.primary}
          fontSizeStyled={this.props.application.text.primary}
          radiusStyled={this.props.application.settings.appRadius}
          > 
          <Div 
            className="p-5px h-40px" 
            colorStyled={this.props.application.mode.primary}
            >
            <FormattedMessage
              id={`modal.${this.props.alertMessage1}`}
              defaultMessage={this.props.alertDefaultMessage1}
              />
            {this.props.alertContent}
            <FormattedMessage
              id={`modal.${this.props.alertMessage2}`}
              defaultMessage={this.props.alertDefaultMessage2}
              />
          </Div>

          <Div 
            className="d-flex align-items-center" 
            transitionStyled={`${this.props.application.transitions.general}`} 
            >
            <Button 
              onClick={() => this.closeSettingsMenu()} 
              className="p-5px border-left-1" 
              transitionStyled={`${this.props.application.transitions.general}`} 
              backgroundStyled={`${this.props.application.mode.primaryThree}`} 
              backgroundHoverStyled={`${this.props.application.mode.primaryQuarter}`}
              colorStyled={`${this.props.application.mode.primaryThree}`} 
              colorHoverStyled={`${this.props.application.mode.primary}`}
              radiusStyled={this.props.application.settings.appRadiusRight}
            >
              <i className="fas fa-times fa-2x clickable" />
            </Button>
          </Div>
        </Div>
      </Div>
    );
  }
};

PromptBanner.propTypes = {
  alertTitle: PropTypes.string.isRequired,
  alertMessage: PropTypes.string.isRequired,
};

PromptBanner.defaultProps = {
  alertTitle: 'text',
  alertMessage: 'text'
};

export default PromptBanner;
