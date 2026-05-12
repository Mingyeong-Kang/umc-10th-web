import { axiosInstance } from "./axiosInstance";
import type {
  Comment,
  CommentListData,
  ServerResponse,
  SortOrder,
} from "../types/lp";

export const fetchComments = async (params: {
  lpId: number;
  order: SortOrder;
  limit?: number;
  cursor?: number;
}) => {
  const { data } = await axiosInstance.get<ServerResponse<CommentListData>>(
    `/lps/${params.lpId}/comments`,
    {
      params: {
        order: params.order,
        limit: params.limit ?? 10,
        ...(params.cursor !== undefined && { cursor: params.cursor }),
      },
    }
  );
  return data.data;
};

export const createComment = async (lpId: number, content: string) => {
  const { data } = await axiosInstance.post<ServerResponse<Comment>>(
    `/lps/${lpId}/comments`,
    { content }
  );
  return data.data;
};

export const updateComment = async (
  lpId: number,
  commentId: number,
  content: string
) => {
  const { data } = await axiosInstance.patch<ServerResponse<Comment>>(
    `/lps/${lpId}/comments/${commentId}`,
    { content }
  );
  return data.data;
};

export const deleteComment = async (lpId: number, commentId: number) => {
  const { data } = await axiosInstance.delete<ServerResponse<unknown>>(
    `/lps/${lpId}/comments/${commentId}`
  );
  return data.data;
};
