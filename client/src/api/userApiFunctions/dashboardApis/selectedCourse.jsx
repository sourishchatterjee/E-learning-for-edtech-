import axiosInstance from "../../axiosInstance";

export const selectedCourse = async (token) => {
    console.log("token being sent:", token); 
    try {
      const response = await axiosInstance.get('/user/addtocart_course', {
        headers: {
          'x-access-token': token,
        },
      });
      console.log('response', response?.data);
      return response;
    } catch (error) {
      console.log(error.response);
      return error?.response;
    }
  };










export const toggleCourseInCart = async (token, courseId) => {
  try {
    const response = await axiosInstance.post(
      "/user/toggleCourseInCart",
      { courseId },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
