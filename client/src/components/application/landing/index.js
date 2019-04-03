import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { readApplicationTitles, setLocale } from '../../../actions/applicationActions';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import sky from '../../../images/hero-sky.png';
import cloud from '../../../images/hero-cloud.png';
import kite from '../../../images/hero-kite.png';
import water from '../../../images/hero-water.png';

import './index.css';
import '../layout/header.css';
import '../layout/footer.css';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.infoSection = React.createRef();
    this.state = {
      search: '',
      language: ''
    };
  }

  componentDidMount() {
    this.props.readApplicationTitles();

    if (localStorage.language) {
      let language = localStorage.language;
      this.setState({
        language: language
      });
      this.props.setLocale(language);
    }
    else {
      let language1 = (navigator.languages && navigator.languages[0]) || navigator.userLanguage;
      let language = language1.substring(0, 2);
      this.setState({
        language: language
      });
      this.props.setLocale(language);
    }
  }

  updateSearch = (e) => {
    this.setState({
      search: e.target.value.substr(0,20)
    });
  }
  
  updateLanguage = (e) => {
    this.setState({
      language: e
    });
    this.props.setLocale(e);
  }

  handleScrollToElement = (e) => {
    window.scrollTo({
      top:this.infoSection.current.offsetTop,
      behavior:'smooth'
    });
  }

  render() {
    const titlesContainer = this.props.application.titles;
    let searchResults;
    let searchContainer;

    if (titlesContainer !== null && this.state.search !== '') {
      const titles = titlesContainer.filter(
        (object) => {
            return object.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
      );

      searchResults = titles.map((title) => {
        return <Link to={`/vientos/${title._id}`} className="result" key={title._id} >{title.title}</Link>
      });

      if (titlesContainer.length > 0) {
        searchContainer =
          <div className="resultsContainer">
            {searchResults}
          </div>
      } else {
        searchContainer =
          <div className="resultsContainer">
            <FormattedMessage
              id="navigation.searchResults"
              defaultMessage="No search results"
            />
          </div>
      }
    }

    return (
      <div className="bg-info h-100 landing-holder">
        <div className="landing-container landing-rounded bg-white">
          <div className="hero vh-100 d-flex flex-column justify-content-center">
              <img className="position-absolute sky" alt="The sky above the ocean" src={sky}/>
              <img className="position-absolute cloud cloud-1" alt="A grayish-blue cloud" src={cloud}/>
              <img className="position-absolute cloud cloud-2" alt="Another grayish-blue cloud" src={cloud}/>
              <img className="position-absolute kite" alt="A kite hovering a few feet over the surface of the water" src={kite}/>
              <img className="position-absolute water" alt="The water where the kite is hovering" src={water}/>
            <div className="position-absolute text-center hero-message-container">
              <FormattedHTMLMessage
                id="landing.heroMessage"
                defaultMessage="Winds of Change"
              />
              <div name="infoSection" className="call-to-action text-info" onClick={this.handleScrollToElement}>
                <FormattedHTMLMessage
                  id="landing.heroAction"
                  defaultMessage="Explore"
                />
                <div>&darr;</div>
              </div>
            </div>
          </div>
          <div className="vh-100p pt-3 pl-5 pr-5 bg-light rounded-bottom" ref={this.infoSection}>
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
              <div className="features text-center mt-5">
                <div className="row">
                  <div className="feature col-sm">
                    <div className="icon bg-info text-white">
                      <i className="fal fa-eye"></i>
                    </div>
                    <h4>
                      <FormattedMessage
                        id="landing.featuresTitle1"
                        defaultMessage="Articles"
                      />
                    </h4>
                    <p className="text-muted">
                      <FormattedMessage
                        id="landing.featuresDescription1"
                        defaultMessage="Learn from our writers who are passionate about sharing their experiences."
                      />
                    </p>
                  </div>
                  <div className="col-sm feature">
                    <div className="icon bg-info text-white">
                      <i className="fal fa-hexagon"></i>
                    </div>
                    <h4>
                      <FormattedMessage
                        id="landing.featuresTitle2"
                        defaultMessage="Creativity"
                      />
                    </h4>
                    <p className="text-muted">
                      <FormattedMessage
                        id="landing.featuresDescription2"
                        defaultMessage="Share your audio-visual creations with other curators around the World."
                      />
                    </p>
                  </div>
                  <div className="col-sm feature">
                    <div className="icon bg-info text-white">
                      <i className="fal fa-thunderstorm"></i>
                    </div>
                    <h4>
                      <FormattedMessage
                        id="landing.featuresTitle3"
                        defaultMessage="News"
                      />
                    </h4>
                    <p className="text-muted">
                      <FormattedMessage
                        id="landing.featuresDescription3"
                        defaultMessage="Read from our dedicated journalists who strive for honesty & transparency in their reporting."
                      />
                    </p>
                  </div>
                  <div className="col-sm feature">
                    <div className="icon bg-info text-white">
                      <i className="fal fa-hand-holding-magic"></i>
                    </div>
                    <h4>
                      <FormattedMessage
                        id="landing.featuresTitle4"
                        defaultMessage="News"
                      />
                    </h4>
                    <p className="text-muted">
                      <FormattedMessage
                        id="landing.featuresDescription4"
                        defaultMessage="Read from our dedicated journalists who strive for honesty & transparency in their reporting."
                      />
                    </p>
                  </div>
                </div>
                <Link className="btn btn-outline-info mt-5" to="/">
                  <FormattedMessage
                    id="landing.endingNote"
                    defaultMessage="Coming soon"
                  />
                </Link>
              </div>
          </div>
        </div>
        <div className="footerLanding">
          <div className="socialmedia-container d-flex flex-row justify-content-center">
              <a href="https://www.facebook.com/vendaval.space/" target="_blank" rel="noopener noreferrer" className="p-2 text-light"><i className="fab fa-facebook-f fa-2x"></i></a>
              <a href="https://twitter.com/vendaval_space" target="_blank" rel="noopener noreferrer" className="p-2 text-light"><i className="fab fa-twitter fa-2x"></i></a>
              <Link to="/about" className="p-2 text-light"><i className="fas fa-users fa-2x"></i></Link>
              <a href="https://www.instagram.com/vendaval.space/" target="_blank" rel="noopener noreferrer" className="p-2 text-light"><i className="fab fa-instagram fa-2x"></i></a>
              <a href="https://www.youtube.com/channel/UCWyiBVKzOekw2Q0Wygvx4aw" target="_blank" rel="noopener noreferrer" className="p-2 text-light"><i className="fab fa-youtube fa-2x"></i></a>
          </div>

          <div className="text-center d-flex flex-row justify-content-center">
            <a href="#" target="_blank" rel="noopener noreferrer" className="p-2 text-light">Privacy</a>
            <p className="p-2 text-light"> | </p>
            <a href="#" target="_blank" rel="noopener noreferrer" className="p-2 text-light">Terms & Conditions</a>
            <p className="p-2 text-light"> | </p>
            <a href="#" target="_blank" rel="noopener noreferrer" className="p-2 text-light">Cookies</a>
          </div>

          <div className="text-center">
              <p className="mb-1 mt-1 ml-auto mr-auto text-light">&copy; {new Date().getFullYear()} Vendaval</p>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  readApplicationTitles: PropTypes.func.isRequired,
  setLocale: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  application: state.application
});

export default connect(mapStateToProps, { readApplicationTitles, setLocale })(Landing);
