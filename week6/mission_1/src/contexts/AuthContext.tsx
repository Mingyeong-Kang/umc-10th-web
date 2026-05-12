import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { fetchMyInfo, signOut as apiSignOut, type MyInfoData } from "../apis/auth";
import {
  clearTokens,
  getAccessToken,
  setTokens,
} from "../utils/authStorage";

interface AuthContextValue {
  user: MyInfoData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<MyInfoData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!!getAccessToken());

  const refreshUser = useCallback(async () => {
    if (!getAccessToken()) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const me = await fetchMyInfo();
      setUser(me);
    } catch {
      setUser(null);
      clearTokens();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = useCallback(
    async (accessToken: string, refreshToken: string) => {
      setTokens(accessToken, refreshToken);
      await refreshUser();
    },
    [refreshUser]
  );

  const logout = useCallback(async () => {
    try {
      await apiSignOut();
    } catch {
      // ignore network errors
    } finally {
      clearTokens();
      setUser(null);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      refreshUser,
    }),
    [user, isLoading, login, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
