import axios from "axios";


let axiosInstance = axios.create({
  baseURL:import.meta.env.VITE_API_BASE_URL,
});

export default axiosInstance;