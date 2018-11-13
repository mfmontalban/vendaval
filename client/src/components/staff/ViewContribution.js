import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getContributionByID, deleteContribution } from '../../actions/staffActions';
import Spinner from '../common/Spinner.js'

class Contribution extends Component {

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getContributionByID(this.props.match.params.id);
    }
  }

  onDeleteClick(id) {
    this.props.deleteContribution(id);
  }

  render() {
    const { contributions, loading } = this.props.staff;

    let contributionContent;

    if (contributions === null || loading) {
      contributionContent = <Spinner />;
    } else {
      contributionContent =
        <div>
          <h1>{contributions.title}</h1>
          <pre><p className="textStyle">{contributions.description}</p></pre>
        </div>;
    }

    return (
      <div className="body scroll-container pt-3 pb-3">
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
              onClick={this.onDeleteClick.bind(this, contributions._id)}
              >
              <i className="fal fa-trash mr-2"></i>Delete
            </a>
          </div>
        </div>
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

export default connect(mapStateToProps, { getContributionByID, deleteContribution })(Contribution);
