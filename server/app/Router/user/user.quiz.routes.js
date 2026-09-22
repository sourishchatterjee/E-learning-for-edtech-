
const express = require('express');
const router = express.Router();
const quizController=require('../../Module/quiz/controller/quiz.controller');
const {AuthCheck} = require('../../Middleware/userAuth');


router.get('/quiz/:quizId',AuthCheck,quizController.getQuizById)

router.post('/submit_quiz',AuthCheck,quizController.submitQuiz);

//get all users result////
//router.get('/user/allresults', AuthCheck, quizController.getAllResultsByUser);
router.get('/allresults', AuthCheck,quizController.getAllResultsByUser);

// get result

router.get('/result/:courseId',AuthCheck,quizController.getResult);

// get certificate data
router.get('/certificate', AuthCheck,quizController.getCertificateData);

// download certificate
router.post('/download', AuthCheck,quizController.downloadCertificateFromUrl);


module.exports=router;