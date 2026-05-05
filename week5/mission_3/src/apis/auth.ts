import { axiosInstance } from "./axiosInstance";

interface ServerResponse<T> {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
}

interface SignInResponseData {
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}

interface MyInfoData {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export const signIn = async (email: string, password: string) => {
  const { data } = await axiosInstance.post<ServerResponse<SignInResponseData>>(
    "/auth/signin",
    { email, password }
  );
  return data.data;
};

export const fetchMyInfo = async () => {
  const { data } = await axiosInstance.get<ServerResponse<MyInfoData>>(
    "/users/me"
  );
  return data.data;
};

export const signOut = async () => {
  await axiosInstance.post("/auth/signout");
};
