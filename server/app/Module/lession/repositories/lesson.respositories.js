const lessonModel=require('../model/lesson.model');
const courseModel=require('../../courses/model/courseModel');
const progressRepository =require('../../progress/repositories/progress.repositories');
const mongoose=require('mongoose');
const progressModel = require('../../progress/model/progress.model');
class lessonRepositories{

    async createLession(data){
        const newLesson = new lessonModel(data);
        return await newLesson.save();
    }




  async findByIdIfNotDeleted(id) {
    return await lessonModel.findOne({ _id: id, isDeleted: false });
  }

  async updateById(id, data) {
    return await lessonModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteLesson(id){
    return await lessonModel.findByIdAndUpdate(id,{
        $set:{
            isDeleted:true
        }
    })
  }

  async findLesson(){
    return await lessonModel.find();
  }


  async findCourse(id){
    return await courseModel.findOne({_id:id,isDeleted:false});
  }

  async  findLessonByTitleAndCourse(title, courseId) {
    return lessonModel.findOne({ title, courseId });

  }

// pushLessonTOCourse
async pushLessonTOCourse(courseId,lessonId){
  try {
    const course = await courseModel.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    const updateCourseLesson = await courseModel.findByIdAndUpdate({_id:courseId},{
      $addToSet:{
        lessons: lessonId
      }
    })
   
    return await updateCourseLesson;

  } catch (error) {
    throw new Error(error.message);
  }
}

// delete Lesson From Course

async deleteLessonFromCourse(lessonId) {
  return await courseModel.updateMany(
    { lessons: lessonId },
    { $pull: { lessons: lessonId } }
  );
}


  // Fetch lesson by lessonId and courseId to ensure the lesson belongs to the course

async getLessonByIdAndCourse(lessonId, courseId) {
  return await lessonModel.findOne({ _id: lessonId, courseId }).select('title video duration rating createdAt');
}




// get next repositories

async getNextLesson(userId, courseId) {
  let progress = await progressRepository.findProgress(userId, courseId);

  if (!progress) {
    progress = await progressModel.create({
      userId,
      courseId,
      lessonsCompleted: [],
      progressPercentage: 0,
      isCompleted: false,
      currentLessonIndex: 0
    });
  }

  const completedSet = new Set(progress.lessonsCompleted.map(id => id.toString()));
  const course = await courseModel.findById(courseId).select('lessons');
  if (!course || !Array.isArray(course.lessons) || course.lessons.length === 0) {
    throw new Error("Course or lessons not found");
  }

  let nextLessonId = null;
  let index = progress.currentLessonIndex;

  // Step 1: If some lessons are completed, try to find the next uncompleted lesson
  for (let i = index; i < course.lessons.length; i++) {
    const lessonId = course.lessons[i];
    if (!completedSet.has(lessonId.toString())) {
      nextLessonId = lessonId;
      progress.currentLessonIndex = i + 1; // Update index for next fetch
      break;
    }
  }

  // Step 2: If no next lesson is found (i.e., all lessons are completed), loop back to the first lesson
  if (!nextLessonId) {
    nextLessonId = course.lessons[0]; // Start from the first lesson again
    progress.lessonsCompleted = []; // Optionally reset completed lessons to allow looping
    progress.currentLessonIndex = 1; // Update index to the second lesson (or first)
  }

  // Step 3: Save progress
  await progress.save();

  const nextLesson = await lessonModel.findById(nextLessonId).select('title video duration');
  if (!nextLesson) return null;

  // Calculate the progress percentage if needed
  const totalLessons = course.lessons.length;
  const completedLessons = progress.lessonsCompleted.length;

  if (completedLessons === totalLessons) {
    progress.progressPercentage = 100; // Ensure progress percentage is 100% when all lessons are completed
    progress.isCompleted = true; // Mark course as completed
  }

  // Save progress after calculation
  await progress.save();

  return {
    nextLesson,
    isCourseCompleted: progress.isCompleted,
    progressPercentage: progress.progressPercentage
  };
}










}

module.exports=new lessonRepositories();