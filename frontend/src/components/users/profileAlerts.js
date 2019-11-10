import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { addTempPhoto, createProfile, getCurrentProfile } from '../../actions/usersActions';
import {FormattedMessage} from 'react-intl';
import Resizer from 'react-image-file-resizer';

import BackArrow from '../application/main/common/backArrow';
import LinkContainer from '../application/main/common/styled/linkContainer';
import InputGroup from '../application/main/common/inputGroup';
import Div from '../application/main/common/styled/div';
import H1 from '../application/main/common/styled/h1';
import H2 from '../application/main/common/styled/h2';
import Input from '../application/main/common/styled/input';
import InputArea from '../application/main/common/styled/inputArea';
import Button from '../application/main/common/styled/button';


class ProfileAlerts extends Component {
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
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.application.alerts.errors!==prevProps.application.alerts.errors){
      //Perform some operation here
      this.setState({errors: this.props.application.alerts.errors});
    }

    if(this.state.loadPreview!==prevState.loadPreview) {
      let data = new FormData();
      data.append('file', this.state.pictureSm);
      data.append('file', this.state.pictureLg);
      this.props.addTempPhoto(data);
    }

    if(this.props.users.profile!==prevProps.users.profile){

      const profile = this.props.users.profile;

      // Bring skills array back to CSV
      const skillsCSV = profile.skills.join(',');

      // Set component fields state
      this.setState({
        handle: profile.handle,
        website: profile.website,
        location: profile.location,
        skills: skillsCSV,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }

  fileSelected = (e) => {
    const name = e.target.files[0].name;
    const fileType = e.target.files[0].type.split('/')[1];
    var fileInput = false;
    if(e.target.files[0]) {
        fileInput = true
    }
    if(fileInput) {
      let fileName = name + '_' + this.props.admin.id + '_original'
      let file = new File([e.target.files[0]], fileName, {type: fileType});
      this.setState({
        picture: file
      });
      
      Resizer.imageFileResizer(
        e.target.files[0],
        30,
        30,
        fileType,
        100,
        0,
        uri => {
          let fileName = name + '_' + this.props.admin.id + '_sm'
          let file2 = new File([uri], fileName, {type: fileType});
          this.setState({pictureSm: file2});
        },
        'blob'
      );

      Resizer.imageFileResizer(
        e.target.files[0],
        325,
        325,
        fileType,
        100,
        0,
        uri => {
          let fileName = name + '_' + this.props.admin.id + '_lg'
          let file3 = new File([uri], fileName, {type: fileType});
          this.setState({
            pictureLg: file3,
            loadPreview: true,
          });
        },
        'blob'
      );

      setTimeout(() => {
        let data = new FormData();
        data.append('file', this.state.pictureSm);
        data.append('file', this.state.pictureLg);
        this.props.addTempPhoto(data);
      }, 1000);
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append('file', this.state.picture);
    data.append('file', this.state.pictureSm);
    data.append('file', this.state.pictureLg);

    const profileData = {
      handle: this.state.handle,
      website: this.state.website,
      location: this.state.location,
      skills: this.state.skills,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history, data);
  }

  render() {
    const { application } = this.props;

    return (
      <Div className="scroll-container bottom-outer-shadow ml-10px mr-10px pl-10px pr-10px pt-70px" heightStyled={`${application.settings.heightHero}`} backgroundStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadiusBottom}`} colorStyled={`${application.theme.primary}`}>
        <H1 className="text-center" fontSizeStyled={application.text.heading}>
          <FormattedMessage
            id="users.alertsTitle"
            defaultMessage="Alerts"
          />
        </H1>
        <H2 className="text-center mb-10px" fontSizeStyled={application.text.description}>
          <FormattedMessage
            id="users.alertsDescription"
            defaultMessage="All the likes and replies to your comments"
          />
        </H2>
      </Div>
    );
  }
}

ProfileAlerts.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { addTempPhoto, createProfile, getCurrentProfile })(withRouter(ProfileAlerts));
