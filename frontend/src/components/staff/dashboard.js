import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getContributions } from '../../actions/staffActions';
import {FormattedMessage} from 'react-intl';

import Spinner from '../application/main/common/spinner';
import ContributionItem from './contributionItem';

import Div from '../application/main/common/styled/div';
import H1 from '../application/main/common/styled/h1';
import Button from '../application/main/common/styled/button';

class Staff extends Component {

  componentDidMount() {
    this.props.getContributions();
  }

  render() {

    const { application } = this.props;
    const { contributions, loading } = this.props.staff;

    let dashboardContent;
    let loadingContent;
    let content;

    let columnHeader = (
        <div className="d-flex flex-direction-row text-center">
          <Div className="w-25 p-10px" transitionStyled={application.transitions.general} backgroundStyled={application.theme.primaryQuarter} backgroundHoverStyled={application.theme.primary} colorHoverStyled={application.mode.primary}>
            <i className="far fa-archive"></i>
          </Div>
          <Div className="w-25 p-10px clickable" transitionStyled={application.transitions.general} backgroundStyled={application.theme.primaryQuarter} backgroundHoverStyled={application.theme.primary} colorHoverStyled={application.mode.primary}>
            <FormattedMessage
              id="staff.status"
              defaultMessage="Status"
            />
          </Div>
          <Div className="w-25 p-10px clickable" transitionStyled={application.transitions.general} backgroundStyled={application.theme.primaryQuarter} backgroundHoverStyled={application.theme.primary} colorHoverStyled={application.mode.primary}>
            <FormattedMessage
              id="staff.date"
              defaultMessage="Date"
            />
          </Div>
          <Div className="w-25 p-10px clickable" transitionStyled={application.transitions.general} backgroundStyled={application.theme.primaryQuarter} backgroundHoverStyled={application.theme.primary} colorHoverStyled={application.mode.primary}>
            <FormattedMessage
              id="staff.title"
              defaultMessage="Title"
            />
          </Div>
        </div>
    );

    if (contributions === null || loading) {
      loadingContent = <Spinner />;
    } else {
      if (contributions.length > 0) {
        dashboardContent = contributions.map(contribution =>
          <ContributionItem key={contribution._id} contribution={contribution} />
        );

        content = (
          <Div className="scroll-container" heightStyled={application.settings.dashboardContributions}>
            {dashboardContent}
          </Div>
        );

      } else {
        dashboardContent = (<tr></tr>);

        content = (
          <Div className="scroll-container" heightStyled={application.settings.dashboardContributions}>
            {dashboardContent}
          </Div>
        );
      }
    }

    return (
      <Div className="scroll-container bottom-outer-shadow pt-70px ml-10px mr-10px" heightStyled={`${application.settings.heightHero}`} backgroundStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadiusBottom}`} colorStyled={`${application.theme.primary}`}>
        <H1 className="text-center p-5px" radiusStyled={application.settings.appRadius} backgroundStyled={application.mode.primaryThree} fontSizeStyled={application.text.heading}>
          <FormattedMessage
            id="staff.header"
            defaultMessage="Contributions"
          />
        </H1>
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
            <FormattedMessage
              id="staff.new"
              defaultMessage="New"
            />
            </Button>
          </Link>
        </Div>
      </Div>
    );
  }
}

Staff.propTypes = {
  getContributions: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  application: state.application,
  staff: state.staff
});

export default connect(mapStateToProps, { getContributions })(Staff);
