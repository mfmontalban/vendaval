import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {FormattedMessage} from 'react-intl';

import Button from '../application/common/styled/button'
import Dropdown from '../application/common/styled/dropdownold'

class SearchCategory extends Component {
  constructor(props){
    super(props)
    this.state = {
      outsideClicked: false,
      listOpen: false,
      filteringFor: ""
    }
  }
  
  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  componentDidMount = () => {

    if (this.props.application.language == "es") {
      this.setState(prevState => ({
        filteringFor: "Titulo",
      }))
    } else {
      this.setState(prevState => ({
        filteringFor: "Title",
      }))
    }
  }

  componentDidUpdate = (prevProps, prevState) => {

    if (this.props.application.language !== prevProps.application.language) {
      if (this.props.application.language == "es") {
        if (this.state.filteringFor == "Title") {
          this.setState({
            filteringFor: "Titulo",
          });
        } else {
          this.setState({
            filteringFor: "Autor",
          });
        }
      } else {
        if (this.state.filteringFor == "Title") {
          this.setState({
            filteringFor: "Title",
          });
        } else {
          this.setState({
            filteringFor: "Author",
          });
        }
      }
    }
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        listOpen: false,
      });
      setTimeout(() => {
        this.setState({ outsideClicked: false });
      }, 250);
    }
  }

  toggleList = () => {
    if (this.state.outsideClicked == false) {
      this.setState(prevState => ({
        listOpen: !prevState.listOpen,
        outsideClicked: true,
      }))
    } else {
      if (this.state.listOpen == true ) {
        this.setState({
          listOpen: false,
        });
        setTimeout(() => {
          this.setState({ outsideClicked: false });
        }, 250);
      }
    }
  }

  toggleUpdateFilter = (selected) => {
    if (this.props.application.language == "es") {
      if (selected == "Author") {
        this.setState(() => ({
          filteringFor: "Autor",
        }))
        this.props.onFilterItems(selected);
      } else {
        this.setState(() => ({
          filteringFor: "Titulo",
        }))
        this.props.onFilterItems(selected);
      }
    } else {
      if (selected == "Author") {
        this.setState(() => ({
          filteringFor: "Author",
        }))
        this.props.onFilterItems(selected);
      } else {
        this.setState(() => ({
          filteringFor: "Title",
        }))
        this.props.onFilterItems(selected);
      }
    }
  }

  render(){
    const { application } = this.props
    const { listOpen, filteringFor } = this.state

    let author;
    let title;

    if (application.language == "es") {
      author = "Autor"
      title = "Titulo"
    } else {
      author = "Author"
      title = "Title"
    }

    return(
      <div className="min-w-200px d-flex justify-content-start">
        <Button onClick={() => this.toggleList()} className="max-w-content mb-5px p-10px border-1" transitionStyled={application.transitions.general} backgroundStyled={application.transparent} backgroundHoverStyled={application.theme.primary} colorStyled={application.theme.primary} colorHoverStyled={application.mode.primary} radiusStyled={`${application.settings.appRadius}`}>
          {filteringFor}
        </Button>
        {listOpen && 
          <Dropdown ref={this.setWrapperRef} className="mt-40px position-absolute z-1005 d-flex flex-direction-column text-left outer-shadow" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={application.theme.primaryQuarter} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadius}`}>
            <Button transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} onClick={(e) => {this.toggleUpdateFilter('Author'); this.toggleList();}} className="p-10px top-border-radius text-left" type="button">{author}</Button>
            <Button transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} onClick={(e) => {this.toggleUpdateFilter('Title'); this.toggleList();}} className="p-10px bottom-border-radius text-left" type="button">{title}</Button>
          </Dropdown>
        }
      </div>
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
