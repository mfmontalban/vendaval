const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ContributionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'profiles'
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
  },
  lat: {
    type: String,
  },
  lon: {
    type: String,
  },
  likesUp: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  likesDown: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  shares: {
    type: String,
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      avatar: {
        type: String
      },
      handle: {
        type: String
      },
      name: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
});

module.exports = Profile = mongoose.model('contribution', ContributionSchema);
