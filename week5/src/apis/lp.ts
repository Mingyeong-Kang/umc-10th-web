import type { PaginationDto } from "../types/common";
import { axiosInstance } from "./axios";

// LP 목록
export const getLPList = async (params: PaginationDto) => {
  const { data } = await axiosInstance.get("/v1/lps", { params });
  return data;
};

// LP 상세
export const getLPDetail = async (lpid: number) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}`);
  return data;
};

//댓글 목록
export const getLPComments = async (
  lpId: number,
  params: PaginationDto
) => {
  const {data} = await axiosInstance.get(`/v1/lps/${lpId}/comments`, { params });
  return data;
}