import React, {Component} from 'react'
import { connect } from 'react-redux';

import Header from './head/header';
import Content from './main/layout/content';
import Footer from './tail/footer';

import App from './main/common/styled/app';

class Layout extends Component {

	componentWillMount() {
			document.body.style.backgroundColor = `${this.props.application.mode.primaryBackground}`;
	}

	componentDidUpdate() {
			document.body.style.backgroundColor = `${this.props.application.mode.primaryBackground}`;
	}

	render() {
		const { header } = this.props
		const { application } = this.props;

		return (
			<App className="app" transitionStyled={`${application.transitions.general}`} widthStyled={`${application.settings.appWidth}`} backgroundStyled={`${application.mode.primaryBackground}`}>
				<Header  />
				<Content header={header} content={this.props.children} />
				<Footer />
			</App>
		)
	}
}

const mapStateToProps = state => ({
  application: state.application,
});

export default connect(mapStateToProps, {})(Layout);