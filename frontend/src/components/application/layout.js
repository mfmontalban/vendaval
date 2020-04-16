import React, {Component} from 'react'
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';

// import './fontawesome/css/all.css';
import './layout.css';
import './common/components.css';

import Div from './common/styled/div';
import H1 from './common/styled/h1';
import UserNav from './main/layout/parts/userNav';


import ModalMode from './main/layout/parts/modalMode';
import ModalTheme from './main/layout/parts/modalTheme';
import Button from './common/styled/button';

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
  
  componentWillUpdate() {
    document.body.style.backgroundColor = `${this.props.application.mode.primaryBackground}`;
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

  toggleSidebars = (l, r) => {
    this.setState(() => ({
      ml: 'ml-'& l,
      mr: 'ml-'& r
    }))
  }

	render() {
    const { application } = this.props;
    const { settingsMenu } = this.state;

		return (
			<div className="h-100 layout">
        <Div 
          onClick={() => this.closeSettingsMenu()} 
          className={(settingsMenu === true ? 'z-1250 visible' : 'z-neg1 invisible') + ' position-fixed h-100vh w-100vw bottom-0 left-0 overlay'} 
          transitionStyled={settingsMenu === true ? `${application.transitions.settingsIn}`: `${application.transitions.settingsOut}`}
        />
          <div className="d-flex justify-content-center">
            <Div 
              className={(settingsMenu === true ? 'z-1500 visible modal' : 'z-neg1 invisible') + ' max-w-400px position-fixed bottom-0 outer-shadow-primary border-1 ml-auto mr-auto'} 
              transitionStyled={settingsMenu === true ? `${application.transitions.settingsIn}`: `${application.transitions.settingsOut}`} 
              activeStyled={this.state.settingsMenu} 
              heightStyled={`${application.settings.heightSettings}`} 
              backgroundStyled={`${application.mode.primary}`} 
              colorStyled={`${application.theme.primary}`} 
              widthStyled={`${application.settings.widthSettings}`} 
              marginLeftStyled={`${application.settings.marginLeftSettings}`} 
              marginRightStyled={`${application.settings.marginRightSettings}`} 
              radiusStyled={`${application.settings.appRadius}`}
            >
              <H1
                className="h-20 d-flex align-items-center border-bottom-1 outer-shadow-primary font-weight-normal m-0" 
                backgroundStyled={`${application.theme.primaryQuarter}`} 
                radiusStyled={`${application.settings.appRadiusTop}`} 
                fontSizeStyled={application.text.description}
              >
                <div className="w-100 text-center">
                  <FormattedMessage
                    id="settings.title"
                    defaultMessage="Settings"
                  />
                </div>
              </H1>

              <div className="h-60 p-10px" >
                <ModalMode />

                <ModalTheme />
              </div>

              <Div 
                className="h-20 d-flex justify-content-center align-items-center mt-neg20px" 
                radiusStyled={`${application.settings.appRadiusBottom}`}
              >
                <Button 
                  onClick={() => this.closeSettingsMenu()} 
                  className="p-10px clickable border-1 outer-shadow-primary" 
                  transitionStyled={`${application.transitions.general}`} 
                  backgroundStyled={`${application.theme.primaryQuarter}`} 
                  backgroundHoverStyled={`${application.theme.primary}`} 
                  colorStyled={`${application.mode.primary}`} 
                  colorHoverStyled={`${application.mode.primary}`} 
                  radiusStyled={`${application.settings.appRadius}`}
                  fontSizeStyled={application.text.important}
                >
                  <FormattedMessage
                    id="settings.close"
                    defaultMessage="Close"
                  />
                </Button>
              </Div>
            </Div>
          </div>

          <UserNav setSidebars={this.toggleSidebars} setOverlay={this.toggleSettingsMenu} />

          <Div
            className={`z-1000 extendSidebars position-relative overflow-scroll scrollbar-width-none outer-shadow-primary border-1`}
            marginTopStyled={`${application.settings.appMargin}`} 
            heightStyled={`${application.settings.contentHeight}`} 
            backgroundStyled={`${application.mode.primary}`} 
            colorStyled={`${application.theme.primary}`} 
            radiusStyled={`${application.settings.appRadius}`}
          >
            {this.props.children}
          </Div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  application: state.application,
});

export default connect(mapStateToProps, {})(Layout);