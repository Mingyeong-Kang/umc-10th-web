import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/Key.ts";
import { getMyInfo } from "../../apis/auth.ts";
import type { ResponseMyInfoDto } from "../../types/auth.ts";

function useGetMyInfo(accessToken: string | null) {
  return useQuery<ResponseMyInfoDto>({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: getMyInfo,
    enabled: !!accessToken,
  });
}

export default useGetMyInfo;
