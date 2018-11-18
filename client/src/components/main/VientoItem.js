import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class VientoItem extends Component {

  render() {
    const { viento } = this.props;

    return (
      <div>
        <Link to={`/vientos/${viento._id}`}>{viento.title}</Link>
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
