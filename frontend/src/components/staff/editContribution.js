import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { deleteOldBanner, editContribution, getContributionByID, deleteContribution } from '../../actions/staffActions';
import Resizer from 'react-image-file-resizer';
import { FormattedMessage } from 'react-intl';

import Spinner from '../application/main/common/spinner.js'
import isEmpty from '../../reducers/validation/is-empty';
import TextFieldGroup from '../application/main/common/textFieldGroup';
import SelectListGroup from '../application/main/common/selectListGroup';
import TextAreaFieldGroup from '../application/main/common/textAreaFieldGroup';
import Quill from '../application/main/common/quillEdit';
import Div from '../application/main/common/styled/div';
import LinkContainer from '../application/main/common/styled/linkContainer';
import BackArrow from '../application/main/common/backArrow'; 
import Button from '../application/main/common/styled/button';
import Dropdown from '../application/main/common/styled/dropdown';
import DropdownDivider from '../application/main/common/styled/dropdownDivider';

class Contribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
      listOpen: false,
      outsideClicked: false,
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
      modal: false,
      errors: {}
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.application.alerts.errors!==prevProps.application.alerts.errors){
      //Perform some operation here
      this.setState({errors: this.props.application.alerts.errors});
    }

    if (this.props.staff.contribution!==prevProps.staff.contribution) {
      const contribution = this.props.staff.contribution;

      console.log(contribution);

      // If profile field doesnt exist, make empty string
      contribution.type = !isEmpty(contribution.type) ? contribution.type : '';
      contribution.topic = !isEmpty(contribution.topic) ? contribution.topic : '';
      contribution.title = !isEmpty(contribution.title) ? contribution.title : '';
      contribution.description = !isEmpty(contribution.description) ? contribution.description : '';
      contribution.content = !isEmpty(contribution.content) ? contribution.content : '';
      contribution.lat = !isEmpty(contribution.lat) ? contribution.lat : '';
      contribution.lon = !isEmpty(contribution.lon) ? contribution.lon : '';

      // Set component fields state
      this.setState({
        type: contribution.type,
        topic: contribution.topic,
        title: contribution.title,
        description: contribution.description,
        content: contribution.content,
        lat: contribution.lat,
        lon: contribution.lon,
      });
    }
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getContributionByID(this.props.match.params.id);
    }
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        listOpen: false,
      });
      setTimeout(() => {
        this.setState({ outsideClicked: false });
      }, 250);
    }
  }

  toggleList = () => {
    if (this.state.outsideClicked === false) {
      this.setState(prevState => ({
        listOpen: !prevState.listOpen,
        outsideClicked: true,
      }))
    }
  }

  toggle(id) {
    this.setState({
      modal: !this.state.modal
    });
  }

  onDeleteSubmitClick(id) {
    this.props.deleteContribution(id, this.props.history);
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
      this.setState({
        banner: file
      });
      
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

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  storeContent = (e) => {
    this.setState({content: e});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const id = this.props.match.params.id;

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

      this.props.editContribution(id, contribData, this.props.history, data);
    } else {
      this.props.editContribution(id, contribData, this.props.history);
    }
  }

  render() {
    const { listOpen, errors } = this.state;

    const { contribution, loading } = this.props.staff;
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

    let contributionContent;

    if (contribution === null || loading) {
      contributionContent = <Spinner />;
    } else {
      contributionContent =
        <div className="max-w-1000px ml-auto mr-auto">
          <Div className="d-flex justify-content-space-between align-items-center p-20px" backgroundStyled={application.mode.primaryHalf}>
            <div className="w-30 d-flex">
              <Link className="w-40px ml-25" to={`/${staff}/${dashboard}`}>
                <Div className="d-flex justify-content-center align-items-center h-40px w-40px min-w-max-content border-radius-circle" transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} backgroundStyled={`${application.mode.primaryThree}`} backgroundHoverStyled={`${application.theme.primary}`}>
                  <i className='ml-neg3px clickable fa-2x fas fa-chevron-left'></i>
                </Div>
              </Link>
            </div>
            <div className="w-30 d-flex justify-content-center">
              {/* <Div className="min-w-max-content text-center" radiusStyled={application.settings.appRadius} backgroundStyled={application.mode.primaryHalf} fontSizeStyled={application.text.important}>
                <Div className="p-5px" backgroundStyled={application.mode.primaryThree} radiusStyled={application.settings.appRadiusTop}>{contribution.type}:</Div>
                <div className="p-5px">{contribution.topic}</div>
              </Div> */}
            </div>
            <div className="w-30 d-flex justify-content-flex-end">
              <Button onClick={() => this.toggleList()} className="d-flex justify-content-center align-items-center h-40px w-40px min-w-max-content mr-25px border-radius-circle clickable" transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} backgroundStyled={`${application.mode.primaryThree}`} backgroundHoverStyled={`${application.theme.primary}`}>
                <i className="fa-2x fal fa-ellipsis-v"></i>
              </Button>
              {listOpen &&
                  <Dropdown ref={this.setWrapperRef} className="position-absolute mt-45px ml-neg30px z-1005 d-flex flex-direction-column text-right outer-shadow" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadius}`}>
                    <Link className="noUnderline" to={`/staff/contribution/view/${contribution._id}`}>
                      <Div
                        // onClick={this.onDeleteClick.bind(this, contribution.id)}
                        type="button"
                        className="h-max-content p-10px clickable text-left"
                        transitionStyled={application.transitions.general}
                        backgroundStyled={application.mode.primary}
                        backgroundHoverStyled={application.theme.primaryQuarter}
                        colorStyled={application.theme.primary}
                        colorHoverStyled={application.theme.primary}
                        radiusStyled={application.settings.appRadiusTop}
                      >
                        <i className="fas fa-search mr-5px" />
                        <FormattedMessage
                          id="staff.view"
                          defaultMessage="View"
                        />
                      </Div>
                    </Link>
                    <Link className="noUnderline" to={`/staff/contribution/edit/${contribution._id}`}>
                      <Div
                        // onClick={this.onDeleteClick.bind(this, contribution.id)}
                        type="button"
                        className="h-max-content p-10px clickable text-left"
                        transitionStyled={application.transitions.general}
                        backgroundStyled={application.mode.primary}
                        backgroundHoverStyled={application.theme.primaryQuarter}
                        colorStyled={application.theme.primary}
                        colorHoverStyled={application.theme.primary}
                        >
                        <i className="fas fa-pencil mr-5px" />
                        <FormattedMessage
                          id="staff.edit"
                          defaultMessage="Edit"
                        />
                      </Div>
                    </Link>
                    <DropdownDivider colorStyled={application.theme.primary} />
                    <Button
                      // onClick={this.onDeleteClick.bind(this, contribution.id)}
                      type="button"
                      className="h-max-content p-10px clickable text-left"
                      transitionStyled={application.transitions.general}
                      backgroundStyled={application.mode.primary}
                      backgroundHoverStyled={application.theme.primaryQuarter}
                      colorStyled={application.theme.primary}
                      colorHoverStyled={application.theme.primary}
                      radiusStyled={application.settings.appRadiusBottom}
                    >
                      <i className="fas fa-times mr-5px" />
                      <FormattedMessage
                        id="staff.delete"
                        defaultMessage="Delete"
                      />
                    </Button>
                  </Dropdown>
              }
            </div>
          </Div>
          
          <h1 className="display-6 text-center mt-3">
            <FormattedMessage
              id="staff.contributionTitle"
              defaultMessage="Contribution"
            />
          </h1>
          <form className="max-w-750px ml-auto mr-auto text-center" onSubmit={this.onSubmit}>
            {/* <SelectListGroup
              placeholder="Type"
              name="type"
              value={this.state.type}
              onChange={this.onChange}
              options={type}
              error={errors.type}
            />
            <SelectListGroup
              placeholder="Topic"
              name="topic"
              value={this.state.topic}
              onChange={this.onChange}
              options={topic}
              error={errors.topic}
            /> */}
            <TextFieldGroup
              placeholder={title}
              name="title"
              value={this.state.title}
              onChange={this.onChange}
              error={errors.title}
            />
            <TextAreaFieldGroup
              placeholder={shortDescription}
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              error={errors.description}
            />

            <div className="input-group mb-3">
              <div className="custom-file clickable">
                <input type="file" name="file" onChange={this.bannerAdded} className="custom-file-input clickable" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
                <label className="custom-file-label clickable" htmlFor="inputGroupFile01">Choose Image</label>
              </div>
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

            <Quill storeQuillDelta={this.storeContent} />

            <input
              type="submit"
              value={placeSubmit}
              disabled={isEnabled}
            />
          </form>
          
        </div>
    }

    return (
      <Div className="scroll-container bottom-outer-shadow ml-10px mr-10px pt-70px" heightStyled={`${application.settings.heightHero}`} backgroundStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadiusBottom}`} colorStyled={`${application.theme.primary}`}>
        {contributionContent}
      </Div>
    );
  }
}

Contribution.propTypes = {
  getContributionByID: PropTypes.func.isRequired,
  deleteOldBanner: PropTypes.func.isRequired,
  editContribution: PropTypes.func.isRequired,
  deleteContribution: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
  staff: state.staff
});

export default connect(mapStateToProps, { deleteOldBanner, editContribution, getContributionByID, deleteContribution })(withRouter(Contribution));