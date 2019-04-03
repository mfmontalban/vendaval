import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Moment from 'react-moment';

// import Moment from 'react-moment';

class VientoItem extends Component {

  render() {
    const { viento } = this.props;
    
    let community;

    community = 'community';

    return (
      <div>

        <div className="container-margin2 container-width2 border border-secondary rounded">
          <div className="w-100 p-1 d-flex flex-row justify-content-between border-bottom border-secondary align-items-end bg-silvero2 rounded-top">
            <div className="flex-row text-left">
              <div className="post-section-heading">{viento.type}/ {viento.topic}</div>
            </div>
            <div className="flex-row text-right">
              <div className="post-time-heading">
                <Moment format="M/D/YY h:mm a">{viento.updatedAt}</Moment>
              </div>
            </div>
          </div>
          <div className="w-100 p-1 d-flex flex-row justify-content-between bg-light">
            <div className="flex-row text-left">
              <h5>
                <Link to={`/vientos/${viento._id}`}>{viento.title}</Link>
              </h5>
              <h6>
                {viento.description}
              </h6>
            </div>
            <div className="flex-row text-center border border-secondary rounded bg-primary p-1">
              <h5>
                Image
              </h5>
              <h5>
                Holder
              </h5>
            </div>
          </div>
          <div className="w-100 p-1 d-flex flex-row justify-content-between border-top border-secondary align-items-end bg-silvero2 rounded-bottom">
            <div className="flex-row text-left">
              <div className="post-section-heading"><Link to={`/${community}/${viento.profile.handle}`}>{viento.user.name}</Link></div>
            </div>
            <div className="flex-row text-right">
              <div className="post-time-heading">45,230 views</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VientoItem.propTypes = {
  viento: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  vientos: state.viento
});

export default connect(mapStateToProps, { })(VientoItem);
