import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteContribution } from '../../actions/staffActions';

import {FormattedMessage, FormattedDate, FormattedTime} from 'react-intl';

import Div from '../application/main/common/styled/div';
import Button from '../application/main/common/styled/button';
import Dropdown from '../application/main/common/styled/dropdown';
import DropdownDivider from '../application/main/common/styled/dropdownDivider';

class ContributionItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      outsideClicked: false,
    }
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
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

  toggleList(){
    if (this.state.outsideClicked === false) {
      this.setState(prevState => ({
        listOpen: !prevState.listOpen,
        outsideClicked: true,
      }))
    }
  }

  onDeleteClick(id) {
    // this.props.deleteContribution(id);
  }

  onDeleteSubmitClick(id) {
    this.props.deleteContribution(id);
  }

  render() {
    const { listOpen } = this.state;
    const { application, contribution } = this.props;

    let community;
    
    let view;
    let edit;
    let deleteLink;

    if (application.language === 'es') {
      community = 'communidad';
      view = 'Ver';
      edit = 'Editar';
      deleteLink = 'Tirar';
    } else {
      community = 'community';
      view = 'View';
      edit = 'Edit';
      deleteLink = 'Delete';
    }

    return (
        <Div className="d-flex flex-direction-row text-center text-center align-items-center" transitionStyled={application.transitions.general} backgroundHoverStyled={application.theme.primaryEighter}>
          <div className="d-flex justify-content-center min-w-25-app p-10px">
            <Button onClick={() => this.toggleList()} className="w-max-content p-6px13px border-radius-circle" transitionStyled={application.transitions.general} backgroundStyled={application.transparent} backgroundHoverStyled={application.theme.primary} colorStyled={application.theme.primary} colorHoverStyled={application.mode.primary}>
              <i className="fal fa-ellipsis-v"></i>
            </Button>
          </div>
          {listOpen &&
              <Dropdown ref={this.setWrapperRef} className="position-absolute mt-70px ml-13vw z-1005 d-flex flex-direction-column text-right outer-shadow" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadius}`}>
                <Link className="noUnderline" to={`/staff/contribution/view/${contribution._id}`}>
                  <Div
                    onClick={this.onDeleteClick.bind(this, contribution.id)}
                    type="button"
                    className="h-max-content p-10px clickable text-left"
                    transitionStyled={application.transitions.general}
                    backgroundStyled={application.mode.primary}
                    backgroundHoverStyled={application.theme.primaryQuarter}
                    colorStyled={application.theme.primary}
                    colorHoverStyled={application.theme.primary}
                    radiusStyled={application.settings.appRadiusTop}
                  >
                    <i className="fas fa-search" />
                    <FormattedMessage
                      id="staff.view"
                      defaultMessage="View"
                    />
                  </Div>
                </Link>
                <Link className="noUnderline" to={`/staff/contribution/edit/${contribution._id}`}>
                  <Div
                    onClick={this.onDeleteClick.bind(this, contribution.id)}
                    type="button"
                    className="h-max-content p-10px clickable text-left"
                    transitionStyled={application.transitions.general}
                    backgroundStyled={application.mode.primary}
                    backgroundHoverStyled={application.theme.primaryQuarter}
                    colorStyled={application.theme.primary}
                    colorHoverStyled={application.theme.primary}
                    >
                    <i className="fas fa-pencil" />
                    <FormattedMessage
                      id="staff.edit"
                      defaultMessage="Edit"
                    />
                  </Div>
                </Link>
                <DropdownDivider colorStyled={application.theme.primary} />
                <Button
                  onClick={this.onDeleteClick.bind(this, contribution.id)}
                  type="button"
                  className="h-max-content p-10px clickable text-left"
                  transitionStyled={application.transitions.general}
                  backgroundStyled={application.mode.primary}
                  backgroundHoverStyled={application.theme.primaryQuarter}
                  colorStyled={application.theme.primary}
                  colorHoverStyled={application.theme.primary}
                  radiusStyled={application.settings.appRadiusBottom}
                >
                  <i className="fas fa-times" />
                  <FormattedMessage
                    id="staff.delete"
                    defaultMessage="Delete"
                  />
                </Button>
              </Dropdown>
          }
          <Div className="min-w-25-app p-10px">
            <FormattedMessage
              id={('staff.' + `${contribution.status}`)}
            />
          </Div>
          <Div className="min-w-25-app p-10px tableTitleFix">
            <FormattedMessage
              id="viento.time_since_updated"
              defaultMessage={`{formattedLastUpdatedDate} {formattedLastUpdatedTime}`}
              values={{
                  formattedLastUpdatedDate: (
                    <FormattedDate value={contribution.updatedAt} />
                  ),
                  formattedLastUpdatedTime: (
                    <FormattedTime value={contribution.updatedAt} />
                  ),
              }}
            />
          </Div>
          <Div className="min-w-25-app p-10px">
            <Link className="noUnderline" to={`/staff/contribution/view/${contribution._id}`}>
              <Div className="p-5px border-bottom-1 ml-auto mr-auto text-overflow-ellipsis overflow-hidden" transitionStyled={application.transitions.general} colorStyled={application.theme.primary} borderBottomStyled={application.transparent} borderBottomHoverStyled={application.theme.primary}>
                {contribution.title}
              </Div>
            </Link>
          </Div>
        </Div>
    );
  }
}

ContributionItem.propTypes = {
  deleteContribution: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired,
  contribution: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  application: state.application,
  contributions: state.contribution
});

export default connect(mapStateToProps, { deleteContribution })(ContributionItem);
