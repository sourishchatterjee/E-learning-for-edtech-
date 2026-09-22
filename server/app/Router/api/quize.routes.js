const express = require('express');
const router = express.Router();
const quizController = require('../../Module/quiz/controller/quiz.controller');


// Quiz routes
router.post('/createquizzes', quizController.createQuiz);
router.post("/updatequiz/:id",quizController.editQuiz);
router.get('/allquizes',quizController.allQuizes);

router.get('/total_Quiz',quizController.countQuiz); 


module.exports=router;