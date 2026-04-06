import type {
  RequestSignupDto,
  ResponseSignupDto,
  RequestSigninDto,
  ResponseSigninDto,
  ResponseMyInfoDto,
} from "../types/auth";

// ✅ 추가된 부분: axiosInstance를 가져옵니다! (type 키워드 없이 가져와야 합니다)
import axiosInstance from "./axios";

// 회원가입 API
export const postSignup = async (
  body: RequestSignupDto,
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signup", body);

  return data;
};

// 로그인 API
export const postSignin = async (
  body: RequestSigninDto,
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);

  return data;
};

// 내 정보 조회 API
export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get("/v1/users/me");

  return data;
};
