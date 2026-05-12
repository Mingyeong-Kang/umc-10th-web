import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp.ts";
import { PAGINATION_ORDER } from "../../enums/common.ts";
import { QUERY_KEY } from "../../constants/Key.ts";
import type { ResponseLpListDto } from "../../types/lp.ts";

function useGetInfiniteLpList(
  limit: number,
  search: string,
  order: PAGINATION_ORDER,
) {
  return useInfiniteQuery<ResponseLpListDto>({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: ({ pageParam }) =>
      getLpList({
        cursor: pageParam as number,
        limit,
        search,
        order,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useGetInfiniteLpList;
