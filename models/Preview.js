const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PreviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  pictureSm: {
    type: String,
    required: true,
  },
  pictureLg: {
    type: String,
    required: true,
  },
});

module.exports = Preview = mongoose.model('previews', PreviewSchema);
