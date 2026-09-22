
import axiosInstance from "../axiosInstance";

export const registerUser = async(data)=>{
    try{
        const response= await axiosInstance.post(`/user/register`, data,{headers:{"Content-Type":"multipart/form-data"}});
        console.log('response',response?.data);
        return response;
    }catch(error){
        console.log('Error while fetching the api data.');
        return error?.response;
    }
}









export const verifyEmail=async(token)=>{
    try{
      const response=await axiosInstance.get(`/user/verify-email?token=${token}`);
      return response;
    }catch(error){
      return error?.response;
    }
}





export const loginUser = async (data) => {      
    try {
      const response = await axiosInstance.post('/user/login',data);
        console.log('response',response?.data);    
      return response;
    } catch (error) {
      console.log( error);
      return error?.response;
    }
  }





export const updateUser = async (data, token) => {
  try {
    const response = await axiosInstance.post(
      "/user/update_profile",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": token,
        },
      }
    );
    console.log("response", response?.data);
    return response;
  } catch (error) {
    console.log("Error while updating the user.");
    return error?.response;
  }
};



export const userChangePassword = async (data, token) => {
  try {
    const response = await axiosInstance.post(
      "/user/changePassword",
      data,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    console.log("response", response?.data);
    return response;
  } catch (error) {
    console.log("Error while updating the user.");
    return error?.response;
  }
};






export const userDeleteAccount = async (email, token) => {
  try {
    const response = await axiosInstance.post(
      'user/delete_account',{email:email},
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    console.log("response try", response?.data);
    return response;
  } catch (error) {
    console.log('catch',error.response);
    return error?.response;
  }
};











  export const sendOtp = async (email) => {
    try {
      const response = await axiosInstance.post('/user/sendOtp', { email });
      return response;
    } catch (error) {
      return error.response;
    }
  };





  export const verifyOtp = async (data) => {
    try {
      const response = await axiosInstance.post('/user/verifyotp', data);
      return response;
    } catch (error) {
      return error.response;
    }
  };






  export const updatePassword = async (data) => {      
    try {
      const response = await axiosInstance.post('/user/forgotPassword',data);
        console.log('response',response?.data);    
      return response;
    } catch (error) {
      console.log( error);
      return error?.response;
    }
  }
  