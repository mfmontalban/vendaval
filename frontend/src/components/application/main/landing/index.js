import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import Div from '../common/styled/div';

import SVG from '../common/styled/svg';
import Sky from './SVG/hero-sky1';
import Sky2 from './SVG/hero-sky2';
import Cloud from './SVG/hero-cloud1';
import Cloud2 from './SVG/hero-cloud2';
import Vlogo1 from './SVG/hero-vlogo1';
import Vlogo2 from './SVG/hero-vlogo2';
import Vlogo3 from './SVG/hero-vlogo3';

import './index.css';

class Landing extends Component {

  handleScrollToElement = (e) => {
    let element = document.getElementById("main-content");
    element.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
  }

  handleScrollToElement2 = (e) => {
    let element = document.getElementById("header");
    element.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
  }

  render() {
    const { application } = this.props;

    let winds;

    if (application.language === 'es') {
      winds = 'vientos'
    } else {
      winds = 'winds'
    }

    return (
        <Div className="scroll-container bottom-outer-shadow ml-10px mr-10px pt-70px scrollbar-width-none" heightStyled={`${application.settings.heightHero}`} backgroundStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadiusBottom}`} colorStyled={`${application.theme.primary}`}>
          <div className="h-100 position-relative">
            <div className="h-10 d-flex justify-content-space-around">
              <div className="position-relative">
                <SVG preserveAspectRatio="xMidYMin slice" viewBox="0 0 100 100" fillStyled={`${application.theme.primaryHalf}`}><Sky /></SVG>
              </div>
              <div className="position-relative">
                <SVG preserveAspectRatio="xMidYMin slice" viewBox="0 0 100 100" fillStyled={`${application.theme.primaryHalf}`}><Sky2 /></SVG>
              </div>
            </div>

            <div className="h-45 d-flex justify-content-space-around overflow-hidden">
              <div className="position-relative cloud max-w-200px">
                <SVG preserveAspectRatio="xMidYMin slice" viewBox="0 0 100 100" fillStyled={`${application.theme.primary}`}><Cloud /></SVG>
              </div>
              <div className="position-relative cloud cloud-1 max-w-200px">
                <SVG className="mt-25px" preserveAspectRatio="xMidYMin slice" viewBox="0 0 100 100" fillStyled={`${application.theme.primary}`}><Cloud2 /></SVG>
              </div>
            </div>

            <div className="h-25 d-flex justify-content-space-around mt-neg150px">
              <div className="w-75 position-relative d-flex justify-content-space-around kite">
                <SVG className="h-100 w-65 overflow-visible" preserveAspectRatio="xMidYMin slice" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="linear1" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%"   stopColor="rgba(255,0,255,1)"/>
                      <stop offset="100%" stopColor="rgba(0,255,255,1)"/>
                    </linearGradient>
                    <linearGradient id="linear2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"   stopColor="rgba(255,255,255,.5)"/>
                      <stop offset="100%" stopColor="rgba(0,0,0,.75)"/>
                    </linearGradient>
                    <linearGradient id="linear3" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%"   stopColor="rgba(255,25,0,1)"/>
                      <stop offset="100%" stopColor="rgba(255,255,0,1)"/>
                    </linearGradient>
                  </defs>
                  <Vlogo1 className="max-h-100" fill="url(#linear1)" />
                  <Vlogo3 className="max-h-100" fill="url(#linear3)" />
                  <Vlogo2 className="max-h-100" fill="url(#linear2)" />
                </SVG>
              </div>
            </div>
            <Div className="position-relative text-center hero-message-container" colorStyled={`${application.theme.primary}`}>
              <FormattedHTMLMessage
                id="landing.heroMessage"
                defaultMessage="Winds of Change"
              />
              <Div colorStyled={`${application.theme.primary}`} name="infoSection" className="call-to-action text-info" onClick={this.handleScrollToElement}>
                <FormattedHTMLMessage
                  id="landing.heroAction"
                  defaultMessage="Explore"
                />
                <div>&darr;</div>
              </Div>
            </Div>
          </div>
          <Div id="main-content" className="position-relative pt-10px pl-10px pr-10px pb-20px" minHeightStyled={`${application.settings.heightLandingMain}`}  backgroundStyled={`${application.mode.primaryHover}`}>
            <div className="about text-center">
              <h3>
                <FormattedMessage
                  id="landing.aboutMain"
                  defaultMessage="An international collective driving change around the World."
                />
              </h3>

              <p>
                <FormattedMessage
                  id="landing.aboutSecondary"
                  defaultMessage="Our mission is to create, educate, and motivate the communities that we engage with. To achieve this mission, we've established a cutting-edge platform to unite community leaders across the world and educate others with our collective experiences."
                />
              </p>
            </div>
            
            <div className="d-flex justify-content-space-around flex-wrap text-center mt-5 pb-50px">
              <div className="feature p-10px">
                <i className="icon fal fa-eye"></i>
                <h4>
                  <FormattedMessage
                    id="landing.featuresTitle1"
                    defaultMessage="Articles"
                  />
                </h4>
                <FormattedMessage
                  id="landing.featuresDescription1"
                  defaultMessage="Learn from our writers who are passionate about sharing their experiences."
                />
              </div>

              <div className="feature p-10px">
                <i className="icon fal fa-hexagon"></i>
                <h4>
                  <FormattedMessage
                    id="landing.featuresTitle2"
                    defaultMessage="Creativity"
                  />
                </h4>
                <FormattedMessage
                  id="landing.featuresDescription2"
                  defaultMessage="Share your audio-visual creations with other curators around the World."
                />
              </div>

              <div className="feature p-10px">
                <i className="icon fal fa-thunderstorm"></i>
                <h4>
                  <FormattedMessage
                    id="landing.featuresTitle3"
                    defaultMessage="News"
                  />
                </h4>
                <FormattedMessage
                  id="landing.featuresDescription3"
                  defaultMessage="Read from our dedicated journalists who strive for honesty & transparency in their reporting."
                />
              </div>

              <div className="feature p-10px">
                <i className="icon fal fa-hand-holding-magic"></i>
                <h4>
                  <FormattedMessage
                    id="landing.featuresTitle4"
                    defaultMessage="News"
                  />
                </h4>
                <FormattedMessage
                  id="landing.featuresDescription4"
                  defaultMessage="Read from our dedicated journalists who strive for honesty & transparency in their reporting."
                />
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <Link to={`/${winds}`} className="noUnderline">
                <Div className="p-10px text-bold text-x-large" onClick={this.handleScrollToElement2} transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.theme.primary}`} backgroundHoverStyled={`${application.theme.primaryHover}`} colorStyled={`${application.mode.primary}`} colorHoverStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadius}`}>
                  <FormattedMessage
                    id="landing.endingNote"
                    defaultMessage="Start Exploring Now!"
                  />
                </Div>
              </Link>
            </div>

          </Div>
        </Div>
    );
  }
}

Landing.propTypes = {
  application: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  application: state.application
});

export default connect(mapStateToProps, {})(Landing);