const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Grid = require('gridfs-stream');
const multer = require('multer');
const mongoURI = process.env.MONGODB_URI || require('../../config/keys').mongoURI;
var conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true });
Grid.mongo = mongoose.mongo;
const sharp = require('sharp');

ObjectID = require('mongodb').ObjectID;

// Load Validation
const validateContributionInput = require('../../validation/contribution');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');
// Load Contribution Model
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
  }).array('file', 3);

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
    if (req.files) {
      return res.json({
        success: true,
        response: req.files
      });
    }
    res.send({ success: false });
  });
  router.delete('/files/:id', (req, res) => {
    gfs.remove({ filename: req.params.id }, (err) => {
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
      .populate('reviewer', ['name'])
      .then(contributions => {
        if (!contributions) {
          errors.noprofile = 'There are no profiles';
          return res.status(404).json(errors);
        }

        res.json(contributions);
      })
      .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route   GET api/staff/readStaffReviewers
// @desc    readStaffReviewers
// @access  Private
router.get(
  '/readStaffReviewers',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    User.find({ $or: [{'staff': 'reviewer'}, {'staff': 'manager'}] })
      .then(users => {
        if (!users) {
          // errors.noprofile = 'There are no profiles';
          // return res.status(404).json(errors);
        }

        res.json(users);
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
    if (req.body.bannerOriginal) contributionFields.bannerOriginal = req.body.bannerOriginal;
    if (req.body.bannerSm) contributionFields.bannerSm = req.body.bannerSm;
    if (req.body.bannerLg) contributionFields.bannerLg = req.body.bannerLg;
    if (req.body.description) contributionFields.description = req.body.description;
    if (req.body.content) contributionFields.content = req.body.content;
    if (req.body.lat) contributionFields.lat = req.body.lat;
    if (req.body.lon) contributionFields.lon = req.body.lon;
    if (req.body.contentHTML) contributionFields.contentHTML = req.body.contentHTML;

    Profile.findOne({ user: req.user.id})
    .then(prof => {
      if (prof) {
        contributionFields.profile = prof._id;
      }

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
    })
    .catch(err => res.status(404).json(err));
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
      .populate('user', ['name'])
      .populate('profile', ['avatarSm', 'handle', 'title'])
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
    if (req.body.bannerOriginal) contributionFields.bannerOriginal = req.body.bannerOriginal;
    if (req.body.bannerSm) contributionFields.bannerSm = req.body.bannerSm;
    if (req.body.bannerLg) contributionFields.bannerLg = req.body.bannerLg;
    if (req.body.description) contributionFields.description = req.body.description;
    if (req.body.content) contributionFields.content = req.body.content;
    if (req.body.lat) contributionFields.lat = req.body.lat;
    if (req.body.lon) contributionFields.lon = req.body.lon;
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

// @route   POST api/staff/contributionStatus/:id
// @desc    Edit contribution status
// @access  Private
router.post(
  '/contributionStatus/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    // Get fields
    const contributionFields = {};
    contributionFields.user = req.user.id;
    contributionFields.updatedAt = Date.now();
    if (req.body.status) contributionFields.status = req.body.status;
    
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

// @route   POST api/staff/contributionReviewer/:id
// @desc    Edit contribution reviewer
// @access  Private
router.post(
  '/contributionReviewer/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    // Get fields
    const contributionFields = {};
    contributionFields.user = req.user.id;
    if (req.body.reviewer) contributionFields.reviewer = new ObjectID(req.body.reviewer);

    console.log(contributionFields)
    
    Contribution.findOne({_id: req.params.id}).then(contribution => {
      if (contribution) {
        // Update Profile
        Contribution.findOneAndUpdate(
          { _id: req.params.id },
          { $set: contributionFields }
        ).then(contribution => res.json(contribution));
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
