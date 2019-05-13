import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteContribution } from '../../actions/staffActions';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import {FormattedMessage, FormattedDate, FormattedTime} from 'react-intl';

class ContributionItem extends Component {
  state = {
    modal: false
  };


  toggle(id) {
    this.setState({
      modal: !this.state.modal
    });
  }

  onDeleteSubmitClick(id) {
    this.props.deleteContribution(id);
  }

  render() {
    const { contribution } = this.props;
    const setLanguage = this.props.application.language;

    let community;

    if (setLanguage === 'es') {
      community = 'communidad';
    } else {
      community = 'community';
    }

    return (
        <tr>
          <td>
            <div className="btn-group">
              <button type="button" className="bg-transparent border-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fal fa-ellipsis-v"></i>
              </button>
              <div className="dropdown-menu">
                <Link to={`/staff/contribution/view/${contribution._id}`} className="dropdown-item text-dark"><i className="fal fa-search mr-2"></i>View</Link>
                <Link to={`/staff/contribution/edit/${contribution._id}`} className="dropdown-item text-dark"><i className="fal fa-pencil mr-2"></i>Edit</Link>
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
          </td>
          <td>{contribution.status}</td>
          <td className="moment">
            <FormattedMessage
                  id="viento.time_since_updated"
                  defaultMessage={`{formattedLastUpdatedDate} {formattedLastUpdatedTime}`}
                  values={{
                      formattedLastUpdatedDate: (
                        <FormattedDate value={contribution.updatedAt} />
                      ),
                      formattedLastUpdatedTime: (
                        <FormattedTime value={contribution.updatedAt} />
                      ),
                  }}
              />
          </td>
          <td className="d-flex tableTitleFix">
            <Link to={`/staff/contribution/view/${contribution._id}`}>{contribution.title}</Link>
          </td>

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

        </tr>
    );
  }
}

ContributionItem.propTypes = {
  deleteContribution: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired,
  contribution: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  application: state.application,
  contributions: state.contribution
});

export default connect(mapStateToProps, { deleteContribution })(ContributionItem);
