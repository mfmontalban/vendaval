import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getContributions } from '../../actions/staffActions';
import {FormattedMessage} from 'react-intl';

import Spinner from '../application/common/spinner';
import ContributionItem from './contributionItem';
import Footer from '../application/layout/footer'

class Staff extends Component {

  componentDidMount() {
    this.props.getContributions();
  }

  render() {

    const { contributions, loading } = this.props.staff;

    let dashboardContent;
    let loadingContent;
    let content;

    if (contributions === null || loading) {
      loadingContent = <Spinner />;
    } else {
      if (contributions.length > 0) {
        dashboardContent = contributions.map(contribution =>
          <ContributionItem key={contribution._id} contribution={contribution} />
        );

        content = (
          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th scope="col">
                  <div className="btn-group">
                    <div className="text-info non-clickable"><i className="far fa-archive"></i>
                    </div>
                  </div>
                </th>
                <th scope="col">
                  <div className="dropdown">
                    <div className="text-info non-clickable">
                    <FormattedMessage
                      id="staff.status"
                      defaultMessage="Status"
                    />
                    </div>
                  </div>
                </th>
                <th scope="col">
                  <div className="dropdown">
                    <div className="text-info non-clickable">
                    <FormattedMessage
                      id="staff.date"
                      defaultMessage="Date"
                    />
                    </div>
                  </div>
                </th>
                <th scope="col">
                  <div className="dropdown">
                    <div className="text-info non-clickable">
                    <FormattedMessage
                      id="staff.title"
                      defaultMessage="Title"
                    />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
                {dashboardContent}
              </tbody>
            </table>
        );

      } else {
        dashboardContent = (<tr></tr>);
      }
    }

    return (
      <div>
        <div className="body scroll-container pt-3 pb-3">
          <nav className="d-flex flex-row" aria-label="Page navigation example">
            <nav className="w-100 navbar navbar-expand-sm navbar-light bg-transparent">
              <div className="navbar-brand non-clickable">Contributions</div>
            </nav>
          </nav>
          {loadingContent}
          {content}
          {/* <div className="d-flex flex-row justify-content-between">
            <ul className="d-flex pagination">
              <li className="page-item disabled">
                <a className="page-link" href="#{}" tabIndex="-1"><i className="fal fa-angle-left"></i></a>
              </li>
            </ul>

            <ul className="d-flex pagination">
              <li className="page-item disabled"><a className="page-link text-muted" href="#{}">1</a></li>
              <li className="page-item"><a className="page-link text-info" href="#{}">2</a></li>
              <li className="page-item"><a className="page-link text-info" href="#{}">3</a></li>
            </ul>

            <ul className="d-flex pagination">
              <li className="page-item">
                <a className="page-link" href="#{}" tabIndex="-1"><i className="fal fa-angle-right"></i></a>
              </li>
            </ul>
          </div> */}

          <div className="bd-highlight m-3">
            <div className="bd-highlight"><Link className="btn btn-info btn-block" to="/staff/contribute">New</Link></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Staff.propTypes = {
  getContributions: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  application: state.application,
  staff: state.staff
});

export default connect(mapStateToProps, { getContributions })(Staff);
