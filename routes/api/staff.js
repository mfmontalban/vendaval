const express = require('express');
const router = express.Router();

const passport = require('passport');

const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const multer = require('multer');
const mongoURI = process.env.MONGODB_URI || require('../../config/keys').mongoURI;
var conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true });
Grid.mongo = mongoose.mongo;

ObjectID = require('mongodb').ObjectID;

// Load Validation
const validateContributionInput = require('../../validation/contribution');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');
// Load User Model
const Contribution = require('../../models/Contribution');

conn.once('open', function () {
  const gfs = Grid(conn.db);

  /** Setting up storage using multer-gridfs-storage */
  const storage = require('multer-gridfs-storage')({
     url: mongoURI,
     file: (req, file) => {
        return {
           filename: file.originalname + '_' + Date.now()
        }
     }
  });

  const singleUpload = multer({ //multer settings for single upload
     storage: storage
  }).single('file');

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
  router.get('/files', (req, res) => {
   gfs.files.find().toArray((err, files) => {
     if(!files || files.length === 0){
       return res.status(404).json({
         message: "Could not find files"
       });
     }
     return res.json(files);
   });
  });
  router.post('/files', singleUpload, (req, res) => {
     if (req.file) {
        return res.json({
           success: true,
           file: req.file.filename
        });
     }
      res.send({ success: false });
  });
  router.delete('/files/:id', (req, res) => {
    gfs.remove({ _id: req.params.id }, (err) => {
      if (err) return res.status(500).json({ success: false })
        return res.json({ success: true });
      });
  });
})

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
    if (req.body.banner) contributionFields.banner = req.body.banner;
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
    if (req.body.banner) contributionFields.banner = req.body.banner;
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
