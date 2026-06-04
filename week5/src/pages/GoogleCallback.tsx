import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setValue: setAccessToken } = useLocalStorage("accessToken", "");
  const { setValue: setRefreshToken } = useLocalStorage("refreshToken", "");
  const { setValue : setName } = useLocalStorage("name", "");

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const name = searchParams.get("name");

    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      if(name){
        setName(decodeURIComponent(name));
      }

      window.location.href = "/";
    } else {
      alert("구글 로그인 실패");
      navigate("/login");
    }
  }, []);

  return <div className="text-white">로그인 처리 중...</div>;
};

export default GoogleCallback;