import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from './header'
import Footer from './footer'

class Layout extends Component {
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

Layout.propTypes = {
    admin: PropTypes.object.isRequired,
    application: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    admin: state.admin,
    application: state.application
  });
  
  export default connect(mapStateToProps, {})(withRouter(Layout));
  