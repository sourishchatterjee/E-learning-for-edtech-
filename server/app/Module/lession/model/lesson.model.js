// models/Video.js

const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  video: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default:false
  },
  rating:{
    type:Number,
    default:0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('lessonVideo', videoSchema);
