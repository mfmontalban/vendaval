import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Vientos extends Component {

  render() {

    return (
      <div className="body scroll-container pt-3 pb-3">
        <p>Testing</p>
      </div>
    );
  }
}

Vientos.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { })(Vientos);
