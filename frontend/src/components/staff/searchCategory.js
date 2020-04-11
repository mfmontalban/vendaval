import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {FormattedMessage} from 'react-intl';

import Button from '../application/common/styled/button'
import Dropdown from '../application/common/dropdown'
import SearchCategoryPart from './searchCategoryPart'

class SearchCategory extends Component {
  render(){
    return(
      <Dropdown
        alignEdge="left"
        phrase={
          <FormattedMessage
            id={`staff.${this.props.filterState}`}
          />
        }
      >
        <SearchCategoryPart onFilterItems={this.props.onFilterItems} />
      </Dropdown>
    )
  }
}

SearchCategory.propTypes = {
  application: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  application: state.application,
});

export default connect(mapStateToProps, {})(withRouter(SearchCategory));
