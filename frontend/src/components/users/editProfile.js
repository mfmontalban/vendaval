import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { addTempPhoto, createProfile, getCurrentProfile } from '../../actions/usersActions';
import Resizer from 'react-image-file-resizer';
import { FormattedMessage } from 'react-intl';

import BackArrow from '../application/main/common/backArrow';
import LinkContainer from '../application/main/common/styled/linkContainer';
import InputGroup from '../application/main/common/inputGroup';
import Div from '../application/main/common/styled/div';
import H1 from '../application/main/common/styled/h1';
import H2 from '../application/main/common/styled/h2';
import Input from '../application/main/common/styled/input';
import InputArea from '../application/main/common/styled/inputArea';
import Button from '../application/main/common/styled/button';


class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      picture: '',
      pictureName: '',
      pictureSm: '',
      pictureSmName: '',
      pictureLg: '',
      pictureLgName: '',
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
    this.props.getCurrentProfile();
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
      let fileName = name + '_' + this.props.admin.id + '_original_' + Date.now();
      let file = new File([e.target.files[0]], fileName, {type: fileType});
      this.setState({
        picture: file,
        pictureName: fileName,
      });
      
      Resizer.imageFileResizer(
        e.target.files[0],
        80,
        80,
        fileType,
        100,
        0,
        uri => {
          let fileName = name + '_' + this.props.admin.id + '_sm_' + Date.now();
          let file2 = new File([uri], fileName, {type: fileType});
          this.setState({
            pictureSm: file2,
            pictureSmName: fileName,
          });
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
          let fileName = name + '_' + this.props.admin.id + '_lg_' + Date.now();
          let file3 = new File([uri], fileName, {type: fileType});
          this.setState({
            pictureLg: file3,
            pictureLgName: fileName,
          }, () => {
            this.setState({
              loadPreview: !this.state.loadPreview,
            })
          });
        },
        'blob'
      );
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

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

    if (this.state.picture !== '') {
      let data = new FormData();
      data.append('file', this.state.picture);

      let picNames = {};
      picNames.picOriginal = this.state.pictureName;
      picNames.picSm = this.state.pictureSmName;
      picNames.picLg = this.state.pictureLgName;

      this.props.createProfile(profileData, this.props.history, data, picNames);
    } else {
      this.props.createProfile(profileData, this.props.history);
    }
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    const { admin, application, users } = this.props;
    let avatarImage;
    let backLink;
    let socialInputs;
    let community;
    let placeHandle;
    let placeHandleLabel;
    let placeWebsite;
    let placeWebsiteLabel;
    let placeLocation;
    let placeLocationLabel;
    let placeTalents;
    let placeTalentsLabel;
    let placeBio;
    let placeBioLabel;
    let socialMessage;
    let submitProfile;

    let errorHandle;

    if (application.errors) {
      if (application.errors.handle) {
        errorHandle = (
          <div>
            {application.errors.handle}
          </div>
        );
      }
    }

    if (application.language === 'es') {
      community = 'communidad';
      placeHandle = '* Perfil identificador';
      placeHandleLabel = 'Campo Requerido para el perfil';
      placeWebsite = 'Sitio personal';
      placeWebsiteLabel = 'Campo para el sitio personal';
      placeLocation = 'Ciudad, Estado';
      placeLocationLabel = 'Campo para Ciudad, Estado';
      placeTalents = '* Talentos';
      placeTalentsLabel = 'Campo requerido para los talentos';
      placeBio = 'De usted';
      placeBioLabel = 'Campo para describirte';
      socialMessage = 'Redes sociales';
      submitProfile = 'Enviar';
    } else {
      community = 'community';
      placeHandle = '* Profile handle';
      placeHandleLabel = 'Required field for profile handle';
      placeWebsite = 'Personal website';
      placeWebsiteLabel = 'Field for website';
      placeLocation = 'City, State';
      placeLocationLabel = 'Field for City, State';
      placeTalents = '* Talents';
      placeTalentsLabel = 'Required field for talents';
      placeBio = 'About you';
      placeBioLabel = 'Field for your public bio';
      socialMessage = 'Social media';
      submitProfile = 'Submit';
    }

    if (users.profile !== null || '') {
      backLink =
      <Link to={`/${community}/${users.profile.handle}`}>
        <LinkContainer className="mt-10px ml-10px p-10px w-40px" transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primaryHalf}`} colorHoverStyled={`${application.theme.primary}`}>
          <BackArrow />
        </LinkContainer> 
      </Link>
    }

    if (admin.avatarLg === null || '') {
      avatarImage =
        <div>
          <i className="fas fa-users fa-5x h-25vh ml-auto mr-auto" />
        </div>
    } else {
      avatarImage =
        <img
          className="h-25vh ml-auto mr-auto pt-10px pb-10px"
          src={`http://localhost:5000/api/users/files/${admin.avatarLg}`}
          alt="Account"
        />
    }

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    return (
      <Div className="h-100 overflow-scroll scrollbar-width-none" heightStyled={`${application.settings.heightHero}`} backgroundStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadiusBottom}`} colorStyled={`${application.theme.primary}`}>
        <div className="max-w-1000px ml-auto mr-auto">
          {backLink}
          <H1 className="text-center" fontSizeStyled={application.text.heading}>
            <FormattedMessage
              id="profile.editProfileTitle"
              defaultMessage="Edit Profile"
            />
          </H1>
          <H2 className="text-center mb-10px" fontSizeStyled={application.text.description}>
            <FormattedMessage
              id="profile.editProfileDescription"
              defaultMessage="Update your account information"
            />
          </H2>
          <form className="d-flex flex-direction-column text-center max-w-750px ml-auto mr-auto" onSubmit={this.onSubmit}>
            <Div className="d-flex flex-direction-column border-1 mb-10px" 
              backgroundStyled={errors.picture ? `${application.theme.primary}`: `${application.transparent}`}
              colorStyled={errors.picture ? `${application.mode.primary}`: `${application.theme.primary}`}
              borderStyled={application.theme.primary}
              radiusStyled={application.settings.appRadius}
            >
              {avatarImage}
              <div className="d-flex justify-content-center">
                <Input
                  type="file"
                  name="picture"
                  aria-label="Field for Profile Picture"
                  className="text-center box-shadow-none w-80px pl-10px pr-10px pt-5px pb-5px mb-10px"
                  fontSizeStyled={application.text.primary}
                  onChange={this.fileSelected}
                />
              </div>
            </Div>
            <Input
              type="text"
              name="handle"
              placeholder={`${placeHandle}`}
              aria-label={`${placeHandleLabel}`}
              className="box-shadow-none border-1 pl-10px pr-10px pt-5px pb-5px mb-10px"
              backgroundStyled={errors.handle ? `${application.theme.primary}`: `${application.transparent}`}
              colorStyled={errors.handle ? `${application.mode.primary}`: `${application.theme.primary}`}
              placeholderStyled={errors.handle ? `${application.mode.primary}`: `${application.theme.primary}`}
              fontSizeStyled={application.text.primary}
              borderStyled={application.theme.primary}
              radiusStyled={application.settings.appRadius}
              value={this.state.handle}
              onChange={this.onChange}
            />
              {errorHandle}
            <Input
              type="text"
              name="website"
              placeholder={`${placeWebsite}`}
              aria-label={`${placeWebsiteLabel}`}
              className="box-shadow-none border-1 pl-10px pr-10px pt-5px pb-5px mb-10px"
              backgroundStyled={errors.website ? `${application.theme.primary}`: `${application.transparent}`}
              colorStyled={errors.website ? `${application.mode.primary}`: `${application.theme.primary}`}
              placeholderStyled={errors.website ? `${application.mode.primary}`: `${application.theme.primary}`}
              fontSizeStyled={application.text.primary}
              borderStyled={application.theme.primary}
              radiusStyled={application.settings.appRadius}
              value={this.state.website}
              onChange={this.onChange}
            />
            <Input
              type="text"
              name="location"
              placeholder={`${placeLocation}`}
              aria-label={`${placeLocationLabel}`}
              className="box-shadow-none border-1 pl-10px pr-10px pt-5px pb-5px mb-10px"
              backgroundStyled={errors.location ? `${application.theme.primary}`: `${application.transparent}`}
              colorStyled={errors.location ? `${application.mode.primary}`: `${application.theme.primary}`}
              placeholderStyled={errors.location ? `${application.mode.primary}`: `${application.theme.primary}`}
              fontSizeStyled={application.text.primary}
              borderStyled={application.theme.primary}
              radiusStyled={application.settings.appRadius}
              value={this.state.location}
              onChange={this.onChange}
            />
            <Input
              type="text"
              name="skills"
              placeholder={`${placeTalents}`}
              aria-label={`${placeTalentsLabel}`}
              className="box-shadow-none border-1 pl-10px pr-10px pt-5px pb-5px"
              backgroundStyled={errors.skills ? `${application.theme.primary}`: `${application.transparent}`}
              colorStyled={errors.skills ? `${application.mode.primary}`: `${application.theme.primary}`}
              placeholderStyled={errors.skills ? `${application.mode.primary}`: `${application.theme.primary}`}
              fontSizeStyled={application.text.primary}
              borderStyled={application.theme.primary}
              radiusStyled={application.settings.appRadius}
              value={this.state.skills}
              onChange={this.onChange}
            />
            <Div className="mb-10px" colorStyled={application.theme.primary} fontSizeStyled={application.text.info}>
              <FormattedMessage
                id="profile.editProfileTalentsNotice"
                defaultMessage="Separate individual skills with a comma"
              />
            </Div>
            <InputArea
              type="text"
              name="bio"
              placeholder={`${placeBio}`}
              aria-label={`${placeBioLabel}`}
              className="box-shadow-none border-1 pl-10px pr-10px pt-5px pb-5px mb-10px"
              backgroundStyled={errors.bio ? `${application.theme.primary}`: `${application.transparent}`}
              colorStyled={errors.bio ? `${application.mode.primary}`: `${application.theme.primary}`}
              placeholderStyled={errors.bio ? `${application.mode.primary}`: `${application.theme.primary}`}
              fontSizeStyled={application.text.primary}
              borderStyled={application.theme.primary}
              radiusStyled={application.settings.appRadius}
              value={this.state.bio}
              onChange={this.onChange}
            />

            <div className="mb-10px">
              <Button
                type="button"
                onClick={() => {
                  this.setState(prevState => ({
                    displaySocialInputs: !prevState.displaySocialInputs
                  }));
                }}
                className="clickable p-10px border-1"
                transitionStyled={application.transitions.general}
                backgroundStyled={application.mode.primary}
                backgroundHoverStyled={application.theme.primary}
                colorStyled={application.theme.primary}
                colorHoverStyled={application.mode.primary}
                borderStyled={application.theme.primary}
                radiusStyled={application.settings.appRadius}
              >
                {socialMessage}
              </Button>
            </div>
            {socialInputs}
            <Input
              type="submit"
              value={`${submitProfile}`}
              className="clickable mt-10px mb-20px webkit-appearance-none"
              transitionStyled={application.transitions.general}
              backgroundStyled={application.theme.primaryThree}
              backgroundHoverStyled={application.theme.primary}
              colorStyled={application.mode.primary}
              fontSizeStyled={application.text.heading}
              borderStyled={application.mode.primary}
              radiusStyled={application.settings.appRadius}
            />
          </form>
        </div>
      </Div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
  users: state.users
});

export default connect(mapStateToProps, { addTempPhoto, createProfile, getCurrentProfile })(withRouter(CreateProfile));
