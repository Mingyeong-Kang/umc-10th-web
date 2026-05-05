import { useQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/Key.ts";
import type { PaginationDto } from "../../types/common.ts";
import type { ResponseLpListDto } from "../../types/lp.ts";

const initialLpListData: ResponseLpListDto = {
  status: true,
  statusCode: 200,
  message: "",
  data: {
    data: [],
  },
  nextCursor: 0,
  hasNext: false,
};

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 3,
    initialData: initialLpListData,
  });
}

export default useGetLpList;
