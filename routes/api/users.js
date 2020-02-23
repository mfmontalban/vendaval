const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Grid = require('gridfs-stream');
const multer = require('multer');
const mongoURI = process.env.MONGODB_URI || require('../../config/keys').mongoURI;
var conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true });
Grid.mongo = mongoose.mongo;

// Load Validation
const validateProfileInput = require('../../validation/profile');

// Load User Model
const User = require('../../models/User');
// Load Profile Model
const Profile = require('../../models/Profile');
// Load Preview Model
const Preview = require('../../models/Preview');

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/account/:account_id
// @desc    Get profile by user ID
// @access  Public

router.get('/account/:account_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.account_id })
    .populate('user', ['_id'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
          // Update Profile
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

conn.once('open', function () {
  const gfs = Grid(conn.db);

  /** Setting up storage using multer-gridfs-storage */
  const storage = require('multer-gridfs-storage')({
     url: mongoURI,
     file: (req, file) => {
        return {
           filename: file.originalname
        }
     }
  });

  const singleUpload = multer({ //multer settings for single upload
    storage: storage
  }).array('file', 3);

  // @route   GET api/users/files
  // @desc    Retrieve file
  // @access  Private
  router.get('/files/:filename', (req, res) => {
    gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
      if(!files || files.length === 0){
        return res.status(404).json({
          message: "Could not find file"
        });
      }
      var readstream = gfs.createReadStream({
        filename: files[0].filename
      })
      res.set('Content-Type', files[0].contentType);
      return readstream.pipe(res);
    });
  });

  // @route   POST api/users/files
  // @desc    Add file
  // @access  Private
  router.post('/files', singleUpload, (req, res) => {
    if (req.files) {
      return res.json({
        success: true,
        response: req.files
      });
    }
    res.send({ success: false });
  });
})

// @route   POST api/users/uploadTemp
// @desc    Upload preview photo
// @access  Private
router.post(
  '/uploadTemp',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    // Get fields
    const PreviewFields = {};
    PreviewFields.user = req.user.id;
    PreviewFields.pictureSm = req.body.pictureSm;
    PreviewFields.pictureLg = req.body.pictureLg;
    
    new Preview(PreviewFields).save().then(preview => res.json(preview));
  }
);

// @route   POST api/users/deleteTemp
// @desc    Delete preview photo
// @access  Private
router.delete(
  '/deleteTemp',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Preview.findOneAndRemove({ pictureSm: req.body.avatarSm })
    .then(res => {
      return res.json({
        success: true
      });
    })
    .catch(err => {
      return res.json({
        success: false
      });
    })
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
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
