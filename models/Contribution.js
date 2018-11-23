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
  type: {
    type: String
  },
  topic: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  content: {
    type: String
  },
  contentHTML: {
    type: String
  },
  banner: {
    data: Buffer,
    type: String
  },
  images: {
    data: Buffer,
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
