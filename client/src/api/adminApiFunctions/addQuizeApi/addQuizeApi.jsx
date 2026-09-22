import axiosInstance from '../../axiosInstance'
//  export const  addQuizes = async()=> {
//   try {
//     const response = await axiosInstance.post('/admin/createquizzes')
//     return response
    
//   } catch (error) {
//      return error?.response;
    
//   }
// }

export const addQuizes = async (quizData) => {
  try {
    const response = await axiosInstance.post(
      '/admin/createquizzes',
      quizData, // ✅ Send data in body
      {
        headers: {
          'Content-Type': 'application/json', // ✅ explicitly set this
        },
      }
    );
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const allCourses = async()=> {
  try {
    const response = await axiosInstance.get('/admin/allcategorieswithoutpagination')
    return response
    
  } catch (error) {
     return error?.response;
    
  }
}