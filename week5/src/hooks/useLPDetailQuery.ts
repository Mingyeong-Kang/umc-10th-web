import { useQuery } from "@tanstack/react-query";
import { getLPDetail } from "../apis/lp";

const useLPDetailQuery = (lpid: string | undefined) => {
  return useQuery({
    queryKey: ["lp", lpid],
    queryFn: () => getLPDetail(Number(lpid)),  // string → number 변환
    enabled: !!lpid,  // lpid 없으면 실행 안 함
  });
};

export default useLPDetailQuery;