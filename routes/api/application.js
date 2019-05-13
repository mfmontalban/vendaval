const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const gravatar = require('gravatar');

// Load Account Validation
const validateRegisterInput = require('../../validation/register');
const validateResetInput = require('../../validation/reset');
const validateSecurityInput = require('../../validation/security');

// Load User Model
const User = require('../../models/User');
// Load Temp model
const Temp = require('../../models/Temp');
// Load Contribution Model
const Contribution = require('../../models/Contribution');

// @route   GET api/application/titles
// @desc    Retrieve title search results
// @access  Public
router.get('/readApplicationTitles', (req, res) => {
    const errors = {};

    Contribution.find({ status: 'Live' })
      .then(contributions => {
        if (!contributions) {
          errors.noprofile = 'There are no results';
          return res.status(404).json(errors);
        }

        res.json(contributions);
      })
      .catch(err => res.status(404).json({ profile: 'There are no results' }));
});







// @route   POST api/application/sendApplicationAlertsRegistered
// @desc    Register account
// @access  Public
router.post('/sendApplicationAlertsRegistered', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      if(req.body.language === 'es') {
        errors.email = 'E-correo ya exista';
      } else {
        errors.email = 'Email already exists';
      }
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

// @route   GET api/application/sendApplicationAlertsUpdated
// @desc    Edit Account Information
// @access  Private
router.post('/sendApplicationAlertsUpdated',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSecurityInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.name = req.body.name;
    // User needs to validate email <---> profileFields.email = req.body.email; 

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

// @route   POST api/application/resetPassword
// @desc    Reset password
// @access  Public
router.post('/resetAccountPassword/:key', (req, res) => {

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



// @route   GET api/application/verifyApplicationAlertsRegistered
// @desc    Verify registered account email
// @access  Public
router.get('/verifyApplicationAlertsRegistered/:key', (req, res) => {
  let verify = {};

  Temp.findOne({ key: req.params.key }).then(temp => {
    if (!temp) {
      verify.expired = `Can't find no validation key`;
      return res.json(verify);
    } else {
      if (temp.type !== 'registered') {
        verify.expired = `Ain't a registered validation key`;
        return res.json(verify);
      } else {
        const id = temp.user;
        User.findOne({ _id: id }).then(user => {
          if (!user) {
            verify.expired = `Can't find no user`;
            return res.json(verify);
          } else {
            temp.remove();
            user.isActive = true;
            verify.success = "true";
            user
            .save()
            .then(active => res.json(verify))
            .catch(err => res.json(err));
          }
        });
      }
    }
  });
});

// @route   GET api/application/verifyApplicationAlertsForgot
// @desc    Verify forgot password email
// @access  Public
router.get('/verifyApplicationAlertsForgot/:key', (req, res) => {
  let verify = {};

  Temp.findOne({ key: req.params.key }).then(temp => {
    if (!temp) {
      verify.expired = `Can't find validation key`;
      return res.json(verify);
    } else {
      if (temp.type !== 'forgot') {
        verify.expired = `Ain't a forgot validation key`;
        return res.json(verify);
      } else {
        const id = temp.user;
        User.findOne({ _id: id }).then(user => {
          if (!user) {
            verify.expired = `Can't find no user`;
            return res.json(verify);
          } else {
            verify.success = `Found em'`;
            return res.json(verify);
          }
        });
      }
    }
  });
});

// @route   GET api/application/verifyApplicationAlertsUpdated
// @desc    Confirm user validation email
// @access  Public
router.get('/verifyApplicationAlertsUpdated:key', (req, res) => {
  let verify = {};

  Temp.findOne({ key: req.params.key }).then(temp => {
    if (!temp) {
      verify.expired = `Can't find no validation key`;
      return res.json(verify);
    } else {
      if (temp.type !== 'updated') {
        verify.expired = `Ain't an updated validation key`;
        return res.json(verify);
      } else {
        const id = temp.user;
        User.findOne({ _id: id }).then(user => {
          if (!user) {
            verify.expired = `Can't find no user`;
            return res.json(verify);
          } else {
            temp.remove();
            user.isActive = true;
            verify.success = "true";
            user
            .save()
            .then(active => res.json(verify))
            .catch(err => res.json(err));
          }
        });
      }
    }
  });
});



// @route   DELETE api/application/profile
// @desc    Delete profile
// @access  Private
router.delete('/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      res.json({ success: true })
    });
  }
);

// @route   DELETE api/application/account
// @desc    Delete user and profile
// @access  Private
router.delete('/account',
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
