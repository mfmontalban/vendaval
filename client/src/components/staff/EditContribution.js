import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import Quill from '../common/QuillEdit';
import { editContribution, getContributionByID, deleteContribution } from '../../actions/staffActions';
import isEmpty from '../../validation/is-empty';
import Spinner from '../common/Spinner.js'

class Contribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      topic: '',
      title: '',
      banner: '',
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.staff.contributions) {
      const contribution = nextProps.staff.contributions;

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

  fileSelected = (e) => {
    this.setState({banner: e.target.files[0]});
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const id = this.props.match.params.id;

    let data = new FormData();
    data.append('file', this.state.banner);

    const contribData = {
      type: this.state.type,
      topic: this.state.topic,
      title: this.state.title,
      description: this.state.description,
      content: localStorage.content,
      contentHTML: localStorage.contentHTML
    };

    this.props.editContribution(id, contribData, data, this.props.history);
  }

  render() {
    const { errors } = this.state;

    const { contributions, loading } = this.props.staff;

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

    let contributionContent;

    if (contributions === null || loading) {
      contributionContent = <Spinner />;
    } else {
      contributionContent =
        <div>

          <Modal
            className="mt-5"
            isOpen={this.state.modal}
            toggle={this.toggle.bind(this, contributions._id)}
          >
            <ModalHeader
            toggle={this.toggle.bind(this, contributions._id)}
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
                onClick={this.onDeleteSubmitClick.bind(this, contributions._id)}
              >
              Delete
              </Button>
              <Button
                color="light"
                onClick={this.toggle.bind(this, contributions._id)}
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
              <Link to={`/staff/contribution/view/${contributions._id}`} className="dropdown-item text-dark"><i className="fal fa-pencil mr-2"></i>View</Link>
              <div className="dropdown-divider"></div>
              <a
                href="#{}"
                className="dropdown-item text-dark"
                onClick={this.toggle.bind(this, contributions._id)}
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
                <input type="file" onChange={this.fileSelected} className="custom-file-input clickable" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
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
            <Quill contributions={contributions.content} />
            <input
              type="submit"
              value="Submit"
              className="btn btn-info btn-block mt-4"
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
  editContribution: PropTypes.func.isRequired,
  deleteContribution: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  staff: state.staff
});

export default connect(mapStateToProps, { editContribution, getContributionByID, deleteContribution })(withRouter(Contribution));
