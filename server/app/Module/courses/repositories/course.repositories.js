const courseModel = require('../model/courseModel');
const userModel = require('../../userAuth/model/user.model');
const commentModel = require('../../comment/model/comment.model');
const progressModel = require('../../../Module/progress/model/progress.model');
const mongoose = require('mongoose');

class courseRepository {
    //create
    async createCourse(courseData){
        const newCourse = new courseModel(courseData);
        return await newCourse.save();
    }
        
    async updateCourse(id, updateData){
        return await courseModel.findByIdAndUpdate(id, updateData, { new: true });
    }
        
    // find all course
    async findCourse(title){
      return await courseModel.findOne({title},{isDeleted:false});
    }

    // findCourseWithLessons
  async findCourseWithLessons(courseId, userId) {
  const courseData = await courseModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(courseId),
        isDeleted: false
      }
    },
    {
      $lookup: {
        from: 'lessonvideos',
        localField: 'lessons',
        foreignField: '_id',
        as: 'lessons',
        pipeline: [
          { $match: { isDeleted: false } },
          {
            $lookup: {
              from: 'comments',
              let: { lessonId: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ['$refId', '$$lessonId'] },
                        { $eq: ['$refType', 'lesson'] },
                        { $eq: ['$isDelete', false] },
                        { $eq: ['$isAdminDelete', false] }
                      ]
                    }
                  }
                },
                {
                  $project: {
                    _id: 1,
                    userId: 1,
                    comment: 1,
                    rating: 1,
                    createdAt: 1
                  }
                }
              ],
              as: 'comments'
            }
          },
          {
            $project: {
              _id: 1,
              title: 1,
              video: 1,
              duration: 1,
              rating: 1,
              createdAt: 1,
              updatedAt: 1,
              comments: 1
            }
          }
        ]
      }
    },
    {
      $addFields: {
        lessonCount: { $size: '$lessons' }
      }
    },
    {
      $project: {
        title: 1,
        category: 1,
        description: 1,
        price: 1,
        image: 1,
        quizzes: 1,
        lessons: 1,
        lessonCount: 1,
        createdAt: 1,
        updatedAt: 1
      }
    }
  ]);

  if (!courseData || !courseData[0]) return null;

  const course = courseData[0];

  // Fetch progress
  const progress = await progressModel.findOne({
    courseId: new mongoose.Types.ObjectId(courseId),
    userId: new mongoose.Types.ObjectId(userId)
  });

  const completedLessonIds = progress?.lessonsCompleted?.map(id => id.toString()) || [];

  // Process lessons with isCompleted and default comments array
  course.lessons = Array.isArray(course.lessons)
    ? course.lessons
        .filter(lesson => lesson && lesson._id)
        .map(lesson => ({
          ...lesson,
          isCompleted: completedLessonIds.includes(lesson._id.toString()),
          comments: lesson.comments || []
        }))
    : [];

  course.progressPercentage = progress?.progressPercentage || 0;

  return course;
}




    async findCourseById(id){
        return await courseModel.findOne({_id:id,isDeleted:false});

    }




        async findAllcourses() {
            return await courseModel.find({ isDeleted: { $ne: true } });
            
        }


        // pagicnation
        async findAllcourse(skip = 0, limit = 10) {
          return await courseModel.find({ isDeleted: { $ne: true }}).skip(skip).limit(limit).sort({ createdAt: -1 });
        }
        
        async countAllCourses() {
          return await courseModel.countDocuments();
        }


    async courseisDelete(id){
        try{
            return await courseModel.findByIdAndUpdate(id, {
                isDeleted: true
            });
        } catch(err){
            throw new Error('Course is not deleted: ' + err.message);
        }
    }

    async checkCourseTitle(title){
        return await courseModel.findOne({title})
    }



    // searchCourse at searchbar

    // async searchCourse(searchQuery) {
    //   const conditions = [
    //     { title: { $regex: searchQuery, $options: "i" } },
    //     { category: { $regex: searchQuery, $options: "i" } },
    //     { description: { $regex: searchQuery, $options: "i" } }
    //   ];
    
    //   // If the searchQuery is a valid number
    //   if (!isNaN(searchQuery)) {
    //     conditions.push({ price: Number(searchQuery) });
    //   }
    
    //   return await courseModel.find({
    //     isDeleted:false,
    //     $or: conditions
    //   });
    // }


// searchCourse at searchbar

    async searchCoursesWithPagination(searchQuery, skip, limit) {
      const conditions = [
        { title: { $regex: searchQuery, $options: "i" } },
        { category: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } }
      ];
    
      // If the searchQuery is a number, include price match
      if (!isNaN(searchQuery)) {
        conditions.push({ price: Number(searchQuery) });
      }
    
      const query = {
        isDeleted: false,
        $or: conditions
      };
    
      const [courses, total] = await Promise.all([
        courseModel.find(query).skip(skip).limit(limit),
        courseModel.countDocuments(query)
      ]);
    
      return { courses, total };
    }


    // add to cart
    async addCourseToCart(user, courseId) {
      user.cartCourses.push(courseId);
      return await user.save();
    }
    




    // findEnrolledCourse

    async findEnrolledCourse(id) {
      return await userModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id)
          }
        },
        {
          $unwind: "$enrolledCourses"
        },
        {
          $lookup: {
            from: "courses",
            localField: "enrolledCourses",
            foreignField: "_id",
            as: "course"
          }
        },
        {
          $unwind: "$course"
        },
        {
          $match: {
            "course.isDeleted": false
          }
        },
        {
          $replaceRoot: {
            newRoot: "$course"
          }
        }
      ]);
    }
    

    // findAddcartCourse

    async findAddcartCourse(id) {
      return await userModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id)
          }
        },
        {
          $unwind: "$cartCourses"
        },
        {
          $lookup: {
            from: "courses",
            localField: "cartCourses",
            foreignField: "_id",
            as: "addtocartcourse"
          }
        },
        {
          $unwind: "$addtocartcourse"
        },
        {
          $match: {
            "addtocartcourse.isDeleted": false
          }
        },
        {
          $replaceRoot: {
            newRoot: "$addtocartcourse"
          }
        }
      ]);
    }
    
}

module.exports = new courseRepository();