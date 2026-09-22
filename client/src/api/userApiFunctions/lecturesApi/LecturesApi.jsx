import axiosInstance from "../../axiosInstance";

// Get Course by ID
export const getCourseById = async (token, courseId) => {

  try {
    const response = await axiosInstance.get(
      `/courseDetails/${courseId}`,
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    console.log('getCourseById', response);

    return response;

  } catch (error) {
    console.log('getCourseById error', error.response);
    return error?.response;
  }
};










// Get Lesson by ID
export const getLessonById = async (token, lessonId, courseId) => {
  try {
    const response = await axiosInstance.get(`/user/get_lesson/${lessonId}?courseId=${courseId}`, {
      headers: { "x-access-token": token },
    });

    return response;

  } catch (error) {
    return error?.response;
  }
};



// Mark or Unmark Lesson as Completed
export const lessonMarkedUnmarked = async (token, data) => {
    try {
    const response = await axiosInstance.post("/user/lesson_mark_unmark", data, {
    headers: { "x-access-token": token },
  });
    return response;

  } catch (error) {
    return error?.response;
  }
  
};

// Add Comment with Rating
export const userAddcomment = async (token, data) => {
   try {
    const response =await axiosInstance.post("/user/comment", data, {
    headers: { "x-access-token": token },
  });
    return response;

  } catch (error) {
    return error?.response;
  }
};