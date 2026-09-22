const express=require('express');
const router=express.Router();
const userdashboardController = require('../../Module/userAuth/controller/dashboardController');
const enrolledCourse = require('../../Module/userAuth/controller/enrolledCourses');
const progressController = require('../../Module/progress/controller/progress.controller');
const courseController = require('../../Module/courses/controller/course.controller');

const {AuthCheck} = require('../../Middleware/userAuth');


router.get('/dashboardOverview',AuthCheck,userdashboardController.dashboardOverview);
router.get('/erollrd_course_details',AuthCheck,userdashboardController.findEnrolledCoursesDetails);

// enrolled course
router.post('/enrolledCourse',AuthCheck,enrolledCourse.enrolledCourse);
router.get('/enrolled_courses',AuthCheck,enrolledCourse.enrolledCourseDetails);

// progressbar
// router.post('/lesson_complete',AuthCheck,progressController.progressBar);
// router.get('/lesson/next/:courseId',AuthCheck,progressController.getNextLesson);

// add to cart
router.post('/toggleCourseInCart',AuthCheck,courseController.toggleCourseInCart);
router.get('/addtocart_course',AuthCheck,courseController.findAddcartCourses);

// my done///
router.get('/quizeperformance',AuthCheck,userdashboardController.getQuizPerformance);

module.exports=router;