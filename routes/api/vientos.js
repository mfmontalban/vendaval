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

// @route   GET api/view/get/:id
// @desc    Get viento
// @access  Public
router.get(
  '/get/:id', (req, res) => {
    const errors = {};

    Contribution.findOne({ _id: req.params.id })
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
              console.log('yep');
              // Get remove index
              const removeIndex = contrib.likesUp.map(item => item.user.toString()).indexOf(req.user.id);
              // Splice out of array
              contrib.likesUp.splice(removeIndex, 1);
            }
          } else {
            console.log('we here');
            // Add user id to likes array
            contrib.likesUp.unshift({ user: req.user.id });
          }

          if (contrib.likesDown.filter(like => like.user.toString() === req.user.id).length > 0) {
            // Get remove index
            const removeIndex = contrib.likesDown.map(item => item.user.toString()).indexOf(req.user.id);
            // Splice out of array
            contrib.likesDown.splice(removeIndex, 1);
          }

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
              const removeIndex = contrib.likesDown.map(item => item.user.toString()).indexOf(req.user.id);
              // Splice out of array
              contrib.likesDown.splice(removeIndex, 1);
            }
          } else {
            // Add user id to likes array
            contrib.likesDown.unshift({ user: req.user.id });
          }

          if (contrib.likesUp.filter(like => like.user.toString() === req.user.id).length > 0) {
            // Get remove index
            const removeIndex = contrib.likesUp.map(item => item.user.toString()).indexOf(req.user.id);
            // Splice out of array
            contrib.likesUp.splice(removeIndex, 1);
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
          avatar: req.body.avatar,
          handle: req.body.handle,
          name: req.body.name,
          user: req.user.id
        };
        // Add to comments array
        contribution.comments.unshift(newComment);

        // Save
        contribution.save().then(contribution => res.json(contribution));
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

        contribution.save().then(contribution => res.json(contribution));
      })
      .catch(err => res.status(404).json({ vientonotfound: 'No viento found' }));
  }
);


module.exports = router;
