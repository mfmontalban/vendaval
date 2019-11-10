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
  bannerOriginal: {
    data: Buffer,
    type: String
  },
  bannerSm: {
    data: Buffer,
    type: String
  },
  bannerLg: {
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
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  likesDown: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      date: {
        type: Date,
        default: Date.now
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
      date: {
        type: Date,
        default: Date.now
      },
      category: {
        type: String,
      },
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          },
          date: {
            type: Date,
            default: Date.now
          },
        }
      ],
      replies: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          },
          date: {
            type: Date,
            default: Date.now
          },
          text: {
            type: String,
          },
          likes: [
            {
              user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
              },
              date: {
                type: Date,
                default: Date.now
              },
            }
          ],
        }
      ],
    }
  ],
});

module.exports = Contribution = mongoose.model('contributions', ContributionSchema);
