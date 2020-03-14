import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {FormattedMessage} from 'react-intl';

import Button from '../application/common/styled/button'
import Dropdown from '../application/common/dropdown'

// React.createContext accepts a defaultValue as the first param
const MyContext = React.createContext(); 


class SearchCategory extends Component {
  constructor(props){
    super(props)
    this.state = {
      outsideClicked: false,
      listOpen: false,
      filteringFor: ""
    }
  }
  
  static contextType = MyContext;
  
  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  componentDidMount = () => {

    if (this.props.application.language == "es") {
      if (this.state.filteringFor) {
        //Do nothing
      } else {
        this.setState(prevState => ({
          filteringFor: "Crítico",
        }))
      }
    } else {
      if (this.state.filteringFor) {
        //Do nothing
      } else {
        this.setState(prevState => ({
          filteringFor: "Reviewer",
        }))
      }
    }
  }

  componentDidUpdate = (prevProps, prevState) => {

    if (this.props.application.language !== prevProps.application.language) {
      if (this.props.application.language == "es") {
        if (this.state.filteringFor == "Reviewer") {
          this.setState({
            filteringFor: "Crítico",
          });
        } else if (this.state.filteringFor == "Author") {
          this.setState({
            filteringFor: "Autor",
          });
        } else if (this.state.filteringFor == "Status") {
          this.setState({
            filteringFor: "Estado",
          });
        } else if (this.state.filteringFor == "Title") {
          this.setState({
            filteringFor: "Titulo",
          });
        }
      } else {
        if (this.state.filteringFor == "Reviewer") {
          this.setState({
            filteringFor: "Reviewer",
          });
        } else if (this.state.filteringFor == "Author") {
          this.setState({
            filteringFor: "Author",
          });
        } else if (this.state.filteringFor == "Status") {
          this.setState({
            filteringFor: "Status",
          });
        } else if (this.state.filteringFor == "Title") {
          this.setState({
            filteringFor: "Title",
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
      if (selected == "Reviewer") {
        this.setState(() => ({
          filteringFor: "Crítico",
        }))
        this.props.onFilterItems(selected);
      } else if (selected === "Author") {
        this.setState(() => ({
          filteringFor: "Autor",
        }))
        this.props.onFilterItems(selected);
      } else if (selected === "Status") {
        this.setState(() => ({
          filteringFor: "Estado",
        }))
        this.props.onFilterItems(selected);
      } else if (selected === "Title") {
        this.setState(() => ({
          filteringFor: "Titulo",
        }))
        this.props.onFilterItems(selected);
      }
    } else {
      if (selected == "Reviewer") {
        this.setState(() => ({
          filteringFor: "Reviewer",
        }))
        this.props.onFilterItems(selected);
      } else if (selected === "Author") {
        this.setState(() => ({
          filteringFor: "Author",
        }))
        this.props.onFilterItems(selected);
      } else if (selected === "Status") {
        this.setState(() => ({
          filteringFor: "Status",
        }))
        this.props.onFilterItems(selected);
      } else if (selected === "Title") {
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

    let reviewer;
    let author;
    let status;
    let title;

    if (application.language == "es") {
      reviewer = "Crítico"
      author = "Autor"
      status = "Estado"
      title = "Titulo"
    } else {
      reviewer = "Reviewer"
      author = "Author"
      status = "Status"
      title = "Title"
    }

    return(
      <Dropdown
        alignEdge="left"
        phrase={this.props.filterState}
        
      >
        <Button transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={application.theme.primary} radiusStyled={`${application.settings.appRadiusTop}`} onClick={(e) => {this.toggleUpdateFilter('Reviewer'); this.context.toggleList();}} className="p-10px text-left" type="button">{reviewer}</Button>
        <Button transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={application.theme.primary} onClick={(e) => {this.toggleUpdateFilter('Author'); this.context.toggleList();}} className="p-10px text-left" type="button">{author}</Button>
        <Button transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={application.theme.primary} onClick={(e) => {this.toggleUpdateFilter('Status'); this.context.toggleList();}} className="p-10px text-left" type="button">{status}</Button>
        <Button transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} colorStyled={application.theme.primary} radiusStyled={`${application.settings.appRadiusBottom}`} onClick={(e) => {this.toggleUpdateFilter('Title'); this.context.toggleList();}} className="p-10px bottom-border-radius text-left" type="button">{title}</Button>
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
