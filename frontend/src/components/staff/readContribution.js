import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { getContributionByID, deleteContribution } from '../../actions/staffActions';

import {FormattedMessage, FormattedDate, FormattedTime, FormattedRelative} from 'react-intl';

import Spinner from '../application/main/common/spinner.js'
import { Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import Quill from '../application/main/common/quillView';

import Div from '../application/main/common/styled/div';
import H1 from '../application/main/common/styled/h1';
import H2 from '../application/main/common/styled/h2';
import Dropdown from '../application/main/common/styled/dropdown';
import DropdownDivider from '../application/main/common/styled/dropdownDivider';
import Button from '../application/main/common/styled/button';
import CommentForm from '../vientos/CommentForm.js';
import CommentFeed from './CommentFeed.js';

// import ReactHtmlParser from 'react-html-parser';
// <div>{ ReactHtmlParser(contributions.contentHTML) }</div>

class Contribution extends Component {
  state = {
    modal: false,
    listOpen: false,
    outsideClicked: false,
    files: [],
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getContributionByID(this.props.match.params.id);
    }
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
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

  handleScrollToContent = (e) => {
    let element = document.getElementById("content-anchor");
    element.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
  }

  handleScrollToElement = (e) => {
    let element = document.getElementById("comment-anchor");
    element.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
  }

  toggleList = () => {
    if (this.state.outsideClicked === false) {
      this.setState(prevState => ({
        listOpen: !prevState.listOpen,
        outsideClicked: true,
      }))
    }
  }

  toggle(id) {
    this.setState({
      modal: !this.state.modal
    });
  }

  onDeleteSubmitClick(id) {
    this.props.deleteContribution(id, this.props.history);
  }

  render() {
    const { listOpen } = this.state;
    const { application } = this.props;
    const { contribution, loading } = this.props.staff;

    let staff;
    let dashboard;
    let community;
    let profilePicture;

    let view;
    let edit;
    let deleteLink;

    let commentsActivity;

    if (application.language === 'es') {
      community = 'communidad';
      view = 'Ver';
      edit = 'Editar';
      deleteLink = 'Tirar';
      staff = 'personal';
      dashboard = 'tablero';
      community = 'communidad';
    } else {
      community = 'community';
      view = 'View';
      edit = 'Edit';
      deleteLink = 'Delete';
      staff = 'staff';
      dashboard = 'dashboard';
      community = 'community';
    }

    const style = {
      marginTop: 'calc(100vh - 50px - 10px - 70px)', //related to main content scroll container #1
      height: '1px',
      width: '100%',
      position: 'absolute',
    };

    let contributionContent;

    if (contribution === null || loading) {
      contributionContent = <Spinner />;
    } else {
      if (contribution.profile.avatarSm) {
        profilePicture =
        <Div className="border-radius-circle" transitionStyled={application.transitions.general} backgroundStyled={application.theme.primaryQuarter} backgroundHoverStyled={application.theme.primary}>
          <img
            className="outer-shadow-double border-radius-circle h-50px w-50px object-fit-cover p-5px"
            src={`/api/users/files/${contribution.profile.avatarSm}`}
            alt="Profile Picture"
          />
        </Div>
      } else {
        profilePicture = 
        <i className="fas fa-user fa-5x h-50px w-50px d-flex align-items-center" />
      }

      let reviewLength;

      reviewLength = (
        contribution.comments.filter(comment => {
          if (comment !== '' || null ) {
            let commentMatch = comment.category.includes('review');
            return commentMatch;
          }
          return comment;
        })
      );

      if (contribution.comments.length > 0) {
        commentsActivity = (
            <Div onClick={this.handleScrollToElement} className="p-5px clickable post-time-heading noUnderline d-flex flex-direction-row"  transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primaryThree}`} colorHoverStyled={`${application.theme.primary}`}>
              <p>
                {reviewLength.length}
              </p>
              <i className="ml-5px p-10px fa-2x fal fa-comments-alt"></i>
            </Div>
        );
      } else {
        commentsActivity = (
            <Div onClick={this.handleScrollToElement} className="p-5px clickable post-time-heading noUnderline d-flex flex-direction-row" transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primaryThree}`} colorHoverStyled={`${application.theme.primary}`}>
              <p>0</p>
              <i className="ml-5px p-10px fa-2x fal fa-comments-alt"></i>
            </Div>
        );
      }

                  // <Div className="mt-neg5px ml-10px p-5px min-w-max-content d-flex flex-direction-row" colorStyled={application.theme.primaryThree}>
                  //   <FormattedMessage
                  //     id="staff.published"
                  //     defaultMessage="published"
                  //   />
                  //   <div className="w-5px"></div>
                  //   <FormattedMessage
                  //     id="viento.time_since_updated"
                  //     defaultMessage={`{formattedLastUpdatedDate} {formattedLastUpdatedTime}`}
                  //     values={{
                  //         formattedLastUpdatedDate: (
                  //           <FormattedDate value={contribution.updatedAt} />
                  //         ),
                  //         formattedLastUpdatedTime: (
                  //           <FormattedTime value={contribution.updatedAt} />
                  //         ),
                  //     }}
                  //   />
                  // </Div>

      contributionContent = (
        <div className="h-100 position-relative">
          <div className="z-1000 d-flex position-relative overflow-visible flex-direction-column h-40px w-100">
            <Div className="d-flex justify-content-space-between align-items-center p-20px" backgroundStyled={application.mode.primaryHalf}>
              <div className="w-30 d-flex">
                <Link className="w-40px ml-25" to={`/${staff}/${dashboard}`}>
                  <Div className="d-flex justify-content-center align-items-center h-40px w-40px min-w-max-content border-radius-circle" transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} backgroundStyled={`${application.mode.primaryThree}`} backgroundHoverStyled={`${application.theme.primary}`}>
                    <i className='ml-neg3px clickable fa-2x fas fa-chevron-left'></i>
                  </Div>
                </Link>
              </div>
              <div className="w-30 d-flex justify-content-center">
                {/* <Div className="min-w-max-content text-center" radiusStyled={application.settings.appRadius} backgroundStyled={application.mode.primaryHalf} fontSizeStyled={application.text.important}>
                  <Div className="p-5px" backgroundStyled={application.mode.primaryThree} radiusStyled={application.settings.appRadiusTop}>{contribution.type}:</Div>
                  <div className="p-5px">{contribution.topic}</div>
                </Div> */}
              </div>
              <div className="w-30 d-flex justify-content-flex-end">
                <Button onClick={() => this.toggleList()} className="d-flex justify-content-center align-items-center h-40px w-40px min-w-max-content mr-25px border-radius-circle clickable" transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} backgroundStyled={`${application.mode.primaryThree}`} backgroundHoverStyled={`${application.theme.primary}`}>
                  <i className="fa-2x fal fa-ellipsis-v"></i>
                </Button>
                {listOpen &&
                    <Dropdown ref={this.setWrapperRef} className="position-absolute mt-45px ml-neg30px z-1005 d-flex flex-direction-column text-right outer-shadow" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadius}`}>
                      <Link className="noUnderline" to={`/staff/contribution/view/${contribution._id}`}>
                        <Div
                          // onClick={this.onDeleteClick.bind(this, contribution.id)}
                          type="button"
                          className="h-max-content p-10px clickable text-left"
                          transitionStyled={application.transitions.general}
                          backgroundStyled={application.mode.primary}
                          backgroundHoverStyled={application.theme.primaryQuarter}
                          colorStyled={application.theme.primary}
                          colorHoverStyled={application.theme.primary}
                          radiusStyled={application.settings.appRadiusTop}
                        >
                          <i className="fas fa-search mr-5px" />
                          <FormattedMessage
                            id="staff.view"
                            defaultMessage="View"
                          />
                        </Div>
                      </Link>
                      <Link className="noUnderline" to={`/staff/contribution/edit/${contribution._id}`}>
                        <Div
                          // onClick={this.onDeleteClick.bind(this, contribution.id)}
                          type="button"
                          className="h-max-content p-10px clickable text-left"
                          transitionStyled={application.transitions.general}
                          backgroundStyled={application.mode.primary}
                          backgroundHoverStyled={application.theme.primaryQuarter}
                          colorStyled={application.theme.primary}
                          colorHoverStyled={application.theme.primary}
                          >
                          <i className="fas fa-pencil mr-5px" />
                          <FormattedMessage
                            id="staff.edit"
                            defaultMessage="Edit"
                          />
                        </Div>
                      </Link>
                      <DropdownDivider colorStyled={application.theme.primary} />
                      <Button
                        // onClick={this.onDeleteClick.bind(this, contribution.id)}
                        type="button"
                        className="h-max-content p-10px clickable text-left"
                        transitionStyled={application.transitions.general}
                        backgroundStyled={application.mode.primary}
                        backgroundHoverStyled={application.theme.primaryQuarter}
                        colorStyled={application.theme.primary}
                        colorHoverStyled={application.theme.primary}
                        radiusStyled={application.settings.appRadiusBottom}
                      >
                        <i className="fas fa-times mr-5px" />
                        <FormattedMessage
                          id="staff.delete"
                          defaultMessage="Delete"
                        />
                      </Button>
                    </Dropdown>
                }
              </div>
            </Div>
            <Div className="d-flex justify-content-center pl-100px pr-100px" heightStyled={application.settings.vientoCoverTitle}>
              <H1 className="text-center p-5px" radiusStyled={application.settings.appRadius} backgroundStyled={application.mode.primaryThree} fontSizeStyled={application.text.heading}>{contribution.title}</H1>
            </Div>
            <div className="d-flex justify-content-center pl-100px pr-100px">
              <H2 className="text-center p-5px" radiusStyled={application.settings.appRadius} backgroundStyled={application.mode.primaryThree} fontSizeStyled={application.text.description}>{contribution.description}</H2>
            </div>
          </div>
          <Div className="z-900 d-flex justify-content-center overflow-hidden mt-neg40px" heightStyled={application.settings.vientoCoverBanner}>
            <img className="filter-blur min-w-100 object-fit-cover" alt="banner" src={`/api/staff/files/${contribution.bannerLg}`} />
          </Div>
          <div className="position-relative d-flex justify-content-center">
            <Div name="infoSection" onClick={this.handleScrollToContent} className="max-w-content text-center call-to-action d-flex justify-content-center align-items-center h-48px mt-neg170px border-bottom-0 border-radius-circle" transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} backgroundStyled={`${application.mode.primaryThree}`} backgroundHoverStyled={`${application.theme.primary}`}>
              <i className='clickable p-10px fa-2x fas fa-arrow-alt-down'></i>
            </Div>
          </div>
          <Div className="d-flex flex-direction-row justify-content-space-between align-items-center position-relative pl-10 pr-10 h-50px pt-20px pb-20px mt-neg90px" backgroundStyled={application.mode.primaryHalf}>
            <div>
              <div className="d-flex flex-direction-row align-items-center">
                <div>
                  <Link className="noUnderline" to={`/${community}/${contribution.profile.handle}`}>
                    <Div colorStyled={application.mode.primary} className="d-flex justify-content-start align-items-center">
                      {profilePicture}
                    </Div>
                  </Link>
                </div>
                <div className="d-flex flex-direction-column" >
                  <Link className="noUnderline" to={`/${community}/${contribution.profile.handle}`}>
                    <Div className="noUnderline w-100 ml-10px p-5px flex-wrap" transitionStyled={application.transitions.general} radiusStyled={application.settings.appRadius} backgroundStyled={application.mode.primaryThree} backgroundHoverStyled={application.theme.primary} colorStyled={application.theme.primaryThree} colorHoverStyled={application.mode.primary} fontSizeStyled={application.text.important}>
                      {contribution.user.name}
                    <br />
                    </Div>
                  </Link>
                </div>
              </div>
            </div>
            
          </Div>
          <Div className="d-flex justify-content-space-around position-relative flex-direction-row align-items-center mt-neg45px min-h-70px text-center" heightStyled={application.settings.vientoCoverFooter}>
            <div className="w-33 clickable">
              Like
            </div>
            <div className="w-33 clickable">
              Share
            </div>
            <div className="w-33 clickable">
              {commentsActivity}
            </div>
          </Div>
          <div id="content-anchor" style={style}>
          </div>
          <Quill contributions={contribution.content} />
          <div id="comment-anchor" style={style}>
          </div>
          <CommentFeed vientoId={contribution._id} comments={contribution.comments} />
          <CommentForm vientoId={contribution._id} category={'review'} />
        </div>
      );
    }

    return (
      <Div className="scroll-container bottom-outer-shadow ml-10px mr-10px pt-70px scrollbar-width-none" heightStyled={`${application.settings.heightHero}`} backgroundStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadiusBottom}`} colorStyled={`${application.theme.primary}`}>
        {contributionContent}
      </Div>
    );
  }
}

Contribution.propTypes = {
  getContributionByID: PropTypes.func.isRequired,
  deleteContribution: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  application: state.application,
  staff: state.staff
});

export default connect(mapStateToProps, { getContributionByID, deleteContribution })(withRouter(Contribution));
