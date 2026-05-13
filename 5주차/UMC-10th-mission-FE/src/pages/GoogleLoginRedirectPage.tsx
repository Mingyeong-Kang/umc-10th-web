import { useEffect } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

export const GoogleLoginRedirectPage = () => {
    const {setItem:setAccessToken} = useLocalStorage(
        LOCAL_STORAGE_KEY.accessToken,
    );

    const {setItem:setRefreshToekn} = useLocalStorage(
        LOCAL_STORAGE_KEY.refreshToken,
    );

    useEffect(() => {
        const urlParam = new URLSearchParams(window.location.search);
        const accessToken = urlParam.get(LOCAL_STORAGE_KEY.accessToken);
        const refreshToken = urlParam.get(LOCAL_STORAGE_KEY.refreshToken);

        if (accessToken){
            setAccessToken(accessToken);
            setRefreshToekn(refreshToken);
            window.location.href="/my";
        }

    }, [setAccessToken, setRefreshToekn]);
  return 
    <div>구글 로그인 리다이렉 화면</div>;
};
