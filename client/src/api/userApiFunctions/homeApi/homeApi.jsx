import axiosInstance from '../../axiosInstance';
export const getPaginatedCourses = async (page = 1, limit = 6, token = '') => {
  try {
    const response = await axiosInstance.get(`/courses?page=${page}&limit=${limit}`, {
      headers: {
        'x-access-token': token || '',
      },
    });
    console.log('Course : ',response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
     console.log('Course error : ',error.response);
    throw error;
  }
};


export const searchCourses = async (query,token) => {
  try {
    const response = await axiosInstance.get(`/search_course?search=${encodeURIComponent(query)}`,  {
          headers: {
            'x-access-token':token,
          },
        });
    return response.data.data;
  } catch (error) {
    console.error("Error searching courses:", error);
    throw error;
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