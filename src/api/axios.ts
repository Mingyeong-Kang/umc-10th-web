import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/v1",
});

// 요청 시 accessToken 자동 추가
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 처리 (토큰 만료 시 자동 재발급)
instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const refreshToken = localStorage.getItem("refreshToken");

    // accessToken 만료
    if (err.response?.status === 401 && refreshToken) {
      try {
        const res = await axios.post("http://localhost:3000/v1/auth/refresh", {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;

        // 새 토큰 저장
        localStorage.setItem("accessToken", newAccessToken);

        // 기존 요청 다시 실행
        err.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(err.config);

      } catch (refreshError) {
        // refresh도 실패 → 로그아웃
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);

export default instance;