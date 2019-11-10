const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
ObjectID = require('mongodb').ObjectID;

// Load Contribution Model
const Contribution = require('../../models/Contribution');
// Load Profile Model
const Profile = require('../../models/Profile');
// Validation
const validateCommentInput = require('../../validation/comment');

// @route   GET api/vientos/getAll
// @desc    Get most recent vientos
// @access  Public
router.get(
  '/getAll', (req, res) => {
    const errors = {};

    Contribution.find({ status: 'Live' })
      .populate('user', ['name'])
      .populate('profile', ['handle'])
      .then(contributions => {
        if (!contributions) {
          errors.novientos = 'There are no vientos to show';
          return res.status(404).json(errors);
        }
        
        res.json(contributions);
      })
      .catch(err => res.status(404).json({ profile: `Whats going on with the vientos` }));
});

// @route   GET api/vientos/get/:id
// @desc    Get viento
// @access  Public
router.get(
  '/get/:id', (req, res) => {
    const errors = {};

    Contribution.findOne({ _id: req.params.id })
      .populate('user', ['name'])
      .populate('profile', ['avatarSm', 'handle'])
      .populate({
        path: 'comments.user',
        select: ['name', 'profile'],
        // Get friends of friends - populate the 'friends' array for every friend
        populate: { 
          path: 'profile',
          select: ['avatarSm', 'handle']
        }
      })
      .populate({
        path: 'comments.replies.user',
        select: ['name', 'profile'],
        // Get friends of friends - populate the 'friends' array for every friend
        populate: { 
          path: 'profile',
          select: ['avatarSm', 'handle']
        }
      })
      .then(contribution => {
        if (!contribution) {
          errors.noviento = 'No viento to show';
          return res.status(404).json(errors);
        }

        res.json(contribution);
      })
      .catch(err => res.status(404).json({ contribution: 'No viento to show' }));
});

// @route   POST api/application/sendVoteUp
// @desc    Vote Up on a contribution
// @access  Private 
router.post('/sendVoteUp',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Contribution.findOne({ _id: req.body.id })
        .then(contrib => {
          if (contrib.likesUp.length > 0) {
            if (contrib.likesUp.filter(like => like.user.toString() === req.user.id)) {
              // Get remove index for Contribution object
              const removeIndexContribution = contrib.likesUp.map(item => item.user.toString()).indexOf(req.user.id);
              // Get remove index for Profile object
              const removeIndexProfile = profile.likesUp.map(item => item.contribution.toString()).indexOf(req.body.id);
              // Splice out of array
              contrib.likesUp.splice(removeIndexContribution, 1);
              profile.likesUp.splice(removeIndexProfile, 1);
            }
          } else {
            // Add user id to likes array
            contrib.likesUp.unshift({ user: req.user.id });
            // Add contrib id to likes array
            profile.likesUp.unshift({ contribution: req.body.id });
          }

          if (contrib.likesDown.filter(like => like.user.toString() === req.user.id).length > 0) {
            // Get remove index for Contribution object
            const removeIndexContribution = contrib.likesDown.map(item => item.user.toString()).indexOf(req.user.id);
            // Get remove index for Profile object
            const removeIndexProfile = profile.likesDown.map(item => item.contribution.toString()).indexOf(req.body.id);
            // Splice out of array
            contrib.likesDown.splice(removeIndexContribution, 1);
            profile.likesDown.splice(removeIndexProfile, 1);
          }

          profile.save();
          contrib.save().then(contrib => res.json(contrib));

        })
        .catch(err => res.status(404).json('Could not complete Vote Up'));
    });
});

// @route   POST api/application/sendVoteDown
// @desc    Vote Down on a contribution
// @access  Private
router.post('/sendVoteDown',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Contribution.findOne({ _id: req.body.id })
        .then(contrib => {
          if (contrib.likesDown.length > 0) {
            if (contrib.likesDown.filter(like => like.user.toString() === req.user.id)) {
              // Get remove index
              const removeIndexContribution = contrib.likesDown.map(item => item.user.toString()).indexOf(req.user.id);
              // Get remove index for Profile object
              const removeIndexProfile = profile.likesDown.map(item => item.contribution.toString()).indexOf(req.body.id);
              // Splice out of array
              contrib.likesDown.splice(removeIndexContribution, 1);
              profile.likesDown.splice(removeIndexProfile, 1);
            }
          } else {
            // Add user id to likes array
            contrib.likesDown.unshift({ user: req.user.id });
            // Add contribution id to likes array
            profile.likesDown.unshift({ contribution: req.body.id });
          }

          if (contrib.likesUp.filter(like => like.user.toString() === req.user.id).length > 0) {
            // Get remove index
            const removeIndexContribution = contrib.likesUp.map(item => item.user.toString()).indexOf(req.user.id);
            // Get remove index for Profile object
            const removeIndexProfile = profile.likesUp.map(item => item.contribution.toString()).indexOf(req.body.id);
            // Splice out of array
            contrib.likesUp.splice(removeIndexContribution, 1);
            profile.likesUp.splice(removeIndexProfile, 1);
          }

          contrib.save().then(contrib => res.json(contrib));
        })
        .catch(err => res.status(404).json('Could not complete Vote Up'));
    });
});

// @route   POST api/vientos/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);
    
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Contribution.findById(req.params.id)
      .then(contribution => {
        const newComment = {
          text: req.body.text,
          category: req.body.category,
          user: req.user.id
        };
        // Add to comments array
        contribution.comments.unshift(newComment);

        // Save
        contribution.save().then(contribution => 
          Contribution.findOne({ _id: req.params.id })
            .populate('user', ['name'])
            .populate('profile', ['handle'])
            .populate({
              path: 'comments.user',
              select: ['name', 'profile'],
              // Get friends of friends - populate the 'friends' array for every friend
              populate: { 
                path: 'profile',
                select: ['avatarSm', 'handle']
              }
            })
            .populate({
              path: 'comments.replies.user',
              select: ['name', 'profile'],
              // Get friends of friends - populate the 'friends' array for every friend
              populate: { 
                path: 'profile',
                select: ['avatarSm', 'handle']
              }
            })
            .then(contribution => {
              if (!contribution) {
                errors.noviento = 'No viento to show';
                return res.status(404).json(errors);
              }

              res.json(contribution);
            })
            .catch(err => res.status(404).json({ contribution: 'No viento to show' }))
        );
      })
      .catch(err => res.status(404).json('Could not complete add comment'));
  }
);

// @route   POST api/vientos/comment/:vientoID/like
// @desc    Add like to comment
// @access  Private
router.post(
  '/comment/:vientoID/:commentID/like',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    const newLike = {
      user: req.user.id
    };

    Contribution.findById(req.params.vientoID)
      .then(contribution => {
        contribution.comments.map((comment, index) => {
          if (comment._id.toString() === req.params.commentID) {

            if (comment.likes.length > 0) {
                // Get remove index for Contribution object
                const removeIndexLikes = comment.likes.map(item => item.user.toString()).indexOf(req.user.id);
                if (removeIndexLikes === -1) {
                  comment.likes.unshift(newLike);
                } else {
                  comment.likes.splice(removeIndexLikes, 1);
                }
            } else {
              // Add to comments likes array
              comment.likes.unshift(newLike);
            }

            // Save
            contribution.save().then(contribution => 
              Contribution.findOne({ _id: req.params.vientoID })
                .populate('user', ['name'])
                .populate('profile', ['handle'])
                .populate({
                  path: 'comments.user',
                  select: ['name', 'profile'],
                  // Get friends of friends - populate the 'friends' array for every friend
                  populate: { 
                    path: 'profile',
                    select: ['avatarSm', 'handle']
                  }
                })
                .populate({
                  path: 'comments.replies.user',
                  select: ['name', 'profile'],
                  // Get friends of friends - populate the 'friends' array for every friend
                  populate: { 
                    path: 'profile',
                    select: ['avatarSm', 'handle']
                  }
                })
                .then(contribution => {
                  if (!contribution) {
                    errors.noviento = 'No viento to show';
                    return res.status(404).json(errors);
                  }

                  res.json(contribution);
                })
                .catch(err => res.status(404).json({ contribution: 'No viento to show' }))
            );
          }
        });
      })
      .catch(err => res.status(404).json('Could not complete add comment'));
  }
);

// @route   POST api/vientos/comment/:vientoID/reply
// @desc    Add reply to comment
// @access  Private
router.post(
  '/comment/:vientoID/:commentID/reply',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);
    
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newComment = {
      text: req.body.text,
      user: req.user.id
    };

    Contribution.findById(req.params.vientoID)
      .then(contribution => {
        contribution.comments.map((comment, index) => {
          if (comment._id.toString() === req.params.commentID) {
            // Add to comments array
            contribution.comments[index].replies.push(newComment);

            // Save
            contribution.save().then(contribution => 
              Contribution.findOne({ _id: req.params.vientoID })
                .populate('user', ['name'])
                .populate('profile', ['handle'])
                .populate({
                  path: 'comments.user',
                  select: ['name', 'profile'],
                  // Get friends of friends - populate the 'friends' array for every friend
                  populate: { 
                    path: 'profile',
                    select: ['avatarSm', 'handle']
                  }
                })
                .populate({
                  path: 'comments.replies.user',
                  select: ['name', 'profile'],
                  // Get friends of friends - populate the 'friends' array for every friend
                  populate: { 
                    path: 'profile',
                    select: ['avatarSm', 'handle']
                  }
                })
                .then(contribution => {
                  if (!contribution) {
                    errors.noviento = 'No viento to show';
                    return res.status(404).json(errors);
                  }

                  res.json(contribution);
                })
                .catch(err => res.status(404).json({ contribution: 'No viento to show' }))
            );
          }
        });
      })
      .catch(err => res.status(404).json('Could not complete add comment'));
  }
);

// @route   POST api/vientos/comment/:vientoID/:commentID/:replyID/like
// @desc    Add like to reply
// @access  Private
router.post(
  '/comment/:vientoID/:commentID/:replyID/like',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    const newLike = {
      user: req.user.id
    };

    Contribution.findById(req.params.vientoID)
      .then(contribution => {
        contribution.comments.map((comment, index) => {
          if (comment._id.toString() === req.params.commentID) {

            comment.replies.map((reply, index) => {
              if (reply._id.toString() === req.params.replyID) {
              
                if (reply.likes.length > 0) {
                    // Get remove index for Contribution object
                    const removeIndexLikes = reply.likes.map(item => item.user.toString()).indexOf(req.user.id);
                    if (removeIndexLikes === -1) {
                      reply.likes.unshift(newLike);
                    } else {
                      reply.likes.splice(removeIndexLikes, 1);
                    }
                } else {
                  // Add to replies likes array
                  reply.likes.unshift(newLike);
                }

                // Save
                contribution.save().then(contribution => 
                  Contribution.findOne({ _id: req.params.vientoID })
                    .populate('user', ['name'])
                    .populate('profile', ['handle'])
                    .populate({
                      path: 'comments.user',
                      select: ['name', 'profile'],
                      // Get friends of friends - populate the 'friends' array for every friend
                      populate: { 
                        path: 'profile',
                        select: ['avatarSm', 'handle']
                      }
                    })
                    .populate({
                      path: 'comments.replies.user',
                      select: ['name', 'profile'],
                      // Get friends of friends - populate the 'friends' array for every friend
                      populate: { 
                        path: 'profile',
                        select: ['avatarSm', 'handle']
                      }
                    })
                    .then(contribution => {
                      if (!contribution) {
                        errors.noviento = 'No viento to show';
                        return res.status(404).json(errors);
                      }

                      res.json(contribution);
                    })
                    .catch(err => res.status(404).json({ contribution: 'No viento to show' }))
                );

              }
            })
          }
        });
      })
      .catch(err => res.status(404).json('Could not complete add comment'));
  }
);

// @route   DELETE api/vientos/comment/:id/:comment_id
// @desc    Remove comment from viento
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Contribution.findById(req.params.id)
      .then(contribution => {
        // Check to see if comment exists
        if (
          contribution.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

        // Get remove index
        const removeIndex = contribution.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        contribution.comments.splice(removeIndex, 1);

        contribution.save().then(contribution => 
          Contribution.findOne({ _id: req.params.id })
            .populate('user', ['name'])
            .populate('profile', ['handle'])
            .populate({
              path: 'comments.user',
              select: ['name', 'profile'],
              // Get friends of friends - populate the 'friends' array for every friend
              populate: { 
                path: 'profile',
                select: ['avatarSm', 'handle']
              }
            })
            .populate({
              path: 'comments.replies.user',
              select: ['name', 'profile'],
              // Get friends of friends - populate the 'friends' array for every friend
              populate: { 
                path: 'profile',
                select: ['avatarSm', 'handle']
              }
            })
            .then(contribution => {
              if (!contribution) {
                errors.noviento = 'No viento to show';
                return res.status(404).json(errors);
              }

              res.json(contribution);
            })
            .catch(err => res.status(404).json({ contribution: 'No viento to show' }))
        );
      })
      .catch(err => res.status(404).json({ vientonotfound: 'No viento found' }));
  }
);

// @route   DELETE api/vientos/comment/:vientoID/:commentID/:replyID
// @desc    Remove reply from viento
// @access  Private
router.delete(
  '/comment/:vientoID/:commentID/:replyID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Contribution.findById(req.params.vientoID)
      .then(contribution => {
        // Check to see if comment exists
        if (
          contribution.comments.filter(
            comment => comment._id.toString() === req.params.commentID
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

        // Get remove index
        const commentIndex = contribution.comments
          .map(item => item._id.toString())
          .indexOf(req.params.commentID);

        const replyIndex = contribution.comments[commentIndex].replies
          .map(item => item._id.toString())
          .indexOf(req.params.replyID);

        // Splice comment out of array
        contribution.comments[commentIndex].replies.splice(replyIndex, 1);

        contribution.save().then(contribution => 
          Contribution.findOne({ _id: req.params.vientoID })
            .populate('user', ['name'])
            .populate('profile', ['handle'])
            .populate({
              path: 'comments.user',
              select: ['name', 'profile'],
              // Get friends of friends - populate the 'friends' array for every friend
              populate: { 
                path: 'profile',
                select: ['avatarSm', 'handle']
              }
            })
            .populate({
              path: 'comments.replies.user',
              select: ['name', 'profile'],
              // Get friends of friends - populate the 'friends' array for every friend
              populate: { 
                path: 'profile',
                select: ['avatarSm', 'handle']
              }
            })
            .then(contribution => {
              if (!contribution) {
                errors.noviento = 'No viento to show';
                return res.status(404).json(errors);
              }

              res.json(contribution);
            })
            .catch(err => res.status(404).json({ contribution: 'No viento to show' }))
        );
      })
      .catch(err => res.status(404).json({ vientonotfound: 'No viento found' }));
  }
);


module.exports = router;
