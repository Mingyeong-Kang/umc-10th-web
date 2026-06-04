import { axiosInstance } from "./axiosInstance";
import type {
  Lp,
  LpDetail,
  LpListData,
  ServerResponse,
  SortOrder,
} from "../types/lp";

export interface CreateLpPayload {
  title: string;
  content: string;
  thumbnail?: string;
  tags: string[];
  published: boolean;
}

export type UpdateLpPayload = Partial<CreateLpPayload>;

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

export const createLp = async (payload: CreateLpPayload) => {
  const { data } = await axiosInstance.post<ServerResponse<Lp>>("/lps", payload);
  return data.data;
};

export const updateLp = async (lpId: number, payload: UpdateLpPayload) => {
  const { data } = await axiosInstance.patch<ServerResponse<Lp>>(
    `/lps/${lpId}`,
    payload
  );
  return data.data;
};

export const deleteLp = async (lpId: number) => {
  const { data } = await axiosInstance.delete<ServerResponse<unknown>>(
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
