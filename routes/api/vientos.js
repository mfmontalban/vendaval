const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
ObjectID = require('mongodb').ObjectID;

// Load User Model
const Contribution = require('../../models/Contribution');

// @route   GET api/vientos/getAll
// @desc    Get most recent vientos
// @access  Public
router.get(
  '/getAll', (req, res) => {
    const errors = {};

    Contribution.find({ status: 'Live' })
      .then(contributions => {
        if (!contributions) {
          errors.novientos = 'There are no vientos to show';
          return res.status(404).json(errors);
        }

        res.json(contributions);
      })
      .catch(err => res.status(404).json({ profile: 'There are no vientos to show' }));
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

module.exports = router;
