import { axiosInstance } from "./axiosInstance";

interface ServerResponse<T> {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
}

interface UploadResponse {
  imageUrl: string;
}

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await axiosInstance.post<ServerResponse<UploadResponse>>(
    "/uploads",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data.data.imageUrl;
};
