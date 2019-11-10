import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { addTempPhoto, createProfile, getProfileHistory } from '../../actions/usersActions';
import {FormattedMessage} from 'react-intl';
import Resizer from 'react-image-file-resizer';

import HistoryItem from './historyItem';

import Spinner from '../application/main/common/spinner.js'
import BackArrow from '../application/main/common/backArrow';
import LinkContainer from '../application/main/common/styled/linkContainer';
import InputGroup from '../application/main/common/inputGroup';
import Div from '../application/main/common/styled/div';
import H1 from '../application/main/common/styled/h1';
import H2 from '../application/main/common/styled/h2';
import Input from '../application/main/common/styled/input';
import InputArea from '../application/main/common/styled/inputArea';
import Button from '../application/main/common/styled/button';

class ProfileHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      picture: '',
      pictureSm: '',
      pictureLg: '',
      loadPreview: false,
      handle: '',
      website: '',
      location: '',
      skills: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getProfileHistory();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.application.alerts.errors!==prevProps.application.alerts.errors){
      //Perform some operation here
      this.setState({errors: this.props.application.alerts.errors});
    }

    if(this.props.users.profile!==prevProps.users.profile){

      const profile = this.props.users.profile;

      // Set component fields state
      this.setState({
        handle: profile.handle,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { application, users } = this.props;

    let loading;
    let activity;
    let historyContent;

    if (users.profile === null || loading) {
      historyContent = <Spinner />;
    } else {
      if (users.profile.likesUp.length > 0) {
        console.log(users.profile.likesUp.length);
        historyContent = users.profile.likesUp.map(activity =>
          <HistoryItem key={activity._id} activity={activity} />
        );
      }
    }

    return (
      <Div className="scroll-container bottom-outer-shadow ml-10px mr-10px pl-10px pr-10px pt-70px" heightStyled={`${application.settings.heightHero}`} backgroundStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadiusBottom}`} colorStyled={`${application.theme.primary}`}>
        <H1 className="text-center" fontSizeStyled={application.text.heading}>
          <FormattedMessage
            id="users.historyTitle"
            defaultMessage="History"
          />
        </H1>
        <H2 className="text-center mb-10px" fontSizeStyled={application.text.description}>
          <FormattedMessage
            id="users.historyDescription"
            defaultMessage="All your current likes and comments"
          />
        </H2>
        <div className="d-flex">
          <div className="w-25">
            <FormattedMessage
              id="users.date"
              defaultMessage="Date"
            />
          </div>
          <div className="w-25">
            <FormattedMessage
              id="users.category"
              defaultMessage="Category"
            />
          </div>
          <div className="w-25">
            <FormattedMessage
              id="users.title"
              defaultMessage="Title"
            />
          </div>
          <div className="w-25">
            <FormattedMessage
              id="users.author"
              defaultMessage="Author"
            />
          </div>
        </div>
        <div>
          {historyContent}
        </div>
      </Div>
    );
  }
}

ProfileHistory.propTypes = {
  getProfileHistory: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
  users: state.users
});

export default connect(mapStateToProps, { addTempPhoto, createProfile, getProfileHistory })(withRouter(ProfileHistory));
