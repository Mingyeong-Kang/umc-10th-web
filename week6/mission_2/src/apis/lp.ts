import { axiosInstance } from "./axiosInstance";
import type {
  LpDetail,
  LpListData,
  ServerResponse,
  SortOrder,
} from "../types/lp";

export const fetchLps = async (params: {
  order: SortOrder;
  limit?: number;
  cursor?: number;
  search?: string;
}) => {
  const { data } = await axiosInstance.get<ServerResponse<LpListData>>("/lps", {
    params: {
      order: params.order,
      limit: params.limit ?? 20,
      ...(params.cursor !== undefined && { cursor: params.cursor }),
      ...(params.search && { search: params.search }),
    },
  });
  return data.data;
};

export const fetchLp = async (lpId: number) => {
  const { data } = await axiosInstance.get<ServerResponse<LpDetail>>(
    `/lps/${lpId}`
  );
  return data.data;
};

export const likeLp = async (lpId: number) => {
  const { data } = await axiosInstance.post(`/lps/${lpId}/likes`);
  return data;
};

export const unlikeLp = async (lpId: number) => {
  const { data } = await axiosInstance.delete(`/lps/${lpId}/likes`);
  return data;
};
