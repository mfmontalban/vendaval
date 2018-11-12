const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateContributionInput = require('../../validation/contribution');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');
// Load User Model
const Contribution = require('../../models/Contribution');

// @route   GET api/staff/dashboard
// @desc    Get items in staff dashboard
// @access  Private
router.get(
  '/dashboard',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Contribution.find({ user: req.user.id })
      .then(contributions => {
        if (!contributions) {
          errors.noprofile = 'There are no profiles';
          return res.status(404).json(errors);
        }

        res.json(contributions);
      })
      .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route   POST api/staff/contribute
// @desc    Add or Edit contribution
// @access  Private
router.post(
  '/contribute',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateContributionInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    console.log(req);

    // Get fields
    const contributionFields = {};
    contributionFields.user = req.user.id;
    if (req.body.title) contributionFields.title = req.body.title;
    if (req.body.description) contributionFields.description = req.body.description;
    // Skills - Spilt into array
    if (typeof req.body.images !== 'undefined') {
      contributionFields.images = req.body.images.split(',');
    }

    Contribution.findOne({ _id: req.body.title }).then(contribution => {
      if (contribution) {
          // Update Profile
          Contribution.findOneAndUpdate(
            { title: req.body.title },
            { $set: contributionFields },
            { new: true }
          ).then(contribution => res.json(contribution));
      } else {
        // Create

        // Check if title exists
        Contribution.findOne({ title: contributionFields.title }).then(contribution => {
          if (contribution) {
            errors.title = 'That title already exists';
            res.status(400).json(errors);
          }

          contributionFields.createdAt = Date.now();

          // Save Profile
          new Contribution(contributionFields).save().then(contribution => res.json(contribution));
        });
      }
    });
  }
);

// @route   GET api/staff/contribution/:id
// @desc    Get contribution
// @access  Private
router.get(
  '/contribution/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Contribution.findOne({ _id: req.params.id })
      .then(contribution => {
        if (!contribution) {
          errors.nocontribution = 'No contribution';
          return res.status(404).json(errors);
        }

        res.json(contribution);
      })
      .catch(err => res.status(404).json({ contribution: 'No contribution' }));
});

// @route   DELETE api/staff/contribute/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  '/contribution/:contribution',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
