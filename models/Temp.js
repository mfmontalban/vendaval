const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TempSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  key: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Temp = mongoose.model('temps', TempSchema);