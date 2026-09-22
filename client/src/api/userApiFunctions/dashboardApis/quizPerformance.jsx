import axiosInstance from "../../axiosInstance";

export const getQuizPerformance = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axiosInstance.get('/user/quizeperformance', {
      headers: {
        'x-access-token': token,
      },
    });
    console.log('Quiz performance response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Quiz performance error:', error?.response);
    throw error?.response || new Error('Unknown error');
  }
};
