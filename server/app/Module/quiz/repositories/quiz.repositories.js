const quiz = require('../../quiz/model/quiz.model');
const mongoose = require("mongoose");
const validator = require("validator");
const Course = require('../../courses/model/courseModel');
const progressModel=require('../../progress/model/progress.model');
const Result = require('../../quiz/model/resultSchema');
const resultSchema = require('../../quiz/model/resultSchema');


class quizRepositories {

  async  allQuizes() {
    try {
      const allQuizes = await quiz.find({isDeleted:false});
      return allQuizes
      
    } catch (error) {
      console.log(error)
      
    }
    
  }

    async createQuiz(quizData) {

     
        if (!quizData.title || validator.isEmpty(quizData.title.trim())) {
          throw new Error("Quiz title is required");
        }

        if (!quizData.courseId || !validator.isMongoId(quizData.courseId.toString())) {
            throw new Error("Valid courseId is required");
          }
      
          if (!Array.isArray(quizData.questions) || quizData.questions.length === 0) {
            throw new Error("Quiz must contain at least one question");
          }
    
        return await quiz.create(quizData);
      }

//edit quize      
async editQuiz(quizId, updatedData) {
  try {
    if (!quizId || !validator.isMongoId(quizId.toString())) {
      throw new Error("Valid quiz ID is required");
    }

    // Validate fields
    if (!updatedData.title || validator.isEmpty(updatedData.title.trim())) {
      throw new Error("Quiz title is required");
    }

    if (!updatedData.courseId || !validator.isMongoId(updatedData.courseId.toString())) {
      throw new Error("Valid courseId is required");
    }

    if (!Array.isArray(updatedData.questions) || updatedData.questions.length === 0) {
      throw new Error("Quiz must contain at least one question");
    }

    const updatedQuiz = await quiz.findByIdAndUpdate(
      quizId,
      {
        $set: {
          title: updatedData.title,
          //courseId: updatedData.courseId,
          questions: updatedData.questions,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedQuiz) {
      throw new Error("Quiz not found");
    }

    return updatedQuiz;

  } catch (error) {
    console.error("Error in editQuiz repository:", error);
    throw new Error(error.message || "Failed to update quiz");
  }
}



       //to add a quiz to a course 
    async addQuizToCourse(courseId, quizId) {
        
        try {
            return await Course.findByIdAndUpdate(
                courseId, 
                { $push: { quizzes: quizId } }, 
                { new: true } 
            );
        } catch (error) {
            console.log(error);
            
            throw new Error('Failed to link quiz to course');
        }
    }



    // find quiz by id
    async findQuizById(id) {
      if (!validator.isMongoId(id.toString())) {
        throw new Error("Invalid quiz ID");
      }
  
      return await quiz.findById(id);
    }


    // find progress
    async findUserProgress(userId, courseId) {
      return await progressModel.findOne({
        userId: new mongoose.Types.ObjectId(userId),
        courseId:new mongoose.Types.ObjectId(courseId)
      });
    }


////
    // create result
    async createResult(data) {
      return await Result.create(data);
    }
    //delete result
async deleteResultById(resultId) {
  return await Result.findByIdAndDelete(resultId);
}

// updateQuizScore in progress model
    async updateQuizScore(userId, courseId, quizData) {
      const progress = await progressModel.findOneAndUpdate(
        { userId, courseId },
        {
          $push: { quizScores: {
            quizId: quizData.quizId,
            score: quizData.score,
            attemptedAt: new Date()
          } }
        },
        { new: true, upsert: true } 
      );
      return progress;
    }


    // check user attempt q
    async findResultByUserAndQuiz(userId, quizId) {
      return await Result.findOne({ userId: userId, quizId: quizId, isDeleted: false });
    }


    // get result
    async findResultsByUserAndCourse(userId, courseId){
      return await resultSchema.find({ userId:userId, courseId:courseId,isDeleted:false})
    }


    //my done 
// Get all quiz results by user
// Get quiz performance with course and result details (aggregation)

async getQuizPerformanceByUser(userId) {
  userId = new mongoose.Types.ObjectId(userId);

  const performance = await Result.aggregate([
    { $match: { userId, isDeleted: false } },
    {
      $lookup: {
        from: "courses",
        localField: "courseId",
        foreignField: "_id",
        as: "course"
      }
    },
    { $unwind: "$course" },
    {
      $addFields: {
        correctAnswers: {
          $size: {
            $filter: {
              input: "$answers",
              as: "a",
              cond: { $eq: ["$$a.isCorrect", true] }
            }
          }
        },
        totalAnswers: { $size: "$answers" },
        wrongAnswers: {
          $size: {
            $filter: {
              input: "$answers",
              as: "a",
              cond: { $eq: ["$$a.isCorrect", false] }
            }
          }
        },
        quizAvailable: {
          $gt: [{ $size: "$course.quizzes" }, 0]
        }
      }
    },
    {
      $addFields: {
        percentage: {
          $cond: [
            { $eq: ["$totalAnswers", 0] },
            0,
            {
              $multiply: [
                { $divide: ["$correctAnswers", "$totalAnswers"] },
                100
              ]
            }
          ]
        },
        grade: {
          $switch: {
            branches: [
              { case: { $gte: ["$percentage", 90] }, then: "A+" },
              { case: { $gte: ["$percentage", 80] }, then: "A" },
              { case: { $gte: ["$percentage", 70] }, then: "B" },
              { case: { $gte: ["$percentage", 60] }, then: "C" },
              { case: { $gte: ["$percentage", 50] }, then: "D" },
            ],
            default: "F"
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        courseId: "$course._id",
        title: "$course.title",
        score: "$points",
        correct: "$correctAnswers",
        wrong: "$wrongAnswers",
        percentage: 1,
        grade: 1,
        quizAvailable: 1
      }
    }
  ]);

  return performance;
}




// getCertificateData
async getCertificateData(userId) {
  const objectUserId = new mongoose.Types.ObjectId(userId);

  return await Result.aggregate([
    {
      $match: {
        userId: objectUserId,
        isDeleted: false
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $unwind: '$user' },
    {
      $lookup: {
        from: 'courses',
        localField: 'courseId',
        foreignField: '_id',
        as: 'course'
      }
    },
    { $unwind: '$course' },
    {
      $lookup: {
        from: 'quizzes',
        localField: 'quizId',
        foreignField: '_id',
        as: 'quiz'
      }
    },
    { $unwind: '$quiz' },
    {
      $project: {
        certificateId: 1,
        percentage: 1,
        achieved: 1,
        createdAt: 1,
        user: { _id: '$user._id', name: '$user.name', email: '$user.email' },
        course: { _id: '$course._id', title: '$course.title' },
        quiz: { _id: '$quiz._id', title: '$quiz.title' }
      }
    }
  ]);
}
//new new
// Fetch all results for a user across all courses
// Fetch all quiz results for a user with course and quiz details using aggregation
async findAllResultsByUser(userId) {
  const objectUserId = new mongoose.Types.ObjectId(userId);

  const results = await Result.aggregate([
    {
      $match: {
        userId: objectUserId,
        isDeleted: false
      }
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'courseId',
        foreignField: '_id',
        as: 'course'
      }
    },
    { $unwind: '$course' },
    {
      $lookup: {
        from: 'quizzes',
        localField: 'quizId',
        foreignField: '_id',
        as: 'quiz'
      }
    },
    { $unwind: '$quiz' },
    {
      $project: {
        _id: 1,
        userId: 1,
        quizId: '$quiz._id',
        quizTitle: '$quiz.title',
        courseId: '$course._id',
        courseTitle: '$course.title',
        score: '$points',
        percentage: 1,
        achieved: 1,
        createdAt: 1,
        //answers: 1,
      }
    }
  ]);

  return results;
}


///


}

module.exports= new quizRepositories();