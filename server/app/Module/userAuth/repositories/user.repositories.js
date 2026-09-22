// repositories/userRepository.js
const User = require('../model/user.model');
const otpModel = require('../model/otp.Model');
const userModel = require('../model/user.model');
const mongoose = require('mongoose');
const courseModel = require('../../courses/model/courseModel');
const resultModel = require('../../quiz/model/resultSchema');
const nodemailer = require("nodemailer");


class userRepository {

  // find user by email
  async findUserByEmail(email) {
    return await User.findOne({ email });

  }

  // create user
  async createUser(userData) {
    const newUser = new User(userData);
    return await newUser.save();
  }

  async updateUser(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true });

  }

  async findUserById(id) {
    return await User.findById(id);
  }

  async updateUserData(id, data) {
    return await User.findByIdAndUpdate(id, data);
  }

  async updateisDelete(email) {
    try {
      return await User.findOneAndUpdate({ email }, {
        isDeleted: true,
        isVerified: false
      })
    } catch (err) {
      throw new Error('User Account is not deleted: ' + err.message);

    }
  }

  // changedPassword
  async changedPassword(email, updatepassword) {
    return await User.findOneAndUpdate({ email },
      {
        $set: {
          password: updatepassword
        }
      }
    )
  }

  // verify otp
  async verify(userId, otp) {
    console.log(userId);

    const userObjectId = new mongoose.Types.ObjectId(userId);
    console.log(userObjectId);

    return await otpModel.findOne({ userid: userObjectId, otp });
  }

  // get All User
  async getAllUser() {
    return await userModel.find();
  }

///////
async  toggleBlockUser(id) {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    // Setup email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // Use TLS (STARTTLS)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email to the user
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Your Account Has Been Blocked",
      html: `
        <h3>Dear ${user.name},</h3>
        <p>We regret to inform you that your account has been blocked due to policy violations.</p>
        <p>If you believe this is a mistake, please contact our support team.</p>
        <br />
        <p>Thank you,<br />Support Team</p>
      `,
    });

    return updatedUser;
  } catch (error) {
    console.error("Error toggling user block status:", error.message);
    throw error;
  }
}

///
async  toggleUnblockBlockUser(id) {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isDeleted: false },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    console.error("Error toggling user block status:", error.message);
    throw error;
  }
}

  // find Total Enrolled Course
  async findTotalEnrolledCourse(user) {
    if (!user || !Array.isArray(user.enrolledCourses)) {
      return 0;
    }
    return user.enrolledCourses.length;
  }

  // find Total Cart Courses
  async findTotalCartCourses(user) {
    if (!user || !Array.isArray(user.cartCourses)) {
      return 0;
    }
    return user.cartCourses.length;
  }




  

  // calculateOverallQuizPercentage
  async calculateOverallQuizPercentage(id) {

    const results = await resultModel.find({ userId: id, isDeleted: false });

    if (!results.length) {
      return 0;
    }
    const totalPercentage = results.reduce((sum, r) => sum + r.percentage, 0);
    const averagePercentage = totalPercentage / results.length;

    return averagePercentage.toFixed(2);

  }

  // certificateCount
  async certificateCount(userId) {
    return await resultModel.countDocuments({
        userId: userId,
        certificateId: { $exists: true, $ne: null },
        isDeleted: false
    });
}

////
  // findEnrolledCoursesDetails
  async findEnrolledCoursesDetails(id) {

    return await userModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },

      { $unwind: "$enrolledCourses" },

      {
        $lookup: {
          from: "courses",
          localField: "enrolledCourses",
          foreignField: "_id",
          as: "courseDetails"
        }
      },
      { $unwind: "$courseDetails" },

      {
        $lookup: {
          from: "progresses",
          let: {
            userId: "$_id",
            courseId: "$enrolledCourses"
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$userId", "$$userId"] },
                    { $eq: ["$courseId", "$$courseId"] }
                  ]
                }
              }
            }
          ],
          as: "progress"
        }
      },

      {
        $addFields: {
          progressData: { $arrayElemAt: ["$progress", 0] }
        }
      },

      {
        $project: {
          _id: 0,
          courseTitle: "$courseDetails.title",
          progressPercentage: {
            $ifNull: ["$progressData.progressPercentage", 0]
          },
          courseCompleted:{
            $ifNull:["$progressData.isCompleted",0]
          },
          totalLessons: {
            $size: { $ifNull: ["$courseDetails.lessons", []] }
          },
          completedLessons: {
            $size: { $ifNull: ["$progressData.lessonsCompleted", []] }
          }
        }
      }
    ]);
  }


}

module.exports = new userRepository();

