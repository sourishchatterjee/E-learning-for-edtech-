import axiosInstance from '../../axiosInstance'
const  getAllQuizes = async()=> {
  try {
    const response = await axiosInstance.get('/admin/total_Quiz')
    return response
    
  } catch (error) {
     return error?.response;
    
  }
}

export default getAllQuizes