const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateForgotInput = require('../../validation/forgot');
const validateResetInput = require('../../validation/reset');

// Load User model
const User = require('../../models/User');

// Load Temp model
const Temp = require('../../models/Temp');

// Load Profile model
const Profile = require('../../models/Profile');

// @route   POST api/users/registerUser
// @desc    Register user
// @access  Public
router.post('/registerUser', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/resetPassword
// @desc    Resend forgot password email
// @access  Public
router.post('/resetPassword/:key', (req, res) => {

  const { errors, isValid } = validateResetInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let verify = {};

  console.log(req.params);

  Temp.findOne({ key: req.params.key }).then(temp => {
    if (!temp) {
      console.log('here?');
      verify.expired = `Can't find validation key`;
      return res.json(verify);
    } else {
      console.log('?');
      const id = temp.user;
      const profileFields = {};
      profileFields.password = req.body.password;

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(profileFields.password, salt, (err, hash) => {
          if (err) throw err;
          profileFields.password = hash;
          User.findOneAndUpdate(
            { _id: id },
            { $set: profileFields }
          ).then(profile => {
            temp.remove();
            res.json(profile);
          }).catch(err => {
            console.log(err);
          });
        });
      });
    }
  });
});

// @route   GET api/users/loginUser
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/loginUser', (req, res) => {
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
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check if active
    if (user.isActive === false) {
      errors.email = 'Email needs to be confirmed before continuing';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar, staff: user.staff, handle: user.handle, alerts: user.alerts }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          process.env.JWT_KEY || key.jwtKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});


module.exports = router;
