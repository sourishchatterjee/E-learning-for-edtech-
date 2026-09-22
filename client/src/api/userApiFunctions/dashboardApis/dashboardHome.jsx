import axiosInstance from "../../axiosInstance";

export const dashboardOverview = async (token) => {
    console.log("token being sent:", token); 
    try {
      const response = await axiosInstance.get('/user/dashboardOverview', {
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



  export const enrolledCoursesDashboard = async (token) => {
    console.log("token being sent:", token); 
    try {
      const response = await axiosInstance.get('/user/erollrd_course_details', {
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

  
