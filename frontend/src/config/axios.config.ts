import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://full-stack-to-do-app-production.up.railway.app/api",
  timeout: 1000,
});

export default axiosInstance;
