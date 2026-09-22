import React from 'react'
import axiosInstance from '../../axiosInstance'
  const  getAllComments=async()=>{
  try {
    const response =  await axiosInstance.get('/comment')
    return response
     
  } catch (error) {
     return error?.response;
    
  }
};

export const disableComment=async(commentId)=>{
  try {
    const response =  await axiosInstance.get(`/disableComment/${commentId}`)
    return response
     
  } catch (error) {
     return error?.response;
    
  }
}

export const enableComment=async(commentId)=>{
  try {
    const response =  await axiosInstance.get(`/enableComment/${commentId}`)
    return response
     
  } catch (error) {
     return error?.response;
    
  }
}

export default getAllComments