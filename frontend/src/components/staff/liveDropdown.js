import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateStatus } from '../../actions/staffActions';

import {FormattedMessage} from 'react-intl';

import Button from '../application/common/styled/button'
import Dropdown from '../application/common/dropdown'

class LiveDropDown extends Component {
  constructor(props){
    super(props)
    this.state = {
      outsideClicked: false,
      listOpen: false,
    }
  }

  componentDidMount = () => {
    let currentState;
    let draft;
    let live;

    if (this.props.contribution.status == "Draft") {

      if (this.props.application.language == "es") {
        this.setState({
          currentState: "Borrador",
          draft: "Borrador",
          live: "Vivo"
        });
      } else {
        this.setState({
          currentState: "Draft",
          draft: "Draft",
          live: "Live"
        });
      }
    } else {
      if (this.props.application.language == "es") {
        this.setState({
          currentState: "Vivo",
          draft: "Borrador",
          live: "Vivo"
        });
      } else {
        this.setState({
          currentState: "Live",
          draft: "Draft",
          live: "Live"
        });
      }
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    let currentState;
    let draft;
    let live;

    if (this.props.application.language !== prevProps.application.language) {
      if (this.props.application.language == "es") {
        if (this.props.contribution.status == "Draft") {
          this.setState({
            currentState: "Borrador",
          });
        } else {
          this.setState({
            currentState: "Vivo",
          });
        }
        this.setState({
          draft: "Borrador",
          live: "Vivo"
        });
      } else {
        if (this.props.contribution.status == "Draft") {
          this.setState({
            currentState: "Draft",
          });
        } else {
          this.setState({
            currentState: "Live",
          });
        }
        this.setState({
          draft: "Draft",
          live: "Live"
        });
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
    const { listOpen, currentState, draft, live } = this.state

    let statusSection;

    if (admin.staff == "reviewer" || admin.staff == "manager" || admin.staff == "webmaster") {
      statusSection = (
        <Button onClick={() => this.toggleList()} className="max-w-content" transitionStyled={application.transitions.general} backgroundStyled={application.transparent} colorStyled={application.theme.primary} colorHoverStyled={application.mode.primary}>
          {currentState}
        </Button>
        )
    } else {
      statusSection = (
        `${currentState}`
      )
    }


    return(
      <div className="min-w-25-app d-flex position-relative justify-content-center align-items-center p-10px">
        <Dropdown
          alignEdge="right"
          phrase={currentState}
        >
          <Button transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} colorStyled={`${application.theme.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} radiusStyled={application.settings.appRadiusTop} onClick={(e) => {this.props.updateStatus(contribution._id, {'status': 'Draft', 'staff': admin.staff}); this.toggleList();}} className="p-10px text-left" type="button">{draft}</Button>
          <Button transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} colorStyled={`${application.theme.primary}`} backgroundHoverStyled={`${application.theme.primaryQuarter}`} radiusStyled={application.settings.appRadiusBottom} onClick={(e) => {this.props.updateStatus(contribution._id, {'status': 'Live', 'staff': admin.staff}); this.toggleList();}} className="p-10px text-left" type="button">{live}</Button>
        </Dropdown>
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
  application: state.application,
});

export default connect(mapStateToProps, { updateStatus })(withRouter(LiveDropDown));
