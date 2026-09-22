const userRepositories = require('../../userAuth/repositories/user.repositories');
const quizRepositories = require('../../quiz/repositories/quiz.repositories');

class userdashboardController{
    // user dashboard
async dashboardOverview(req,res){
    try{
        if(req.user.isDeleted==true){
            return res.status(400).json({
                message: "You are not authenticate user"
            })
        }

        const userId = req.user.id;

        const user= await userRepositories.findUserById(userId);
        if(!user){
            res.status(400).json({
                message:"user not found"
            })
        }

        const totalEnrolledCourse = await userRepositories.findTotalEnrolledCourse(user);
        const totalCartCourses = await userRepositories.findTotalCartCourses(user);   
        const overallQuizPercentage = await userRepositories.calculateOverallQuizPercentage(userId);
        const certificateCount = await userRepositories.certificateCount(userId);

        res.status(200).json({
            
            totalEnrolledCourse:totalEnrolledCourse,
            totalCartCourses:totalCartCourses,
            overallQuizPercentage:overallQuizPercentage,
            totalcertificate: certificateCount
        })

    }catch(err){
        res.status(400).json({
            message: "Dashboard access failed !!",
            error:err.message||err

        })
    }
}


// find enroll courses and details
async findEnrolledCoursesDetails(req,res){
    try{
         const userId = req.user.id;

         const user= await userRepositories.findUserById(userId);
         if(!user){
             res.status(400).json({
                 message:"user not found"
             })
         }

        const findEnrolledCoursesDetails = await userRepositories.findEnrolledCoursesDetails(userId);
        
        if(!findEnrolledCoursesDetails || findEnrolledCoursesDetails.length===0){
            return res.status(400).json({
                message:"No enrolled courses found!"
            })
        }
        
        res.status(200).json({
            
          findEnrolledCoursesDetails
        })
        

    }catch(err){
        res.status(400).json({
            message: "enrolled courses access failed !!",
            error:err.message||err

        })
    }
}





// my done
// Get quiz performance across enrolled courses
getQuizPerformance = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const performance = await quizRepositories.getQuizPerformanceByUser(userId);
  
      return res.status(200).json({
        message: "Quiz performance fetched successfully.",
        performance
      });
  
    } catch (err) {
      console.error("Error in getQuizPerformance:", err);
      return res.status(500).json({
        message: "Internal server error.",
        error: err.message || err
      });
    }
  };
}

module.exports = new userdashboardController();