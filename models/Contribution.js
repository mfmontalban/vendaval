const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ContributionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  status: {
    type: String,
    default: 'Draft'
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  banner: {
    type: String
  },
  images: {
    type: [String]
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('contribution', ContributionSchema);
