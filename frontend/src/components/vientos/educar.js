import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

class Educar extends Component {
  render() {
    return (
      <div className="body scroll-container pt-3 pb-3">
        <Link to="#{}"></Link>
      </div>
    );
  }
}

Educar.propTypes = {
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(Educar);
