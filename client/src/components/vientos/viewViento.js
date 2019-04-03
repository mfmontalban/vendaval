import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getLiveVientoByID } from '../../actions/vientosActions';

import Spinner from '../application/common/spinner.js';
import Quill from '../application/common/quillView';

// import ReactHtmlParser from 'react-html-parser';
// <div>{ ReactHtmlParser(contributions.contentHTML) }</div>

class Contribution extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getLiveVientoByID(this.props.match.params.id);
    }
  }

  render() {
    const { viento, loading } = this.props.vientos;

    let vientoContent;

    if (viento === null || loading) {
      vientoContent = <Spinner />;
    } else {
      vientoContent =
        <div>
          <h1>{viento.title}</h1>
          <pre><p className="textStyle">{viento.description}</p></pre>
          <img className="banner" alt="banner" src={`http://localhost:5000/api/staff/files/${viento.banner}`} />
          <Quill contributions={viento.content} />
        </div>;
    }

    return (
      <div className="body scroll-container pt-3 pb-3">
        {vientoContent}
      </div>
    );
  }
}

// vtesting.herokuapp.com
// localhost:5000

Contribution.propTypes = {
  getLiveVientoByID: PropTypes.func.isRequired,
  vientos: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  vientos: state.vientos
});

export default connect(mapStateToProps, { getLiveVientoByID })(withRouter(Contribution));
