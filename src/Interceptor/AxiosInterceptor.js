import axios from "axios";
import { getLocalStorage } from "../Utils/localStorge";

const apiKey = "https://second-home-webapp.onrender.com/second-home/api/v1";

const axiosInterceptor = axios.create({
  baseURL: apiKey,
});

// Request interceptor
axiosInterceptor.interceptors.request.use(
  async (config) => {
    const accessToken = await getLocalStorage("secondHomeToken");

    // You can add any logic here before the request is sent
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInterceptor.interceptors.response.use(
  (response) => {
    // You can add any logic here for successful responses
    return response.data;
  },
  (error) => {
    // You can add error handling logic here
    return Promise.reject(error);
  }
);

export default axiosInterceptor;
