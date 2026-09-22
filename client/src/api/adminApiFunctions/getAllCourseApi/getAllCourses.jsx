import React from 'react'
import axiosInstance from '../../axiosInstance'

export const getAllCourses = async ()=> {

    try {
        const response = await axiosInstance.get("/admin/getallcourses");
        console.log(response)
        return response;
        
    } catch (error) {
        return error?.response;
        
    }

 
};


//admin/allcategorieswithoutpagination
export const getAllCourseswithoutPagination = async ()=> {

    try {
        const response = await axiosInstance.get("admin/allcategorieswithoutpagination");
        console.log(response)
        return response;
        
    } catch (error) {
        return error?.response;
        
    }

 
};

export const editCourse= async (id, data) => {
  try {
    const response = await axiosInstance.post(`/admin/updatecourse/${id}`, data,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await axiosInstance.delete(`/admin/deletecourse/${id}`);
    return response;
  } catch (error) {
    return error?.response;
  }
};



export const addCourse = async (data) => {
    try {
      const response = await axiosInstance.post("/admin/createcourse", data,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
      return response;
    } catch (error) {
      return error?.response;
    }
  };


export default getAllCourses