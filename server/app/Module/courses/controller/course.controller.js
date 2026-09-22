const courseRepository = require("../repositories/course.repositories");
const userRepository = require('../../userAuth/repositories/user.repositories');
const userModel = require('../../userAuth/model/user.model');
const { Validator } = require('node-input-validator');
const fs = require('fs');

class courseController {


  // create course
  async createCourse(req, res) {
    try {

      const v = new Validator(req.body, {
        title: 'required|string|minLength:3',
        category: 'required|string|minLength:3',
        description: 'required|string|minLength:10',
        price: 'required|integer|min:0',
      });
  
      const matched = await v.check();
      if (!matched) {
        return res.status(422).json({
          message: 'Validation failed',
          errors: v.errors,
        });
      }
  
      const courseData = req.body;

      // Add image path from uploaded file
      if (req.file) {
        courseData.image = req.file.path.replace(/\\/g, '/'); 
      } else {
        return res.status(400).json({ message: 'Image file is required' });
      }

      const findCourse=await courseRepository.checkCourseTitle(courseData.title);
      if(findCourse){
        return res.status(400).json({
          message:"This course is already exist"
        })
      }
      const newCourse = await courseRepository.createCourse(courseData);
      
      res.status(200).json({
        message: "Course created successfully",
        data: newCourse,
      });
    } catch (err) {
      res.status(400).json({
        message: "Course creation failed",
        error: err.message,
      });
    }
  }

  // update course
  // async updateCourse(req, res) {
  //   try {
  //     const id = req.params.id;

  //     const validation = new Validator(req.body, {
  //       title: 'string|minLength:3|maxLength:80',
  //       category: 'string|minLength:3|maxLength:100',
  //       description: 'string|minLength:5|maxLength:1000',
  //       price: 'numeric|min:40|max:9000',
  //     });
  
  //     const matched = await validation.check();
  
  //     if (!matched) {
  //       return res.status(422).json({
  //         message: 'Validation failed',
  //         errors: validation.errors,
  //       });
  //     }

  //     const findCourse = await courseRepository.findCourseById(id);

  //     if (!findCourse) {
  //       return res.status(404).json({ message: "Course not found" });
  //     }

  //     const updateData = req.body;
  //     const checkCourseTitle = await courseRepository.findCourse(updateData.title);


  //     if(checkCourseTitle){
  //       return res.status(400).json({
  //         message: "This Course is alreay exist, title must be unique"
  //       });
  //     }

  //     if (req.file) {
  //       const oldImagePath = findCourse.image;
  //       if (oldImagePath && fs.existsSync(oldImagePath)) {
  //         fs.unlinkSync(oldImagePath);
  //       }
  
  //       const rawPath = req.file.path.replace(/\\/g, '/'); // Correct slashes

  //       updateData.image = rawPath;  
  //     }

  //     const updatedCourse = await courseRepository.updateCourse(id, updateData);
      

  //     res.status(200).json({
  //       message: "Course updated successfully",
  //       data: updatedCourse,
  //     });
  //   } catch (err) {
  //     res.status(400).json({
  //       message: "Course update failed",
  //       error: err.message,
  //     });
  //   }
  // }

  async updateCourse(req, res) {
  try {
    const id = req.params.id;

    const validation = new Validator(req.body, {
      title: 'string|minLength:3|maxLength:80',
      category: 'string|minLength:3|maxLength:100',
      description: 'string|minLength:5|maxLength:1000',
      price: 'numeric|min:40|max:9000',
    });

    const matched = await validation.check();

    if (!matched) {
      return res.status(422).json({
        message: 'Validation failed',
        errors: validation.errors,
      });
    }

    const findCourse = await courseRepository.findCourseById(id);
    if (!findCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    const updateData = req.body;

    // Only check for duplicate title if title is being updated and is different
    if (updateData.title && updateData.title !== findCourse.title) {
      const checkCourseTitle = await courseRepository.findCourse(updateData.title);
      if (checkCourseTitle) {
        return res.status(400).json({
          message: "This Course already exists, title must be unique",
        });
      }
    }

    // Handle image update
    if (req.file) {
      const oldImagePath = findCourse.image;
      if (oldImagePath && fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // delete the old image
      }
      updateData.image = req.file.path.replace(/\\/g, '/'); // Save new image path
    }

    const updatedCourse = await courseRepository.updateCourse(id, updateData);

    res.status(200).json({
      message: "Course updated successfully",
      data: updatedCourse,
    });

  } catch (err) {
    res.status(400).json({
      message: "Course update failed",
      error: err.message,
    });
  }
}

  // get course by id
  async getCourseById(req, res) {
  try {
    const id = req.params.id;
    const course = await courseRepository.findCourseById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const courseData = await courseRepository.findCourseWithLessons(id, req.user?.id); // pass userId for isCompleted
    if (!courseData) {
      return res.status(404).json({ message: "Course with lessons not found" });
    }

    let isEnrolled = false;

    if (req.user && req.user.id) {
      const user = await userModel.findById(req.user.id).select('enrolledCourses');
      if (user && user.enrolledCourses.map(c => c.toString()).includes(courseData._id.toString())) {
        isEnrolled = true;
      }
    }

    courseData.isEnrolled = isEnrolled;

    res.status(200).json({
      success: true,
      message: "Course found successfully",
      data: courseData
    });

  } catch (err) {
    res.status(400).json({
      message: "Failed to fetch course",
      error: err.message,
    });
  }
}
  


// // get All courses
async getAllCourse(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const [courses, totalCourses] = await Promise.all([
      courseRepository.findAllcourse(skip, limit),
      courseRepository.countAllCourses()
    ]);

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No courses found." });
    }

    let cartCourses = [];
    let enrolledCourses = [];


    if (req.user && req.user.id) {
      const user = await userRepository.findUserById(req.user.id);
      cartCourses = user?.cartCourses?.map(id => id.toString()) || [];
      enrolledCourses = user?.enrolledCourses?.map(id => id.toString()) || [];

    }

    const enrichedCourses = courses.map(course => {
      const courseObj = course.toObject();
      courseObj.isInCart = cartCourses.includes(course._id.toString());
      courseObj.isEnrolled = enrolledCourses.includes(course._id.toString());
      return courseObj;
    });

    const totalPages = Math.ceil(totalCourses / limit);

    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: enrichedCourses,
      pagination: {
        totalCourses,
        totalPages,
        currentPage: page
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch courses",
      error: err.message || err
    });
  }
}
//get all courses without pagination and all

async allCourseWithoutPagination(req, res) {
  try {
    // Fetch all non-deleted courses
    const courses = await courseRepository.findAllcourses();

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No courses found." });
    }

    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: courses
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch courses",
      error: err.message || err
    });
  }
}


  // delete course
  async deleteCourse(req, res) {
    try {
      const id = req.params.id;
      const findCourse = await courseRepository.findCourseById(id);

      if (!findCourse) {
        return res.status(404).json({ message: "Course not found" });
      }

      await courseRepository.courseisDelete(id);

      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
        data: findCourse,
      });
    } catch (err) {
      res.status(400).json({
        message: "Course deletion failed",
        error: err.message,
      });
    }
  }

  // search course by searchbar

  async searchCourseBYSearchBar(req,res){
    try {
      const searchQuery = req.query.search || "";
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 6;
      const skip = (page - 1) * limit;
  
      const { courses, total } = await courseRepository.searchCoursesWithPagination(searchQuery, skip, limit);
  
      if (!courses || courses.length === 0) {
        return res.status(404).json({ message: "No courses found matching your search." });
      }
  
      let cartCourses = [];
      let enrolledCourses = [];
  
      if (req.user && req.user.id) {
        const user = await userRepository.findUserById(req.user.id);
        
        cartCourses = user?.cartCourses?.map(id => id.toString()) || [];
        enrolledCourses = user?.enrolledCourses?.map(id => id.toString()) || [];
      }
  
      const enrichedCourses = courses.map(course => {
        const courseObj = course.toObject();
        const courseIdStr = course._id.toString();
  
        courseObj.isInCart = cartCourses.includes(courseIdStr);
        courseObj.isEnrolled = enrolledCourses.includes(courseIdStr);  
        return courseObj;
      });
  
      const totalPages = Math.ceil(total / limit);
  
      return res.status(200).json({
        success: true,
        message: "Courses fetched successfully",
        data: enrichedCourses,
        pagination: {
          totalCourses: total,
          totalPages,
          currentPage: page
        }
      });
  
    } catch (err) {
      console.error(err);
      res.status(400).json({
        message: "Something went wrong while searching.",
        error: err.message || err
      });
    }
  }



  // Add/Remove from cart (based on toggling)
async toggleCourseInCart(req, res) {
  try {
    const userId = req.user.id;  
    const courseId = req.body.courseId;  

    const user = await userRepository.findUserById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const alreadyInCart = user.cartCourses.includes(courseId);

    if (alreadyInCart) {
      user.cartCourses = user.cartCourses.filter(cId => cId.toString()!== courseId);
      await user.save();
      return res.status(200).json({ message: 'Course removed from cart' });
    } else {
      user.cartCourses.push(courseId);
      await user.save();
      return res.status(200).json({ message: 'Course added to cart' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error processing cart action', error: err.message });
  }
}


// findAddcartCourses
async findAddcartCourses(req, res) {
  try {
    const userId = req.user.id;

    const checkUser = await userRepository.findUserById(userId);
    if (!checkUser) {
      return res.status(400).json({
        message: "User does not exist!!"
      });
    }

    if (!checkUser.cartCourses || checkUser.cartCourses.length === 0) {
      return res.status(400).json({
        message: "You haven't added any courses to the cart yet!"
      });
    }

    const findAddcartCourse = await courseRepository.findAddcartCourse(userId);
    if (!findAddcartCourse || findAddcartCourse.length === 0) {
      return res.status(404).json({
        message: "No courses found in cart"
      });
    }

    const enrolledCourses = checkUser.enrolledCourses.map(id => id.toString());

    const enrichedCourses = findAddcartCourse.map(course => {
      const courseIdStr = course._id.toString();
      const isEnrolled = enrolledCourses.includes(courseIdStr);
      return { ...course, isEnrolled };
    });

    return res.status(200).json({
      message: "Add to cart courses fetched successfully",
      data: enrichedCourses
    });

  } catch (err) {
    return res.status(500).json({
      message: "Add to cart course fetch failed",
      error: err.message || err
    });
  }
}


}

module.exports = new courseController();
