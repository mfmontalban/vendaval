import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getContributionByID, deleteContribution } from '../../actions/staffActions';
import Spinner from '../common/Spinner.js'
import Quill from '../common/QuillView';

// import ReactHtmlParser from 'react-html-parser';
// <div>{ ReactHtmlParser(contributions.contentHTML) }</div>

class Contribution extends Component {
  state = {
    modal: false,
    files: [],
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getContributionByID(this.props.match.params.id);
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

  render() {
    const { contributions, loading } = this.props.staff;

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

          <Link to={`/staff/dashboard`} className="btn btn-light">
            Dashboard
          </Link>
          <div className="btn-group">
            <button type="button" className="bg-transparent border-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fal fa-ellipsis-v"></i>
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              <Link to={`/staff/contribution/edit/${contributions._id}`} className="dropdown-item text-dark"><i className="fal fa-pencil mr-2"></i>Edit</Link>
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
          <h1>{contributions.title}</h1>
          <pre><p className="textStyle">{contributions.description}</p></pre>
          <img className="banner" alt="banner" src={`http://localhost:5000/api/staff/files/${contributions.banner}`} />
          <Quill contributions={contributions.content} />
        </div>;
    }

    return (
      <div className="body scroll-container pt-3 pb-3">
        {contributionContent}
      </div>
    );
  }
}

Contribution.propTypes = {
  getContributionByID: PropTypes.func.isRequired,
  deleteContribution: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  staff: state.staff
});

export default connect(mapStateToProps, { getContributionByID, deleteContribution })(withRouter(Contribution));
