import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'; 

import { addContribution } from '../../actions/staffActions';
import Resizer from 'react-image-file-resizer';

import TextFieldGroup from '../application/main/common/textFieldGroup';
import SelectListGroup from '../application/main/common/selectListGroup';
import TextAreaFieldGroup from '../application/main/common/textAreaFieldGroup';
import Quill from '../application/main/common/quillEdit';
import { FormattedMessage } from 'react-intl';

import DraggableMarker from '../application/main/map/draggableMarker';
import Div from '../application/main/common/styled/div';
import Input from '../application/main/common/styled/input';
import LinkContainer from '../application/main/common/styled/linkContainer';
import BackArrow from '../application/main/common/backArrow'; 

class AddContribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
      type: '',
      topic: '',
      title: '',
      banner: '',
      bannerSm: '',
      bannerLg: '',
      description: '',
      content: '',
      lat: '',
      lon: '',
      errors: {},
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.application.alerts.errors!==prevProps.application.alerts.errors){
      //Perform some operation here
      this.setState({errors: this.props.application.alerts.errors});
    }
  }

  bannerAdded = (e) => {
    const name = e.target.files[0].name;
    const fileType = e.target.files[0].type.split('/')[1];
    var fileInput = false;
    if(e.target.files[0]) {
        fileInput = true
    }
    if(fileInput) {
      let fileName = name + '_' + this.props.admin.id + '_original'
      let file = new File([e.target.files[0]], fileName, {type: fileType});
      this.setState({banner: file});
      
      Resizer.imageFileResizer(
        e.target.files[0],
        325,
        325,
        fileType,
        100,
        0,
        uri => {
          let fileName = name + '_' + this.props.admin.id + '_sm'
          let file = new File([uri], fileName, {type: fileType});
          this.setState({bannerSm: file});
        },
        'blob'
      );

      Resizer.imageFileResizer(
        e.target.files[0],
        1420,
        1000,
        fileType,
        100,
        0,
        uri => {
          let fileName = name + '_' + this.props.admin.id + '_lg'
          let file = new File([uri], fileName, {type: fileType});
          this.setState({bannerLg: file});
        },
        'blob'
      );
    }
  }

  storeContent = (e) => {
    this.setState({content: e});
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const contribData = {
      type: this.state.type,
      topic: this.state.topic,
      title: this.state.title,
      description: this.state.description,
      content: this.state.content,
      lat: this.state.lat,
      lon: this.state.lon,
    };

    if(this.state.banner && !this.state.isEnabled) {
      this.setState({
        isEnabled: true
      });
      
      let deleteOldBanner = [
        this.props.staff.contribution.bannerOriginal,
        this.props.staff.contribution.bannerSm,
        this.props.staff.contribution.bannerLg,
      ]
  
      this.props.deleteOldBanner(deleteOldBanner);

      let data = new FormData();
      data.append('file', this.state.banner);
      data.append('file', this.state.bannerSm);
      data.append('file', this.state.bannerLg);

      this.props.addContribution(contribData, this.props.history, data);
    } else {
      this.props.addContribution(contribData, this.props.history);
    }
  }

  render() {
    // Select options for status
    const type = [
      { label: 'Type of Contribution', value: 0 },
      { label: 'Article', value: 'Article' },
      { label: 'Video', value: 'Video' },
      { label: 'Photograph', value: 'Photograph' },
      { label: 'Music', value: 'Music' },
    ];

    // Select options for status
    const topic = [
      { label: 'Topic for Contribution', value: 0 },
      { label: 'Science', value: 'Science' },
      { label: 'Technology', value: 'Technology' },
      { label: 'Engineering', value: 'Engineering' },
      { label: 'Mathematics', value: 'Mathematics' },
    ];

    const isEnabled = this.state.isEnabled;

    const { errors } = this.state;
    const { application } = this.props;

    let staff;
    let dashboard;
    let title;
    let shortDescription;
    let placeSubmit
    let lat;
    let lon;

    if (application.language === 'es') {
      staff = "personal";
      dashboard = "tablero";
      title = "Titulo";
      shortDescription = "Corto descripción"
      placeSubmit = "Enviar"
      lat = "Latitud"
      lon = "Longitud"
    } else {
      staff = "staff";
      dashboard = "dashboard";
      title = "Title";
      shortDescription = "Short description";
      placeSubmit = "Submit"
      lat = "Latitude"
      lon = "Longitude"
    }

    return (
      <Div className="h-100 overflow-scroll scrollbar-width-none" backgroundStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadiusBottom}`} colorStyled={`${application.theme.primary}`}>
        <div className="max-w-1000px ml-auto mr-auto">
          <Link to={`/${staff}/${dashboard}`}>
            <LinkContainer className="mt-10px ml-10px p-10px w-40px" transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primaryHalf}`} colorHoverStyled={`${application.theme.primary}`}>
              <BackArrow />
            </LinkContainer>
          </Link>
          <h1 className="display-6 text-center mt-3">
            <FormattedMessage
              id="staff.contributionTitle"
              defaultMessage="Contribution"
            />
          </h1>
          <form className="max-w-750px ml-auto mr-auto text-center mb-20px" onSubmit={this.onSubmit}>

            <TextFieldGroup
              placeholder={`${title}`}
              name="title"
              value={this.state.title}
              onChange={this.onChange}
              error={errors.title}
            />

            <TextAreaFieldGroup
              placeholder={`${shortDescription}`}
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              error={errors.description}
            />

            <div className="d-flex flex-direction-row justify-content-center">
              <FormattedMessage
                id="staff.bannerTitle"
                defaultMessage="Banner: "
              />
              <input type="file" name="file" onChange={this.bannerAdded} className="ml-5px text-center clickable" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
            </div>

            <TextFieldGroup
              placeholder={`${lat}`}
              name="lat"
              value={this.state.lat}
              onChange={this.onChange}
              error={errors.lat}
            />

            <TextFieldGroup
              placeholder={`${lon}`}
              name="lon"
              value={this.state.lon}
              onChange={this.onChange}
              error={errors.lon}
            />

            {/* <DraggableMarker /> */}

            <Quill storeQuillDelta={this.storeContent} />

            <Input
              type="submit"
              value={`${placeSubmit}`}
              disabled={isEnabled}
              className={`clickable mt-10px mb-10px webkit-appearance-none`}
              transitionStyled={application.transitions.general}
              backgroundStyled={application.theme.primaryQuarter}
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

AddContribution.propTypes = {
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
});

export default connect(mapStateToProps, { addContribution })(
  withRouter(AddContribution)
);
