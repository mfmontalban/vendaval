import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { sendVoteUp, sendVoteDown } from '../../actions/vientosActions';

import {FormattedMessage, FormattedRelative} from 'react-intl';

class VientoItem extends Component {

  voteUp = (likes, id, e) => {
    let packet = {};
    packet.likes = parseInt(likes) + 1;
    packet.id = id;
    
    this.props.sendVoteUp(packet);
  }

  voteDown = (likes, id, e) => {
    let packet = {};
    packet.likes = parseInt(likes) + 1;
    packet.id = id;
    
    this.props.sendVoteDown(packet);
  }

  render() {
    const { admin, viento } = this.props;
    const setLanguage = this.props.application.language;
    
    let community;
    let commentsActivity;
    let likesActivity;
    let positiveVote;
    let negativeVote;

    if (setLanguage === 'es') {
      community = 'communidad';
    } else {
      community = 'community';
    }

    if (viento.likesUp.length > 0) {
      if (viento.likesUp.filter(like => like.user.toString() === admin.id)) {
        positiveVote = 'fal fa-arrow-up pr-1 text-primary';
      }
    } else {
      positiveVote = 'fal fa-arrow-up pr-1 text-secondary';
    }

    if (viento.likesDown.length > 0) {
      if (viento.likesDown.filter(like => like.user.toString() === admin.id)) {
        negativeVote = 'fal fa-arrow-down pl-1 text-primary';
      }
    } else {
      negativeVote = 'fal fa-arrow-down pl-1 text-secondary';
    }

    if (viento.likesUp || viento.likesDown) {
      likesActivity = (
        <div className="post-time-heading d-flex">
          <div onClick={(e) => this.voteUp(viento.likesUp, viento._id, e)}>
            <i className={positiveVote}></i>
          </div>
  
          <div>{viento.likesUp.length - viento.likesDown.length}</div>
  
          <div onClick={(e) => this.voteDown(viento.likesDown, viento._id, e)}>
          <i className={negativeVote}></i>
          </div>
        </div>
      );
    } else {
      likesActivity = (
        <div className="post-time-heading d-flex">
          <div onClick={(e) => this.voteUp(viento._id, e)}>
            <i className="fal fa-arrow-up pr-1"></i>
          </div>
  
          <div>0</div>
  
          <div onClick={(e) => this.voteDown(viento.likesDown, viento._id, e)}>
            <i className="fal fa-arrow-down pl-1"></i>
          </div>
        </div>
      );
    }

    if (viento.comments.length > 0) {
      commentsActivity = (
        <div className="post-time-heading">{viento.comments.length} <i className="fal fa-comment-alt"></i></div>
      );
    } else {
      commentsActivity = (
        <div className="post-time-heading">0 <i className="fal fa-comment-alt"></i></div>
      );
    }

    return (
      <div className="viento-container ml-auto mr-auto">

        <div className="container-margin2 container-width2 border border-secondary rounded">
          <div className="w-100 p-1 d-flex flex-row justify-content-between border-bottom border-secondary align-items-end bg-silvero2 rounded-top">
            <div className="flex-row text-left">
              <div className="post-section-heading">{viento.type}/ {viento.topic}</div>
            </div>
            <div className="flex-row text-right">
              <div className="post-time-heading">
                <FormattedMessage
                    id="viento.time_since_created"
                    defaultMessage={`{formattedLastLoginTime}`}
                    values={{
                        formattedLastLoginTime: (
                            <FormattedRelative value={viento.createdAt} />
                        ),
                    }}
                />
              </div>
            </div>
          </div>
          <div className="w-100 d-flex flex-wrap justify-content-between bg-light">
            <h6 className="w-100 m-0 p-1 justify-content-between text-center rounded bg-light">
              <Link className="text-info" to={`/vientos/${viento._id}`}>{viento.title}</Link>
            </h6>
            <img className="w-100 banner ml-auto mr-auto" alt="banner" src={`http://localhost:5000/api/staff/files/${viento.banner}`} />
            <h6 className="w-100 m-0 p-1 justify-content-between text-center rounded bg-light">
              <Link className="text-info" to={`/${community}/${viento.profile.handle}`}>{viento.user.name}</Link>
            </h6>
          </div>
          <div className="w-100 p-1 d-flex flex-row justify-content-between border-top border-secondary align-items-end bg-silvero2 rounded-bottom">
            {/* <div className="flex-row text-left">
              <div className="post-section-heading"></div>
            </div> */}
            <div className="d-flex flex-wrap justify-content-between w-100">
              {likesActivity}
              <div className="post-time-heading">
                <Link className="text-info" to={`/vientos/${viento._id}`}><i className="fal fa-share-square"></i></Link>
              </div>
              {commentsActivity}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VientoItem.propTypes = {
  admin: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  viento: PropTypes.object.isRequired,
  sendVoteUp: PropTypes.func.isRequired,
  sendVoteDown: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
  application: state.application,
  vientos: state.viento
});

export default connect(mapStateToProps, { sendVoteUp, sendVoteDown })(VientoItem);
