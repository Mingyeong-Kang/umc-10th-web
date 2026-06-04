import { useQuery } from "@tanstack/react-query";
import { getLPDetail } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";

const useLPDetailQuery = (lpid: string | undefined) => {
  return useQuery({
    queryKey: QUERY_KEY.lpDetail(Number(lpid)),
    queryFn: () => getLPDetail(Number(lpid)),
    enabled: !!lpid,
  });
};

export default useLPDetailQuery;