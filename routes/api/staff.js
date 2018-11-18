const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
ObjectID = require('mongodb').ObjectID;
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

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
// @desc    Add contribution
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

    // Get fields
    const contributionFields = {};
    contributionFields.user = req.user.id;
    if (req.body.type) contributionFields.type = req.body.type;
    if (req.body.topic) contributionFields.topic = req.body.topic;
    if (req.body.title) contributionFields.title = req.body.title;
    if (req.body.description) contributionFields.description = req.body.description;
    if (req.body.content) contributionFields.content = req.body.content;
    if (req.body.contentHTML) contributionFields.contentHTML = req.body.contentHTML;
    // Skills - Spilt into array
    if (typeof req.body.images !== 'undefined') {
      contributionFields.images = req.body.images.split(',');
    }

    Contribution.findOne({ title: contributionFields.title }).then(contribution => {
      if (contribution) {
        errors.title = 'That title already exists';
        res.status(400).json(errors);
      } else {
        contributionFields.createdAt = Date.now();

        // Save Profile
        new Contribution(contributionFields).save().then(contribution => res.json(contribution));
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

// @route   POST api/staff/contribution/:id
// @desc    Edit contribution
// @access  Private
router.post(
  '/contribution/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateContributionInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const contributionFields = {};
    contributionFields.user = req.user.id;
    contributionFields.updatedAt = Date.now();
    if (req.body.type) contributionFields.type = req.body.type;
    if (req.body.topic) contributionFields.topic = req.body.topic;
    if (req.body.title) contributionFields.title = req.body.title;
    if (req.body.description) contributionFields.description = req.body.description;
    if (req.body.content) contributionFields.content = req.body.content;
    if (req.body.contentHTML) contributionFields.contentHTML = req.body.contentHTML;
    // Skills - Spilt into array
    if (typeof req.body.images !== 'undefined') {
      contributionFields.images = req.body.images.split(',');
    }

    Contribution.findOne({$and: [{ _id: req.params.id }, {user: req.user.id}]}).then(contribution => {
      if (contribution) {
        Contribution.findOne({ title: contributionFields.title }).then(contribution => {
          if (contribution) {
            const contribID = new ObjectID(req.user.id);
            if (contribution.user.equals(contribID)) {
              // Update Profile
              Contribution.findOneAndUpdate(
                { _id: req.params.id },
                { $set: contributionFields }
              ).then(contribution => res.json(contribution));
            } else {
              errors.title = 'That title already exists';
              res.status(400).json(errors);
            }
          } else {
            // Update Profile
            Contribution.findOneAndUpdate(
              { _id: req.params.id },
              { $set: contributionFields }
            ).then(contribution => res.json(contribution));
          }
        });
      } else {
        errors.title = 'No contribution exists';
        res.status(400).json(errors);
      }
    });
  }
);

// @route   DELETE api/staff/contribute/:id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  '/contribution/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Contribution.findOneAndRemove({$and: [{ _id: req.params.id }, {user: req.user.id}]})
      .then(() =>
      Contribution.find({ user: req.user.id })
        .then(contributions => {
          if (!contributions) {
            errors.noprofile = 'There are no contributions';
            return res.status(404).json(errors);
          }

          res.json(contributions);
        })
        .catch(err => res.status(404).json({ profile: 'There are no contributions' })));
  }
);

module.exports = router;
