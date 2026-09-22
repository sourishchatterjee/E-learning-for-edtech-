const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  refId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  refType: {
    type: String,
    required: true,
    enum: ['course', 'lesson', 'platform'],
  },
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: false 
  },
  isDelete: {
    type: Boolean,
    default: false
  },
  isAdminDelete: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', commentSchema);
