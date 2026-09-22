const { Validator } = require('node-input-validator');
const lessonRepositories = require('../../lession/repositories/lesson.respositories');
const courseRepositories = require('../../courses/repositories/course.repositories');
const fs = require('fs');
const courseModel = require('../../courses/model/courseModel');
const userRepositories = require('../../userAuth/repositories/user.repositories');
const commentRepositories = require('../../comment/repositories/comment.repositories');


class lessonVideoController {

  // add lession
  async addLession(req, res) {
    try {
      const v = new Validator(req.body, {
        title: 'required|string|minLength:3',
        duration: 'required|string',
      })

      const matched = await v.check();

      if (!matched) {
        return res.status(422).json({ message: 'Validation failed', errors: v.errors });
      }
      const courseId = req.params.courseId;

      //need to course model check
      const findCourse = await lessonRepositories.findCourse(courseId);

      if (!findCourse) {
        return res.status(400).json({
          message: "Course is not available"
        })
      }

      const video = req.file ? req.file.path.replace(/\\/g, '/') : null;

      if (!video) {
        return res.status(400).json({ message: 'Video file is required' });
      }
      const { title, duration } = req.body;

      // check same title
      const existingLesson = await lessonRepositories.findLessonByTitleAndCourse(title, courseId);
      if (existingLesson) {
        return res.status(400).json({
          message: "This lesson already exists in this course!"
        });
      }
      


      const lessonData = await lessonRepositories.createLession({
        courseId, title, video, duration
      })

      const addLessonToCourse=await lessonRepositories.pushLessonTOCourse(findCourse._id,lessonData._id);
     
      if(!addLessonToCourse){
        return res.status(201).json({ message: 'lesson added unsucessful to this course', data: lessonData });

      }

      if (lessonData) {
        return res.status(201).json({ message: 'lesson added successfully.', data: lessonData });
      }

    } catch (err) {
      return res.status(400).json({
        message: "lesson added failed",
        error: err.message || err,
      });
    }
  }

  // update lesson
  async updateLesson(req, res) {
    try {
      const lessonId = req.params.lessonId;

      const v = new Validator(req.body, {
        title: 'required|string|minLength:3',
        duration: 'required|string',
      });

      const matched = await v.check();

      if (!matched) {
        return res.status(422).json({
          message: 'Validation failed',
          errors: v.errors,
        });
      }

      const existingVideo = await lessonRepositories.findByIdIfNotDeleted(lessonId);

      if (!existingVideo) {
        return res.status(404).json({
          message: 'lesson not found or has been deleted',
        });
      }


      let video = existingVideo.video;

      if (req.file) {
        const oldVideoPath = existingVideo.video;

        if (fs.existsSync(oldVideoPath)) {
          fs.unlinkSync(oldVideoPath);
        }

        video = req.file.path.replace(/\\/g, '/');
      }

      const { title, duration } = req.body;

      // if data is not change
      if (existingVideo.title == title && existingVideo.duration == duration && !req.file) {
        return res.status(400).json({
          message: "No data detect to update!!"
        })
      }

      const updatedVideo = await lessonRepositories.updateById(lessonId, {
        title,
        video: video,
        duration
      });

      return res.status(200).json({
        message: 'Video updated successfully',
        data: updatedVideo,
      });

    } catch (err) {
      return res.status(500).json({
        message: 'Lesson update failed',
        error: err.message || err,
      });
    }
  }


  // delete lesson

  async lessonDelete(req, res) {
    try {
      const lessonId = req.params.lessonId;

      const lessonDetails = await lessonRepositories.findByIdIfNotDeleted(lessonId);
      if (!lessonDetails) {
        return res.status(404).json({
          message: 'lesson not found or has been deleted',
        });
      }
      const videoPath = lessonDetails.video;
      const deleteLesson = await lessonRepositories.deleteLesson(lessonId);
      if (deleteLesson) {
        if (fs.existsSync(videoPath)) {
          fs.unlinkSync(videoPath);
        }

        await lessonRepositories.deleteLessonFromCourse(lessonId);

        return res.status(404).json({
          message: 'lesson has been deleted',
        });
      }


    } catch (err) {
      return res.status(500).json({
        message: 'Lesson deleted failed',
        error: err.message || err,
      });
    }
  }

  // get all lession
  async showLession(req, res) {
    try {
      const findLesson = await lessonRepositories.findLesson();
      if (!findLesson) {
        return res.status(400).json({
          message: "No lesson found",

        })
      }

      return res.status(200).json({
        message: "lesson fetches succful!!",
        data: findLesson
      })
    } catch (err) {
      return res.status(400).json({
        message: 'Lesson deleted failed',
        error: err.message || err,
      });
    }
  }



  // get lesson by id

  async getLessonById(req, res) {
    const { lessonId } = req.params;
    const { courseId } = req.query;
    const userId = req.user.id; 
    
    try {

      const course = await courseRepositories.findCourseById(courseId);
      if (!course) {
        return res.status(404).json({ success: false, message: "Course not found" });
      }

      const user = await userRepositories.findUserById(userId);
      if (!user || !user.enrolledCourses.includes(courseId)) {
        return res.status(403).json({ success: false, message: "You are not enrolled in this course" });
      }

      const lesson = await lessonRepositories.getLessonByIdAndCourse(lessonId, courseId);
      if (!lesson) {
        return res.status(404).json({ success: false, message: "Lesson not found in the specified course" });
      }
      const comments = await commentRepositories.getCommentsByRefId(lessonId, 'lesson');

      return res.status(200).json({
        success: true,
        lesson,
        comments
      });

    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }




  async getNextLesson (req, res) {
    const userId = req.user.id;
    const courseId = req.params.courseId;
  
    try {

      const user = await userRepositories.findUserById(userId);
      if (!user || !user.enrolledCourses.includes(courseId)) {
        return res.status(403).json({ success: false, message: "You are not enrolled in this course" });
      }
      const result = await lessonRepositories.getNextLesson(userId, courseId);
  
      if (!result) {
        return res.status(200).json({ message: "You have completed all lessons in this course!" });
      }
  
      return res.status(200).json({
        message: "Next lesson fetched successfully",
        nextLesson: result.nextLesson,
        isCourseCompleted: result.isCourseCompleted
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

}

module.exports = new lessonVideoController();