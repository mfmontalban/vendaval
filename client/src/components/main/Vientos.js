import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLiveVientos } from '../../actions/vientosActions';
import Spinner from '../common/Spinner';
import VientoItem from './VientoItem';


class Vientos extends Component {

  componentDidMount() {
    this.props.getLiveVientos();
  }

  render() {

    const { vientos, loading } = this.props.vientos;

    let dashboardContent;
    let loadingContent;
    let content;

    if (vientos === null || loading) {
      loadingContent = <Spinner />;
    } else {
      if (vientos.length > 0) {
        dashboardContent = vientos.map(viento =>
          <VientoItem key={viento._id} viento={viento} />
        );

        content = (
          <div>
            {dashboardContent}
          </div>
        );

      } else {
        dashboardContent = (<tr></tr>);
      }
    }

    return (
      <div className="body scroll-container pt-3 pb-3">
        {loadingContent}
        {content}
      </div>
    );
  }
}

Vientos.propTypes = {
  getLiveVientos: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  vientos: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  vientos: state.vientos
});

export default connect(mapStateToProps, { getLiveVientos })(Vientos);
