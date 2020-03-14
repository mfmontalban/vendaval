import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addTempPhoto, createProfile } from '../../actions/usersActions';
import Resizer from 'react-image-file-resizer';

import BackArrow from '../application/common/backArrow';
import InputGroup from '../application/common/inputGroup';

import Div from '../application/common/styled/div';
import H1 from '../application/common/styled/h1';
import H2 from '../application/common/styled/h2';
import Input from '../application/common/styled/input';
import InputArea from '../application/common/styled/inputArea';
import Button from '../application/common/styled/button';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCreateProfile: false,
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

  componentDidUpdate(prevProps, prevState) {
    if(this.props.application.errors!==prevProps.application.errors){
      //Perform some operation here
      this.setState({errors: this.props.application.errors});
    }

    if(this.state.loadPreview!==prevState.loadPreview) {
      let data = new FormData();
      data.append('file', this.state.pictureSm);
      data.append('file', this.state.pictureLg);
      this.props.addTempPhoto(data);
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
            pictureSmName: fileName
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
            loadPreview: true,
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
    const { errors, displaySocialInputs, displayCreateProfile } = this.state;
    const { admin, application } = this.props;

    let createForm;
    let createWelcome;
    let socialInputs;

    let avatarImage

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

    if (displayCreateProfile) {
      createForm = (
        <div>
          <Div 
          onClick={() => {
            this.setState(prevState => ({
              displayCreateProfile: !prevState.displayCreateProfile
            }));
          }}
          className="m-10px w-40px" transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primaryHalf}`} colorHoverStyled={`${application.theme.primary}`}>
            <BackArrow />
          </Div>
          <div className="w-80pc ml-auto mr-auto">
            <H1 className="text-center" fontSizeStyled={application.text.heading}>Crea tu Cuenta</H1>
            <H2 className="text-center mb-10px" fontSizeStyled={application.text.description}>
              Anida informacion a tu cuenta publica
            </H2>
            <form className="d-flex flex-direction-column text-center" onSubmit={this.onSubmit}>
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
                placeholder="* Profile Handle"
                aria-label="Required Field for Profile Handle"
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
              <Input
                type="text"
                name="website"
                placeholder="Website"
                aria-label="Field for Website"
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
                placeholder="City, State"
                aria-label="Field for City, State"
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
                placeholder="* Skills"
                aria-label="Required Field for Skills"
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
                Separate individual skills with a comma
              </Div>
              <InputArea
                type="text"
                name="bio"
                placeholder="About you"
                aria-label="Field for your public bio"
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
                  Add Social Network Links
                </Button>
              </div>
              {socialInputs}
              <Input
                type="submit"
                value="Submit"
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
        </div>
      );
    } else {
      createWelcome = (
        <div>
          <p className="lead text-muted">Welcome { admin.name }</p>
          <p>Please click the link below to create your profile.</p>
          <Div
          onClick={() => {
            this.setState(prevState => ({
              displayCreateProfile: !prevState.displayCreateProfile
            }));
          }}
          transitionStyled={`${application.transitions.general}`}
          backgroundStyled={`${application.theme.primaryThree}`}
          backgroundHoverStyled={`${application.theme.primary}`}
          colorStyled={`${application.mode.primary}`}
          radiusStyled={`${application.settings.appRadius}`}
          paddingStyled={`${application.settings.appPadding}`}
          className="w-60px text-center clickable">Create</Div>
        </div>
      ); 
    }

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
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
          {createWelcome}
          {createForm}
        </div>
      </Div>
    );
  }
}

CreateProfile.propTypes = {
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
  users: state.users
});

export default connect(mapStateToProps, { addTempPhoto, createProfile })(withRouter(CreateProfile));
