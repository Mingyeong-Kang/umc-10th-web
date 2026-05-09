import { createContext, useState, type ReactNode } from "react";
import { postSignin } from "../apis/auth";
import type { RequestSigninDto } from "../types/auth";

interface AuthContextType {
  accessToken: string | null;
  name: string | null;                                    // ← 추가
  login: (data: RequestSigninDto) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  name: null,                                             // ← 추가
  login: async () => {},
  logout: () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [name, setName] = useState<string | null>(
    localStorage.getItem("name")                          // ← 추가 (새로고침 대비)
  );

  const login = async (data: RequestSigninDto) => {
    const res = await postSignin(data);

    const token = res.data.accessToken;
    const userName = res.data.name;                       // ← 추가

    localStorage.setItem("accessToken", token);
    localStorage.setItem("name", userName);               // ← 추가
    setAccessToken(token);
    setName(userName);                                    // ← 추가
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");                      // ← 추가
    setAccessToken(null);
    setName(null);                                        // ← 추가
  };

  return (
    <AuthContext.Provider value={{ accessToken, name, login, logout }}>  {/* ← name 추가 */}
      {children}
    </AuthContext.Provider>
  );
}