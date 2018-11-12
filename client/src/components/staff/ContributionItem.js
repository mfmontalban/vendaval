import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteContribution } from '../../actions/staffActions';
import Moment from 'react-moment';

class ContributionItem extends Component {

  onDeleteClick(id) {
    this.props.deleteContribution(id);
  }

  render() {
    const { contribution } = this.props;

    return (

      <tr>
        <td><input type="checkbox" aria-label="Checkbox for following text input"></input></td>
        <td>{contribution.status}</td>
        <td className="moment">
          <Moment format="M/D/YY h:mm a">{contribution.updatedAt}</Moment>
        </td>
        <td className="d-flex">
          <p>{contribution.title}</p>
          <div className="btn-group">
            <button type="button" className="bg-transparent border-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fal fa-ellipsis-v"></i>
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              <Link to={`/staff/contribution/view/${contribution._id}`} className="dropdown-item text-dark"><i className="fal fa-search mr-2"></i>View</Link>
              <Link to={`/staff/contribution/edit/${contribution._id}`} className="dropdown-item text-dark"><i className="fal fa-pencil mr-2"></i>Edit</Link>
              <a
                href="#{}"
                className="dropdown-item text-dark"
                onClick={this.onDeleteClick.bind(this, contribution._id)}
                >
                <i className="fal fa-trash mr-2"></i>Delete
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#{}"><i className="fal fa-sticky-note mr-2"></i>Revisions</a>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

ContributionItem.propTypes = {
  deleteContribution: PropTypes.func.isRequired,
  contribution: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  contributions: state.contribution
});

export default connect(mapStateToProps, { deleteContribution })(ContributionItem);
