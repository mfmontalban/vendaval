const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const gravatar = require('gravatar');

// Load Account Validation
const validateLoginInput = require('../../validation/login');

// Load User Model
const User = require('../../models/User');

// Load Profile Model
const Profile = require('../../models/Profile');

////////// LOGIN ACTIONS //////////

// @route   GET api/account/loginAccount
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/loginAccount', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = ' ';
      errors.password = 'Email or Password incorrect';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {

        // Check if active
        if (user.isActive === false) {
          errors.email = 'Email needs to be confirmed before continuing';
          return res.status(404).json(errors);
        }

        // User Matched
        const payload = { id: user.id }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          process.env.JWT_KEY || require('../../config/keys').jwtKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.email = ' ';
        errors.password = 'Email or Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/account/:account_id
// @desc    Get account details by account ID
// @access  Public

router.get('/info/:account_id', (req, res) => {
  const errors = {};

  User.findOne({ _id: req.params.account_id })
    .then(account => {
      if (!account) {
        errors.noaccount = 'There is no profile for this account';
        res.status(404).json(errors);
      }

      res.json({staff: account.staff, name: account.name, email: account.email, avatar: account.avatar});
    })
    .catch(err =>
      res.status(404).json({ account: 'There is no account for this account' })
    );
});

// @route   GET api/account/:account_id
// @desc    Get account details by account ID
// @access  Public

router.get('/profile/:account_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.account_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.handle = null;
        res.json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

////////// END LOGIN ACTIONS //////////



////////// SECURITY ACTIONS //////////

// @route   GET api/account/readAccountInfo
// @desc    Read account information
// @access  Private
router.get('/readAccountInfo',
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

////////// END SECURITY ACTIONS //////////

module.exports = router;
