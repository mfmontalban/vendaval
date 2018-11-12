import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import ContributionItem from './ContributionItem';
import { getContributions } from '../../actions/staffActions';

class Staff extends Component {

  componentDidMount() {
    this.props.getContributions();
  }

  render() {

    const { contributions, loading } = this.props.staff;

    let dashboardContent;

    if (contributions === null || loading) {
      dashboardContent = <tr><td><Spinner /></td></tr>;
    } else {
      if (contributions.length > 0) {
        dashboardContent = contributions.map(contribution => (
          <ContributionItem key={contribution._id} contribution={contribution} />
        ));
      } else {
        dashboardContent = <tr></tr>;
      }

    }

    return (
      <div className="body scroll-container pt-3 pb-3">
        <nav className="d-flex flex-row" aria-label="Page navigation example">
          <nav className="w-100 navbar navbar-expand-sm navbar-light bg-transparent">
            <a className="navbar-brand" href="#{}">Contributions</a>
            <button className="pt-2 pb-2 ml-auto navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <i className="far fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav d-flex flex-row justify-content-between">
                <li className="nav-item active">
                  <a className="nav-link" href="#{}">All <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#{}">Drafts</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#{}">Revisions</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#{}">Live</a>
                </li>
              </ul>
            </div>
          </nav>
        </nav>
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th scope="col">
                <div className="btn-group">
                  <a className="text-info" href="#{}" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-archive"></i>
                  </a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#{}"><i className="fal fa-mouse-pointer mr-2"></i>Select All</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#{}"><i className="fal fa-trash mr-2"></i>Delete</a>
                  </div>
                </div>
              </th>
              <th scope="col">
                <div className="dropdown">
                  <a className="text-info" href="#{}" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Status
                  </a>

                  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <div className="dropdown-item d-flex justify-content-between" href="#{}"><i className="m-sort-top fal fa-sort-up mr-2"></i>Sort<i className="fal fa-sort-down ml-2"></i></div>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#{}"><i className="fal fa-bullseye mr-2"></i>Exact</a>
                    <a className="dropdown-item" href="#{}"><i className="fal fa-exchange-alt mr-2"></i>Range</a>
                  </div>
                </div>
              </th>
              <th scope="col">
                <div className="dropdown">
                  <a className="text-info" href="#{}" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Date
                  </a>

                  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <div className="dropdown-item d-flex justify-content-between" href="#{}"><i className="m-sort-top fal fa-sort-up mr-2"></i>Sort<i className="fal fa-sort-down ml-2"></i></div>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#{}"><i className="fal fa-bullseye mr-2"></i>Exact</a>
                    <a className="dropdown-item" href="#{}"><i className="fal fa-exchange-alt mr-2"></i>Range</a>
                  </div>
                </div>
              </th>
              <th scope="col">
                <div className="dropdown">
                  <a className="text-info" href="#{}}" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Title
                  </a>

                  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <div className="dropdown-item d-flex justify-content-between" href="#{}}"><i className="fal fa-sort-alpha-up mr-2"></i>Sort<i className="fal fa-sort-alpha-down ml-2"></i></div>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#{}">Exact</a>
                    <a className="dropdown-item" href="#{}">Contains</a>
                    <input className="form-control b-input-search" type="search" placeholder="Search" aria-label="Search"></input>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {dashboardContent}
          </tbody>
        </table>

        <div className="d-flex flex-row justify-content-between">
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
        </div>

        <div className="bd-highlight mb-3">
          <div className="bd-highlight"><a className="btn btn-info btn-block" href="/staff/contribute">New</a></div>
        </div>
      </div>
    );
  }
}

Staff.propTypes = {
  getContributions: PropTypes.func.isRequired,
  staff: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  staff: state.staff
});

export default connect(mapStateToProps, { getContributions })(Staff);
