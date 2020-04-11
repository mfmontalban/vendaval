import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { getContributionByID, deleteContribution } from '../../actions/staffActions';

import {FormattedMessage, FormattedDate, FormattedTime, FormattedRelative} from 'react-intl';

import Spinner from '../application/common/spinner.js'
import Quill from '../application/common/quillView';

import Div from '../application/common/styled/div';
import H1 from '../application/common/styled/h1';
import H2 from '../application/common/styled/h2';
import Dropdown from '../application/common/styled/dropdown';
import DropdownDivider from '../application/common/styled/dropdownDivider';
import Button from '../application/common/styled/button';
import CommentForm from '../vientos/CommentForm.js';
import CommentFeed from './CommentFeed.js';

// import ReactHtmlParser from 'react-html-parser';
// <div>{ ReactHtmlParser(contributions.contentHTML) }</div>

class Contribution extends Component {
  state = {
    modal: false,
    listOpen: false,
    settingsMenu: false,
    outsideClicked: false,
    files: [],
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getContributionByID(this.props.match.params.id, this.props.admin.id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.admin.id != prevProps.admin.id) {
      this.props.getContributionByID(this.props.match.params.id, this.props.admin.id);
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

  handleScrollToElement = (e) => {
    let element = document.getElementById("content-anchor");
    element.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
  }

  handleScrollToElement2 = (e) => {
    let element = document.getElementById("comment-anchor");
    element.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
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

  toggleDeleteModal = () => {
    this.setState(prevState => ({
      settingsMenu: !prevState.settingsMenu,
    }))
  }

  closeSettingsMenu = () => {
    this.setState(prevState => ({
      settingsMenu: false,
    }))
  }

  onDeleteSubmitClick(id) {
    this.props.deleteContribution(id, this.props.history);
  }

  render() {
    const { listOpen, settingsMenu } = this.state;
    const { admin, application } = this.props;
    const { contribution, loading } = this.props.staff;

    let staff;
    let dashboard;
    let community;
    let profilePicture;

    let view;
    let edit;
    let deleteLink;
    let editContent;

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
      height: '100%',
      width: '100%',
    };

    let contributionContent;

    if (contribution === null || loading) {
      contributionContent = <Spinner />;
    } else {
      if (contribution.profile.avatarSm) {
        profilePicture =
        <Div className="border-radius-circle h-60px w-60px" transitionStyled={application.transitions.general} backgroundStyled={application.theme.primaryQuarter} backgroundHoverStyled={application.theme.primary}>
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
            <Div onClick={this.handleScrollToElement2} className="p-5px clickable post-time-heading noUnderline d-flex flex-direction-row"  transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primaryThree}`} colorHoverStyled={`${application.theme.primary}`}>
              <p>
                {reviewLength.length}
              </p>
              <i className="ml-5px p-10px fa-2x fal fa-comments-alt"></i>
            </Div>
        );
      } else {
        commentsActivity = (
            <Div onClick={this.handleScrollToElement2} className="p-5px clickable post-time-heading noUnderline d-flex flex-direction-row" transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primaryThree}`} colorHoverStyled={`${application.theme.primary}`}>
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

      if (contribution.user._id === admin.id) {
        editContent = 
          <Button onClick={() => this.toggleList()} className="d-flex justify-content-center align-items-center smBtn min-w-max-content mr-25px border-radius-circle clickable" transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} backgroundStyled={`${application.mode.primaryThree}`} backgroundHoverStyled={`${application.theme.primary}`}>
            <i className="fa-2x fal fa-ellipsis-v"></i>
          </Button>
      } else {
        editContent = ('')
      }

      contributionContent = (
        <div className="h-100 position-relative z-1000">
          <Div className="position-absolute w-100 z-900 d-flex justify-content-center min-h-100pc70px max-h-100pc70px">
            <img className="filter-blur object-fit-cover overflow-hidden" alt="banner" src={`/api/staff/files/${contribution.bannerLg}`} />
          </Div>
          <div className="h-100 position-relative d-flex flex-direction-column">
            {/* div is to hide commented out code */}
            <div>
            {/* <div className="z-1000 d-flex position-relative overflow-visible flex-direction-column h-40px w-100">
              <Div className="d-flex justify-content-space-between align-items-center p-20px" backgroundStyled={application.mode.primaryHalf}>
                <div className="w-30 d-flex">
                  <Link className="w-40px ml-25" to={`/${winds}`}>
                    <Div className="d-flex justify-content-center align-items-center smBtn min-w-max-content border-radius-circle" transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} backgroundStyled={`${application.mode.primaryThree}`} backgroundHoverStyled={`${application.theme.primary}`}>
                      <i className='ml-neg3px clickable fa-2x fas fa-chevron-left'></i>
                    </Div>
                  </Link>
                </div>
                <div className="w-30 d-flex justify-content-center">
                  
                  ////Item commented out below belongs here


                </div>
                <div className="w-30 d-flex justify-content-center min-w-max-content">
                  <Div className="p-5px min-w-max-content" radiusStyled={application.settings.appRadius} backgroundStyled={application.mode.primaryThree}>
                    <FormattedRelative value={viento.createdAt} />
                  </Div>
                </div>
              </Div>
              <Div className="d-flex justify-content-center pl-100px pr-100px" heightStyled={application.settings.vientoCoverTitle}>
                <H1 className="text-center p-5px" radiusStyled={application.settings.appRadius} backgroundStyled={application.mode.primaryThree} fontSizeStyled={application.text.heading}>{viento.title}</H1>
              </Div>
              <div className="d-flex justify-content-center pl-100px pr-100px">
                <H2 className="text-center p-5px" radiusStyled={application.settings.appRadius} backgroundStyled={application.mode.primaryThree} fontSizeStyled={application.text.description}>{viento.description}</H2>
              </div>
            </div> */}

            {/* <Div className="min-w-max-content text-center" radiusStyled={application.settings.appRadius} backgroundStyled={application.mode.primaryHalf} fontSizeStyled={application.text.important}>
              <Div className="p-5px" backgroundStyled={application.mode.primaryThree} radiusStyled={application.settings.appRadiusTop}>{viento.type}:</Div>
              <div className="p-5px">{viento.topic}</div>
            </Div> */}
          </div>
            
            <div className="d-flex flex-direction-column min-h-100pc70px">
              <Div className="d-flex position-relative z-1005 justify-content-space-between align-items-center p-20px" backgroundStyled={application.mode.primaryHalf}>
                <div className="w-30 d-flex">
                  <Link className="w-40px ml-25" to={`/${staff}/${dashboard}`}>
                    <Div className="d-flex justify-content-center align-items-center smBtn min-w-max-content border-radius-circle" transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} backgroundStyled={`${application.mode.primaryThree}`} backgroundHoverStyled={`${application.theme.primary}`}>
                      <i className='ml-neg3px clickable fa-2x fas fa-chevron-left'></i>
                    </Div>
                  </Link>
                </div>
                <div className="w-30 d-flex justify-content-center">
                </div>
                <div className="w-30 d-flex position-relative justify-content-center min-w-max-content">
                  {editContent}
                  {listOpen &&
                    <Dropdown ref={this.setWrapperRef} className="clickable position-absolute mt-45px mr-5px z-1005 d-flex flex-direction-column text-right outer-shadow-primary border-1" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} colorStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadius}`}>
                      {/* <Link className="noUnderline clickable" to={`/staff/contribution/edit/${contribution._id}`}>
                        <Div
                          type="button"
                          className="h-max-content p-10px clickable text-left "
                          transitionStyled={application.transitions.general}
                          backgroundStyled={application.mode.primary}
                          backgroundHoverStyled={application.theme.primaryQuarter}
                          colorStyled={application.theme.primary}
                          colorHoverStyled={application.theme.primary}
                          >
                          <i class="fas fa-share-square mr-5px clickable"></i>
                          <FormattedMessage
                            id="staff.share"
                            defaultMessage="Share"
                          />
                        </Div>
                      </Link>
                      <DropdownDivider colorStyled={application.theme.primary} /> */}
                      <Link className="noUnderline clickable" to={`/staff/contribution/edit/${contribution._id}`}>
                        <Div
                          type="button"
                          className="h-max-content p-10px clickable text-left"
                          transitionStyled={application.transitions.general}
                          backgroundStyled={application.mode.primary}
                          backgroundHoverStyled={application.theme.primaryQuarter}
                          colorStyled={application.theme.primary}
                          colorHoverStyled={application.theme.primary}
                          radiusStyled={application.settings.appRadiusTop}
                          >
                          <i className="fas fa-pencil mr-5px clickable" />
                          <FormattedMessage
                            id="staff.edit"
                            defaultMessage="Edit"
                          />
                        </Div>
                      </Link>
                      <Button
                        onClick={() => this.toggleDeleteModal()}
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

              <Div className="d-flex position-relative z-1000 justify-content-center pl-100px pr-100px">
                <H1 className="text-center p-5px h-min-content" radiusStyled={application.settings.appRadius} backgroundStyled={application.mode.primaryThree} fontSizeStyled={application.text.heading}>{contribution.title}</H1>
              </Div>
              <div className="d-flex position-relative z-1000 justify-content-center pl-100px pr-100px">
                <H2 className="text-center p-5px h-min-content" radiusStyled={application.settings.appRadius} backgroundStyled={application.mode.primaryThree} fontSizeStyled={application.text.description}>{contribution.description}</H2>
              </div>
            </div>
            

            <div className="d-flex flex-direction-column min-h-70px">
              <Div className="d-flex position-relative z-1000 flex-direction-row align-items-center position-relative pl-10 h-50px pt-20px pb-20px mt-neg90px" backgroundStyled={application.mode.primaryHalf}>
                <Link className="noUnderline" to={`/${community}/${contribution.profile.handle}`}>
                  <Div colorStyled={application.mode.primary} className="d-flex align-items-center">
                    {profilePicture}
                  </Div>
                </Link>
                <div className="d-flex flex-direction-column ml-10px">
                  <Link className="noUnderline" to={`/${community}/${contribution.profile.handle}`}>
                    <Div className="noUnderline min-w-max-content p-5px" transitionStyled={application.transitions.general} radiusStyled={application.settings.appRadius} backgroundStyled={application.mode.primaryThree} backgroundHoverStyled={application.theme.primary} colorStyled={application.theme.primaryThree} colorHoverStyled={application.mode.primary} fontSizeStyled={application.text.important}>
                      {contribution.user.name}
                      <br />
                    </Div>
                  </Link>
                </div>
              </Div>
              <Div className="d-flex position-relative z-1000 justify-content-space-around position-relative flex-direction-row align-items-center mt-neg45px min-h-70px" heightStyled={application.settings.contributionCoverFooter}>
                <div className="w-33 d-flex justify-content-center clickable">
                  Draft
                </div>
                <div className="w-33 d-flex justify-content-center clickable">
                  <Div name="infoSection" className="ml-auto mr-auto max-w-min-content p-1px5px call-to-action landingMotto" onClick={this.handleScrollToElement} transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primaryHalf}`} colorHoverStyled={`${application.theme.primary}`}>
                    <i className="ml-auto mr-auto fal fa-chevron-down fa-2x"></i>
                  </Div>
                </div>
                <div className="w-33 d-flex justify-content-center clickable">
                  {commentsActivity}
                </div>
              </Div>
            </div>
          
            <Div id="content-anchor" class="w-100" minHeightStyled={`${application.settings.contentHeight}`}>
              <Quill contributions={contribution.content} />
            </Div>
            <div id="comment-anchor" style={style}>
              <CommentFeed vientoId={contribution._id} comments={contribution.comments} />
              <CommentForm vientoId={contribution._id} category={'public'} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <Div className="h-100 bottom-outer-shadow scrollbar-width-none" backgroundStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadiusBottom}`} colorStyled={`${application.theme.primary}`}>
        <Div onClick={() => this.closeSettingsMenu()} className={(settingsMenu === true ? 'z-1250 visible' : 'z-neg1 invisible') + ' position-fixed h-100vh w-100vw bottom-0 left-0 overlay'} transitionStyled={settingsMenu === true ? `${application.transitions.settingsIn}`: `${application.transitions.settingsOut}`} />

        <Div className={(settingsMenu === true ? 'z-1500 visible modal2' : 'z-neg1 invisible') + ' position-fixed bottom-0'} transitionStyled={settingsMenu === true ? `${application.transitions.settingsIn}`: `${application.transitions.settingsOut}`} activeStyled={this.state.settingsMenu} heightStyled={`${application.settings.heightDeleteModal}`} backgroundStyled={`${application.mode.primary}`} widthStyled={`${application.settings.widthSettings}`} marginLeftStyled={`${application.settings.marginLeftSettings}`} marginRightStyled={`${application.settings.marginRightSettings}`} radiusStyled={`${application.settings.appRadius}`}>
          <Div className="h-20 d-flex align-items-center top-border-radius" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.theme.primaryThree}`} colorStyled={`${application.mode.primary}`} borderBottomStyled={`${application.mode.primary}`}>
            <div className="ml-10px text-x-large w-50 text-left">
              <FormattedMessage
                id="modal.confirmTitle"
                defaultMessage="Confirm"
              />
            </div>
            <div className="h-40px w-50 d-flex align-items-center justify-content-flex-end">
              <Button onClick={() => this.closeSettingsMenu()} className="mr-10px" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.transparent}`} colorStyled={`${application.mode.primaryQuarter}`} colorHoverStyled={`${application.mode.primary}`}>
                <i className="fas fa-times fa-2x clickable" />
              </Button>
            </div>
          </Div>

          <Div className="h-50" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`}>
            <Div className="p-10px text-medium" transitionStyled={`${application.settings.appTransition}`} backgroundStyled={`${application.mode.primary}`}>
              <FormattedMessage
                id="modal.confirmMessage"
                defaultMessage="Are you sure you would like to delete this item?"
              />
            </Div>
          </Div>

          <Div className="h-30 d-flex justify-content-center align-items-center bottom-border-radius" transitionStyled={`${application.transitions.general}`}  backgroundStyled={`${application.theme.primaryThree}`} colorStyled={`${application.mode.primary}`} borderTopStyled={`${application.mode.primary}`}>
            <Button onClick={() => {this.closeSettingsMenu(); this.onDeleteSubmitClick(contribution._id);}} className="h-40px p-10px mr-10px clickable text-bold text-large" transitionStyled={`${application.transitions.general}`} backgroundStyled={`${application.mode.primary}`} backgroundHoverStyled={`${application.mode.primaryHover}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.theme.primary}`} radiusStyled={`${application.settings.appRadius}`}>
              <FormattedMessage
                id="modal.delete"
                defaultMessage="Delete"
              />
            </Button>
          </Div>
        </Div>
        {contributionContent}
      </Div>
    );
  }
} 

Contribution.propTypes = {
  getContributionByID: PropTypes.func.isRequired,
  deleteContribution: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
  staff: state.staff
});

export default connect(mapStateToProps, { getContributionByID, deleteContribution })(withRouter(Contribution));
