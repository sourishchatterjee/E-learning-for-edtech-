const { Validator } = require("node-input-validator");
const courseRepositories = require("../../courses/repositories/course.repositories");
const quizRepositories = require("../../quiz/repositories/quiz.repositories");
const progressRepositories = require("../../progress/repositories/progress.repositories");
const puppeteer = require("puppeteer");
const quizRepo = require('../../quiz/repositories/quiz.repositories')
const quizModel = require('../../quiz/model/quiz.model')
class quizController {
//get all quizes
 async allQuizes(req, res) {
    try {
      const quizes = await quizRepositories.allQuizes();
      return res.status(200).json(quizes);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  // create quize

  async createQuiz(req, res) {
    try {
      const { courseId, title, ...rest } = req.body;

      // Step 1: Validate required fields using node-input-validator
      const v = new Validator(req.body, {
        courseId: "required|string",
        title: "required|string",
      });

      const matched = await v.check();
      if (!matched) {
        return res.status(422).json({ errors: v.errors });
      }

      // Step 2: Check if course exists
      const course = await courseRepositories.findCourseById(courseId);
      if (!course || course.isDeleted) {
        return res.status(404).json({ message: "Course not found or deleted" });
      }

      // Step 3: Extract question indices (e.g., text_1, options_1, correctAnswerIndex_1)
      const questionIndices = Object.keys(rest)
        .filter((key) => key.startsWith("text_"))
        .map((key) => key.split("_")[1])
        .filter((value, index, self) => self.indexOf(value) === index); // Unique

      const questions = [];

      for (const index of questionIndices) {
        const text = rest[`text_${index}`];
        let options = rest[`options_${index}`];
        const correctAnswerIndex = parseInt(
          rest[`correctAnswerIndex_${index}`],
          10
        );

        // Validate
        if (!text || !options || isNaN(correctAnswerIndex)) {
          return res
            .status(400)
            .json({
              message: `Missing or invalid fields in question ${index}`,
            });
        }

        // Normalize options
        if (typeof options === "string") {
          try {
            options = JSON.parse(options);
          } catch {
            options = [options];
          }
        }

        if (correctAnswerIndex < 0 || correctAnswerIndex >= options.length) {
          return res
            .status(400)
            .json({
              message: `Invalid correctAnswerIndex for question ${index}`,
            });
        }

        questions.push({ text, options, correctAnswerIndex });
      }

      // Step 4: Create Quiz

      const quizData = {
        courseId,
        title,
        questions,
      };

      const newQuiz = await quizRepositories.createQuiz(quizData);

      // save Quiz to Course
      await quizRepositories.addQuizToCourse(courseId, newQuiz._id);

      return res.status(200).json({
        success: true,
        message: "Quiz created and linked to course",
        quiz: newQuiz,
      });
    } catch (error) {
      console.error("Quiz creation failed:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
//edit quize
editQuiz = async (req, res) => {
  try {
    const { title, courseId, questions } = req.body;

    const quizId = req.params.quizId; // ✅ Extract it from URL
   

    const updatedQuiz = await quizRepositories.editQuiz(quizId, {
      title,
      courseId,
      questions,
    });

    return res.status(200).json({
      success: true,
      message: "Quiz updated successfully",
      quiz: updatedQuiz,
    });
  } catch (error) {
    console.error("Quiz update failed:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



  // get quiz by quiz id
  async getQuizById(req, res) {
    try {
      const quiz = await quizRepositories.findQuizById(req.params.quizId);

      if (!quiz || quiz.isDeleted) {
        return res.status(400).json({
          success: false,
          message: "Quiz not found or deleted",
        });
      }

      const courseId = quiz.courseId;
      const userId = req.user.id;

      const course = await courseRepositories.findCourseById(courseId);
      if (!course || course.isDeleted) {
        return res.status(404).json({
          success: false,
          message: "Course not found or deleted",
        });
      }

      const totalLessons = course.lessons.length;
      if (totalLessons <= 0) {
        return res.status(400).json({
          success: false,
          message: "Don't have any lesson,you can't start quiz!",
        });
      }
      const progress = await quizRepositories.findUserProgress(
        userId,
        courseId
      );
      const completedLessons = progress?.lessonsCompleted?.length || 0;

      // Step 4: Check if lessons completed
      if (completedLessons < totalLessons) {
        return res.status(400).json({
          success: false,
          message:
            "You must complete all lessons of this course to access the quiz",
        });
      }

      // Remove correctAnswerIndex from the response
      const sanitizedQuiz = {
        _id: quiz._id,
        courseId: quiz.courseId,
        title: quiz.title,
        questions: quiz.questions.map((q) => ({
          text: q.text,
          options: q.options,
        })),
      };

      return res.status(200).json({
        success: true,
        message: "Quiz fetched successfully",
        data: sanitizedQuiz,
      });
    } catch (err) {
      console.error("Error fetching quiz:", err);
      return res.status(400).json({
        success: false,
        message: "Failed to fetch quiz",
        error: err.message,
      });
    }
  }

  // submit result
  async submitQuiz(req, res) {
    try {
      const { quizId, answers } = req.body;
      const userId = req.user.id;

      // 1. Find Quiz
      const quiz = await quizRepositories.findQuizById(quizId);
      if (!quiz || quiz.isDeleted) {
        return res.status(400).json({
          success: false,
          message: "Quiz not found or deleted.",
        });
      }

      /////
      // 2. Check if User already attempted this Quiz
      const existingResult = await quizRepositories.findResultByUserAndQuiz(
        userId,
        quizId
      );
   //console.log("existingResult",existingResult)

     if (existingResult) {
  if (existingResult.achieved === "Pass") {
    return res.status(400).json({
      success: false,
      message: "You have already passed this quiz. You cannot attempt again.",
    });
  } else {
    
    await quizRepositories.deleteResultById(existingResult._id); 
    console.log("Previous failed result removed to allow reattempt.");
  }
}


      // 2. Calculate points
      let points = 0;
      const detailedAnswers = answers.map((ans, idx) => {
        const correctAnswerIndex = quiz.questions[idx]?.correctAnswerIndex;
        const correctAnswer = quiz.questions[idx]?.options[correctAnswerIndex];

        const isCorrect = ans.userAnswer === correctAnswer;
        if (isCorrect) points++;

        return {
          questionText: quiz.questions[idx]?.text,
          userAnswer: ans.userAnswer,
          correctAnswer: correctAnswer,
          isCorrect: isCorrect,
        };
      });

      console.log("points" + points);
      console.log("total" + quiz.questions.length);

      const percentage = (points / quiz.questions.length) * 100;
      const passed = points >= quiz.questions.length / 2;

      const certificateId = passed
        ? `CERT-${quizId.toString().slice(-5)}-${userId.toString().slice(-5)}`
        : "";

      // 3. Save Result using Repository
      const result = await quizRepositories.createResult({
        userId: userId,
        quizId: quiz._id,
        courseId: quiz.courseId,
        answers: detailedAnswers,
        points: points,
        percentage: percentage,
        achieved: passed ? "Pass" : "Fail",
        certificateId: certificateId,
      });

      const progress = await quizRepositories.updateQuizScore(
        userId,
        quiz.courseId,
        {
          quizId: quiz._id,
          score: points,
        }
      );

      return res.status(200).json({
        success: true,
        message: "Quiz submitted and progress updated successfully.",
        data: {
          result,
          progress,
        },
      });
    } catch (err) {
      console.error("Error submitting quiz:", err);
      return res.status(400).json({
        success: false,
        message: "Internal server error.",
        error: err.message || err,
      });
    }
  }

  ///////
  // get result by userId
  async getResult(req, res) {
    try {
      const { courseId } = req.params; 
      const userId = req.user.id; 

      const results = await quizRepositories.findResultsByUserAndCourse(
        userId,
        courseId
      );

      if (!results.length) {
        return res.status(404).json({
          success: false,
          message: "No quiz results found for this course.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Quiz results fetched successfully.",
        data: results,
      });
    } catch (err) {
      console.error("Error fetching results:", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
        error: err.message || err,
      });
    }
  }

  // fetch user certificate all data for viewing certificate
  async getCertificateData(req, res) {
  try {
    const userId = req.user.id;

    const results = await quizRepositories.getCertificateData(userId);

    if (!results || results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No certificate data found. Please make sure you passed the quiz.'
      });
    }

    const passedCertificates = results.filter(result => result.achieved === 'Pass');

    if (passedCertificates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Certificate only available for passed quizzes.'
      });
    }

    // Extract user info (once)
    const user_id = passedCertificates[0].user._id;
    const user = passedCertificates[0].user.name;
    const user_Email = passedCertificates[0].user.email;

    // Prepare certificates
    const certificates = passedCertificates.map(result => ({
      course: result.course.title,
      quiz: result.quiz.title,
      quizId: result.quiz._id,
      courseId: result.course._id,
      percentage: result.percentage,
      achieved: result.achieved,
      certificateId: result.certificateId,
      date: result.createdAt
    }));

    return res.status(200).json({
      success: true,
      message: 'Certificate data fetched successfully.',
      user_id,
      user,
      user_Email,
      certificates
    });

  } catch (err) {
    console.error('Error fetching certificate data:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    });
  }
}
  // download pdf
  async downloadCertificateFromUrl(req, res) {
    try {
      const { url } = req.body;
      const userId = req.user.id;

      if (!url) {
        return res
          .status(400)
          .json({ success: false, message: "Certificate URL is required" });
      }

      if (!url.includes(userId)) {
        return res
          .status(403)
          .json({
            success: false,
            message: "You are not authorized to download this certificate",
          });
      }

      const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox"],
      });
      const page = await browser.newPage();

      await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });

      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "20px",
          bottom: "20px",
          left: "20px",
          right: "20px",
        },
      });

      await browser.close();

      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="certificate.pdf"',
      });

      return res.send(pdfBuffer);
    } catch (err) {
      console.error("Error downloading certificate from URL:", err);
      try {
        if (browser) await browser.close();
      } catch (closeErr) {
        console.error("Error closing Puppeteer:", closeErr);
      }

      return res.status(500).json({
        success: false,
        message: "Failed to generate PDF",
        error: err.message,
      });
    }
  };


  
  // Get all quiz results for the logged-in user//
   async getAllResultsByUser(req, res) {
    try {
      const userId=req.user.id;
      
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const results = await quizRepo.findAllResultsByUser(userId);

      return res.status(200).json({
        success: true,
        count: results.length,
        data: results
      });
    } catch (error) {
      console.error('Error fetching all results of the user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  ////
async countQuiz(req,res){
    try{

      const totalQuiz = await quizModel.countDocuments();
      return res.status(200).json({
        totalQuiz
      })
      

    }catch(err){
      console.log(err);
      
    }
  }


}

module.exports = new quizController();
