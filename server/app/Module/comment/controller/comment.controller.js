const { Validator } = require('node-input-validator');
const userRepositories = require('../../userAuth/repositories/user.repositories');
const commentRepositories = require('../../comment/repositories/comment.repositories');

class commetController {

    async createComment(req, res) {

        try {
            const v = new Validator({
                refId: 'require|objectId',
                refType: 'require|in:course,lesson,platform',
                comment: 'require|string',
                rating: 'optional|integer|min:1|max:5'
            })

            const match = await v.check();
            if (!match) {
                return res.status(400).json({ errors: v.errors });

            }


            const { refId, refType, comment, rating } = req.body;
            const userId = req.user.id;

            const findUser = await userRepositories.findUserById(userId);
            if (!findUser) {
                return res.status(400).json({
                    message: "User not exist"
                });

            };

            const createComment = await commentRepositories.createComment({
                userId, refId, refType, comment, rating
            });

            if (refType === 'course' && rating) {
                const allRatedComments = await commentRepositories.getCommentsByRef(refId, 'course');
                const validRatings = allRatedComments.filter(c => typeof c.rating === 'number' && c.rating > 0);
    
                const totalRating = validRatings.reduce((sum, c) => sum + c.rating, 0);
                const avgRating = validRatings.length > 0 ? totalRating / validRatings.length : 0;
                
                // Round to nearest 0.5
                const roundedRating = Math.round(avgRating * 2) / 2;
                
                // Save to DB
                await commentRepositories.updateCourseRating(refId, roundedRating);
            }
            if (refType === 'lesson' && rating) {
                const allRatedComments = await commentRepositories.getlessonCommentsByRef(refId, 'lesson');
                const validRatings = allRatedComments.filter(c => typeof c.rating === 'number' && c.rating > 0);
    
                const totalRating = validRatings.reduce((sum, c) => sum + c.rating, 0);
                const avgRating = validRatings.length > 0 ? totalRating / validRatings.length : 0;
                
                // Round to nearest 0.5
                const roundedRating = Math.round(avgRating * 2) / 2;
                
                // Save to DB
                await commentRepositories.updatelessonRating(refId, roundedRating);
                
            }
            return res.status(200).json({
                message: 'Comment created successfully.',
                comment: createComment,
            });
        } catch (err) {
            console.error('Error creating comment:', err);
            return res.status(400).json({
                message: 'Internal server error.',
                error: err.message || err,
            });
        }

    }


    ////////
async findCommentByCourseId(req, res) {
    try {
        const id = req.params.courseId;

        const findCourseComment = await commentRepositories.findCourseComment(id);

        const hasComments = Array.isArray(findCourseComment) && findCourseComment.length > 0;

        res.status(200).json({
            success: true,
            message: hasComments ? "Comments retrieved successfully." : "No comments yet.",
            comment: hasComments ? findCourseComment : []
        });

    } catch (err) {
        console.error('Error finding comments:', err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: err.message || err,
        });
    }
    
}

}

module.exports = new commetController();