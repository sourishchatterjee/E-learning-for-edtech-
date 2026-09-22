// models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizScoreSchema = new Schema({
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});

const progressSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  lessonsCompleted: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Lesson'
    }
  ],
  quizScores: [quizScoreSchema]
});


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  role:{
    type:String,
    default: 'user'
  },
  isDeleted:{
    type:Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  enrolledCourses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }
  ],
  cartCourses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }
  ],
  progress: [progressSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
