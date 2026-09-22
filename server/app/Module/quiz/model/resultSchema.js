const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',   // Corrected
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
  answers: [{
    questionText: String,
    userAnswer: String,
    correctAnswer: String,
    isCorrect: Boolean
  }],
  points: {
    type: Number,
    default: 0
  },
  percentage:{
    type: Number,
    default: 0
  },
  achieved: {
    type: String,
    default: ''
  },

  certificateId:{
    type:String,
    default:''
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model("Result", resultSchema);
