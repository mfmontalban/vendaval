import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteContribution } from '../../actions/staffActions';

import {FormattedMessage, FormattedDate, FormattedTime} from 'react-intl';

import Div from '../application/common/styled/div';

import ReviewerDropDown from './reviewerDropdown';
import LiveDropDown from './liveDropdown';

class ContributionItem extends Component {
  render() {
    const { application, contribution, admin } = this.props;

    let community;
    
    let view;
    let edit;
    let deleteLink;
    let reviewer;
    let contributionLine;

    if (application.language === 'es') {
      community = 'communidad';
      view = 'Ver';
      edit = 'Editar';
      deleteLink = 'Tirar';
    } else {
      community = 'community';
      view = 'View';
      edit = 'Edit';
      deleteLink = 'Delete';
    }

    if (admin.staff === "staff") {
      contributionLine = (
        <div className="d-flex flex-direction-row w-100 align-items-center">
          <ReviewerDropDown contribution={contribution}/>

          <LiveDropDown contribution={contribution}/>

          <div className="min-w-25-app p-10px tableTitleFix">
            <FormattedMessage
              id="viento.time_since_updated"
              defaultMessage={`{formattedLastUpdatedDate} {formattedLastUpdatedTime}`}
              values={{
                  formattedLastUpdatedDate: (
                    <FormattedDate value={contribution.updatedAt} />
                  ),
                  formattedLastUpdatedTime: (
                    <FormattedTime value={contribution.updatedAt} />
                  ),
              }}
            />
          </div>
          <div className="min-w-25-app p-10px">
            <Link className="noUnderline d-flex" to={`/staff/contribution/view/${contribution._id}`}>
              <Div className="p-5px border-bottom-1 ml-auto mr-auto text-overflow-ellipsis overflow-hidden" transitionStyled={application.transitions.general} colorStyled={application.theme.primary} borderBottomStyled={application.transparent} borderBottomHoverStyled={application.theme.primary}>
                {contribution.title}
              </Div>
            </Link>
          </div>
        </div>
      )
    } else if ((admin.staff === "reviewer") || (admin.staff === "manager") || (admin.staff === "webmaster")) {
      contributionLine = (
        <div className="d-flex flex-direction-row w-100 align-items-center">
          <ReviewerDropDown contribution={contribution}/>

          <div className="min-w-25-app p-10px">
            <Div className="p-5px ml-auto mr-auto text-overflow-ellipsis overflow-hidden" transitionStyled={application.transitions.general} colorStyled={application.theme.primary}>
              {contribution.user.name}
            </Div>
          </div>

          <LiveDropDown contribution={contribution}/>

          <div className="min-w-25-app p-10px">
            <Link className="noUnderline d-flex" to={`/staff/contribution/view/${contribution._id}`}>
              <Div className="p-5px border-bottom-1 ml-auto mr-auto text-overflow-ellipsis overflow-hidden" transitionStyled={application.transitions.general} colorStyled={application.theme.primary} borderBottomStyled={application.transparent} borderBottomHoverStyled={application.theme.primary}>
                {contribution.title}
              </Div>
            </Link>
          </div>
        </div>
      )
    }

    return (
        <Div className="d-flex flex-direction-row text-center align-items-center" transitionStyled={application.transitions.general} backgroundHoverStyled={application.theme.primaryEighter}>
          {contributionLine}
        </Div>
    );
  }
}

ContributionItem.propTypes = {
  deleteContribution: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  contribution: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
});

export default connect(mapStateToProps, { deleteContribution })(ContributionItem);
