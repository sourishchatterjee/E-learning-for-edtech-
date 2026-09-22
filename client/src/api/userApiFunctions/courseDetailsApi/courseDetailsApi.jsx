import axiosInstance from "../../axiosInstance";


 export const getCourseById = async (token,courseId) => {

    try {
      const response = await axiosInstance.get(
        `/courseDetails/${courseId}`,
        {
          headers: {
            'x-access-token':token,
          },
        }
      );
      console.log('getCourseById',response);
      
      return response;

    } catch (error) {
      console.log('getCourseById error',error.response);
        return error?.response;
    } 
  };







  

 export const enrollCourse = async (token,courseId) => {

    try {
      const response = await axiosInstance.post(
        '/user/enrolledCourse',
        { courseId },
        {
          headers: {
            'x-access-token':token,
          },
        }
      );
      console.log('enroll',response);
      
      return response;

    } catch (error) {
      console.log('enroll error',error.response);
        return error?.response;
    } 
  };






   export const findCommentByCourseId = async (courseId) => {

    try {
      const response = await axiosInstance.get(
        `/course_comment/${courseId}`
      );
      console.log('findCommentByCourseId',response);
      
      return response;

    } catch (error) {
      console.log('findCommentByCourseId error',error.response);
        return error?.response;
    } 
  };










  
export const userAddcomment = async ( token,data) => {
  try {
    const response = await axiosInstance.post(
      "/user/comment",
      data,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    console.log("userAddcomment response", response?.data);
    return response;
  } catch (error) {
    console.log("userAddcomment error : ",error.response);
    return error?.response;
  }
};