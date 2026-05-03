import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
    // React Hook 대신 브라우저 기본 API 사용
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

    if (token) {
        // 토큰이 존재할 때만 헤더에 추가
        // 토큰 값에 따옴표가 포함되어 저장되는 경우를 대비해 필요시 처리가 필요할 수 있습니다.
        config.headers.Authorization = `Bearer ${token.replace(/"/g, '')}`; 
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});