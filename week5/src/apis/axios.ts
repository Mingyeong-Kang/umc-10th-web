import axios from "axios";
import { postRefresh } from "./auth";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 401 에러이고 재시도한 적 없으면
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // 무한루프 방지 플래그

            try {
                const refreshToken = localStorage.getItem("refreshToken");

                if (!refreshToken) {
                    return Promise.reject(error);
                }

                // 새 토큰 발급
                const response = await postRefresh(refreshToken);
                const newAccessToken = response.data.accessToken;
                const newRefreshToken = response.data.refreshToken;

                // localStorage 업데이트
                localStorage.setItem("accessToken", newAccessToken);
                localStorage.setItem("refreshToken", newRefreshToken);

                // 실패했던 요청 재시도
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                // refresh도 실패하면 로그아웃 처리
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);