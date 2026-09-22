
const courseRepositories = require('../../courses/repositories/course.repositories');
const progressRepository = require('../../progress/repositories/progress.repositories');
const userRepository = require('../../userAuth/repositories/user.repositories');
const lessonRepository = require('../../lession/repositories/lesson.respositories');

class progressController{

    async progressBar(req,res){
        const userId = req.user.id;
        
        const { courseId, lessonId } = req.body;
      
        try {

          const user = await userRepository.findUserById(userId);
          if (!user || !user.enrolledCourses.includes(courseId)) {
            return res.status(403).json({ message: 'You are not enrolled in this course.' });
          }

          const result = await progressRepository.markLessonAsCompleted(userId, courseId, lessonId);

          if (!result) {
            const course = await progressRepository.findCourse(courseId);
            if(!course){
              return res.status(400).json({
                message:"course not found"
              })
            }

            return res.status(200).json({
              message: 'You have completed all the lessons in this course!',
              isCourseCompleted: true,
              unlockedQuizzes: course.quizzes || [] // optionally fetch real quizzes if needed
            });
          }

          const { nextLesson, progressPercentage,unlockedQuizzes, isCourseCompleted } = result;
          if (!nextLesson) {
            return res.status(200).json({
              message: 'You have completed all the lessons in this course!',
              isCourseCompleted:true, 
              unlockedQuizzes
            });
          }

          return  res.status(200).json({
            message: 'Lesson marked as completed, now fetching the next lesson.',
            nextLesson: nextLesson,
            progressPercentage:progressPercentage,
            isCourseCompleted: isCourseCompleted ,
            unlockedQuizzes: unlockedQuizzes

          });
          
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
}



  // Endpoint to get the current or next lesson

// async getNextLesson(req, res) {
//   const userId = req.user.id;
//   const courseId = req.params.courseId;
  
  
//   try {

//     const user = await userRepository.findUserById(userId);
//     if (!user || !user.enrolledCourses.includes(courseId)) {
//       return res.status(403).json({ message: 'You are not enrolled in this course.' });
//     }

//      let progress = await progressRepository.findProgress(userId, courseId);
//      if (!progress) {
//        progress = await progressRepository.createProgress({
//          userId,
//          courseId,
//          lessonsCompleted: [],
//          progressPercentage: 0,
//          isCompleted: false
//        });
//      }

//     const nextLesson = await progressRepository.getNextLesson(userId, courseId);
//     if (!nextLesson) {
//       return res.status(200).json({
//         message: 'You have completed all lessons in this course!'
//       });
//     }
    
//     res.json({
//       message: 'Next lesson fetched successfully!',
//       nextLesson: nextLesson
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }






// new logic


  // API to mark/unmark lesson completion and calculate progress

  async markLessonCompletion(req, res) {
    const { lessonId, courseId, isCompleted } = req.body;
  
    try {
      const course = await courseRepositories.findCourseById(courseId);
      if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
      }
  
      const lesson = await lessonRepository.getLessonByIdAndCourse(lessonId, courseId);
      if (!lesson) {
        return res.status(404).json({ success: false, message: 'Lesson not found in the specified course' });
      }
  
      // Update progress
      const progress = await progressRepository.updateLessonCompletion(req.user.id, courseId, lessonId, isCompleted);
  
      // Recalculate progress percentage
      const totalLessons = course.lessons.length;
      const completedLessons = progress.lessonsCompleted.length;
      progress.progressPercentage = totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;
  
      // Check if course is completed
      progress.isCompleted = completedLessons === totalLessons && totalLessons > 0;
      
      // Save the updated progress
      await progress.save();
  
      return res.status(200).json({
        success: true,
        message: `Lesson ${isCompleted ? 'marked as completed' : 'unmarked as completed'}`,
        progressPercentage: progress.progressPercentage,
        isCourseCompleted: progress.isCompleted,
        lessonsCompleted: progress.lessonsCompleted
      });
  
    } catch (err) {
      console.error("Mark lesson error:", err.message);
      return res.status(500).json({ success: false, message: err.message });
    }
  }
  

}


module.exports= new progressController();