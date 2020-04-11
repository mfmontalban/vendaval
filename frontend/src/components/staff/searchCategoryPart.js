import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {FormattedMessage} from 'react-intl';

import Button from '../application/common/styled/button'
import Div from '../application/common/styled/div'


class SearchCategory extends Component {

  toggleUpdateFilter = (selected) => {
    this.props.onFilterItems(selected);
  }

  render(){

    const { admin } = this.props;
    
    let content;
    let categoryArray;

    if (admin.staff === "staff") {
      categoryArray = [
        'reviewer',
        'status',
        'date',
        'title',
      ]
    } else if ((admin.staff === "reviewer") || (admin.staff === "manager") || (admin.staff === "webmaster")) {
      categoryArray = [
        'reviewer',
        'author',
        'status',
        'title',
      ]
    }


      content = categoryArray.map((category, index, arr) => {
        if (index == 0) {
          return <Button transitionStyled={`${this.props.application.transitions.general}`} backgroundStyled={`${this.props.application.mode.primary}`} backgroundHoverStyled={`${this.props.application.theme.primaryQuarter}`} colorStyled={this.props.application.theme.primary} radiusStyled={`${this.props.application.settings.appRadiusTop}`} onClick={(e) => {this.toggleUpdateFilter(category); this.props.toggleList();}} className="p-10px text-left" type="button">
            <FormattedMessage
              id={`staff.${category}`}
            />
            </Button>
        } else if (index == (categoryArray.length  - 1)) {
          return <Button transitionStyled={`${this.props.application.transitions.general}`} backgroundStyled={`${this.props.application.mode.primary}`} backgroundHoverStyled={`${this.props.application.theme.primaryQuarter}`} colorStyled={this.props.application.theme.primary} radiusStyled={`${this.props.application.settings.appRadiusBottom}`} onClick={(e) => {this.toggleUpdateFilter(category); this.props.toggleList();}} className="p-10px text-left" type="button">
            <FormattedMessage
              id={`staff.${category}`}
            />
            </Button>
        } else {
          return <Button transitionStyled={`${this.props.application.transitions.general}`} backgroundStyled={`${this.props.application.mode.primary}`} backgroundHoverStyled={`${this.props.application.theme.primaryQuarter}`} colorStyled={this.props.application.theme.primary} onClick={(e) => {this.toggleUpdateFilter(category); this.props.toggleList();}} className="p-10px text-left" type="button">
            <FormattedMessage
              id={`staff.${category}`}
            />
            </Button>
        }
      });


    return(
      <Div className="d-flex flex-direction-column" radiusStyled={`${this.props.application.settings.appRadius}`}>
        {content}
      </Div>
    )
  }
}

SearchCategory.propTypes = {
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
});

export default connect(mapStateToProps, {})(withRouter(SearchCategory));
