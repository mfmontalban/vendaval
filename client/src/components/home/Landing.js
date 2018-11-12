import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Landing.css';

import sky from '../../images/hero-sky.png';
import cloud from '../../images/hero-cloud.png';
import kite from '../../images/hero-kite.png';
import water from '../../images/hero-water.png';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.infoSection = React.createRef();
  }

  handleScrollToElement = (e) => {
    window.scrollTo({
      top:this.infoSection.current.offsetTop,
      behavior:'smooth'
    });
  }

  render() {
    return (
      <div className="bg-info h-100">
        <nav className="navbar navbar-expand navbar-dark bg-info flex-row justify-content-between p-0 top-nav-height z-1035">
          <div className="navbar-nav flex-row top-nav-component-height">
            <div className="input-group ml-2">
              <div className="input-group-prepend">
                <button type="button" className="btn bg-transparent border-opaque nav-item nav-link" id="button-addon2"><i className="fal fa-search"></i></button>
                <button type="button" className="btn bg-transparent border-opaque nav-item nav-link dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="top-nav-item-icon-fix sr-only">Toggle Dropdown</span>
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item clearSearch" href="#{}">Clear Selection</a>
                  <div role="separator" className="dropdown-divider"></div>
                  <a className="dropdown-item updateSearch" href="#{}">Participar</a>
                  <a className="dropdown-item updateSearch" href="#{}">Motivar</a>
                  <a className="dropdown-item updateSearch" href="#{}">Crear</a>
                </div>
              </div>
              <input type="text" className="top-nav-item form-control top-nav-component-height" aria-label="Text input with segmented dropdown button"></input>
              <div className="top-nav-item input-group-append">
                <button type="button" className="btn bg-transparent border-opaque nav-item nav-link search-padding"><i className="fal fa-angle-right"></i></button>
              </div>
            </div>
          </div>
          <div className="navbar-nav flex-row">
            <div className="btn-group dropdown">
              <button type="button" id="changeLanguage" className="btn dropdown-toggle bg-transparent nav-item nav-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                es
              </button>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="changeLanguage">
                <button className="dropdown-item text-right" type="button">Espanol</button>
              </div>
            </div>
          </div>
        </nav>
        <div className="landing-container rounded mt-2 ml-3 mr-3 mb-2 bg-white">
          <div className="hero vh-100 d-flex flex-column justify-content-center">
              <img className="position-absolute sky" alt="The sky above the ocean" src={sky}/>
              <img className="position-absolute cloud cloud-1" alt="A grayish-blue cloud" src={cloud}/>
              <img className="position-absolute cloud cloud-2" alt="Another grayish-blue cloud" src={cloud}/>
              <img className="position-absolute kite" alt="A kite hovering a few feet over the surface of the water" src={kite}/>
              <img className="position-absolute water" alt="The water where the kite is hovering" src={water}/>
            <div className="position-absolute text-center hero-message-container">
              <h1 className="display-4"><i>Vientos</i> de <strong>Cambio</strong>.</h1>
              <div name="infoSection" className="call-to-action text-info" onClick={this.handleScrollToElement}>
                <div className="text">Explora</div>
                <div>&darr;</div>
              </div>
            </div>
          </div>
          <div className="vh-100 p-5 bg-light rounded-bottom" ref={this.infoSection}>
              <div className="about text-center">
                <h3>An international collective driving change around the World.</h3>
                <p>Our mission is to create, educate, and motivate the communities that we engage with. To achieve this mission, we've established a cutting-edge platform to unite community leaders across the world and educate others with our collective experiences.</p>
              </div>
              <div className="features text-center mt-5">
                <div className="row">
                  <div className="feature col-sm">
                    <div className="icon bg-info text-white">
                      <i className="fal fa-pen-fancy"></i>
                    </div>
                    <h4>Articles</h4>
                    <p className="text-muted">Learn from our writers who are passionate about sharing their experiences.</p>
                  </div>
                  <div className="col-sm feature">
                    <div className="icon bg-info text-white">
                      <i className="fal fa-paint-brush"></i>
                    </div>
                    <h4>Creativity</h4>
                    <p className="text-muted">Share your audio-visual creations with other curators around the World.</p>
                  </div>
                  <div className="col-sm feature">
                    <div className="icon bg-info text-white">
                      <i className="fal fa-newspaper"></i>
                    </div>
                    <h4>News</h4>
                    <p className="text-muted">Read from our dedicated journalists who strive for honesty & transparency in their reporting.</p>
                  </div>
                </div>
                <Link className="btn btn-outline-info mt-5" to="/">Coming Soon</Link>
              </div>
          </div>
        </div>
        <div className="text-center">
          <p className="mb-1 mt-1 ml-auto mr-auto text-light">&copy; {new Date().getFullYear()} Vendaval</p>
        </div>
      </div>
    );
  }
}

export default Landing;
