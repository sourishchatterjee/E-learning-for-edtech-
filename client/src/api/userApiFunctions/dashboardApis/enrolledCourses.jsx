import axiosInstance from "../../axiosInstance";

export const enrolledCourses= async (token) => {
    console.log("token being sent:", token); 
    try {
      const response = await axiosInstance.get('/user/enrolled_courses', {
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