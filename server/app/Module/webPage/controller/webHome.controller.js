const webHomeRepositories = require('../../webPage/repositories/webHome.repositories');
const userRepository = require('../../userAuth/repositories/user.repositories');
const {Validator}=require('node-input-validator');


class webHome{


    // for topic of course
    async categories(req,res){
        try{
            const categories = await webHomeRepositories.findCourseCategory();

            return res.status(200).json({
                categories
                
            })
        }catch(err){
            res.status(400).json({
                message:"error",
                error:err.message||err
            })
        }
    }

    // for popular course
    async popularCourses(req,res){
        try {
            const popularCourseData = await webHomeRepositories.popularCourse();
        
            let cartCourses = [];
            let enrolledCourses = [];
        
            // If the user is logged in
            if (req.user && req.user.id) {
              const user = await userRepository.findUserById(req.user.id);
              cartCourses = (user.cartCourses || []).map(id => id.toString());
              enrolledCourses = (user.enrolledCourses || []).map(id => id.toString());
            }
        
            // Add isInCart and isEnrolled flags
            const enrichedCourses = popularCourseData.map(item => {
              const course = item.course;
              const courseIdStr = course._id.toString();
        
              // Attach cart/enroll status
              course.isInCart = cartCourses.includes(courseIdStr);
              course.isEnrolled = enrolledCourses.includes(courseIdStr);
        
              return {
                commentCount: item.commentCount,
                rating: item.rating,
                course: course
              };
            });
        
            return res.status(200).json({
              success: true,
              message: "Popular courses fetched successfully",
              data: enrichedCourses
            });
        
          } catch (err) {
            console.error(err);
            return res.status(400).json({
              success: false,
              message: "Error fetching popular courses",
              error: err.message || err
            });
          }
    }

    //desable comment
    async disableComment(req,res){
        try{
            const id = req.params.id;
            const disableComment = await webHomeRepositories.disableComment(id);
            return res.status(200).json({
                disableComment
            })
        }catch(err){
            res.status(400).json({
                message:"error",
                error:err.message||err
            })
        }
    }
//enable comment
    async enableComment(req,res){
        try{
            const id = req.params.id;
            const enableComment = await webHomeRepositories.enableComment(id);
            return res.status(200).json({
                enableComment
            })
        }catch(err){
            res.status(400).json({
                message:"error",
                error:err.message||err
            })
        }
    }///////

    // for comment
    async courseComment(req,res){
        try{
            const courseComment = await webHomeRepositories.courseComment();
            return res.status(200).json({
                courseComment
            })
        }catch(err){
            res.status(400).json({
                message:"error",
                error:err.message||err
            })
        }
    }

    // course Of ParticularCategory
    async courseOfParticularCategory(req, res) {
      try {
        const category = req.params.id;
    
        const { courses } = await webHomeRepositories.getCoursesByCategory(category);
    
        if (!courses || courses.length === 0) {
          return res.status(404).json({
            message: "No courses found for this category",
          });
        }
    
        let cartCourses = [];
        let enrolledCourses = [];
        if (req.user && req.user.id) {
          const user = await userRepository.findUserById(req.user.id);
          cartCourses = (user.cartCourses || []).map(id => id.toString());
          enrolledCourses = (user.enrolledCourses || []).map(id => id.toString());
        }
    
        const enrichedCourses = courses.map(course => {
          const courseObj = course.toObject();
          const courseIdStr = courseObj._id.toString();
    
          courseObj.isInCart = cartCourses.includes(courseIdStr);
          courseObj.isEnrolled = enrolledCourses.includes(courseIdStr);
    
          return courseObj;
        });
    
        return res.status(200).json({
          success: true,
          message: "Category courses fetched successfully!",
          data: enrichedCourses
        });
    
      } catch (err) {
        console.error("Error fetching category courses: ", err);
        return res.status(500).json({
          message: "Internal server error",
          error: err.message || err,
        });
      }
    }
    
    
    

    // for contactPage
    async contactPage(req,res){
        try{
            const v = new Validator({
                name: 'require|minLength:4',
                email: 'require|email',
                subject: 'require',
                message: 'require'
            })
            const matched = await v.check();
            if(!matched){
                return res.status(400).json({ errors: v.errors })
            }

            const{name,email,subject,message}=req.body;
            const contact = await webHomeRepositories.contactPage({
                name,email,subject,message
            });

            if(contact){
                return res.status(200).json({
                    message: "Thanks for reaching out! We've received your query and our team will get back to you via email shortly.",
                    contactData: contact,
                })
            }

        }catch(err){
            res.status(400).json({
                message:"error",
                error:err.message||err
            })
        }
    }


    // for explore popular course
    async getCousrBypopularCourse(req,res){
        try{

            const id = req.params.id;
            
            const findPopularCourse = await webHomeRepositories.explorePopularCourse(id);
            if(!findPopularCourse){
                return res.status(400).json({
                    message:"No courses found!!"
                })
            }

            return res.status(200).json({
                message:"course fetches successfully",
                courseDetails: findPopularCourse
            })

        }catch(err){            
            res.status(400).json({
                message:"error",
                error:err.message||err
            })
        }
    }
}

module.exports= new webHome();