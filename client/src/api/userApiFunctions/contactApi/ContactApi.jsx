import axiosInstance from "../../axiosInstance";


export const submitContact= async(data)=>{
    try{
        const response= await axiosInstance.post('/contact', data);
        return response;
    }catch(error){
        return error?.response;
    }
}