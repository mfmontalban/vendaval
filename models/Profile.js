const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  avatar: {
    type: String
  },
  avatarSm: {
    type: String
  },
  avatarLg: {
    type: String
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  likesUp: [
    {
      contribution: {
        type: Schema.Types.ObjectId,
        ref: 'contributions'
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  likesDown: [
    {
      contribution: {
        type: Schema.Types.ObjectId,
        ref: 'contributions'
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  comments: [
    {
      contribution: {
        type: Schema.Types.ObjectId,
        ref: 'contributions'
      },
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      },
      likes: [
        {
          profile: {
            type: Schema.Types.ObjectId,
            ref: 'profiles'
          },
          date: {
            type: Date,
            default: Date.now
          },
        }
      ],
      comments: [
        {
          profile: {
            type: Schema.Types.ObjectId,
            ref: 'profiles'
          },
          date: {
            type: Date,
            default: Date.now
          },
          likes: [
            {
              profile: {
                type: Schema.Types.ObjectId,
                ref: 'profiles'
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

module.exports = Profile = mongoose.model('profiles', ProfileSchema);
