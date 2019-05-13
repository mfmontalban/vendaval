import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getLiveVientoByID } from '../../actions/vientosActions';

import Spinner from '../application/common/spinner.js';
import Quill from '../application/common/quillView';
import CommentForm from './CommentForm.js';
import CommentFeed from './CommentFeed.js';
import Footer from '../application/layout/footer'

class Contribution extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getLiveVientoByID(this.props.match.params.id);
    }
  }

  render() {
    const { viento, loading } = this.props.vientos;

    // console.log(viento);

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
          <CommentFeed vientoId={viento._id} comments={viento.comments} />
          <CommentForm vientoId={viento._id} />
        </div>;
    }

    return (
      <div>
        <div className="body scroll-container pt-3 pb-3">
          {vientoContent}
        </div>
        <Footer />
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
