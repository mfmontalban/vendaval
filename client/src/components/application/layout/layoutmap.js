import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import HeaderMap from './headermap'
import Footer from './footer'

class LayoutMap extends Component {
    render() {
        return (
            <div>
                <HeaderMap />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

LayoutMap.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  const mapStateToProps = state => ({
    admin: state.admin,
    application: state.application
  });
  
  export default connect(mapStateToProps, {})(withRouter(LayoutMap));
  