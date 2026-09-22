
const courseModel = require('../../../Module/courses/model/courseModel');
const commentModel = require('../../comment/model/comment.model');
const contactModel =require('../../webPage/model/contactPage.model');



class webhomeRepositories {


    //  for home page distinct category

    async findCourseCategory() {
        return await courseModel.distinct('category');
    }

    //   find course
    async findCourse() {
        return await courseModel.find();
    }

//deseable coment
    async disableComment(id) {
      try {
        return await commentModel.findByIdAndUpdate(id, { isDelete: true },{ new: true });
      } catch (err) {
        throw new Error("Error disabling comment: " + err.message);
      }
      
    }
//enable comment
    async enableComment(id) {
      try {
        return await commentModel.findByIdAndUpdate(id, { isDelete: false },{ new: true });
      } catch (err) {
        throw new Error("Error enabling comment: " + err.message);
      }
      
    }

    // find platformComment
    async courseComment() {
        try {
            const courseComment = await commentModel.aggregate([
                {
                    $match: {
                        refType: "course",
                        isDelete: false,
                        isAdminDelete: false

                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'userDetails'
                    }
                },
                {
                    $lookup:{
                        from: 'courses',
                        localField:'refId',
                        foreignField: '_id',
                        as:'courseCategory'
                    }
                },
                {
                    $unwind: {
                        path: '$courseCategory',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $unwind: {
                        path: '$userDetails',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        _id: 1,
                        comment: 1,
                        rating: 1,
                        createdAt: 1,
                        isDelete: 1,
                        'courseCategory.category':1,
                        'courseCategory.title': 1,
                        'userDetails.name': 1,
                        'userDetails.email': 1,
                        'userDetails.image': 1,
                    }
                },
                {
                    $sort: { createdAt: -1 }
                }
            ])

            return courseComment;
        } catch (err) {
            console.error('Error fetching course comments:', err);
            throw new Error('Error fetching course comments');
        }

    }


    // checkCategory
    async getCoursesByCategory(categoryId) {
      try {
        const courses = await courseModel.find({ category: categoryId ,isDeleted:false})
          .sort({ createdAt: -1 });
        return {
          courses: courses
        };
      } catch (err) {
        throw new Error("Error fetching courses by category: " + err.message);
      }
    }
    



    // for create contact
    async contactPage(data){
        try{
            const newContact = new contactModel({
                name:data.name,
                email:data.email,
                subject:data.subject,
                message:data.message
            })
         const contact =  await newContact.save();
         return contact;
         
        }catch(err){
            console.error('Error fetching course comments:', err);
            throw new Error('Error fetching course comments');
        }
    }



    // popularCourse
    async popularCourse(){
        const popularCourse = await commentModel.aggregate([
            {
              $match: {
                refType: 'course',
                isDelete: false,
                isAdminDelete: false
              }
            },
            {
              $group: {
                _id: '$refId',
                commentCount: { $sum: 1 },
                avgRating: { $avg: '$rating' } // average rating
              }
            },
            {
              $sort: { commentCount: -1 }
            },
            {
              $limit: 3
            },
            {
              $lookup: {
                from: 'courses',
                localField: '_id',
                foreignField: '_id',
                as: 'course'
              }
            },
            {
              $unwind: '$course'
            },
            {
              $match: {
                'course.isDeleted': false
              }
            },
            {
              $project: {
                commentCount: 1,
                avgRating: 1,
                course: 1
              }
            }
          ]);
        

        return popularCourse;
    }



    // explore popular Course
    async explorePopularCourse(id){
        return await courseModel.findOne({_id:id,isDeleted: false})
    }
}

module.exports = new webhomeRepositories();