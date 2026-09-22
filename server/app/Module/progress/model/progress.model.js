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
  },
  attemptedAt: {
    type: Date,
    default: Date.now
  }
});

const progressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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
  quizScores: [quizScoreSchema],
  progressPercentage: {
    type: Number,
    default: 0
  },
  currentLessonIndex: {
    type: Number,
    default: 0
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Progress', progressSchema);
