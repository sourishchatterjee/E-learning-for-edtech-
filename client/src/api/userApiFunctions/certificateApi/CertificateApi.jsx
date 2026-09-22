import axiosInstance from "../../axiosInstance";



 export const getCertificates = async (token) => {

    try {
      const response = await axiosInstance.get(
        '/user/certificate',
        {
          headers: {
            'x-access-token':token,
          },
        }
      );      
      return response;

    } catch (error) {
        return error?.response;
    } 
  };