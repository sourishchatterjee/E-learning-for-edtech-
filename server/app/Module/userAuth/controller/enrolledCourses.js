const userRepositories = require('../../../Module/userAuth/repositories/user.repositories');
const courseRepositories = require('../../../Module/courses/repositories/course.repositories');

class enrolledCourse {

    //add enrolled course 
    async enrolledCourse(req, res) {

        try {

            const userId = req.user.id;

            const { courseId } = req.body;
            const checkCourse = await courseRepositories.findCourseById(courseId);
            if (!checkCourse) {
                return res.status(400).json({
                    message: "Course is not exist!!"
                })
            }

            const checkUser = await userRepositories.findUserById(userId);

            if (!checkUser) {
                return res.status(400).json({
                    message: "User is not exist!!"
                })
            }


            if (checkUser.enrolledCourses.includes(courseId)) {
                return res.status(400).json({ message: "You already enrolled in this course" });
            }

            checkUser.enrolledCourses.push(courseId);

            await checkUser.save();

            return res.status(200).json({
                message: "User enrolled in course successfully",
                enrolledCourses: checkUser.enrolledCourses
            });

        } catch (err) {
            return res.status(500).json({
                message: "Enrollment failed",
                error: err.message || err
            });
        }

    }



    // get enrolled course details
    async enrolledCourseDetails(req, res) {
        try {
          const userId = req.user.id;
      
          const checkUser = await userRepositories.findUserById(userId);
      
          if (!checkUser) {
            return res.status(400).json({
              message: "User does not exist!",
            });
          }
      
          if (checkUser.enrolledCourses.length === 0) {
            return res.status(400).json({
              message: "You haven't enrolled in any courses yet!",
            });
          }
      
          const findEnrolledCourse = await courseRepositories.findEnrolledCourse(userId);
      
          if (findEnrolledCourse.length === 0) {
            return res.status(404).json({
              message: "No enrolled courses found",
            });
          }
      
          return res.status(200).json({
            message: "Enrolled courses fetched successfully",
            enrolledCourses: findEnrolledCourse,
          });
      
        } catch (err) {
          return res.status(500).json({
            message: "Failed to fetch enrolled courses",
            error: err.message || err,
          });
        }
      }
      

    // get add to cart courses
   
}

module.exports = new enrolledCourse();