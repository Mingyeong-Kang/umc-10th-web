import type { PaginationDto, CreateLPRequest } from "../types/common";
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

// 댓글 목록
export const getLPComments = async (
  lpId: number,
  params: PaginationDto
) => {
  const { data } = await axiosInstance.get(
    `/v1/lps/${lpId}/comments`,
    { params }
  );

  return data;
};

// LP 생성
export const postLP = async (request: CreateLPRequest) => {
  const { data } = await axiosInstance.post("/v1/lps", request);

  return data;
};

// LP 삭제
export const deleteLP = async (lpId: number) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);
  return data;
};

// LP 좋아요
export const postLike = async (lpId: number) => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
};

// LP 좋아요 취소
export const deleteLike = async (lpId: number) => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/likes`
  );

  return data;
};
