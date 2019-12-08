import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
 
import { FormattedMessage } from 'react-intl';
import { closeApplicationAlertsUpdated, setSortsRecentOldest, setSortsRecentNewest, setFiltersText, setCenteredMap } from '../../actions/applicationActions';
import { getLiveVientos } from '../../actions/vientosActions';

import Spinner from '../application/main/common/spinner';
import Map from '../application/main/map/canvas';
import VientoItem from './vientoItem';
import FilterMenu from './filterMenu';
import SortMenu from './sortMenu';
import WorldMenu from './worldMenu';

import Div from '../application/main/common/styled/div';


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
      filterSearch5: '',
      isOpen: false,
      isOpen2: false,
      listOpen: false,
      sortOptions: {
        1: 'Recent',
        2: 'Likes',
        3: 'Shares',
        4: 'Comments'
      },
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
    const { visible, loading } = this.props.vientos;
    const { application } = this.props;
    const { alerts, filters, sortBy } = this.props.application;

    let dashboardContent;
    let vientosNav;
    let loadingContent;
    let content;

    vientosNav = (
      <div className="position-relative z-1000">
        <nav className="z-1005 d-flex justify-content-space-evenly">
          <FilterMenu />
          <WorldMenu />
          <SortMenu />
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
          if (y[0] == "Title") {
            let contentHTMLMatch = viento.title.toLowerCase().indexOf(y[1].toLowerCase()) !== -1;
            return contentHTMLMatch;
          } else if (y[0] == "Author") {
            let contentHTMLMatch = viento.user.name.toLowerCase().includes(y[1]);
            return contentHTMLMatch;
          }
          else {
            return viento;
          }
        }).sort((viento1, viento2) => {
            if (sortBy === 'titleup') {
                // return viento1.title.localeCompare(viento2.title);
                return viento1.title.toLowerCase() > viento2.title.toLowerCase() ? 1 : 0;
            } else if (sortBy === 'titledown') {
                // return viento1.title.toLowerCase() > viento2.title.toLowerCase() ? -1 : viento2 > viento1 ? 1 : 0;
                return viento1.title.toLowerCase() > viento2.title.toLowerCase() ? 0 : 1;
            } else if (sortBy === 'authorup') {
                // return viento1.user.name.localeCompare(viento2.user.name);
                return viento1.user.name.toLowerCase() > viento2.user.name.toLowerCase() ? 1 : 0;
            } else if (sortBy === 'authordown') {
                return viento1.user.name.toLowerCase() > viento2.user.name.toLowerCase() ? 0 : 1;
            } else if (sortBy === 'publishedup') {
                return viento1.createdAt < viento2.createdAt ? -1 : 1;
            } else if (sortBy === 'publisheddown') {
                return viento1.createdAt < viento2.createdAt ? 1 : -1;
            }
            return viento1.createdAt < viento2.createdAt ? 1 : -1;
        }).map(viento =>
          <VientoItem key={viento._id} viento={viento} />
        );
              

        content = (
          <Div className="d-flex flex-wrap scroll-container mt-10px outer-shadow ml-10px mr-10px vientos-items scrollbar-width-none " backgroundStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadius}`}>
            <div className="pt-10px pb-10px ml-auto mr-auto">
              {dashboardContent}
            </div>
          </Div>
        );

      } else {
        content = (
          <Div className="d-flex flex-wrap scroll-container mt-10px outer-shadow ml-10px mr-10px vientos-items scrollbar-width-none " backgroundStyled={`${application.theme.primaryQuarter}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadius}`}>
          </Div>
        );
      }
    }

    const updatedAlert = (
      <div className="fixed-top alert-margin ml-5 mr-5 alert alert-info alert-dismissible fade show" role="alert">
        <FormattedMessage
          id="application.changesEmail"
          defaultMessage="An email detailing the changes made has been sent to:"
        />
        {alerts.updated}
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true" onClick={this.onCloseUpdatedAlert}>&times;</span>
      </button>
      </div>
    );

    return (
      <div className="vientos-container scroll-container scrollbar-width-none">
        {alerts.updated ? updatedAlert : null}
        <Map />
        {vientosNav}
        {loadingContent}
        {content}
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
