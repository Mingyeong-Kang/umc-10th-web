import { axiosInstance } from "./axios";

export const postComment = async ({
  lpId,
  content,
}: {
  lpId: number;
  content: string;
}) => {
  const { data } = await axiosInstance.post(
    `/v1/lps/${lpId}/comments`,
    {
      content,
    }
  );

  return data;
};

export const patchComment = async ({
  commentId,
  content,
}: {
  commentId: number;
  content: string;
}) => {
  const { data } = await axiosInstance.patch(
    `/v1/comments/${commentId}`,
    {
      content,
    }
  );

  return data;
};

export const deleteComment = async (
  lpId: number,
  commentId: number
) => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );

  return data;
};