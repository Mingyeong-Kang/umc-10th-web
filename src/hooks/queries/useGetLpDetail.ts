import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/Key.ts";
import { getLpDetail } from "../../apis/lp.ts";
import type { RequestLpDto, ResponseLpDto } from "../../types/lp.ts";

function useGetLpDetail({ lpId }: RequestLpDto) {
  return useQuery<ResponseLpDto>({
    queryKey: [QUERY_KEY.lps, lpId],
    queryFn: () => getLpDetail({ lpId }),
    enabled: Number.isFinite(lpId),
  });
}

export default useGetLpDetail;
