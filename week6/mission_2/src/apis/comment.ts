import { axiosInstance } from "./axiosInstance";
import type {
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
