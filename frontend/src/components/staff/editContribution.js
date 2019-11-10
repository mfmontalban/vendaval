import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { deleteOldBanner, editContribution, getContributionByID, deleteContribution } from '../../actions/staffActions';
import Resizer from 'react-image-file-resizer';

import Spinner from '../application/main/common/spinner.js'
import isEmpty from '../../reducers/validation/is-empty';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import TextFieldGroup from '../application/main/common/textFieldGroup';
import SelectListGroup from '../application/main/common/selectListGroup';
import TextAreaFieldGroup from '../application/main/common/textAreaFieldGroup';
import Quill from '../application/main/common/quillEdit';

class Contribution extends Component {
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
      modal: false,
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getContributionByID(this.props.match.params.id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.application.alerts.errors!==prevProps.application.alerts.errors){
      //Perform some operation here
      this.setState({errors: this.props.application.alerts.errors});
    }

    if (this.props.staff.contribution!==prevProps.staff.contribution) {
      const contribution = this.props.staff.contribution;

      // If profile field doesnt exist, make empty string
      contribution.type = !isEmpty(contribution.type) ? contribution.type : '';
      contribution.topic = !isEmpty(contribution.topic) ? contribution.topic : '';
      contribution.title = !isEmpty(contribution.title) ? contribution.title : '';
      contribution.description = !isEmpty(contribution.description) ? contribution.description : '';
      contribution.content = !isEmpty(contribution.content) ? contribution.content : '';

      // Set component fields state
      this.setState({
        type: contribution.type,
        topic: contribution.topic,
        title: contribution.title,
        description: contribution.description,
        content: contribution.content
      });
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

  onSubmit = (e) => {
    e.preventDefault();

    const id = this.props.match.params.id;

    const contribData = {
      type: this.state.type,
      topic: this.state.topic,
      title: this.state.title,
      description: this.state.description,
      content: localStorage.content,
      contentHTML: localStorage.contentHTML
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
    const { errors } = this.state;

    const { contribution, loading } = this.props.staff;

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
        <div>

          <Modal
            className="mt-5"
            isOpen={this.state.modal}
            toggle={this.toggle.bind(this, contribution._id)}
          >
            <ModalHeader
            toggle={this.toggle.bind(this, contribution._id)}
            >
            App Settings
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.onSubmit}>
                <p className="display-5">Are you sure you want to delete this?</p>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onClick={this.onDeleteSubmitClick.bind(this, contribution._id)}
              >
              Delete
              </Button>
              <Button
                color="light"
                onClick={this.toggle.bind(this, contribution._id)}
              >
              Cancel
              </Button>
            </ModalFooter>
          </Modal>

          <Link to="/staff/dashboard" className="btn btn-light">
            Dashboard
          </Link>
          <div className="btn-group">
            <button type="button" className="bg-transparent border-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fal fa-ellipsis-v"></i>
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              <Link to={`/staff/contribution/view/${contribution._id}`} className="dropdown-item text-dark"><i className="fal fa-pencil mr-2"></i>View</Link>
              <div className="dropdown-divider"></div>
              <a
                href="#{}"
                className="dropdown-item text-dark"
                onClick={this.toggle.bind(this, contribution._id)}
                >
                <i className="fal fa-trash mr-2"></i>Delete
              </a>
            </div>
          </div>
          <h1 className="display-6 text-center mt-3">Contribution</h1>
          <form onSubmit={this.onSubmit}>
            <SelectListGroup
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
            />
            <TextFieldGroup
              placeholder="Title"
              name="title"
              value={this.state.title}
              onChange={this.onChange}
              error={errors.title}
            />

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <div className="btn btn-secondary non-clickable">Banner</div>
              </div>
              <div className="custom-file clickable">
                <input type="file" name="file" onChange={this.bannerAdded} className="custom-file-input clickable" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
                <label className="custom-file-label clickable" htmlFor="inputGroupFile01">Choose Image</label>
              </div>
            </div>

            <TextAreaFieldGroup
              placeholder="Description"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              error={errors.description}
            />
            <Quill contribution={contribution.content} />
            <input
              type="submit"
              value="Submit"
              disabled={isEnabled}
            />
          </form>
          
        </div>;
    }

    return (
      <div className="body scroll-container pt-3 pb-3">
        <div className="col-md-10 m-auto">
          {contributionContent}
        </div>
      </div>
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
