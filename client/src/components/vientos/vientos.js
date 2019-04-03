import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { closeApplicationAlertsUpdated } from '../../actions/applicationActions';
import { getLiveVientos } from '../../actions/vientosActions';
import { setSortsRecentNewest } from '../../actions/applicationActions'
import { setSortsRecentOldest } from '../../actions/applicationActions'

import Footer from '../application/layout/footer'
import Spinner from '../application/common/spinner';
import Map from '../application/map/canvas';
import Controls from '../application/map/controls';
import VientoItem from './vientoItem';


class Vientos extends Component {

  componentDidMount() {
    this.props.getLiveVientos();
  }

  onCloseUpdatedAlert = (e) => {
    this.props.closeApplicationAlertsUpdated();
  }

  render() {

    const { vientos, loading } = this.props.vientos;
    const { alerts, filters } = this.props.application;

    let dashboardContent;
    let vientosNav;
    let loadingContent;
    let content;

    vientosNav = (
      <nav className="container-width container-margin z-1005 d-flex navbar-dark bg-transparent justify-content-between">
        <div className="item">
          <div className="btn-group dropdown">
            <button type="button" id="categories" className="btn btn-outline-info rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fal fa-archive"></i></button>
              <div className="dropdown-menu" aria-labelledby="categories">
                <a href="#" className="dropdown-item"><i className="fal fa-hotel mr-2"></i>
                  <span className="pr-2">
                    Stay
                    {/* <FormattedMessage
                      id="navigation.think"
                      defaultMessage="Think"
                    /> */}
                  </span>
                </a>
                <a href="#" className="dropdown-item"><i className="fal fa-glass-martini-alt mr-2"></i>
                  <span className="pr-2">
                    Entertainment
                    {/* <FormattedMessage
                      id="navigation.think"
                      defaultMessage="Think"
                    /> */}
                  </span>
                </a>
                <a href="#" className="dropdown-item"><i className="fal fa-knife-kitchen mr-2"></i>
                  <span className="pr-2">
                    Cuisine
                    {/* <FormattedMessage
                      id="navigation.educate"
                      defaultMessage="Educate"
                    /> */}
                  </span>
                </a>
              </div>
            </div>
        </div>
        <div className="item d-flex flex-row">
          <div className="dropdown">
            <button type="button" id="changeLanguage" className="btn btn-outline-info ml-2 mr-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">World</button>
            <div className="bg-transparent dropdown-menu border-0 correctWorld" aria-labelledby="categories">
              <div className="scrollmenu border border-info m-2">
                <a href="#home">Africa</a>
                <a href="#news">Asia</a>
                <a href="#contact">Europe</a>
                <a href="#about">N. America</a>
                <a href="#about">S. America</a>
              </div>
              
              {/* <a href="#" className="dropdown-item">
                <span className="pr-2">
                  <FormattedMessage
                    id="navigation.think"
                    defaultMessage="Think"
                  />
                </span>
              </a> */}
            </div>
          </div>
        </div>
        <div className="item">
          <div className="btn-group dropdown">
            <button type="button" id="filter" className="btn btn-outline-info rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img alt="" /><i className="fal fa-sort"></i></button>
            <div className="dropdown-menu dropdown-menu-right p-0" aria-labelledby="filter">
              <div href="#" className="p-0 d-flex flex-row justify-content-between h-40px border-bottom">
                <div 
                className="p-2 border-right align-middle lh-1"
                onClick={(e) => {
                  this.props.setSortsRecentNewest(e);
                }}>
                  <i className="fal fa-sort-up"></i>
                </div>
                <div className="align-middle">
                  <span className="pr-2">
                  Recent
                  {/* <FormattedMessage
                    id="navigation.login"
                    defaultMessage="Login"
                  /> */}
                  </span>
                  <i className="fal fa-hourglass-start"></i>
                </div>
                <div 
                className="p-2 border-left align-middle lh-1"
                onClick={(e) => {
                  this.props.setSortsRecentOldest(e);
                }}>
                  <i className="fal fa-sort-down"></i>
                </div>
              </div>
              <div href="#" className="p-0 d-flex flex-row justify-content-between h-40px border-bottom">
                <div className="p-2 border-right align-middle lh-1">
                  <i className="fal fa-sort-up"></i>
                </div>
                <div className="align-middle">
                  <span className="pr-2">
                    Views
                    {/* <FormattedMessage
                      id="navigation.register"
                      defaultMessage="register"
                    /> */}
                  </span>
                  <i className="fal fa-fire"></i>
                </div>
                <div className="p-2 border-left align-middle lh-1">
                  <i className="fal fa-sort-down"></i>
                </div>
              </div>
              <div href="#" className="p-0 d-flex flex-row justify-content-between h-40px">
                <div className="p-2 border-right align-middle lh-1">
                  <i className="fal fa-sort-up"></i>
                </div>
                <div className="align-middle">
                  <span className="pr-2">
                    Comments
                    {/* <FormattedMessage
                      id="navigation.forgot"
                      defaultMessage="forgot"
                    /> */}
                  </span>
                  <i className="fal fa-comment-alt"></i>
                </div>
                <div className="p-2 border-left align-middle lh-1">
                  <i className="fal fa-sort-down"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
    
    if (vientos === null || loading) {
      loadingContent = <Spinner />;
    } else {
      if (vientos.length > 0) {
        dashboardContent = vientos.filter(viento => {
          if (filters.text.keyword != null ) {
            const contentHTMLMatch = viento.title.toLowerCase().includes(filters.text.keyword);
            return contentHTMLMatch;
          }
          return viento;
        }).sort((viento1, viento2) => {
            if (filters.sortBy.text === 'titleup') {
                return viento1.title.localeCompare(viento2.title);
            } else if (filters.sortBy.text === 'titledown') {
                return viento1.title.toLowerCase() > viento2.title.toLowerCase() ? -1 : viento2 > viento1 ? 1 : 0;
            } else if (filters.sortBy.text === 'publishedup') {
                return viento1.createdAt < viento2.createdAt ? -1 : 1;
            } else if (filters.sortBy.text === 'publisheddown') {
                return viento1.createdAt < viento2.createdAt ? 1 : -1;
            }
        }).map(viento =>
          <VientoItem key={viento._id} viento={viento} />
        );
              

        content = (
          <div>
            <Map />
            {vientosNav}
            <div className="scroll-container vientos-container container-width container-margin border border-info rounded bg-info">
              {dashboardContent}
            </div>
          </div>
        );

      } else {
        content = (
          <div>no content</div>
        );
      }
    }

    const updatedAlert = (
      <div className="fixed-top alert-margin ml-5 mr-5 alert alert-info alert-dismissible fade show" role="alert">
      An email detailing the changes made has been sent to: {alerts.updated}
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true" onClick={this.onCloseUpdatedAlert}>&times;</span>
      </button>
      </div>
    );

    return (
      <div>
        <div className="body scroll-container body-shadow">
          {alerts.updated ? updatedAlert : null}
          {loadingContent}
          {content}
        </div>
        <Footer />
      </div>
    );
  }
}

Vientos.propTypes = {
  closeApplicationAlertsUpdated: PropTypes.func.isRequired,
  getLiveVientos: PropTypes.func.isRequired,
  setSortsRecentNewest: PropTypes.func.isRequired,
  setSortsRecentOldest: PropTypes.func.isRequired,
  vientos: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  application: state.application,
  vientos: state.vientos
});

export default connect(mapStateToProps, { closeApplicationAlertsUpdated, getLiveVientos, setSortsRecentNewest, setSortsRecentOldest })(Vientos);
