
const express = require('express');
const router = express.Router();
const lessonController = require('../../Module/lession/controller/lesson.controller');
const progressController = require('../../Module/progress/controller/progress.controller');
const {AuthCheck} = require('../../Middleware/userAuth');

router.get('/get_lesson/:lessonId',AuthCheck,lessonController.getLessonById);
router.post('/lesson_mark_unmark',AuthCheck,progressController.markLessonCompletion);
router.get('/next-lesson/:courseId', AuthCheck, lessonController.getNextLesson);

module.exports=router;