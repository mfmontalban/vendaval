import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateStatus } from '../../actions/staffActions';

import {FormattedMessage} from 'react-intl';

import Button from '../application/main/common/styled/button'
import Dropdown from '../application/main/common/styled/dropdown'

class LiveDropDown extends Component {
  constructor(props){
    super(props)
    this.state = {
      outsideClicked: false,
      listOpen: false,
      status: "",
    }
  }
  
  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  componentDidMount() {
    if(this.props.application.language=='es'){
      if (this.props.contribution.status=="Live") {
        this.setState({
          status: "Vivo"
        })
      } else {
        this.setState({
          status: "Borrador"
        })
      }
    } else {
      if (this.props.contribution.status=="Live") {
        this.setState({
          status: "Live"
        })
      } else {
        this.setState({
          status: "Draft"
        })
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

  render(){
    const { admin, application, contribution } = this.props
    const { listOpen, status } = this.state

    let draft;
    let live;
    let statusSection;

    if (application.language = "es") {
      draft = "Borrador";
      live = "Vivo";
    } else {
      draft = "Draft";
      live = "Live";
    }

    if (admin.staff == "reviewer" || admin.staff == "manager" || admin.staff == "webmaster") {
      statusSection = (
        <Button onClick={() => this.toggleList()} className="max-w-content p-10px" transitionStyled={application.transitions.general} backgroundStyled={application.transparent} colorStyled={application.theme.primary} backgroundHoverStyled={application.theme.primary} colorHoverStyled={application.mode.primary} radiusStyled={`${application.settings.appRadius}`}>
          {status}
        </Button>
        )
    } else {
      statusSection = (
        `${status}`
      )
    }


    return(
      <div className="min-w-25-app d-flex justify-content-center">
        {statusSection}
        {listOpen && 
          <Dropdown ref={this.setWrapperRef} className="mt-40px position-absolute z-1005 d-flex flex-direction-column text-left outer-shadow" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadius}`}>
            <Button transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} onClick={(e) => {this.props.updateStatus(contribution._id, {'status': 'Draft'}); this.toggleList(); this.setState({status: draft})}} className="p-10px top-border-radius text-left" type="button">{draft}</Button>
            <Button transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} onClick={(e) => {this.props.updateStatus(contribution._id, {'status': 'Live'}); this.toggleList(); this.setState({status: live})}} className="p-10px bottom-border-radius text-left" type="button">{live}</Button>
          </Dropdown>
        }
      </div>
    )
  }
}

LiveDropDown.propTypes = {
  updateStatus: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  contribution: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application
});

export default connect(mapStateToProps, { updateStatus })(withRouter(LiveDropDown));
