import axiosInstance from "../../axiosInstance";

export const getQuizzes = async (token,quizzId) => {
    try {
      const response = await axiosInstance.get(`/user/quiz/${quizzId}`, {
        headers: {
          'x-access-token': token,
        },
      });
      return response;
    } catch (error) {
      return error?.response;
    }
  };










  export const submitQuizzes = async (token,data) => {
    try {
      const response = await axiosInstance.post(
        "/user/submit_quiz",
        data,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      return response;
    } catch (error) {
      return error?.response;
    }
  };