const lessonVideoController=require('../../Module/lession/controller/lesson.controller');
const express = require('express');
const router = express.Router();
const videoUpload = require('../../Helper/uploadVideos');

function multerErrorHandler(req, res, next) {
    videoUpload.single('video')(req, res, function (err) {
        if (err) {
            return res.status(400).json({
                message: err.message
            });
        }
        next();
    });
}



router.post('/add_lesson/:courseId',multerErrorHandler,lessonVideoController.addLession);
router.post('/update_lesson/:lessonId',multerErrorHandler,lessonVideoController.updateLesson);
router.get('/delete_lesson/:lessonId',lessonVideoController.lessonDelete);


// router.get('/show_lesson',lessonVideoController.showLession);



module.exports=router;