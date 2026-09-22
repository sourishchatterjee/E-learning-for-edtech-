// import axiosInstance from "../../axiosInstance"

// //import axiosInstance from "../../../../api/axiosInstance";

// const addLessons = async (courseId, formData) => {
//   try {
//     const response = await axiosInstance.post(`/admin/add_lesson/${courseId}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     console.log("API Response:", response.data);
//     return response;
//   } catch (error) {
//     console.error("API Error:", error.response?.data || error.message);
//     return error?.response;
//   }
// };

// export default addLessons;

import axiosInstance from "../../axiosInstance";

const addLessons = async (courseId, formData, onUploadProgress) => {
  try {
    const response = await axiosInstance.post(
      `/admin/add_lesson/${courseId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress, // ✅ Track upload progress
      }
    );
    console.log("API Response:", response.data);
    return response;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    return error?.response;
  }
};

export default addLessons;
