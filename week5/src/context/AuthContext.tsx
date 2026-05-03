import {
  createContext,
  type ReactNode,
} from "react";
import { postSignin } from "../apis/auth";
import type { RequestSigninDto } from "../types/auth";
import useLocalStorage from "../hooks/useLocalStorage";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signinData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const {
    storedValue: accessToken,
    setValue: setAccessToken,
    removeValue: removeAccessToken,
  } = useLocalStorage<string | null>("accessToken", null);

  const {
    storedValue: refreshToken,
    setValue: setRefreshToken,
    removeValue: removeRefreshToken,
  } = useLocalStorage<string | null>("refreshToken", null);

  const login = async (signinData: RequestSigninDto): Promise<void> => {
    try {
      const response = await postSignin(signinData);
    
      const newAccessToken = response.data.accessToken;
      const newRefreshToken = response.data.refreshToken;

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);

      alert("로그인 성공!");
    } catch (error) {
      console.error("로그인 오류", error);
      alert("로그인 실패");
    }
  };

  const logout = async (): Promise<void> => {
    removeAccessToken();
    removeRefreshToken();
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;