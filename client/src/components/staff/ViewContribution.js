import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getContributionByID } from '../../actions/staffActions';
import Spinner from '../common/Spinner.js'

class Contribution extends Component {

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getContributionByID(this.props.match.params.id);
    }
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
          <pre>{contributions.description}</pre>
        </div>;
    }

    return (
      <div className="body scroll-container pt-3 pb-3">
        <Link to={`/staff/dashboard`} className="btn btn-light">
          Go Back
        </Link>
        {contributionContent}
      </div>
    );
  }
}

Contribution.propTypes = {
  getContributionByID: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  staff: state.staff
});

export default connect(mapStateToProps, { getContributionByID })(Contribution);
