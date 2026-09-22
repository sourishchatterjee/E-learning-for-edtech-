const express=require('express');
const router = express.Router();
const courseController = require('../../Module/courses/controller/course.controller');
const webController =require('../../Module/webPage/controller/webHome.controller');
const commentModel = require('../../Module/comment/controller/comment.controller');
const {AuthOptionalCheck} =require('../../Middleware/userAuth');

// for category
router.get('/category',webController.categories);

// for popular course
router.get('/popularCourse',AuthOptionalCheck,webController.popularCourses);

// for courseComment
router.get('/comment',webController.courseComment);

// for disable comment
router.get('/disableComment/:id',webController.disableComment);

// for enable comment
router.get('/enableComment/:id',webController.enableComment);

// for get course of a particular category at home page
router.get('/category/:id',AuthOptionalCheck,webController.courseOfParticularCategory);

// for get course details of popular course at homepage
router.get('/course_Details/:id',webController.getCousrBypopularCourse);

// for get course by searchbar
router.get('/search_course',AuthOptionalCheck,courseController.searchCourseBYSearchBar);

// for contact page
router.post('/contact',webController.contactPage);

// for fetch allcourses
router.get('/courses',AuthOptionalCheck,courseController.getAllCourse);

// get course by id
router.get('/courseDetails/:id',AuthOptionalCheck, courseController.getCourseById);


// find comment by courseId
router.get('/course_comment/:courseId',commentModel.findCommentByCourseId)






module.exports=router;