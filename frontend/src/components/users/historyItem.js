import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { sendVoteUp, sendVoteDown } from '../../actions/vientosActions';

import {FormattedMessage, FormattedDate, FormattedTime} from 'react-intl';

import Div from '../application/main/common/styled/div';
import Input from '../application/main/common/styled/input';

class HistoryItem extends Component {

  voteUp = (likes, id, e) => {
    let packet = {};
    packet.likes = parseInt(likes) + 1;
    packet.id = id;
    
    this.props.sendVoteUp(packet);
  }

  voteDown = (likes, id, e) => {
    let packet = {};
    packet.likes = parseInt(likes) + 1;
    packet.id = id;
    
    this.props.sendVoteDown(packet);
  }

  render() {
    const { application, activity } = this.props;

    let winds;
    let community;

    if (application.language.setLanguage === 'es') {
      winds = 'vientos';
      community = 'communidad';
    } else {
      winds = 'winds';
      community = 'community';
    }

    return (
      <Div key={activity._id} className="w-100 d-flex flex-direction-row justify-content-space-between align-items-end text-left" backgroundStyled={`${application.mode.primary}`} colorStyled={`${application.theme.primary}`} borderStyled={`${application.settings.appRadius}`} radiusStyled={`${application.settings.appRadius}`}>
        <div className="w-25">
          <FormattedMessage
            id="viento.time_since_updated"
            defaultMessage={`{formattedLastUpdatedDate} {formattedLastUpdatedTime}`}
            values={{
                formattedLastUpdatedDate: (
                  <FormattedDate value={activity.date} />
                ),
                formattedLastUpdatedTime: (
                  <FormattedTime value={activity.date} />
                ),
            }}
          />
        </div>
        <div className="w-25">
          {activity.contribution.title}
        </div>
        <div className="w-25">
          <Link className="noUnderline" to={`/${winds}/${activity.contribution._id}`}>
            <Div className="w-max-content border-bottom-1" transitionStyled={`${application.settings.appTransition}`} colorStyled={`${application.theme.primary}`} borderBottomHoverStyled={`${application.theme.primary}`}>
              {activity.contribution.title}
            </Div>
          </Link>
        </div>
        <div className="w-25">
          <Link className="noUnderline" to={`/${community}/${activity.contribution.profile.handle}`}>
            <Div className="w-max-content border-bottom-1" transitionStyled={`${application.settings.appTransition}`} colorStyled={`${application.theme.primary}`} borderBottomHoverStyled={`${application.theme.primary}`}>
              {activity.contribution.user.name}
            </Div>
          </Link>
        </div>
      </Div>
    );
  }
}

HistoryItem.propTypes = {
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  sendVoteUp: PropTypes.func.isRequired,
  sendVoteDown: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
});

export default connect(mapStateToProps, { sendVoteUp, sendVoteDown })(HistoryItem);
