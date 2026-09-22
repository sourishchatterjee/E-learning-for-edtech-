
const mongoose = require('mongoose');
const validator = require('validator');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    minLength: [4, 'Title must be at least 4 characters'],
    maxLength: [80, 'Title cannot exceed 80 characters'],
    unique: true,
    validate: {
      validator: function (value) {
        return value.trim().length > 0;
      },
      message: 'Title cannot be empty or only spaces'
    }
  },
  category: {
    type: String,
    required: [true, 'Course category is required'],
    minLength: [4, 'Category must be at least 4 characters'],
    maxLength: [100, 'Category cannot exceed 100 characters'],
    trim: true,
    validate: {
      validator: function (value) {
        return value.trim().length > 0;
      },
      message: 'Category cannot be empty or only spaces'
    }
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    minLength: [4, 'Description must be at least 4 characters'],
    maxLength: [1000, 'Description cannot exceed 1000 characters'],
    trim: true,
    validate: {
      validator: function (value) {
        return value.trim().length > 0;
      },
      message: 'Description cannot be empty or only spaces'
    }
  },
  price: {
    type: Number,
    required: true,
    min: [40, 'Price must be at least 40'],
    max: [9000, 'Price cannot exceed 9000']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'lessonVideo' 
    }
  ],
  quizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz'
    }
  ],
  isDeleted:{
    type:Boolean,
    default: false
  },
  rating:{
    type:Number,
    default:0
  }
  
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
