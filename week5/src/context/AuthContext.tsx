import { createContext, useState, type ReactNode } from "react";

interface AuthContextType {
  accessToken: string | null;
  name: string | null;
  setAuth: (token: string, name: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  name: null,
  setAuth: () => {},
  logout: () => {},
});

export default function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );

  const [name, setName] = useState<string | null>(
    localStorage.getItem("name")
  );

  // 🔥 로그인 상태 세팅 함수
  const setAuth = (token: string, userName: string) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("name", userName);

    setAccessToken(token);
    setName(userName);
  };

  // 로그아웃
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");

    setAccessToken(null);
    setName(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        name,
        setAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}