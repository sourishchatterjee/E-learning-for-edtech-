const courseModel = require('../../courses/model/courseModel');
const progressModel = require('../../progress/model/progress.model');
const lessonModel = require('../../lession/model/lesson.model'); 

class progressRepositories{


    async markLessonAsCompleted(userId, courseId, lessonId){

        let progress = await progressModel.findOne({userId,courseId});

        if(!progress){
            progress = new progressModel({
                userId,
                courseId,
                lessonsCompleted:[lessonId]
            });
        }else{
            if(!progress.lessonsCompleted.includes(lessonId)){
                progress.lessonsCompleted.push(lessonId);
            }
        }

        const course = await courseModel.findById(courseId).select('lessons quizzes');
        const totalLesson = course.lessons.length;

        const completeLesson = progress.lessonsCompleted.length;

        progress.progressPercentage = Math.round((completeLesson / totalLesson) * 100);

        progress.isCompleted = completeLesson === totalLesson;

        await progress.save();

        const unlockedQuizzes = progress.isCompleted ? course.quizzes : [];

        const nextLessonIndex = progress.lessonsCompleted.length;
        const nextLessonId = course.lessons[nextLessonIndex]; 
        if (!nextLessonId) return null; 

        const nextLesson = await lessonModel.findById(nextLessonId).select('title video duration');
        return {nextLesson,
            progressPercentage: progress.progressPercentage,
            unlockedQuizzes,  
            isCourseCompleted: progress.isCompleted
        };
     }



    // Get next lesson for the user in the course
  async getNextLesson(userId, courseId) {
    const progress = await progressModel.findOne({ userId, courseId });

    if (!progress) {
      return null; 
    }

    // Fetch the next lesson (if exists)
    const course = await courseModel.findById(courseId).select('lessons');
    const nextLessonIndex = progress.lessonsCompleted.length;
    const nextLessonId = course.lessons[nextLessonIndex];
    if (!nextLessonId) return null;

    const nextLesson = await lessonModel.findById(nextLessonId).select('title video duration');
    return nextLesson;
  }


  



//   find course

async findCourse(id){
    return await courseModel.findById(id).select('quizzes')
}


// findProgress
async findProgress(userId, courseId){
    return await progressModel.findOne({userId,courseId});
}

// create progress
async createProgress(data) {
    const progress = new progressModel(data);
    return await progress.save();
  }


// repositories/courseRepository.js
async getCourseWithLessons(courseId){
  return courseModel.findById(courseId).select('lessons');
};





// new logic

// Update lesson completion status
async updateLessonCompletion(userId, courseId, lessonId, isCompleted) {
  let progress = await progressModel.findOne({ userId, courseId });

  if (!progress) {
    progress = new progressModel({
      userId,
      courseId,
      lessonsCompleted: [],
      progressPercentage: 0,
      isCompleted: false
    });
  }

  const lessonIdStr = lessonId.toString();
  const currentCompleted = progress.lessonsCompleted.map(id => id.toString());

  // Add or remove lessonId from completed list
  if (isCompleted && !currentCompleted.includes(lessonIdStr)) {
    progress.lessonsCompleted.push(lessonId);
  } else if (!isCompleted) {
    progress.lessonsCompleted = progress.lessonsCompleted.filter(
      id => id.toString() !== lessonIdStr
    );
  }

  // Fetch course lessons
  const course = await courseModel.findById(courseId).select('lessons');
  if (!course || !Array.isArray(course.lessons)) {
    throw new Error('Course or lessons not found');
  }

  // Ensure only valid lessonIds are counted
  const courseLessonIds = course.lessons.map(id => id.toString());
  progress.lessonsCompleted = progress.lessonsCompleted.filter(id =>
    courseLessonIds.includes(id.toString())
  );

  const totalLessons = courseLessonIds.length;
  const completedLessons = progress.lessonsCompleted.length;

  // Calculate progress
  progress.progressPercentage = totalLessons > 0
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;

  progress.isCompleted = completedLessons === totalLessons && totalLessons > 0;

  await progress.save();

  return progress;
}






  // Get course progress data (percentage, lessons completed, etc.)
  async getCourseProgress(userId, courseId) {
    const progress = await progressModel.findOne({ userId, courseId });
    if (!progress) {
      return { progressPercentage: 0, isCompleted: false, lessonsCompleted: [] };
    }
    return {
      progressPercentage: progress.progressPercentage,
      isCompleted: progress.isCompleted,
      lessonsCompleted: progress.lessonsCompleted
    };
  }

}


module.exports= new progressRepositories();