import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';
import { closeApplicationAlertsUpdated, setSortsRecentOldest, setSortsRecentNewest, setFiltersText, setCenteredMap } from '../../actions/applicationActions';
import { getLiveVientos } from '../../actions/vientosActions';

import Spinner from '../application/common/spinner';
import Map from '../application/map/canvas';
import Controls from '../application/map/controls';
import Dropdown from '../application/common/dropdown';
import VientoItem from './vientoItem';


class Vientos extends Component {
  constructor() {
    super();
    this.childRef = React.createRef();
    this.dropDownMenu = React.createRef();
    this.dropDownMenu2 = React.createRef();
    this.dropDownMenu3 = React.createRef();
    this.dropDownMenu5 = React.createRef();
    this.dropDownMenu7 = React.createRef();
    this.state = {
      centered: {},
      filter: '',
      filterSearch1: 'Title',
      filterSearch2: 'Title',
      filterSearch3: 'Title',
      filterSearch4: 'Title',
      isOpen: false,
      isOpen2: false,
      listOpen: false
    };
  }

  componentDidMount() {
    this.props.getLiveVientos();
  }

  onCloseUpdatedAlert = (e) => {
    this.props.closeApplicationAlertsUpdated();
  }

  updateSearch = (e) => {
    this.setState({
      filter: e.target.value.substr(0, 20)
    });
    this.props.setFiltersText(e.target.value.toLowerCase());
  }

  updateFilterSearch2 = (text, varb) => {
    this.setState({
      filterSearch1: text
    });
  }

  flyTo = (lat, lon) => {
    let obj;
    obj = {
      lat: lat,
      lon: lon,
    }
    this.props.setCenteredMap(obj);
  }

  render() {
    const { vientos, visible, loading } = this.props.vientos;
    const { alerts, filters, sortBy } = this.props.application;

    let dashboardContent;
    let vientosNav;
    let loadingContent;
    let content;

    const{listOpen} = this.state
    
    function selectLoop(e) {
      if (visible === null || loading) {
        loadingContent = <Spinner />;
      } else {
        if (visible.length > 0) {
          visible.filter(viento => {
            if (e = 'Author') {
              let row = <option className="optionHeight">{viento.user.name}</option>
              return row;
            } else if (e = 'Wind') {
              let row = <option className="optionHeight">{viento.type}</option>
              return row;
            } else if (e = 'Category') {
              let row = <option className="optionHeight">{viento.topic}</option>
              return row;
            }
            
            return viento;
          });
        }
      }
    }

    let inputTitle = (
      <input
        type="text"
        value={this.state.filter}
        onChange={this.updateSearch}
        className="top-nav-item bg-vientosBox form-control top-nav-component-height"
        aria-label="Text input"
        placeholder={this.state.filterSearch1}
      >
      </input>
    );

    vientosNav = (
      <div className="mt-43">
        <nav className="z-1005 d-flex navbar-dark bg-transparent justify-content-center">
          <div className="item">
            <div className={`btn-group dropdown`}>
            <Dropdown
              title="Select location"
              list={this.state.location}
              vientos={this.props.vientos.map}
            />
            </div>
            
            {/* <div ref={this.dropDownMenu} className={`btn-group dropdown`}>
              <button type="button" id="categories" className="btn btn-outline-info rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded={this.state.isOpen}><i className="fal fa-filter"></i></button>
              <div onClick={(e) => {this.addAnotherFilter(e)}} ref={this.dropDownMenu3}  className={`dropdown-menu p-2`}>
                  <div className="form-group">
                    <label for="exampleFormControlSelect1">
                      <FormattedMessage
                        id="navigation.filter"
                        defaultMessage="Filter"
                      />
                    </label>
                    <div className="d-flex justify-content-left">
                      <div ref={this.dropDownMenu5} className={`btn-group dropdown`}>
                        <button className="btn bg-silvero btn-outline-info border-opaque top-nav-component-height search-padding" type="button" id="changeFilter" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fal fa-text-height"></i>
                        </button>
                        <div onClick={(e) => {this.addAnotherFilter2(e)}} ref={this.dropDownMenu7} className="dropdown-menu" aria-labelledby="changeFilter">
                          <button onClick={(e) => this.updateFilterSearch1(e, 'Title')} className="dropdown-item text-info" type="button"><i className="fal fa-text-height"></i></button>
                          <button onClick={(e) => this.updateFilterSearch1(e, 'Author')} className="dropdown-item text-info" type="button"><i className="fal fa-user"></i></button>
                          <button onClick={(e) => this.updateFilterSearch1(e, 'Wind')} className="dropdown-item text-info" type="button"><i className="fal fa-wind"></i></button>
                          <button onClick={(e) => this.updateFilterSearch1(e, 'Category')} className="dropdown-item text-info" type="button"><i className="fal fa-archive"></i></button>
                        </div>
                      </div>

                      {this.state.filterSearch1 == 'Title' ? inputTitle : inputOthers}
                    </div>
                  </div>
                  
                  <div className="dropdown-item d-flex mt-2">
                    <i className="fal fa-plus-circle mt-1"></i>
                    <span className="ml-1">
                      <FormattedMessage
                        id="navigation.addanotherfilter"
                        defaultMessage="add another filter"
                      />
                    </span>
                  </div>

                  <div className="dropdown-divider"></div>

                  <input class="btn btn-primary" type="submit" value="Submit"></input>

              </div>
            </div> */}

          </div>
          <div className="item d-flex flex-row">
            <div className="dropdown">
              <button type="button" id="changeLanguage" className="btn btn-outline-info ml-2 mr-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">World</button>
              <div className="bg-transparent dropdown-menu border-0 correctWorld" aria-labelledby="categories">
                <div className="scrollmenu border border-info m-2">
                  <a href="#Africa" onClick={(e) => this.flyTo(8.7832, 34.5085)}>Africa</a>
                  <a href="#Asia" onClick={(e) => this.flyTo(100.6197, 34.0479)}>Asia</a>
                  <a href="#Europe" onClick={(e) => this.flyTo(54.5260, 15.2551)}>Europe</a>
                  <a href="#NorthAmerica" onClick={(e) => this.flyTo(-90, 45)}>N. America</a>
                  <a href="#SouthAmerica" onClick={(e) => this.flyTo(-65, -20)}>S. America</a>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="btn-group dropdown">
              <button type="button" id="filter" className="btn btn-outline-info rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img alt="" /><i className="fal fa-bookmark"></i></button>
              <div className="dropdown-menu dropdown-menu-right p-0" aria-labelledby="filter">
                <div href="#" className="p-0 d-flex flex-row justify-content-between h-40px border-bottom">
                  <div 
                  className="p-2 border-right align-middle text-info lh-1"
                  onClick={(e) => {
                    this.props.setSortsRecentNewest(e);
                  }}>
                    <i className="fal fa-sort-up"></i>
                  </div>
                  <div className="align-middle text-info">
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
                  className="p-2 border-left align-middle text-info lh-1"
                  onClick={(e) => {
                    this.props.setSortsRecentOldest(e);
                  }}>
                    <i className="fal fa-sort-down"></i>
                  </div>
                </div>
                <div href="#" className="p-0 d-flex flex-row justify-content-between h-40px border-bottom">
                  <div className="p-2 border-right align-middle text-info lh-1">
                    <i className="fal fa-sort-up"></i>
                  </div>
                  <div className="align-middle text-info">
                    <span className="pr-2">
                      Views
                      {/* <FormattedMessage
                        id="navigation.register"
                        defaultMessage="register"
                      /> */}
                    </span>
                    <i className="fal fa-fire"></i>
                  </div>
                  <div className="p-2 border-left align-middle text-info lh-1">
                    <i className="fal fa-sort-down"></i>
                  </div>
                </div>
                <div href="#" className="p-0 d-flex flex-row justify-content-between h-40px border-bottom">
                  <div className="p-2 border-right align-middle text-info lh-1">
                    <i className="fal fa-sort-up"></i>
                  </div>
                  <div className="align-middle text-info">
                    <span className="pr-2">
                      Shares
                      {/* <FormattedMessage
                        id="navigation.register"
                        defaultMessage="register"
                      /> */}
                    </span>
                    <i className="fal fa-share-square"></i>
                  </div>
                  <div className="p-2 border-left align-middle text-info lh-1">
                    <i className="fal fa-sort-down"></i>
                  </div>
                </div>
                <div href="#" className="p-0 d-flex flex-row justify-content-between h-40px">
                  <div className="p-2 border-right align-middle text-info lh-1">
                    <i className="fal fa-sort-up"></i>
                  </div>
                  <div className="align-middle text-info">
                    <span className="pr-2">
                      Comments
                      {/* <FormattedMessage
                        id="navigation.forgot"
                        defaultMessage="forgot"
                      /> */}
                    </span>
                    <i className="fal fa-comment-alt"></i>
                  </div>
                  <div className="p-2 border-left align-middle text-info lh-1">
                    <i className="fal fa-sort-down"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
    
    if (visible === null || loading) {
      loadingContent = <Spinner />;
    } else {
      if (visible.length > 0) {
        let y;
        y = Object.values(filters);

        dashboardContent = visible.filter(viento => {
          if (y[0] != '' || null ) {
            let contentHTMLMatch = viento.title.toLowerCase().includes(y[0]);
            return contentHTMLMatch;
          }
          return viento;
        }).filter(viento => {
          if (y[1] != '' || null ) {
            let contentHTMLMatch = viento.type.includes(y[1]);
            return contentHTMLMatch;
          }
          return viento;
        }).filter(viento => {
          if (y[2] != '' || null ) {
            let contentHTMLMatch = viento.user.name.includes(y[2]);
            return contentHTMLMatch;
          }
          return viento;
        }).filter(viento => {
          if (y[3] != '' || null ) {
            let contentHTMLMatch = viento.topic.includes(y[3]);
            return contentHTMLMatch;
          }
          return viento;
        }).sort((viento1, viento2) => {
            if (sortBy === 'titleup') {
                return viento1.title.localeCompare(viento2.title);
            } else if (sortBy === 'titledown') {
                return viento1.title.toLowerCase() > viento2.title.toLowerCase() ? -1 : viento2 > viento1 ? 1 : 0;
            } else if (sortBy === 'publishedup') {
                return viento1.createdAt < viento2.createdAt ? -1 : 1;
            } else if (sortBy === 'publisheddown') {
                return viento1.createdAt < viento2.createdAt ? 1 : -1;
            }
        }).map(viento =>
          <VientoItem key={viento._id} viento={viento} />
        );
              

        content = (
          <div>
            <div className="mt-15 pt-1 pb-1 d-flex flex-wrap scroll-container vientos-container border border-light bg-vientosBox">
              {dashboardContent}
            </div>
          </div>
        );

      } else {
        content = (
          <div>
            <div className="mt-15 pt-1 pb-1 d-flex flex-wrap scroll-container vientos-container border border-light bg-vientosBox">
              {dashboardContent}
            </div>
          </div>
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
        <div className="body2 scroll-container">
          {alerts.updated ? updatedAlert : null}
          <div>
            <div></div>
            <Map />
            {vientosNav}
          </div>
          {loadingContent}
          {content}
        </div>
      </div>
    );
  }
}

Vientos.propTypes = {
  closeApplicationAlertsUpdated: PropTypes.func.isRequired,
  getLiveVientos: PropTypes.func.isRequired,
  setSortsRecentNewest: PropTypes.func.isRequired,
  setSortsRecentOldest: PropTypes.func.isRequired,
  setFiltersText: PropTypes.func.isRequired,
  setCenteredMap: PropTypes.func.isRequired,
  vientos: PropTypes.object.isRequired,
  visible: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  application: state.application,
  vientos: state.vientos,
  visible: state.visible
});

export default connect(mapStateToProps, { closeApplicationAlertsUpdated, getLiveVientos, setSortsRecentNewest, setSortsRecentOldest, setFiltersText, setCenteredMap })(Vientos);
