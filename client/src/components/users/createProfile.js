import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createProfile } from '../../actions/usersActions';

import TextFieldGroup from '../application/common/textFieldGroup';
import TextAreaFieldGroup from '../application/common/textAreaFieldGroup';
import InputGroup from '../application/common/inputGroup';
import Footer from '../application/layout/footer'


class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCreateProfile: false,
      displaySocialInputs: false,
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

    this.props.createProfile(profileData, this.props.history);
  }

  render() {
    const { errors, displaySocialInputs, displayCreateProfile } = this.state;
    const { admin } = this.props;

    let createForm;
    let createWelcome;
    let socialInputs;

    if (displayCreateProfile) {
      createForm = (
        <div className="col-md-10 m-auto">
          <button
          onClick={() => {
            this.setState(prevState => ({
              displayCreateProfile: !prevState.displayCreateProfile
            }));
          }}
          className="btn btn-light"
          >
            Go Back
          </button>
          <h1 className="display-5 text-center">Crea tu Cuenta</h1>
          <p className="lead text-center">
            Anida informacion a tu cuenta publica
          </p>
          <small className="d-block pb-3">* = informacion requirido</small>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="* Profile Handle"
              name="handle"
              value={this.state.handle}
              onChange={this.onChange}
              error={errors.handle}
              info="A unique handle for your profile URL"
            />
            <TextFieldGroup
              placeholder="Website"
              name="website"
              value={this.state.website}
              onChange={this.onChange}
              error={errors.website}
              info="Could be your own website or a company one"
            />
            <TextFieldGroup
              placeholder="Location"
              name="location"
              value={this.state.location}
              onChange={this.onChange}
              error={errors.location}
              info="City, State"
            />
            <TextFieldGroup
              placeholder="* Skills"
              name="skills"
              value={this.state.skills}
              onChange={this.onChange}
              error={errors.skills}
              info="Please use comma separated values (eg.
                Photography, Graphic Design, Video, Music)"
            />
            <TextAreaFieldGroup
              placeholder="Short Bio"
              name="bio"
              value={this.state.bio}
              onChange={this.onChange}
              error={errors.bio}
              info="Tell us a little about yourself"
            />

            <div className="mb-3">
              <button
                type="button"
                onClick={() => {
                  this.setState(prevState => ({
                    displaySocialInputs: !prevState.displaySocialInputs
                  }));
                }}
                className="btn btn-light"
              >
                Add Social Network Links
              </button>
              <span className="text-muted pl-2">Optional</span>
            </div>
            {socialInputs}
            <input
              type="submit"
              value="Submit"
              className="btn btn-info btn-block mt-4"
            />
          </form>
        </div>
      );
    } else {
      createWelcome = (
        <div>
          <p className="lead text-muted">Welcome { admin.name }</p>
          <p>Please click the link below to create your profile.</p>
          <button
          onClick={() => {
            this.setState(prevState => ({
              displayCreateProfile: !prevState.displayCreateProfile
            }));
          }}
          className="btn btn-lg btn-info">Create</button>
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
      <div>
        <div className="body scroll-container p-3">
          {createWelcome}
          {createForm}
        </div>
        <Footer />
      </div>
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

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));
