const commentModel = require('../../comment/model/comment.model');
const courseModel = require('../../courses/model/courseModel');
const lessonModel = require('../../lession/model/lesson.model');
const mongoose = require('mongoose');

class commentRepositories{

    async createComment(data){
        try{
            const newComment = new commentModel({
                userId: new mongoose.Types.ObjectId(data.userId),
                refId: new mongoose.Types.ObjectId(data.refId),
                refType: data.refType,
                comment: data.comment,
                rating: data.rating || null,
            })

            await newComment.save();
            return newComment;
        }catch(err){
            throw new Error('Error saving comment: ' + err.message);

        }
    }

// getCommentsByRef
    async getCommentsByRef(refId, refType) {
      return commentModel.find({ refId, refType, rating: { $exists: true } });
  }

  async getlessonCommentsByRef(refId,refType){
    return commentModel.find({ refId, refType, rating: { $exists: true } });
  }
  

  // updateCourseRating
  async updateCourseRating(courseId, avgRating) {
    // Just in case someone calls this directly with unrounded input
    const rounded = Math.round(avgRating * 2) / 2;

    return courseModel.findByIdAndUpdate(
        courseId,
        { rating: rounded },   // Store as Number, not String
        { new: true }
    );
}

// updatelessonRating
  async updatelessonRating(lessonId, avgRating) {
    // Just in case someone calls this directly with unrounded input
    const rounded = Math.round(avgRating * 2) / 2;

    return lessonModel.findByIdAndUpdate(
        lessonId,
        { rating: rounded },   // Store as Number, not String
        { new: true }
    );
}


    // findCourseComment
    async findCourseComment(id){

      const comment = commentModel.aggregate([
        {
          $match:{
            refId:new mongoose.Types.ObjectId(id),
            isDelete:false
          }
        },
        {
          $lookup:{
            from: 'users',
            localField:'userId',
            foreignField:'_id',
            as:'userDetails'
          }
         
        },
        {
          $unwind: {
            path: '$userDetails',
            preserveNullAndEmptyArrays: true
        }
        },
        {
          $project:{
            _id:1,
            comment:1,
            rating:1,
            createdAt:1,
            'userDetails.name':1,
            'userDetails.image':1
          }
        }
      ])
    
      if (comment.length === 0) {
        return { message: "No comments yet" };
      }
    
      return comment;
    }




    async getCommentsByRefId(lessonId) {
      return await commentModel.aggregate([
        {
          $match: {
            refId: new mongoose.Types.ObjectId(lessonId),
            refType: "lesson",
            isDelete: false,
            isAdminDelete: false
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user"
          }
        },
        {
          $unwind: "$user"
        },
        {
          $project: {
            _id: 1,
            comment: 1,
            createdAt: 1,
            user: {
              _id: 1,
              name: 1,
              email: 1
            }
          }
        },
        {
          $sort: { createdAt: -1 }
        }
      ]);
    }
    
}
module.exports=new commentRepositories();