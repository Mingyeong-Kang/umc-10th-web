import { axiosInstance } from "./axios";

export const patchMyInfo = async (data: {
  name: string;
  bio: string;
  avatar: string;
}) => {
  const res = await axiosInstance.patch("/v1/users", data);

  return res.data;
};