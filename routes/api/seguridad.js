const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const validateSeguridadInput = require('../../validation/security');
const isEmpty = require('../../validation/is-empty');

// Load User model
const User = require('../../models/User');
// Load Profile Model
const Profile = require('../../models/Profile');

// @route   GET api/seguridad
// @desc    Get current users profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    User.findOne({ _id: req.user.id })
      .then(user => {
        if (!user) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(user);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/seguridad/edit
// @desc    Edit Account Information
// @access  Private
router.post('/edit',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSeguridadInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.name = req.body.name;

    const passwordLength = req.body.password;

    if (passwordLength.length > 0) {
      profileFields.password = req.body.password;
      // Hash Password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(profileFields.password, salt, (err, hash) => {
          if (err) throw err;
          profileFields.password = hash;
          User.findOneAndUpdate(
            { _id: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(account => res.json(account));
        });
      });
    } else {
      User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(account => res.json(account));
    }
  }
);

// @route   DELETE api/seguridad/profile
// @desc    Delete profile
// @access  Private
router.delete(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      res.json({ success: true })
    });
  }
);

// @route   DELETE api/seguridad/account
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/account',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
