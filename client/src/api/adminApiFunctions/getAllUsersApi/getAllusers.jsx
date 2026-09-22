 
 import axiosInstance from '../../axiosInstance'

 const getAllusers= async()=> {

try {
    const response = await axiosInstance.get('/admin/getAllUser')
    console.log("API response:", response); // ✅ Add this
    return response
    
} catch (error) {

 return error?.response;    
}
  
    
   
 }


 export const blockUser = async (id) => {
  try {
    const response = await axiosInstance.get(`/admin/blockuser/${id}`);
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const unblockUser = async (id) => {
  try {
    const response = await axiosInstance.get(`/admin/unblockuser/${id}`);
    return response;
  } catch (error) {
    return error?.response;
  }
};
 
 export default getAllusers;

