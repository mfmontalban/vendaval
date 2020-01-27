import React, {Component} from 'react'
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';

import Div from './main/common/styled/div';
import UserNav from './main/layout/parts/userNav';

import ModalMode from './main/layout/parts/modalMode';
import ModalTheme from './main/layout/parts/modalTheme';
import Button from './main/common/styled/button';

class Layout extends Component {

  constructor(props){
    super(props)
    this.state = {
      settingsMenu: false,
    }
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.body.style.backgroundColor = `${this.props.application.mode.primaryBackground}`;
  }
  
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.body.style.backgroundColor = `${this.props.application.mode.primaryBackground}`;
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
    }))
  }

  closeSettingsMenu = () => {
    this.setState(prevState => ({
      settingsMenu: false,
    }))
  }

	render() {
    const { application } = this.props;
    const { settingsMenu } = this.state;

		return (
			<Div id="content" marginStyled={`${application.settings.appMargin}`} heightStyled={`${application.settings.appHeight}`} widthStyled={`${application.settings.appWidth}`}>
				<Div onClick={() => this.closeSettingsMenu()} className={(settingsMenu === true ? 'z-1250 visible' : 'z-neg1 invisible') + ' position-fixed h-100vh w-100vw bottom-0 left-0 overlay'} transitionStyled={settingsMenu === true ? `${application.transitions.settingsIn}`: `${application.transitions.settingsOut}`}/>

				<Div className={(settingsMenu === true ? 'z-1500 visible modal' : 'z-neg1 invisible') + ' position-fixed bottom-0 outer-shadow-primary border-1'} transitionStyled={settingsMenu === true ? `${application.transitions.settingsIn}`: `${application.transitions.settingsOut}`} activeStyled={this.state.settingsMenu} heightStyled={`${application.settings.heightSettings}`} backgroundStyled={`${application.mode.primary}`} colorStyled={`${application.theme.primary}`} widthStyled={`${application.settings.widthSettings}`} marginLeftStyled={`${application.settings.marginLeftSettings}`} marginRightStyled={`${application.settings.marginRightSettings}`} radiusStyled={`${application.settings.appRadius}`}>
					<Div className="h-20 d-flex align-items-center top-border-radius border-bottom-1 outer-shadow-primary" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`} borderBottomStyled={`${application.theme.primary}`}>
						<div className="ml-10px text-x-large">
						<FormattedMessage
							id="settings.title"
							defaultMessage="Settings"
						/>
						</div>
					</Div>

					<Div className="h-60" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`}>
						<Div className="p-10px text-medium" transitionStyled={`${application.settings.appTransition}`} backgroundStyled={`${application.mode.primary}`}>
						<ModalMode />

						<ModalTheme />
						</Div>
					</Div>

					<Div className="h-20 border-top-1 outer-shadow-primary d-flex justify-content-center align-items-center bottom-border-radius" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`}>
					<Button onClick={() => this.closeSettingsMenu()} className="h-40px p-10px clickable text-bold text-large" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.theme.primaryThree}`} backgroundHoverStyled={`${application.theme.primary}`} colorStyled={`${application.mode.primary}`} colorHoverStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadius}`}>
					<FormattedMessage
						id="settings.close"
						defaultMessage="Close"
					/>
					</Button>
				</Div>
				</Div>

				<UserNav setOverlay={this.toggleSettingsMenu} />

				<Div className="position-relative overflow-scroll scrollbar-width-none outer-shadow-primary border-1" marginTopStyled={`${application.settings.appMargin}`} heightStyled={`${application.settings.contentHeight}`} backgroundStyled={`${application.mode.primary}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadius}`}>
          {this.props.children}
        </Div>
			</Div>
		)
	}
}

const mapStateToProps = state => ({
  application: state.application,
});

export default connect(mapStateToProps, {})(Layout);