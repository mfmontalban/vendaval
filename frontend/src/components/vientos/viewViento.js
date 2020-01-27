import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { getLiveVientoByID } from '../../actions/vientosActions';

import {FormattedMessage, FormattedHTMLMessage, FormattedRelative} from 'react-intl';

import Spinner from '../application/main/common/spinner.js';
import Div from '../application/main/common/styled/div';
import Quill from '../application/main/common/quillView';
import BackArrow from '../application/main/common/backArrow';
import DropdownDivider from '../application/main/common/styled/dropdownDivider';
import H1 from '../application/main/common/styled/h1';
import H2 from '../application/main/common/styled/h2';
import SVG from '../application/main/common/styled/svg';
import CommentForm from './CommentForm.js';
import CommentFeed from './CommentFeed.js';

import ProfileBorder from './ProfileBorder.js';

class Contribution extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getLiveVientoByID(this.props.match.params.id);
    }
  }

  // handleScrollToElement = (e) => {
    
  //   if (this.state.anchorTool == "mt-70px") {
  //     this.setState({
  //       anchorTool: ""
  //     }, () => {
  //       let element = document.getElementById("content-anchor");
  //       element.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
  //       if (window.innerWidth < 480) {
  //         window.scrollBy(0, -20);
  //         this.setState({
  //           anchorTool: "mt-70px"
  //         });
  //       } else if (window.innerWidth < 700) {
  //         window.scrollBy(0, -20);
  //         this.setState({
  //           anchorTool: "mt-70px"
  //         });
  //       } else if (window.innerWidth < 920) {
  //         window.scrollBy(0, -20);
  //         this.setState({
  //           anchorTool: "mt-70px"
  //         });
  //       }
  //     });
  //   } else {
  //     let element = document.getElementById("content-anchor");
  //     element.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
  //     if (window.innerWidth < 480) {
  //       window.scrollBy(0, -20);
  //       this.setState({
  //         anchorTool: "mt-70px"
  //       });
  //     } else if (window.innerWidth < 700) {
  //       window.scrollBy(0, -20);
  //       this.setState({
  //         anchorTool: "mt-70px"
  //       });
  //     } else if (window.innerWidth < 920) {
  //       window.scrollBy(0, -20);
  //       this.setState({
  //         anchorTool: "mt-70px"
  //       });
  //     }
  //   }
  // }

  handleScrollToElement = (e) => {
    let element = document.getElementById("content-anchor");
    element.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
  }
  
  handleScrollToElement2 = (e) => {
    let element = document.getElementById("comment-anchor");
    element.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
  }

  voteUp = (category, id, e) => {
    let packet = {};
    packet.category = category;
    packet.id = id;
    
    this.props.sendVoteUp(packet);
  }

  voteDown = (category, id, e) => {
    let packet = {};
    packet.category = category;
    packet.id = id;
    
    this.props.sendVoteDown(packet);
  }

  render() {
    const { viento, loading } = this.props.vientos;
    const { admin, application } = this.props;

    let community;
    let winds;
    
    let positiveVote;
    let negativeVote;
    let likesActivity;
    let commentsActivity;
    let vientoContent;
    let vientoComments;
    let profilePicture;

    if (application.language === 'es') {
      community = 'communidad';
      winds = 'vientos';
    } else {
      community = 'community';
      winds = 'winds';
    }

    const style = {
      height: '100%',
      width: '100%',
    };


    if (viento === null || loading) {
      vientoContent = <Spinner />;
    } else {

      let publicLength;

      publicLength = (
        viento.comments.filter(comment => {
          if (comment !== '' || null ) {
            let commentMatch = comment.category.includes('public');
            return commentMatch;
          }
          return comment;
        })
      );

      if (viento.profile.avatarSm) {
        profilePicture =
        <Div className="border-radius-circle h-60px w-60px" transitionStyled={application.transitions.general} backgroundStyled={application.theme.primaryQuarter} backgroundHoverStyled={application.theme.primary}>
          <img
            className="outer-shadow-double border-radius-circle h-50px w-50px object-fit-cover p-5px"
            src={`/api/users/files/${viento.profile.avatarSm}`}
            alt="Profile Picture"
          />
        </Div>
      } else {
        profilePicture = 
        <i className="fas fa-user fa-5x h-50px w-50px d-flex align-items-center" />
      }

      if (viento.likesUp.length > 0) {
        if (viento.likesUp.filter(like => like.user.toString() === admin.id)) {
          positiveVote = <Div transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.theme.primary}`}><i className='mr-5px clickable p-10px fa-2x fas fa-arrow-alt-up'></i></Div>;
        }
      } else {
        positiveVote = <Div transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primaryHalf}`} colorHoverStyled={`${application.theme.primary}`}><i className='mr-5px clickable p-10px fa-2x fas fa-arrow-alt-up'></i></Div>;
      }
  
      if (viento.likesDown.length > 0) {
        if (viento.likesDown.filter(like => like.user.toString() === admin.id)) {
          negativeVote = <Div transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.theme.primary}`}><i className='clickable p-10px fa-2x fas fa-arrow-alt-down'></i></Div>
        }
      } else {
        negativeVote = <Div transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primaryHalf}`} colorHoverStyled={`${application.theme.primary}`}><i className='clickable p-10px fa-2x fas fa-arrow-alt-down'></i></Div>
      }
  
      if (viento.likesUp || viento.likesDown) {
        if (admin.handle) {
          likesActivity = (
            <div className="post-time-heading d-flex flex-direction-row align-items-center p-5px">
              <div onClick={(e) => this.voteUp('likesUp', viento._id, e)}>
                {positiveVote}
              </div>
      
              <div className='mr-5px'>{viento.likesUp.length - viento.likesDown.length}</div>
      
              <div onClick={(e) => this.voteDown('likesDown', viento._id, e)}>
                {negativeVote}
              </div>
            </div>
          );
        } else {
          likesActivity = (
            <div className="post-time-heading d-flex flex-direction-row align-items-center p-5px">
              <div title="Please create an account to like a contribution">
                {positiveVote}
              </div>
      
              <div className='mr-5px'>{viento.likesUp.length - viento.likesDown.length}</div>
      
              <div title="Please create an account to like a contribution">
                {negativeVote}
              </div>
            </div>
          );
        }
      } else {
        if (admin.handle) {
          likesActivity = (
            <div className="post-time-heading d-flex flex-direction-row align-items-center p-5px">
              <div onClick={(e) => this.voteUp('likesUp', viento._id, e)}>
                {positiveVote}
              </div>
      
              <div className='mr-5px'>0</div>
      
              <div onClick={(e) => this.voteDown('likesDown', viento._id, e)}>
                {negativeVote}
              </div>
            </div>
          );
        } else {
          likesActivity = (
            <div className="post-time-heading d-flex flex-direction-row align-items-center p-5px">
              <div title="Please create an account to like a contribution">
                {positiveVote}
              </div>
      
              <div className='mr-5px'>0</div>
      
              <div title="Please create an account to like a contribution">
                {negativeVote}
              </div>
            </div>
          );
        }
      }
  
      if (viento.comments.length > 0) {
        commentsActivity = (
            <Div onClick={this.handleScrollToElement2} className="p-5px clickable post-time-heading noUnderline d-flex flex-direction-row"  transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primaryThree}`} colorHoverStyled={`${application.theme.primary}`}>
              <p>
                {publicLength.length}
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

      vientoContent = (
        <div className="h-100">
          <Div className="z-900 d-flex justify-content-center overflow-hidden" heightStyled={application.settings.vientoCoverBanner}>
            <img className="filter-blur object-fit-cover" alt="banner" src={`/api/staff/files/${viento.bannerLg}`} />
          </Div>
          <div className="h-100 position-relative d-flex flex-direction-column mt-neg100vh200px">
            {/* div is to hide commented out code */}
            <div>
            {/* <div className="z-1000 d-flex position-relative overflow-visible flex-direction-column h-40px w-100">
              <Div className="d-flex justify-content-space-between align-items-center p-20px" backgroundStyled={application.mode.primaryHalf}>
                <div className="w-30 d-flex">
                  <Link className="w-40px ml-25" to={`/${winds}`}>
                    <Div className="d-flex justify-content-center align-items-center h-40px w-40px min-w-max-content border-radius-circle" transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} backgroundStyled={`${application.mode.primaryThree}`} backgroundHoverStyled={`${application.theme.primary}`}>
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
              <Div className="d-flex position-relative z-1000 justify-content-space-between align-items-center p-20px" backgroundStyled={application.mode.primaryHalf}>
                <div className="w-30 d-flex">
                  <Link className="w-40px ml-25" to={`/${winds}`}>
                    <Div className="d-flex justify-content-center align-items-center h-40px w-40px min-w-max-content border-radius-circle" transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primary}`} colorHoverStyled={`${application.mode.primary}`} backgroundStyled={`${application.mode.primaryThree}`} backgroundHoverStyled={`${application.theme.primary}`}>
                      <i className='ml-neg3px clickable fa-2x fas fa-chevron-left'></i>
                    </Div>
                  </Link>
                </div>
                <div className="w-30 d-flex justify-content-center">
                </div>
                <div className="w-30 d-flex justify-content-center min-w-max-content">
                  <Div className="p-5px min-w-max-content" radiusStyled={application.settings.appRadius} backgroundStyled={application.mode.primaryThree}>
                    <FormattedRelative value={viento.createdAt} />
                  </Div>
                </div>
              </Div>

              <Div className="d-flex position-relative z-1000 justify-content-center pl-100px pr-100px">
                <H1 className="text-center p-5px h-min-content" radiusStyled={application.settings.appRadius} backgroundStyled={application.mode.primaryThree} fontSizeStyled={application.text.heading}>{viento.title}</H1>
              </Div>
              <div className="d-flex position-relative z-1000 justify-content-center pl-100px pr-100px">
                <H2 className="text-center p-5px h-min-content" radiusStyled={application.settings.appRadius} backgroundStyled={application.mode.primaryThree} fontSizeStyled={application.text.description}>{viento.description}</H2>
              </div>
            </div>
            

            <div className="d-flex flex-direction-column min-h-70px">
              <Div className="d-flex position-relative z-1000 flex-direction-row align-items-center position-relative pl-10 h-50px pt-20px pb-20px mt-neg90px" backgroundStyled={application.mode.primaryHalf}>
                <Link className="noUnderline" to={`/${community}/${viento.profile.handle}`}>
                  <Div colorStyled={application.mode.primary} className="d-flex align-items-center">
                    {profilePicture}
                  </Div>
                </Link>
                <div className="d-flex flex-direction-column ml-10px">
                  <Link className="noUnderline" to={`/${community}/${viento.profile.handle}`}>
                    <Div className="noUnderline min-w-max-content p-5px" transitionStyled={application.transitions.general} radiusStyled={application.settings.appRadius} backgroundStyled={application.mode.primaryThree} backgroundHoverStyled={application.theme.primary} colorStyled={application.theme.primaryThree} colorHoverStyled={application.mode.primary} fontSizeStyled={application.text.important}>
                      {viento.user.name}
                      <br />
                    </Div>
                  </Link>
                </div>
              </Div>
              <Div className="d-flex position-relative z-1000 justify-content-space-around position-relative flex-direction-row align-items-center mt-neg45px min-h-70px" heightStyled={application.settings.vientoCoverFooter}>
                <div className="min-w-max-content clickable">
                  {likesActivity}
                </div>
                <div className="min-w-max-content clickable">
                <Div name="infoSection" className="ml-auto mr-auto max-w-min-content p-1px5px call-to-action landingMotto" onClick={this.handleScrollToElement} transitionStyled={`${application.transitions.general}`} colorStyled={`${application.theme.primaryHalf}`} colorHoverStyled={`${application.theme.primary}`}>
                    <i className="ml-auto mr-auto fal fa-chevron-down fa-2x"></i>
                  </Div>
                </div>
                <div className="min-w-max-content clickable">
                  {commentsActivity}
                </div>
              </Div>
            </div>
          
            <div id="content-anchor" style={style}>
              <Quill contributions={viento.content} />
            </div>
            <div id="comment-anchor" style={style}>
              <CommentFeed vientoId={viento._id} comments={viento.comments} />
              <CommentForm vientoId={viento._id} category={'public'} />
            </div>
          </div>
        </div>
      );
    } 

    return (
      <Div className="scroll-container bottom-outer-shadow ml-10px mr-10px pt-70px scrollbar-width-none" heightStyled={`${application.settings.heightHero}`} backgroundStyled={`${application.mode.primary}`} radiusStyled={`${application.settings.appRadiusBottom}`} colorStyled={`${application.theme.primary}`}>
        {vientoContent}
      </Div>
    );
  }
}

Contribution.propTypes = {
  getLiveVientoByID: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  vientos: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
  vientos: state.vientos
});

export default connect(mapStateToProps, { getLiveVientoByID })(withRouter(Contribution));
