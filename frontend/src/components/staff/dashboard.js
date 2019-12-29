import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getContributions, getAllContributions, readStaffReviewers } from '../../actions/staffActions';
import {FormattedMessage} from 'react-intl';

import Spinner from '../application/main/common/spinner';
import ContributionItem from './contributionItem';

import FilterMenu from './filterMenu';
import SortMenu from './sortMenu';

import Div from '../application/main/common/styled/div';
import H1 from '../application/main/common/styled/h1';
import Button from '../application/main/common/styled/button';

class Staff extends Component {

  componentDidMount() {
    this.props.readStaffReviewers();
    if (this.props.admin.staff) {
      if ((this.props.admin.staff === 'manager') || (this.props.admin.staff === 'webmaster')) {
        this.props.getAllContributions();
      } else {
        this.props.getContributions();
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.admin.staff != prevProps.admin.staff) {
      if ((this.props.admin.staff === 'manager') || (this.props.admin.staff === 'webmaster')) {
        this.props.getAllContributions();
      } else {
        this.props.getContributions();
      }
    }
  }

  render() {

    const { admin, application } = this.props;
    const { alerts, filters, sortBy } = this.props.application;
    const { contributions, loading } = this.props.staff;

    let dashboardContent;
    let loadingContent;
    let content;
    let columnHeader;

    if (admin.staff === "staff") {
      columnHeader = (
        <div className="d-flex flex-direction-row text-center">
          <Div className="w-25 p-10px" backgroundStyled={application.theme.primaryQuarter}>
            <FormattedMessage
              id="staff.reviewer"
              defaultMessage="Reviewer"
            />
          </Div>
          <Div className="w-25 p-10px" backgroundStyled={application.theme.primaryQuarter}>
            <FormattedMessage
              id="staff.status"
              defaultMessage="Status"
            />
          </Div>
          <Div className="w-25 p-10px" backgroundStyled={application.theme.primaryQuarter}>
            <FormattedMessage
              id="staff.date"
              defaultMessage="Date"
            />
          </Div>
          <Div className="w-25 p-10px" backgroundStyled={application.theme.primaryQuarter}>
            <FormattedMessage
              id="staff.title"
              defaultMessage="Title"
            />
          </Div>
        </div>
      );
    } else if ((admin.staff === "reviewer") || (admin.staff === "manager") || (admin.staff === "webmaster")) {
      columnHeader = (
        <div className="d-flex flex-direction-row text-center">
          <Div className="w-25 p-10px" backgroundStyled={application.theme.primaryQuarter}>
            <FormattedMessage
              id="staff.reviewer"
              defaultMessage="Reviewer"
            />
          </Div>
          <Div className="w-25 p-10px" backgroundStyled={application.theme.primaryQuarter}>
            <FormattedMessage
              id="staff.author"
              defaultMessage="Author"
            />
          </Div>
          <Div className="w-25 p-10px" backgroundStyled={application.theme.primaryQuarter}>
            <FormattedMessage
              id="staff.status"
              defaultMessage="Status"
            />
          </Div>
          <Div className="w-25 p-10px" backgroundStyled={application.theme.primaryQuarter}>
            <FormattedMessage
              id="staff.title"
              defaultMessage="Title"
            />
          </Div>
        </div>
      );
    }

    if (contributions === null || loading) {
      loadingContent = <Spinner />;
    } else {
      if (contributions.length > 0) {
        let y;
        y = Object.values(filters);

        dashboardContent = contributions.filter(viento => {
          if (y[0] == "Title") {
            let contentHTMLMatch = viento.title.toLowerCase().indexOf(y[1].toLowerCase()) !== -1;
            return contentHTMLMatch;
          } else if (y[0] == "Author") {
            let contentHTMLMatch = viento.user.name.toLowerCase().indexOf(y[1].toLowerCase()) !== -1;
            return contentHTMLMatch;
          } else if (y[0] == "Reviewer") {
            let contentHTMLMatch = viento.reviewer.name.toLowerCase().indexOf(y[1].toLowerCase()) !== -1;
            return contentHTMLMatch;
          } else if (y[0] == "Status") {
            let contentHTMLMatch = viento.status.toLowerCase().indexOf(y[1].toLowerCase()) !== -1;
            return contentHTMLMatch;
          }
          else {
            return viento;
          }
        }).sort((viento1, viento2) => {
            if (sortBy === 'titleup') {
                return viento1.title.toLowerCase() > viento2.title.toLowerCase() ? 1 : 0;
            } else if (sortBy === 'titledown') {
                return viento1.title.toLowerCase() > viento2.title.toLowerCase() ? 0 : 1;
            } else if (sortBy === 'authorup') {
                return viento1.user.name.toLowerCase() > viento2.user.name.toLowerCase() ? 1 : 0;
            } else if (sortBy === 'authordown') {
                return viento1.user.name.toLowerCase() > viento2.user.name.toLowerCase() ? 0 : 1;
            } else if (sortBy === 'reviewerup') {
                return viento1.reviewer.name.toLowerCase() > viento2.reviewer.name.toLowerCase() ? 1 : 0;
            } else if (sortBy === 'reviewerdown') {
                return viento1.reviewer.name.toLowerCase() > viento2.reviewer.name.toLowerCase() ? 0 : 1;
            } else if (sortBy === 'statusup') {
                return viento1.status.toLowerCase() > viento2.status.toLowerCase() ? 1 : 0;
            } else if (sortBy === 'statusdown') {
                return viento1.status.toLowerCase() > viento2.status.toLowerCase() ? 0 : 1;
            } else {
              return viento1.user.name.toLowerCase() > viento2.user.name.toLowerCase() ? 1 : 0;
            }
        }).map(contribution =>
          <ContributionItem key={contribution._id} contribution={contribution} />
        );

        content = (
          <Div className="scroll-container scrollbar-width-none" heightStyled={application.settings.dashboardContributions}>
            {dashboardContent}
          </Div>
        );

      } else {
        dashboardContent = (<tr></tr>);

        content = (
          <Div className="scroll-container scrollbar-width-none" heightStyled={application.settings.dashboardContributions}>
            {dashboardContent}
          </Div>
        );
      }
    }

    return (
      <Div className="scroll-container bottom-outer-shadow pt-70px ml-10px mr-10px scrollbar-width-none" heightStyled={`${application.settings.heightHero}`} backgroundStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadiusBottom}`} colorStyled={`${application.theme.primary}`}>
        <div className="d-flex justify-content-center align-items-center">
          <FilterMenu />
          <H1 className="text-center p-5px" radiusStyled={application.settings.appRadius} backgroundStyled={application.mode.primaryThree} fontSizeStyled={application.text.heading}>
            <FormattedMessage
              id="staff.header"
              defaultMessage="Contributions"
            />
          </H1>
          <SortMenu />
        </div>
        {columnHeader}
        {loadingContent}
        {content}
        <Div className="d-flex justify-content-center" backgroundStyled={application.theme.primaryQuarter}>
          <Link className="w-max-content noUnderline d-flex justify-content-center pb-21px" to="/staff/contribute">
            <Button
              className="w-100px p-10px mt-20px clickable"
              transitionStyled={application.transitions.general}
              radiusStyled={application.settings.appRadius}
              backgroundStyled={application.theme.primaryHalf}
              backgroundHoverStyled={application.theme.primary}
              colorStyled={application.mode.primaryThree}
              colorHoverStyled={application.mode.primary}
            >
              <i className='clickable fas fa-plus'></i>
            </Button>
          </Link>
        </Div>
      </Div>
    );
  }
}

Staff.propTypes = {
  getContributions: PropTypes.func.isRequired,
  getAllContributions: PropTypes.func.isRequired,
  readStaffReviewers: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
  staff: state.staff
});

export default connect(mapStateToProps, { getContributions, getAllContributions, readStaffReviewers })(Staff);
