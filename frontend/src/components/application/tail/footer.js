import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';

import Div from '../main/common/styled/div';

import './footer.css';

class Footer extends Component{

  render(){
		const { application } = this.props;
		return (
			<Div className="pt-10px border-top-1" widthStyled={`${application.settings.widthFooter}`} marginLeftStyled={`${application.settings.marginLeftBody}`} marginRightStyled={`${application.settings.marginRightBody}`} borderTopStyled={`${application.mode.primary}`}>
				<div className="d-flex justify-content-center pl-15px">
						<Div href="https://www.youtube.com/channel/UCWyiBVKzOekw2Q0Wygvx4aw" target="_blank" rel="noopener noreferrer" className="p-10px" transitionStyled={`${application.settings.appTransition}`} colorStyled={`${application.mode.primary}`} colorHoverStyled={`${application.theme.primary}`}><i className="fab fa-youtube fa-2x"></i></Div>
						<Div href="https://www.facebook.com/vendaval.space/" target="_blank" rel="noopener noreferrer" className="p-10px" transitionStyled={`${application.settings.appTransition}`} colorStyled={`${application.mode.primary}`} colorHoverStyled={`${application.theme.primary}`}><i className="fab fa-facebook-f fa-2x"></i></Div>
						<Div href="https://www.instagram.com/vendaval.space/" target="_blank" rel="noopener noreferrer" className="p-10px" transitionStyled={`${application.settings.appTransition}`} colorStyled={`${application.mode.primary}`} colorHoverStyled={`${application.theme.primary}`}><i className="fab fa-instagram fa-2x"></i></Div>
						<Div href="https://twitter.com/vendaval_space" target="_blank" rel="noopener noreferrer" className="p-10px" transitionStyled={`${application.settings.appTransition}`} colorStyled={`${application.mode.primary}`} colorHoverStyled={`${application.theme.primary}`}><i className="fab fa-twitter fa-2x"></i></Div>
						<Div href="https://twitter.com/vendaval_space" target="_blank" rel="noopener noreferrer" className="p-10px" transitionStyled={`${application.settings.appTransition}`} colorStyled={`${application.mode.primary}`} colorHoverStyled={`${application.theme.primary}`}><i className="fab fa-linkedin-in fa-2x"></i></Div>
				</div>

				<div className="text-center d-flex justify-content-center pt-10px">
					<Link to={'#'} className="noUnderline">
						<Div href="#" target="_blank" rel="noopener noreferrer" className="p-5px border-bottom-1" transitionStyled={`${application.settings.appTransition}`} colorStyled={`${application.mode.primary}`} colorHoverStyled={`${application.theme.primary}`} borderBottomHoverStyled={`${application.theme.primary}`}>
							<FormattedMessage
								id="footer.privacy"
								defaultMessage="Privacy"
							/>
						</Div>
					</Link>

					<Div className="p-5px" colorStyled={`${application.mode.primary}`}>|</Div>

					<Link to={'#'} className="noUnderline">
						<Div href="#" target="_blank" rel="noopener noreferrer" className="p-5px border-bottom-1" transitionStyled={`${application.settings.appTransition}`} colorStyled={`${application.mode.primary}`} colorHoverStyled={`${application.theme.primary}`} borderBottomHoverStyled={`${application.theme.primary}`}>
							<FormattedMessage
								id="footer.terms"
								defaultMessage="Terms & Conditions"
							/>
						</Div>
					</Link>

					<Div className="p-5px" colorStyled={`${application.mode.primary}`}>|</Div>

					<Link to={'#'} className="noUnderline">
						<Div href="#" target="_blank" rel="noopener noreferrer" className="p-5px border-bottom-1" transitionStyled={`${application.settings.appTransition}`} colorStyled={`${application.mode.primary}`} colorHoverStyled={`${application.theme.primary}`} borderBottomHoverStyled={`${application.theme.primary}`}>
							<FormattedMessage
								id="footer.cookies"
								defaultMessage="Cookies"
							/>
						</Div>
					</Link>
				</div>

				<div className="d-flex justify-content-center pt-10px pb-10px">
					<Div className="p-5px" colorStyled={`${application.mode.primary}`}>&copy; {new Date().getFullYear()} Vendaval</Div>
				</div>
			</Div>
		);
	}
}

const mapStateToProps = state => ({
  application: state.application,
});

export default connect(mapStateToProps, {})(Footer);