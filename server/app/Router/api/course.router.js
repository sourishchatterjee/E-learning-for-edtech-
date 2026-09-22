

const express = require('express');
const router = express.Router();
const courseImageUpload=require('../../Helper/uploadImage');
const courseController = require('../../Module/courses/controller/course.controller');


function multerErrorHandler(req, res, next) {
    courseImageUpload.single('image')(req, res, function (err) {
        if (err) {
            return res.status(400).json({
                message: err.message
            });
        }
        next();
    });
}

router.post('/createcourse',multerErrorHandler, courseController.createCourse);
router.post('/updatecourse/:id',multerErrorHandler,courseController.updateCourse);
router.delete('/deletecourse/:id', courseController.deleteCourse);
router.get('/getallcourses',courseController.getAllCourse);
router.get('/allcategorieswithoutpagination',courseController.allCourseWithoutPagination);
// get lesson for a particular course
router.get('/getcourse/:id', courseController.getCourseById);


module.exports = router;