const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  questions: [
    {
      text: {
        type: String,
        required: true
      },
      options: [
        {
          type: String,
          required: true
        }
      ],
      correctAnswerIndex: {
        type: Number, 
        required: true
      }
    }
  ],
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Quiz', questionSchema);
