import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setValue: setAccessToken } = useLocalStorage("accessToken", "");
  const { setValue: setRefreshToken } = useLocalStorage("refreshToken", "");

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      navigate("/");
    } else {
      alert("구글 로그인 실패");
      navigate("/login");
    }
  }, []);

  return <div className="text-white">로그인 처리 중...</div>;
};

export default GoogleCallback;