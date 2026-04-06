// ✅ 추가된 부분: axios 라이브러리와 AxiosInstance 타입을 가져옵니다!
import axios, { type AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

export default axiosInstance;
